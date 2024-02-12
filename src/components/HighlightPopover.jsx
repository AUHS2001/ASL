"use client";
import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Chip, Typography } from "@mui/material";

export default function HighlightPopover({
  children,
  selectedText,
  // id,
  loading,
  videoLookUp,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    console.log(selectedText.highlightText, "selectedText.highlightText");
    if (selectedText.highlightText) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
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
        {selectedText.highlightText ? <>
          <Box
            sx={{
              display: "flex",
              width: '350px',
              height:'200px',
              minHeight: '100px',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : videoLookUp?.data ? (
              <video
                muted={false}
                src={videoLookUp?.data}
                style={{ width: "100%", height: "100%" }}
                controls
                autoPlay
              ></video>) : ""}
          </Box>
        </>
          : ""}
      </Popover>
    </>
  );
}

// return (
//   <div>
//     <span aria-describedby={id} variant="contained" onClick={handleClick}>
//       {children}
//     </span>
//     <Popover
//       id={id}
//       open={open}
//       anchorEl={anchorEl}
//       style={{ marginTop: "10px" }}
//       onClose={handleClose}
//       anchorOrigin={{
//         vertical: "bottom",
//         horizontal: "left",
//       }}
//     >
//       {selectedText.highlightText ? (
//         <>
//           <Box
//             sx={{
//               display: "flex",
//               minWidth:'250px',
//               width:'auto',
//               minHeight: '100px',
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             {loading ? (
//               <CircularProgress />
//             ) : (
//               <>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     // width: "250px",
//                     // height: `${videoLookUp?.data ? "250px" : "auto"}`,
//                     // minHeight: '100px',
//                     // justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >

//                   <Box
//                   sx={{
//                     display: "flex",
//                     width: "350px",
//                     height: `${videoLookUp?.data ? "250px" : "auto"}`,
//                     minHeight: '100px',
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   {videoLookUp?.data ? (
//                     <video
//                       muted={false}
//                       src={videoLookUp?.data}
//                       style={{ width: "100%", height: "100%" }}
//                       controls
//                       autoPlay
//                     ></video>

//                   ) : (
//                     <div
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center"
//                       }}
//                     >
//                       <Typography component={"span"} style={{ textAlign: "center" }} fontSize={"0.9rem"}>
//                         Video not Found !
//                       </Typography>
//                     </div>
//                   )}
//                   </Box>

//                   <div
//                     style={{
//                       margin: "5px auto",
//                       width: "50%",
//                       height: 'auto',
//                       background: '#ede9e9',
//                       padding: '4px',
//                       borderRadius: '4px',
//                       fontSize: '0.8rem'
//                     }}

//                   >
//                     <Typography variant="caption">{selectedText.highlightText}</Typography>
//                   </div>

//                 </Box>
//               </>
//             )}
//           </Box>
//         </>
//       ) : (
//         ""
//       )}{" "}
//     </Popover>
//   </div>
// );
