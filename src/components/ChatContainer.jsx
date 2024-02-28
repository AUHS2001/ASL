"use client"
import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Container,
} from "@mui/material";
import UserInput from "./UserInput";
import TypingIndicator from "./TypingIndicator";
import { toast } from "react-toastify";
import { checkCase } from "@/utils/helper";
import Loader from "./Common/Loader";
import MyDialog from "./Common/MyDialog";
import WrongFeedback from "./WrongFeedback";
import { useSelector } from "react-redux";
import MessageBar from "./MessageBar";
import ScrollIndicator from "./ScrollIndicator";
import VideoPopover from "./VideoPopover";
import MessageBubble from "./MessageBubble";
import { getAllChat, messageConversion, sendMessage,searchVideoLookup } from "@/utils/apiCalling";
import { IMAGE_URL } from "@/constant/ApiUrl";



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
  const [anchorEl, setAnchorEl] = React.useState(null);



  // Function to fetch all chat messages
  const handleGetAllChat = async () => {
    setIsLoading(true)
    const resp = await getAllChat(user, selectedScenario)
    if (resp) {
      setMessages(resp.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }

  };

  // when scenario selected get all Chat
  useEffect(() => {
    window.document.title = `SignLab AS - ${selectedScenario?.name}`;
    setIsLoading(true);
    if (selectedScenario) {
      handleGetAllChat();
    }
    return ()=>{
      setMessages([])
    }
  }, [selectedScenario]);



  // Function to handle sending message
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
      handleSendMessage(userMessage, preMsg);
    } else {
      handleMessageConversion(userMessage, preMsg);
    }
  };

  // Function to send message to the server
  const handleSendMessage = async (inputMsg,preMsg) => {

    const resp = await sendMessage(inputMsg,user,selectedScenario);
    if (resp?.data) {
      const receivedMessage = resp?.data?.data;
      setTypingIndiacator(false);
      let updatedMsg = [...preMsg, receivedMessage];
      setMessages(updatedMsg);
    }
    else {
      setTypingIndiacator(false);
    }
  };

  // Effect to scroll down when new message is added
  useEffect(() => {
    handleScrollDown();
  }, [messages]);

  // When user send lowercase message when this 
  // function to convert message using ASL conversion
  const handleMessageConversion = async (inputMsg, preMsg) => {
    const resp = await messageConversion(inputMsg,user,selectedScenario)
    if (resp) {
      const newMessage = {
        _id: messages.length + 1,
        message: resp?.data?.data,
        timestamp: new Date(),
        role: "user",
      };
      let updatedMsg = [...preMsg, newMessage];
      setMessages(updatedMsg);
      handleSendMessage(resp?.data?.data, updatedMsg);
    }
  };

  // Function to handle text selection
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
        handlesearchVideoLookup(highlightText);
      }
    }
  };

  // Function to search word
  const handlesearchVideoLookup = async (highlightText) => {
    setLoading(true);
    const resp = await searchVideoLookup(highlightText)
    if (resp?.data?.data) {
      setLoading(false);
      setVideoLookUp(resp.data.data);
    } else {
      toast.warn("Some thing Wrong please select again this word");
      setLoading(false);
    }

  };

  // Function to handle wrong feedback
  const handleWrongFeedback = (type, id) => {
    setWrongFeedback({ type, id });
    setIsDialogOpen(true);
  };

  // Function to scroll down message container
  const handleScrollDown = () => {
    messageContainerRef?.current.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // Function to handle scroll event
  const handleScroll = () => {
    const container = messageContainerRef?.current;
    if (container) {
      const isAtBottom =
        container.scrollTop + container.clientHeight === container.scrollHeight;
      setShowScrollIndicator(!isAtBottom);
    }
  };


  //=============== Video Popover ===========
  const handleClick = (event) => {
    console.log(selectedText?.highlightText, "selectedText.highlightText");
    if (selectedText?.highlightText) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedText(null)
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

              <MessageBar />
              <VideoPopover
                id={id}
                open={open}
                handleClose={handleClose}
                anchorEl={anchorEl}
                selectedText={selectedText}
                loading={loading}
                videoLookUp={videoLookUp}
              />


              <MessageBubble
                messages={messages}
                handleSelection={handleSelection}
                handleClick={handleClick}
                selectedText={selectedText}
                setSelectedText={setSelectedText}
                setAnchorEl={setAnchorEl}
                handleWrongFeedback={handleWrongFeedback}
                id={id}
                handlesearchVideoLookup={handlesearchVideoLookup}
              />

              {typingIndiacator ?
                <Box sx={{ display: 'flex' }}>
                  <Avatar sizes="xs" src={IMAGE_URL+selectedScenario?.image_url} sx={{ mr: 1 }} />
                  <TypingIndicator typing={typingIndiacator} />
                </Box> : ""}
            </>
          )}
        </Box>
        {!isLoading && (
          <UserInput
            handleSend={handleSend}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            typingIndiacator={typingIndiacator}
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
