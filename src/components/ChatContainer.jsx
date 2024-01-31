"use client";
import { Box, Container, Divider, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import axios from "axios";
import { API_URL } from "@/constant/ApiUrl";
import UserInput from "./UserInput";
import HighlightPopover from "./HighlightPopover";
import TypingIndicator from "./TypingIndicator";
import { toast } from "react-toastify";
import HiglightedText from "./HiglightedText";

import { formatStringToTime } from "@/utils/formatTime";

import { checkCase } from "@/utils/helper";
import Feedback from "./Feedback";
import Loader from "./Common/Loader";

const MessageContainer = styled(Paper)(({ theme, isOwnMessage }) => ({
  position: "relative",
  maxWidth: "50%",
  minWidth: isOwnMessage ? "85px" : "150px",
  width: "fit-content",
  padding: "1rem 0.5rem 1.5rem 1rem",
  borderRadius: isOwnMessage ? "10px 10px 0 10px" : "10px 10px 10px 0",
  marginLeft: isOwnMessage ? "auto" : 0,
  marginRight: isOwnMessage ? 0 : "auto",
  marginBottom: "7px",
  backgroundColor: isOwnMessage ? "" : "#d9fdd3",
  color: isOwnMessage ? "#000" : "black",
  cursor: "pointer",
}));

const ChatContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [videoLookUp, setVideoLookUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingIndiacator, setTypingIndiacator] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [messages, setMessages] = useState([]);

  // ===============First Time Render ================

  useEffect(() => {
    if (window) {
      window.document.title = "SignLab AS";
    }
    console.log(user, "user");
    getAllChat();
  }, []);

  // =========================

  // ========= Get All Old Chat ==========
  const getAllChat = async () => {
    try {
      const response = await axios({
        url: `${API_URL}/chat/get_conversation`,
        method: "POST",
        data: {
          user_id: user?.id,
        },
      });
      console.log("getAllChat", response.data);
      if (response?.data?.status_code === 200) {
        setMessages(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error getAllChat", error);
    }
  };
  // =============================

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

  // ============= User Message Handler ===================
  const handleSend = async () => {
    console.log("handle", inputMessage);
    if (inputMessage.trim() === "") {
      return;
    }

    let newId = messages.length + 1;
    const newMessage = {
      _id: newId,
      message: inputMessage,
      timestamp: new Date(),
      role: "user",
    };
    let preMsg = [...messages, newMessage];
    await setMessages(preMsg);
    setTypingIndiacator(true);
    if (checkCase(inputMessage) === "Uppercase") {
      sendMessage(inputMessage, preMsg);
    } else {
      messageConversion(inputMessage, preMsg);
    }
    setInputMessage("");
  };

  // =========================

  // ============= Send User Message ===================
  const sendMessage = async (message, preMsg) => {
    try {
      const res = await axios({
        url: `${API_URL}/chat/conversation`,
        method: "POST",
        data: {
          user_msg: message,
          user_id: user?.id,
        },
      });
      console.log(res);
      if (res?.data?.status_code == 200) {
        const receivedMessage = res?.data?.data;
        setTypingIndiacator(false);
        // setMessages((prevState) => [...prevState, receivedMessage]);
        let updatedMsg = [...preMsg, receivedMessage];
        setMessages(updatedMsg);
      } else {
        toast.error("Something Went Worng!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // =====================================================

  const messageConversion = async (message, preMsg) => {
    try {
      const res = await axios({
        url: `${API_URL}/chat/asl_conversion`,
        method: "POST",
        data: {
          user_msg: message,
          user_id: user?.id,
        },
      });
      console.log(res);
      if (res?.data?.status_code == 200) {
        let newId = messages.length + 1;
        const newMessage = {
          _id: newId,
          message: res?.data?.data,
          timestamp: new Date(),
          role: "user",
        };
        let updatedMsg = [...preMsg, newMessage];
        setMessages(updatedMsg);
        console.log(updatedMsg, "nnn");
        sendMessage(res?.data?.data, updatedMsg);
      } else {
        toast.error("Something Went Worng!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  // ======================================================

  const handleSelection = (id) => {
    let msg = "message" + id;
    const container = document.getElementById(msg);
    const selection = window.getSelection();
    // alert(selection.toString().trim())
    // Check if the selection is within the specified container
    if (
      container.contains(selection.anchorNode) &&
      container.contains(selection.focusNode)
    ) {
      const highlightText = selection.toString().trim();

      // Log or use the selected word as needed
      console.log("Selected Text:", highlightText);

      if (highlightText) {
        setSelectedText({ id, highlightText });
        serachWord(highlightText);
      }
    }
  };

  const serachWord = async (highlightText) => {
    setLoading(true);
    try {
      const res = await axios({
        url: `${API_URL}/chat/video_lookup`,
        method: "POST",
        data: {
          context: highlightText,
        },
      });
      console.log(res, "video_loolup");
      if (res?.data?.status_code == 200) {
        setLoading(false);
        setVideoLookUp(res.data);
      } else {
        toast.warn("Select again this word", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  return (
    <>
      <Container
        sx={{
          maxHeight: "80vh",
          height: { xs: "75vh", md: "74vh", lg: "79vh" },
          overflow: "auto",
        }}
        maxWidth={"xl"}
      >
        {isLoading ? <Loader /> : ""}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: "0.5rem 0rem",
            position: "sticky",
            top: "10px",
            zIndex: "1000",
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
                isOwnMessage={item?.role === "user" ? true : false}
                className="messageBox"
              >
                {item?.role === "assistant" ? (
                  <>
                    <Feedback
                      title={"Message"}
                      type={"message"}
                      content={item.message}
                      item={item}
                      id={item._id}
                    />
                  </>
                ) : (
                  ""
                )}
                <HighlightPopover
                  selectedText={selectedText}
                  id={item.id}
                  loading={loading}
                  videoLookUp={videoLookUp}
                >
                  <Typography
                    component={"span"}
                    id={"message" + item._id}
                    onMouseUp={() => handleSelection(item._id)}
                    onTouchEnd={() => handleSelection(item._id)}
                    style={{
                      wordBreak: "break-all",
                      overflowWrap: "anywhere",
                      fontSize: "0.9rem",
                    }}
                  >
                    {item?.message ? (
                      <HiglightedText content={item.message} />
                    ) : (
                      ""
                    )}

                    {/* {item.message} */}
                  </Typography>
                </HighlightPopover>
                {item?.role === "assistant" ? (
                  <>
                    <Box
                      component={"div"}
                      sx={{
                        marginTop: "5px",
                        fontSize: "0.7rem",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Feedback
                        title={"Translation"}
                        type={"translation"}
                        content={item.translation}
                        item={item}
                        id={item._id}
                      />

                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {item.translation}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  ""
                )}

                <Typography
                  component={"span"}
                  variant="caption"
                  sx={{
                    fontSize: "0.6rem",
                    color: "black",
                    position: "absolute",
                    bottom: "3px",
                    right: "8px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    userSelect: "none",
                  }}
                >
                  {formatStringToTime(item?.timestamp)}
                </Typography>
              </MessageContainer>
            </>
          );
        })}
        {typingIndiacator ? <TypingIndicator /> : ""}
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
