import React from "react";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";

const TypingIndicator = () => {
  const MessageContainer = styled(Paper)(({ theme, isOwnMessage }) => ({
    position: "relative",
    maxWidth: "50%",
    minWidth: "85px",
    width: "fit-content",
    padding: "0.5rem 1rem",
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
  return (
    <>
      <MessageContainer elevation={3} isOwnMessage={false}>
        <span className="typingIndicator">AI is typing...</span>
      </MessageContainer>
    </>
  );
};

export default TypingIndicator;
