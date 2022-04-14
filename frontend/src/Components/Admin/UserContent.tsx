import React, { useEffect } from "react";
import { Comment, List, Avatar } from "antd";
import { Container, Box } from "@mui/material";
import Inbox from "../Messenger/Inbox";

type st = string;

// type _userInbox = {_id:string,messages:[]}

const UserContent = ({
  data,
  socket,
  setMessengerUser,
}: {
  data: any;
  socket: any;
  setMessengerUser: Function;
}) => {
  const [openMessenger, setOpenMessenger] = React.useState(false);
  const [userInbox, setUserInbox] = React.useState<{
    _id: string;
    messages: any[];
  }>({ _id: "", messages: [] });
  const [textValue, setTextValue] = React.useState("");

  useEffect(() => {
    let subscribe: boolean = true;
    socket.on("admin-response", (_data: any) => {
      if (subscribe) {
        setMessengerUser((pre: any) => {
          return pre.map((e: any) => {
            if (e._id === _data.roomId) {
              return {
                _id: e._id,
                messages: [...e.messages, _data.messages],
              };
            }
            return e;
          });
        });
        setUserInbox(({ _id, messages }: { _id: string; messages: any[] }) => {
          return {
            _id,
            messages: [...messages, _data.messages],
          };
        });
      }
    });
    return () => {
      subscribe = false;
    };
  }, [socket, setMessengerUser]);

  useEffect(() => {
    let subscribe: boolean = true;
    socket.on("user-custom", (_data: any) => {
      if (subscribe) {
        setMessengerUser((pre: any) => {
          return pre.map((e: any) => {
            if (e._id === _data.roomId) {
              return {
                _id: e._id,
                messages: [...e.messages, _data.messages],
              };
            }
            return e;
          });
        });
        setUserInbox(({ _id, messages }: { _id: string; messages: any[] }) => {
          return {
            _id,
            messages: [...messages, _data.messages],
          };
        });
      }
    });
    return () => {
      subscribe = false;
    };
  }, [socket, setMessengerUser]);

  const handleSubmit = (e: string) => {
    socket.emit("admin-text", { roomId: userInbox._id, text: e });
    setTextValue("");
  };

  const handleInputValueChange = (e: any) => setTextValue(e);

  const handleUserInobx = (e: any) => {
    setOpenMessenger(true);
    setUserInbox(e);
  };

  const handleAiClick = () => {
    return;
  };

  const displayData: any = data.map((e: any) => {
    const { _id, messages }: { _id: st; messages: any } = e;
    const _re: any = messages[messages.length - 1];
    return {
      actions: [
        <span key="reply" onClick={() => handleUserInobx(e)}>
          Reply
        </span>,
      ],
      author: `#${_id.substring(_id.length - 5, _id.length)}`,

      avatar: <Avatar> U </Avatar>,
      content: (
        <Box className="flex fd-c">
          <span>
            <b>
              {" "}
              <i>user :</i>
            </b>{" "}
            {_re.question.substring(0, _re.question.length - 5)}...
          </span>
          <span>
            <b>
              {" "}
              <i> admin :</i>
            </b>{" "}
            {_re.answer.substring(0, _re.answer.length - 5)}...
          </span>
        </Box>
      ),
    };
  });

  return (
    <>
      <Box className="user_inbox_sector" sx={{ my: 4 }}>
        <Container>
          <Box className="user_content_wrapper">
            <List
              className="comment-list user_inbox_list_ul"
              header={`${displayData.length} user messages`}
              itemLayout="horizontal"
              dataSource={displayData}
              renderItem={(item: any) => (
                <li className="user_inbox_li">
                  <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                  />
                </li>
              )}
            />
          </Box>
        </Container>
      </Box>

      {openMessenger && (
        <Inbox
          handleAiClick={handleAiClick}
          handleInputValueChange={handleInputValueChange}
          handleSubmit={handleSubmit}
          inputValue={textValue}
          openMessenger={openMessenger}
          setOpenMessenger={setOpenMessenger}
          admin
          state={userInbox}
        />
      )}
    </>
  );
};

export default UserContent;
