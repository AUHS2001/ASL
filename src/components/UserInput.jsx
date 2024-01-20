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
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

const UserInput = () => {
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
                placeholder="type your message..."
                inputProps={{ "aria-label": "type your message..." }}
              />
              <IconButton>
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
              <IconButton>
                <AttachFileOutlinedIcon />
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
