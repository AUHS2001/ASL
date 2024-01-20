"use client";
import { Box, Container, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import { Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/FireBase/config";

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
  backgroundColor: isOwnMessage ? "" : "#40bd5c",
  color: isOwnMessage ? "#000" : "#fff",
  //   textAlign: isOwnMessage ? "right" : "left",
  fontSize: "0.8rem",
}));

const ChatContainer = () => {
  const messages = [
    {
      title: "Hi",
      time: "12:45 AM",
      from: "me",
    },
    {
      title: "How are you",
      time: "12:46 AM",
      from: "me",
    },
    {
      title: "Yes i am fine ",
      time: "12:47 AM",
      from: "user",
    },
    {
      title: "Whats up",
      time: "12:47 AM",
      from: "user",
    },
    {
      title: "Nothing",
      time: "12:48 AM",
      from: "me",
    },
  ];

  const getData = async () => {
    const docRef = doc(db, "chatUsers", "61srNImSqvWKPc8wdiec");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Container sx={{ maxHeight: "75vh", height: "75vh", overflow: "auto" }}>
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
                elevation={3}
                isOwnMessage={item.from === "me" ? true : false}
              >
                {item.title}
                <Box
                  component={"div"}
                  sx={{
                    margin: "0rem 0.5rem 0.1rem 1rem",
                    fontSize: "0.7rem",
                    color: `${item.from === "me" ? "black" : "#cdffc9"}`,
                    position: "absolute",
                    bottom: "0px",
                    right: "0px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {item.time}
                  {item.from === "me" ? (
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
    </>
  );
};

export default ChatContainer;
