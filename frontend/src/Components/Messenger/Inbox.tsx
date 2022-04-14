import React, { useRef, useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

const { Search } = Input;

type InboxPropsType = {
  openMessenger: boolean;
  admin?: boolean;
  setOpenMessenger: Function;
  state: any;
  handleSubmit: any;
  handleAiClick: Function;
  handleInputValueChange: Function;
  inputValue: string;
};

const Inbox = ({
  openMessenger,
  setOpenMessenger,
  state,
  handleSubmit,
  admin,
  handleAiClick,
  handleInputValueChange,
  inputValue,
}: InboxPropsType) => {
  const singleRef: any = useRef();

  const scrollToBottom = () => {
    singleRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    // const messengerHei = messengerRef.current?.getBoundingClientRect().height;
  };

  useEffect(scrollToBottom, []);
  useEffect(scrollToBottom, [state]);

  function urlify(text: string) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url: string) {
      return '<a href="' + url + '" target="_blank" >' + url + "</a>";
    });
  }

  return (
    <>
      <Box
        className={
          openMessenger === true ? "open__messenger __messenger" : "__messenger"
        }
      >
        <Box className="messenger_wrapper flex fd-c">
          <Box className="display_body flex fd-c">
            <Box className="messenger_heading flex jc-s-b ai-c">
              <div className="Title">
                <h4> Inbox </h4>
              </div>
              <div className="close__btn">
                <Button
                  shape="circle"
                  size="large"
                  type="text"
                  icon={<CloseCircleOutlined />}
                  onClick={() => setOpenMessenger(false)}
                />
              </div>
            </Box>
            <Box className="messenger_play_ground">
              <Box className="messenger_playground_body" ref={singleRef}>
                <Box className="messages__box flex fd-c">
                  {state.messages.map((e: any) => {
                    return (
                      <Box className="messages_single flex fd-c" key={e._id}>
                        {e.question && (
                          <Box
                            className={
                              admin
                                ? "message_single_txt m__left"
                                : "message_single_txt m__right"
                            }
                          >
                            <span
                              className="__single_quis"
                              dangerouslySetInnerHTML={{
                                __html: urlify(e.question),
                              }}
                            />
                          </Box>
                        )}
                        {e.answer && (
                          <Box
                            className={
                              admin
                                ? "message_single_txt m__right"
                                : "message_single_txt m__left"
                            }
                          >
                            <span
                              className="__single_ans"
                              dangerouslySetInnerHTML={{
                                __html: urlify(e.answer),
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
          {!admin && (
            <Box className="messenger_ai_content">
              {state.ai.length !== 0 && (
                <Box className="ai__wrapper">
                  <Box className="ai__list__box">
                    <Tabs
                      value={0}
                      // onChange={handleChange}
                      variant="scrollable"
                      scrollButtons
                      allowScrollButtonsMobile
                      aria-label="ai-options"
                      className="ai__tabs"
                    >
                      {state.ai.map((e: any) => {
                        const { id, question } = e;
                        return (
                          <Tab
                            className="ai_list"
                            key={id}
                            onClick={() => handleAiClick(id)}
                            label={question}
                          />
                        );
                      })}
                    </Tabs>
                  </Box>
                </Box>
              )}
            </Box>
          )}
          <Box className="write_message">
            <Search
              placeholder="Aa..."
              enterButton={<RightOutlined />}
              onSearch={handleSubmit}
              onChange={(e) => handleInputValueChange(e.target.value)}
              value={inputValue}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Inbox;
