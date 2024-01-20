"use client";
import { Box, Container, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import { Typography } from "@mui/material";
import axios from "axios";
import { API_URL } from "@/constant/ApiUrl";
import UserInput from "./UserInput";

const MessageContainer = styled(Paper)(({ theme, isOwnMessage }) => ({
  position: "relative",
  maxWidth: "50%",
  minWidth: "85px",
  width: "fit-content",
  padding: "0.5rem 1rem 1.3rem 1rem",
  borderRadius: isOwnMessage ? "10px 10px 0 10px" : "10px 10px 10px 0",
  marginLeft: isOwnMessage ? "auto" : 0,
  marginRight: isOwnMessage ? 0 : "auto",
  marginBottom: "10px",
  backgroundColor: !isOwnMessage ? "" : "#40bd5c",
  color: !isOwnMessage ? "#000" : "#fff",
  //   textAlign: isOwnMessage ? "right" : "left",
  fontSize: "0.8rem",
}));

const ChatContainer = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "Hi How are you!",
      timestamp: "12:45 AM",
      type: "recived",
    },

    {
      id: 2,
      text: "Yes i am fine ",
      timestamp: "12:47 AM",
      type: "send",
    },
    {
      id: 3,
      text: "Whats up",
      timestamp: "12:47 AM",
      type: "send",
    },
    {
      id: 4,
      text: "Nothing",
      timestamp: "12:48 AM",
      type: "recived",
    },
  ]);

  const callApiOnUnmount = async () => {
    try {
      const response = await axios({
        url: `${API_URL}/chat/delete_conversation`,
        method: "POST",
      });
      console.log("API called on unmount:", response.data);
    } catch (error) {
      console.error("Error calling API on unmount", error);
    }
  };

  // console.log(localStorage.getItem("pageReloaded"))
  const callApi = async (message) => {
    try {
      const res = await axios({
        url: `${API_URL}/chat/conversation`,
        method: "POST",
        data: {
          user_msg: message,
        },
      });
      console.log(res);
      if (res?.data?.status_code == 200) {
        const receivedMessage = {
          id: messages.length + 1,
          text: res?.data?.data,
          timestamp: new Date().toLocaleTimeString(),
          type: "send",
        };
        setMessages((prevState) => [...prevState, receivedMessage]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSend = () => {
    console.log("handle", inputMessage);
    if (inputMessage.trim() === "") {
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
      type: "send",
    };

    setMessages([...messages, newMessage]);
    callApi(inputMessage);
    setInputMessage("");
  };

  useEffect(() => {
    if (window) {
      window.document.title = "SignLab AS";
      window.addEventListener("beforeunload", () => {
        localStorage.setItem("pageReloaded", "true");
      });
    }
    const pageReloaded = localStorage.getItem("pageReloaded");
    if (pageReloaded === "true") {
      // Make your API call here
      callApiOnUnmount();

      // Reset the flag
      localStorage.setItem("pageReloaded", "false");
    }
    console.log(pageReloaded, "ppp");

    return () => {
      callApiOnUnmount();
    };
  }, []);

  return (
    <>
      <Container sx={{ maxHeight: "74vh", height: "74vh", overflow: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          <span
            style={{
              padding: "0.5rem 0.7rem",
              background: "#f2f2f2",
              borderRadius: "0.45rem",
              border: "2px solid #40bd5c",
            }}
          >
            Today
          </span>
        </Box>

        {messages.map((item) => {
          return (
            <>
              <MessageContainer
                key={item.id}
                elevation={3}
                isOwnMessage={item?.type === "send" ? true : false}
              >
                {item.text}
                <Box
                  component={"div"}
                  sx={{
                    margin: "0rem 0.5rem 0.1rem 1rem",
                    fontSize: "0.7rem",
                    color: `${item?.type === "send" ? "black" : "#cdffc9"}`,
                    position: "absolute",
                    bottom: "0px",
                    right: "0px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {item.timeStamp}
                  {item?.type === "send" ? (
                    <CheckIcon
                      sx={{
                        fontSize: "1rem",
                        color: "#40bd5c",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Box>
              </MessageContainer>
            </>
          );
        })}
      </Container>
      <UserInput
        handleSend={handleSend}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
      />
    </>
  );
};

export default ChatContainer;
