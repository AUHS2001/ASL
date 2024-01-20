import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ChatHeader = () => {
  return (
    <>
      <Container
        sx={{
        //   padding: "0rem 1rem",
          maxHeight: "12vh",
          minHeight: "12vh",
        }}
      >
        <Stack
          sx={{
            padding: "1rem 0rem",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar>CU</Avatar>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "0.5rem",
                marginTop: "0.5rem",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{  fontSize: "1rem" }}
                variant="button"
                display="block"
              >
                Current Chat User
              </Typography>
              {/* <Typography variant="body1" display="block">
                curent@gmail.com
              </Typography> */}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          </Box>
        </Stack>
        <Divider/>
      </Container>
    </>
  );
};

export default ChatHeader;
