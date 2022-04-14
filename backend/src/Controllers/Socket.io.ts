const socket = require("socket.io");
import { I_SocketUser } from "../utils/Interfaces";
import { EachUserAi } from "../utils/AiHelper";
import Messenger from "../Models/Messenger";

let Users: I_SocketUser[] = [];
let Admin: any[] = [];

type StOrNum = string | number;

const addUser = (socketId: string, id: string, ai: {}[]) => {
  const chack = Users.some((user) => user.id === id);
  if (!chack) {
    Users.push({
      socketId,
      id,
      ai,
    });
  }
};

const addAdmin = (socketId: string) => {
  const chack = Admin.some((admin) => admin.socketId === socketId);
  if (!chack) {
    Admin.push({
      socketId,
    });
  }
};

const removeAdmin = (socketId: string) => {
  Admin = Admin.filter((e) => e.socketId !== socketId);
};

/* ********************* socket ***************** */

const Socket = (server: any) => {
  const io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket: any) => {
    InstallMessenger(socket, io);

    AdminTakeCare(socket, io);

    socket.on("disconnect", () => {
      removeAdmin(socket.id);
    });
  });
};

const EachUserAiQuis = EachUserAi.map((e) => {
  return {
    id: e._id,
    question: e.question,
  };
});

const InstallMessenger = (socket: any, io: any) => {
  socket.join("messenger-room");

  // when user enter
  socket.on("user", async (id: string) => {
    if (!id) {
      io.to("messenger-room").to(socket.id).emit("ai-response", {
        messages: [],
        ai: EachUserAiQuis,
      });
      return;
    }
    await UserInitial(socket, io, id);
  });

  // emit  user ai response
  socket.on(
    "ai-soluation",
    async ({ questionId, id }: { questionId: number; id: string }) => {
      const wichQuistion: any = EachUserAi.find(
        (e: any) => e._id === questionId
      );

      if (id) {
        // adding to db
        const response = await addMessageToDb(
          id,
          wichQuistion.question,
          wichQuistion.answer
        );
        populateUsers(questionId, id);

        const theExistUser: any = Users.find((e: any) => e.id === id);

        io.to("messenger-room")
          .to(socket.id)
          .emit(
            "ai-sense",
            backToUser(
              id,
              theExistUser ? theExistUser.ai : [],
              response.messages
            )
          );

        return;
      }

      const response = await addMessageToDb(
        id,
        wichQuistion.question,
        wichQuistion.answer
      );
      // adding  to db

      addUser(
        socket.id,
        response._id,
        EachUserAiQuis.filter((e: any) => e.id !== id)
      );
      populateUsers(questionId, response._id);

      const theExistUser: any = Users.find((e: any) => e.id === response._id);

      io.to("messenger-room")
        .to(socket.id)
        .emit(
          "ai-sense",
          backToUser(
            response._id,
            theExistUser ? theExistUser.ai : [],
            response.messages
          )
        );
    }
  );

  // user text handle
  socket.on(
    "user-text",
    async ({ text, roomId }: { text: string; roomId: string }) => {
      if (Admin.length !== 0) {
        const add = await addMessageToDb(
          roomId,
          text,
          "Our admin will connect you soon"
        );

        Admin.forEach((a: any) => {
          if (a) {
            return io
              .to("messenger-room")
              .to(socket.id)
              .to(a.socketId)
              .emit("user-custom", {
                messages: add.messages,
                roomId: add._id,
              });
          }
        });
        return;
      }
      // if no admin is in online
      const addDb = await addMessageToDb(
        roomId,
        text,
        "Sorry! our all admin are busy. we will connect you soon"
      );

      io.to("messenger-room")
        .to(socket.id)
        .emit("user-custom", { messages: addDb.messages, roomId: addDb._id });
    }
  );

  // admin text handle

  socket.on(
    "admin-text",
    async ({ roomId, text }: { roomId: string; text: string }) => {
      const findRoom = Users.find((e: any) => e.id === roomId);

      const add = await addMessageToDb(roomId, "", text);
      if (findRoom) {
        Admin.forEach((a: any) => {
          if (a) {
            io.to("messenger-room")
              .to(findRoom.socketId)
              .to(a.socketId)
              .emit("admin-response", {
                messages: add.messages,
                roomId: add._id,
              });

            return;
          }
        });
        return;
      }
      Admin.forEach((a: any) => {
        if (a) {
          io.to("messenger-room").to(a.socketId).emit("admin-response", {
            messages: add.messages,
            roomId: add._id,
          });
        }
      });
    }
  );
};

// admin
const AdminTakeCare = (socket: any, io: any) => {
  socket.on("admin-go", async () => {
    try {
      addAdmin(socket.id);
      const getAllUserMessenger = await Messenger.find({});
      Admin.forEach((e: any) => {
        if (e) {
          socket.emit("all-users", getAllUserMessenger);
        }
      });
    } catch (error: any) {
      throw new Error(error.messages);
    }
  });
};

// callback functions

const addMessageToDb = async (id: string, text?: string, answer?: string) => {
  try {
    if (id) {
      await Messenger.findByIdAndUpdate(id, {
        $push: {
          messages: {
            question: text && text,
            answer: answer && answer,
          },
        },
      });
      const newAdded = await Messenger.findById(id);
      return {
        _id: newAdded._id,
        messages: newAdded.messages[newAdded.messages.length - 1],
      };
    }

    const newCreated = await Messenger.create({
      messages: {
        question: text && text,
        answer: answer && answer,
      },
    });

    return {
      _id: newCreated._id,
      messages: newCreated.messages[newCreated.messages.length - 1],
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const backToUser = (id: string, ai: [], messages: {}) => {
  return {
    id,
    ai,
    messages,
  };
};

const UserInitial = async (socket: any, io: any, id: string) => {
  try {
    addUser(socket.id, id, EachUserAiQuis);

    const findRoom = await Messenger.findById(id);
    if (!findRoom) return;
    const existUser = Users.find((e: any) => e.id === id);
    io.to("messenger-room")
      .to(socket.id)
      .emit("ai-response", {
        messages: findRoom.messages,
        ai: existUser ? existUser.ai : [],
        id,
      });
  } catch (error: any) {
    throw new Error(error.messages);
  }
};

const populateUsers = (questionId: StOrNum, id: StOrNum) => {
  const findUser: any = Users.find((e: any) => e.id === id);
  Users = [
    ...Users.filter((e: any) => e.id !== id),
    {
      ...findUser,
      ai: findUser.ai.filter((e: any) => e.id !== questionId),
    },
  ];
};

export default Socket;
