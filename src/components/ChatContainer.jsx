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
import TypingIndicator from "./TypingIndicator";
import { toast } from "react-toastify";
import HiglightedText from "./HiglightedText";

const MessageContainer = styled(Paper)(({ theme, isOwnMessage }) => ({
  position: "relative",
  maxWidth: "50%",
  minWidth: "85px",
  width: "fit-content",
  padding: "1rem 1rem 1.5rem 1rem",
  borderRadius: isOwnMessage ? "10px 10px 0 10px" : "10px 10px 10px 0",
  marginLeft: isOwnMessage ? "auto" : 0,
  marginRight: isOwnMessage ? 0 : "auto",
  marginBottom: "10px",
  backgroundColor: isOwnMessage ? "" : "#40bd5c",
  color: isOwnMessage ? "#000" : "#fff",
  //   textAlign: isOwnMessage ? "right" : "left",
  fontSize: "0.8rem",
  cursor: "pointer",
}));

const ChatContainer = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [videoLookUp, setVideoLookUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingIndiacator, setTypingIndiacator] = useState(false);
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
  const callApi = async (message, preMsg) => {
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
          id: preMsg.length + 1,
          text: res?.data?.data,
          translation:res?.data?.data,
          timeStamp: new Date().toLocaleTimeString(),
          type: "recived",
        };
        setTypingIndiacator(false);
        setMessages((prevState) => [...prevState, receivedMessage]);
      } else {
        toast.error("Something Went Worng!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSend = async () => {
    console.log("handle", inputMessage);
    if (inputMessage.trim() === "") {
      return;
    }
    let newId = messages.length + 1;
    const newMessage = {
      id: newId,
      text: inputMessage,
      timeStamp: new Date().toLocaleTimeString(),
      type: "send",
    };
    let preMsg = [...messages, newMessage];
    await setMessages(preMsg);
    setTypingIndiacator(true);
    callApi(inputMessage, preMsg);
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
          maxHeight: "74vh",
          height: { xs: "calc(100dvh - 12dvh)", md: "74vh", lg: "74vh" },
          overflow: "auto",
        }}
      >
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
                    onTouchEnd={() => handleSelection(item.id)}
                    style={{ wordBreak: "break-all", overflowWrap: "anywhere",}}
                  >
                            <HiglightedText content={item.text}/>

                    {/* {item.text} */}
                  </span>
                </HighlightPopover>
                {item?.type === "recived"?
                <Box
                  component={"div"}
                  sx={{
                    margin:'5px 0px',
                    fontSize: "0.7rem",
                    width: "100%",
                    display: "flex",
                    textTransform:"capitalize",
                    flexDirection:'column'
                   
                  }}
                >
                  <Typography variant="body2" sx={{fontWeight:'550',fontSize:"0.7rem"}}>Translation:</Typography>
                  <Typography variant="body2" sx={{fontSize:"0.7rem"}}>{item.translation}</Typography>
                  
                </Box>:""}

                <Box
                  component={"div"}
                  sx={{
                    fontSize: "0.7rem",
                    color: `${item?.type === "recived" ? "#cdffc9" : "black"}`,
                    position: "absolute",
                    bottom: "3px",
                    right: "8px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    userSelect: "none",
                  }}
                >
                  
                  {item.timeStamp}
                 
                </Box>
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
