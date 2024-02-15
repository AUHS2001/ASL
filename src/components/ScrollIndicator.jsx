import React, { useState, useEffect, useRef } from "react";
import { Box, Button, IconButton, Paper, SvgIcon } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ScrollIndicator = ({
  messageContainerRef,
  handleScrollDown,
  showScrollIndicator,
  setShowScrollIndicator,
}) => {


  return (
    <>
      {showScrollIndicator ? (
        <Box
          position="absolute"
          bottom={80}
          right={40}
          zIndex={1000}
          transition="bottom 0.3s ease"
        >
          <Paper sx={{ borderRadius: "50%" }}>
            <IconButton
              sx={{
                borderRadius: "50%",
                background: "white",
                border: "1px solid #dceaf8",
              }}
              variant="contained"
              onClick={() => handleScrollDown()}
            >
              <SvgIcon component={KeyboardArrowDownIcon} />
            </IconButton>
          </Paper>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default ScrollIndicator;
