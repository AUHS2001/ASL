import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const TypingIndicator = ({ typing }) => {
  const MessageContainer = styled(Box)(({ theme, isOwnMessage }) => ({
    position: "relative",
    width: "fit-content",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
 
    marginRight: "0",
    marginBottom: "10px",
    border: "1px solid #a9a9a9",
    backgroundColor:  "#fafafa00",
    color: "#fff",
    fontSize: "0.8rem",
    cursor: "pointer",
    // visibility:typing?"visible":'hidden'
  }));
  return (
    <>
      <MessageContainer typing={typing}>
        {/* <span className="typingIndicator">AI is typing...</span> */}
        <div className="typingIndicator">
          <div className="typing typing-1"></div>
          <div className="typing typing-2"></div>
          <div className="typing typing-3"></div>
        </div>
      </MessageContainer>
    </>
  );
};

export default TypingIndicator;
