"use client";
import {
  Box,
  Container,
  Stack,
  Paper,
  IconButton,
  InputBase,
} from "@mui/material";
import React from "react";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendIcon from '@mui/icons-material/Send';

const UserInput = ({handleSend,inputMessage,setInputMessage}) => {
  return (
    <>
      <Container>
        <Stack>
          <Box>
            <Paper
              component="form"
              sx={{
                p: "4px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                margin: "1rem 0rem",
                border:"1px solid #40bd5c"
              }}
            >
              {/* <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
                <SearchIcon />
                
              </IconButton> */}
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Type your message..."
                inputProps={{ "aria-label": "type your message..." }}
                onChange={(e)=>{setInputMessage(e.target.value)}}
                value={inputMessage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend(e)
                    // Handle the Enter key press as needed
                    // For example, submit the form or perform any other action
                  }}}
                
              />
              <IconButton onClick={(e)=>handleSend(e)}>
                <SendIcon />
              </IconButton>
             
            </Paper>
          </Box>
          <Box></Box>
        </Stack>
      </Container>
    </>
  );
};

export default UserInput;
