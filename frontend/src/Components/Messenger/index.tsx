import { Box } from "@mui/material";
import React, { useEffect, useState, useReducer } from "react";
import { setCookie, getCookie, I_MessengerValue } from "./Helper";
import { Button } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import Inbox from "./Inbox";
import Reducer from "./Reducer";

const initialState: I_MessengerValue = {
  _id: "",
  ai: [],
  messages: [],
};

const Index = ({ socket }: { socket: any }) => {
  const [openMessenger, setOpenMessenger] = useState(false);

  return (
    <>
      <Box className="message_button">
        <Button
          shape="circle"
          size="large"
          icon={<CommentOutlined />}
          onClick={() => setOpenMessenger(true)}
        />
      </Box>
      <MessengerBox
        data={{ openMessenger, setOpenMessenger }}
        socket={socket}
      />
    </>
  );
};

const MessengerBox = ({ data, socket }: { data: any; socket: any }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    const userCookie = getCookie("id");
    socket.emit("user", userCookie);
  }, [socket]);

  useEffect(() => {
    let subscribe: boolean = true;
    socket.on("ai-response", (datas: string) => {
      if (subscribe) {
        dispatch({ type: "INITIAL_VALUE_ACCESS", payload: datas });
      }
    });
    return () => {
      subscribe = false;
    };
  }, [socket]);

  useEffect(() => {
    let subscribe: boolean = true;
    socket.on("ai-sense", (datas: any) => {
      if (subscribe) {
        const userCookie = getCookie("id");
        if (!userCookie) setCookie("id", datas.id, 3);
        dispatch({ type: "AI_SENSE_ADDRED", payload: datas });
      }
    });
    return () => {
      subscribe = false;
    };
  }, [socket]);

  useEffect(() => {
    let subscribe: boolean = true;
    socket.on("user-custom", (data: any) => {
      if (subscribe) {
        const userCookie = getCookie("id");
        if (!userCookie) setCookie("id", data.roomId, 3);
        dispatch({ type: "USER_MESSAGE_ADDED", payload: data.messages });
      }
    });
    return () => {
      subscribe = false;
    };
  }, [socket]);

  useEffect(() => {
    let subscribe: boolean = true;
    socket.on("admin-response", (data: any) => {
      if (subscribe) {
        const userCookie = getCookie("id");
        if (!userCookie) setCookie("id", data.roomId, 3);
        dispatch({ type: "ADMIN_MESSAGE_ADDED", payload: data.messages });
      }
    });
    return () => {
      subscribe = false;
    };
  }, [socket]);

  // functions
  const handleSubmit = (e: string) => {
    const userCookie = getCookie("id");
    if (e) {
      socket.emit("user-text", { text: e, roomId: userCookie });
      setTextValue("");
    }
  };

  const handleInputValueChange = (e: any) => setTextValue(e);

  const handleAiClick = (e: number | string) => {
    const userCookie = getCookie("id");
    socket.emit("ai-soluation", { id: userCookie, questionId: e });
  };

  return (
    <>
      <Inbox
        openMessenger={data.openMessenger}
        setOpenMessenger={data.setOpenMessenger}
        handleAiClick={handleAiClick}
        handleSubmit={handleSubmit}
        state={state}
        handleInputValueChange={handleInputValueChange}
        inputValue={textValue}
      />
    </>
  );
};

export default Index;
