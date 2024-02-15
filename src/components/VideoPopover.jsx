"use client";
import * as React from "react";
import Popover from "@mui/material/Popover";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const VideoPopover = ({
    selectedText,
    loading,
    videoLookUp,
    open,id,
    anchorEl,
    handleClose
}) => {
    return (
        <>
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
                {selectedText?.highlightText ?
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
    )
}

export default VideoPopover;


const VideoBox = ({ videoSrc, selectedText, }) => {

    return (
        <>
            <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: "center", width: "200px", height: '220px' }}>
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
                            background: '#2e312f',
                            padding: '7px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            color:'white'
                        }}

                    >
                        <Typography variant="subtitle2" sx={{ fontWeight: '600' }}>Senetence:</Typography>
                        <Typography variant="caption">{selectedText}</Typography>
                    </Box>

                </Box>

            </Box>

        </>
    )
}