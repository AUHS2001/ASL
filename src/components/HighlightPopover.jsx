"use client";
import * as React from "react";
import Popover from "@mui/material/Popover";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {Typography } from "@mui/material";

export default function HighlightPopover({
  children,
  selectedText,
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
  console.log("videolookup", videoLookUp)

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
        {selectedText.highlightText ?
          <>
            <Box
              sx={{
                display: "flex",
                minWidth: '350px',
                height: 'auto',
                minHeight: '100px',
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <CircularProgress />
              ) :
                <VideoBox
                  videoSrc={videoLookUp?.video_url}
                  selectedText={videoLookUp?.translation}
                   />
              }
            </Box>
          </>
          : ""}
      </Popover >
    </>
  );
}

const VideoBox = ({ videoSrc, selectedText, }) => {

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: "center", width: "200px", height: '200px' }}>
          {videoSrc ?
            <video
              muted={false}
              src={videoSrc}
              style={{ width: "100%", height: "100%" }}
              controls
              autoPlay
            >

            </video> :
            <Typography component={"span"} style={{ textAlign: "center", alignSelf: 'center', margin: "0px auto" }} fontSize={"0.9rem"}>
              Video not Found !
            </Typography>}
        </Box>


        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              margin: '5px',
              width: "250px",
              overflow: 'auto',
              minHeight: '200px',
              maxHeight: '200px',
              background: '#ede9e9',
              padding: '4px',
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}

          >
            <Typography variant="subtitle2" sx={{ fontWeight: '600' }}>Senetence:</Typography>
            <Typography variant="caption">{selectedText}</Typography>
          </Box>
          {/* <Box sx={{
            margin: '5px',
            width: '250px', maxHeight: '100px', overflow: 'auto', background: '#ede9e9', borderRadius: '4px',
            fontSize: '0.8rem', padding: '4px'
          }}>
            <Feedback
              title={"Translation:"}
              type={"translation"}
              content={item.translation}
              item={item}
              id={item._id}
              handleWrongFeedback={handleWrongFeedback}
            />

            <Typography variant="subtitle2" sx={{ fontWeight: '600' }}>Translation:</Typography>

            <Typography variant="caption">{selectedText.highlightText}</Typography>
          </Box> */}
        </Box>

      </Box>

    </>
  )
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
