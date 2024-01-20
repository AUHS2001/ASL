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
import HighlightPopover from "./HighlightPopover";

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
  cursor: "pointer",
}));

const ChatContainer = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [videoLookUp, setVideoLookUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "HELLO! HOW YOU?",
      timeStamp: new Date().toLocaleTimeString(),
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
          type: "recived",
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
      timeStamp: new Date().toLocaleTimeString(),
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

  const handleSelection = (id) => {
    let msg = "message" + id;
    const container = document.getElementById(msg);
    const selection = window.getSelection();

    // Check if the selection is within the specified container
    if (
      container.contains(selection.anchorNode) &&
      container.contains(selection.focusNode)
    ) {
      const highlightText = selection.toString().trim();

      // Log or use the selected word as needed
      console.log("Selected Text:", highlightText);
      setSelectedText({ id, highlightText });
      // setTimeout(() => {
      serachWord();
      // }, 1000);
    }
  };

  const serachWord = async () => {
    setLoading(true);
    try {
      const res = await axios({
        url: `${API_URL}/chat/video_lookup`,
        method: "POST",
        data: {
          context: selectedText.highlightText,
        },
      });
      console.log(res,"video_loolup");
      if (res?.data?.status_code == 200) {
        // ========== UNcommment when api call
        // setLoading(false);  
        // setVideoLookUp(res)
      }
    } catch (err) {
      // setLoading(false);

      console.log(err);
    }

    // ========== commment when api call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setVideoLookUp({
      error: "",
      message: "success",
      data: "https://main-bucket-signlab-us.s3.us-east-2.amazonaws.com/signs/medium-size/mp4-videos/A-Z_From_Down_T4[2m26s].mp4",
      status_code: 200,
    });
    // ============
  };

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
              padding: "0.3rem 0.4rem",
              background: "#f2f2f2",
              borderRadius: "0.45rem",
              border: "2px solid #40bd5c",
              fontSize: "0.8rem",
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
                <HighlightPopover
                  selectedText={selectedText}
                  id={item.id}
                  loading={loading}
                  videoLookUp={videoLookUp}
                >
                  <span
                    id={"message" + item.id}
                    onMouseUp={() => handleSelection(item.id)}
                    style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
                  >
                    {item.text}
                  </span>
                </HighlightPopover>
                <Box
                  component={"div"}
                  sx={{
                    margin: "0rem 0.5rem 0.1rem 1rem",
                    fontSize: "0.7rem",
                    color: `${item?.type === "send" ? "#cdffc9" : "black"}`,
                    position: "absolute",
                    bottom: "0px",
                    right: "0px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    userSelect: "none",
                  }}
                >
                  <span style={{ userSelect: "none" }}></span>
                  {item.timeStamp}
                  {item?.type === "send" ? (
                    <CheckIcon
                      sx={{
                        fontSize: "1rem",
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
