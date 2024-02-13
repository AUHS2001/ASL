"use client"
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "@/constant/ApiUrl";
import {
  Avatar,
  Box,
  Container,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import UserInput from "./UserInput";
import HighlightPopover from "./HighlightPopover";
import TypingIndicator from "./TypingIndicator";
import { toast } from "react-toastify";
import HiglightedText from "./HiglightedText";
import { formatStringToTime } from "@/utils/formatTime";
import { checkCase } from "@/utils/helper";
import Feedback from "./Feedback";
import Loader from "./Common/Loader";
import MyDialog from "./Common/MyDialog";
import WrongFeedback from "./WrongFeedback";
import { useSelector } from "react-redux";
import ScenarioBar from "./ScenarioBar";
import ScrollIndicator from "./ScrollIndicator";

const MessageContainer = styled(Paper)(({ theme, isOwnMessage, isTranslation }) => ({
  position: "relative",
  maxWidth: "70%",
  minWidth: isOwnMessage ? "85px" : "150px",
  width: "fit-content",
  padding: "0.3rem 0.5rem 1.5rem 1rem",
  borderRadius: "10px",
  marginLeft: isOwnMessage ? "auto" : 0,
  marginRight: isOwnMessage ? 0 : "auto",
  marginBottom: "7px",
  backgroundColor: isOwnMessage ? "#fafafa00" : isTranslation ? "#fafafa00" : "#d9fdd3",
  border: "1px solid #a9a9a9",
  color: isOwnMessage ? "#000" : "black",
  cursor: "pointer",
  boxShadow: 'none'
}));

const ChatContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [videoLookUp, setVideoLookUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingIndiacator, setTypingIndiacator] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [messages, setMessages] = useState([]);
  const [wrongFeedback, setWrongFeedback] = useState("");
  const selectedScenario = useSelector((state) => state?.aiType?.scenario);
  const messageContainerRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    window.document.title = "SignLab AS";
    setIsLoading(true);
    if (selectedScenario) {
      getAllChat();
    }
  }, [selectedScenario]);

  const getAllChat = async () => {
    try {
      const response = await axios.post(`${API_URL}/chat/get_conversation`, {
        user_id: user?.id,
        scenario_id: selectedScenario?._id,
      });
      if (response?.data?.status_code === 200) {
        setMessages(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error getAllChat", error);
    }
  };

  const handleSend = async (userMessage) => {
    if (userMessage.trim() === "") {
      return;
    }

    const newMessage = {
      _id: messages.length + 1,
      message: userMessage,
      timestamp: new Date(),
      role: "user",
    };

    let preMsg = [...messages, newMessage];
    setMessages(preMsg);
    setTypingIndiacator(true);

    if (checkCase(userMessage) === "Uppercase") {
      sendMessage(userMessage, preMsg);
    } else {
      messageConversion(userMessage, preMsg);
    }
  };

  const sendMessage = async (message, preMsg) => {
    try {
      const res = await axios.post(`${API_URL}/chat/conversation`, {
        user_msg: message,
        user_id: user?.id,
        scenario_id: selectedScenario._id,
        scene_id: selectedScenario.scene_id,
      });
      if (res?.data?.status_code == 200) {
        const receivedMessage = res?.data?.data;
        setTypingIndiacator(false);
        let updatedMsg = [...preMsg, receivedMessage];
        setMessages(updatedMsg);
      } else {
        toast.error("Something Went Worng!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleScrollDown();
  }, [messages]);

  const messageConversion = async (message, preMsg) => {
    try {
      const res = await axios.post(`${API_URL}/chat/asl_conversion`, {
        user_msg: message,
        user_id: user?.id,
        scenario_id: selectedScenario._id,
        scene_id: selectedScenario.scene_id,
      });
      if (res?.data?.status_code == 200) {
        const newMessage = {
          _id: messages.length + 1,
          message: res?.data?.data,
          timestamp: new Date(),
          role: "user",
        };
        let updatedMsg = [...preMsg, newMessage];
        setMessages(updatedMsg);
        sendMessage(res?.data?.data, updatedMsg);
      } else {
        toast.error("Something Went Worng!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelection = (id) => {
    const container = document.getElementById("message" + id);
    const selection = window.getSelection();

    if (
      container.contains(selection.anchorNode) &&
      container.contains(selection.focusNode)
    ) {
      const highlightText = selection.toString().trim();

      if (highlightText) {
        setSelectedText({ id, highlightText });
        serachWord(highlightText);
      }
    }
  };

  const serachWord = async (highlightText) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/chat/video_lookup`, {
        context: highlightText,
      });
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
      console.error(err);
    }
  };

  const handleWrongFeedback = (type, id) => {
    setWrongFeedback({ type, id });
    setIsDialogOpen(true);
  };

  const handleScrollDown = () => {
    messageContainerRef?.current.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = messageContainerRef?.current;
    if (container) {
      const isAtBottom =
        container.scrollTop + container.clientHeight === container.scrollHeight;
      setShowScrollIndicator(!isAtBottom);
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Box
          ref={messageContainerRef}
          onScroll={handleScroll}
          sx={{
            maxHeight: "80vh",
            height: { xs: "75vh", md: "74vh", lg: "79vh" },
            overflow: "auto",
            padding: '0px 8px'
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <ScrollIndicator
                messageContainerRef={messageContainerRef}
                handleScrollDown={handleScrollDown}
                showScrollIndicator={showScrollIndicator}
                setShowScrollIndicator={setShowScrollIndicator}
              />
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

              <ScenarioBar />
              {messages.map((item) => (
                <>
                  <Box sx={{ display: 'flex', width: '100%' }}>
                    {item.role === "assistant" ? <Avatar sizes="xs" src={selectedScenario.profileImg} sx={{ mr: 1 }} /> : ""}
                    <Box sx={{ display: 'flex', flexDirection: "column", width: '100%' }}>
                      <MessageContainer
                        key={item.id}
                        elevation={3}
                        isOwnMessage={item?.role === "user"}
                        onClick={() => handleSelection(item._id)}
                      >
                        {item.role === "assistant" ?
                          <Feedback
                            title={"Message"}
                            type={"message"}
                            content={item.message}
                            item={item}
                            id={item._id}
                            handleWrongFeedback={handleWrongFeedback}
                          /> : ""}
                        <HighlightPopover
                          selectedText={selectedText}
                          id={item.id}
                          item={item}
                          loading={loading}
                          videoLookUp={videoLookUp}
                          handleWrongFeedback={handleWrongFeedback}
                        >
                          <Typography
                            component={"span"}
                            id={"message" + item._id}
                            style={{
                              wordBreak: "break-word",
                              overflowWrap: "anywhere",
                              fontSize: "0.9rem",
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                            }}
                          >
                            <HiglightedText
                              content={item.message}
                              setSelectedText={setSelectedText}
                            />
                          </Typography>
                        </HighlightPopover>
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
                      {item.role === "assistant" ?
                        <MessageContainer
                          key={item.id}
                          elevation={3}
                          isOwnMessage={item?.role === "user"}
                          onClick={() => handleSelection(item._id)}
                          isTranslation={true}
                        >
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
                              handleWrongFeedback={handleWrongFeedback}
                            />

                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              {item.translation}
                            </Typography>
                          </Box>
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
                        </MessageContainer> : ""}
                    </Box>
                  </Box>
                </>
              ))}
              <TypingIndicator typing={typingIndiacator} />
            </>
          )}
        </Box>
        {!isLoading && (
          <UserInput
            handleSend={handleSend}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
          />
        )}
      </Container>
      <MyDialog
        title={"Provide additional feedback"}
        dialogOpen={isDialogOpen}
        setDialogOpen={setIsDialogOpen}
        closeable={true}
      >
        <WrongFeedback
          wrongFeedback={wrongFeedback}
          setWrongFeedback={setWrongFeedback}
          setDialogOpen={setIsDialogOpen}
        />
      </MyDialog>
    </>
  );
};

export default ChatContainer;
