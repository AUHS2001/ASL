import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Chip } from "@mui/material";

export default function HighlightPopover({
  children,
  selectedText,
  // id,
  loading,
  videoLookUp,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if (selectedText) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <span aria-describedby={id} variant="contained" onClick={handleClick}>
        {children}
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        style={{ marginTop: "10px" }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {selectedText.highlightText ? (
          <>
            <Box
              sx={{
                display: "flex",
                width: "250px",
                height: "250px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItem: "center",
                    }}
                  >
                    <Chip
                      style={{ marginBottom: "5px", width: "250px" }}
                      label={selectedText.highlightText}
                      size="small"
                    />

                    <video
                      src={videoLookUp?.data}
                      style={{ width: "100%", height: "100%" }}
                      controls
                      autoPlay
                    ></video>
                  </div>
                </>
              )}
            </Box>
          </>
        ) : (
          ""
        )}{" "}
      </Popover>
    </div>
  );
}
