"use client";
import {
  Box,
  Container,
  Stack,
  Paper,
  IconButton,
  InputBase,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { searchWord } from "@/app/action";
import SearchList from "@/components/SearchList";
import "../styles/UserInput.css";
import { useDebounce } from "@/utils/hooks";

const UserInput = ({ handleSend,typingIndiacator }) => {
  const [keyWords, setKeyWords] = useState([]);
  const [msgInput, setMsgInput] = useState("");
  const debouncedValue = useDebounce(msgInput, 500);

  const search = useCallback(async () => {
    if (debouncedValue) {
      const results = await searchWord(debouncedValue.toLowerCase());
      setKeyWords(results);
    }
  }, [debouncedValue]);

  useEffect(() => {
    search();
  }, [debouncedValue, search]);

  const handleMsgSend = (selectWord) => {
    let inputMsg = msgInput;
    setMsgInput("");
    setKeyWords([]);
    if (selectWord) {
      handleSend(selectWord);
    } else {
      handleSend(inputMsg);
    }
  };

  useEffect(() => {
    if (!msgInput) {
      setKeyWords([]);
    }
  }, [msgInput]);

  return (
    <>
      <Container
        maxWidth={"xl"}
        sx={{ borderTop: "1px solid gray", background: "#f0f2f5" }}
      >
        <Stack sx={{ position: "relative" }}>
          <SearchList
            results={keyWords}
            setInputMessage={setMsgInput}
            handleMsgSend={handleMsgSend}
            setKeyWords={setKeyWords}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "10vh",
              flexDirection: "row",
            }}
          >
            <Paper
              component="div"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                border: "1px solid #40bd5c",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Type your message..."
                inputProps={{ "aria-label": "type your message..." }}
                onChange={(e) => {
                  setMsgInput(e.target.value);
                }}
                disabled={typingIndiacator}
                value={msgInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleMsgSend();
                    // Handle the Enter key press as needed
                    // For example, submit the form or perform any other action
                  }
                }}
              />
              <IconButton onClick={() => handleMsgSend()}  disabled={typingIndiacator}>
                <SendIcon />
              </IconButton>
            </Paper>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default UserInput;
