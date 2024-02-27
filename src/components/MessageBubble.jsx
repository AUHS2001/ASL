"use client"
import React, { useState } from "react";
import {
    Avatar,
    Box,
    IconButton,
    Typography,
    styled,
} from "@mui/material";

import HiglightedText from "./HiglightedText";
import { formatStringToTime } from "@/utils/formatTime";
import Feedback from "./Feedback";
import { useSelector } from "react-redux";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { chatReview } from "@/utils/apiCalling";
import CircularProgress from '@mui/material/CircularProgress';
import MyToolTip from "./Common/MyToolTip";
import { checkCase } from "@/utils/helper";
import { IMAGE_URL } from "@/constant/ApiUrl";


// Styled Box component for message container
const MessageContainer = styled(Box)(({ isownmessage, isTranslation }) => ({
    position: "relative",
    maxWidth: "60%",
    minWidth: isownmessage ? "85px" : "150px",
    width: "fit-content",
    padding: "0.3rem 0.5rem 1.5rem 1rem",
    borderRadius: "10px",
    marginLeft: isownmessage ? "auto" : 0,
    marginRight: isownmessage ? 0 : "auto",
    marginBottom: "7px",
    backgroundColor: isownmessage ? "#fafafa00" : isTranslation ? "#fafafa00" : "#d9fdd3",
    border: "1px solid #a9a9a9",
    color: isownmessage ? "#000" : "black",
    cursor: "pointer",
    boxShadow: 'none'
}));

const MessageBubble = ({ id, serachWord, messages, handleSelection, handleClick, handleWrongFeedback, selectedText, setSelectedText, setAnchorEl }) => {
    const selectedScenario = useSelector((state) => state?.aiType?.scenario);
    const [revisionMsg, setRevisionMsg] = useState("")
    const [loading, setloading] = useState(null)

    const handleRevision = async (index) => {
        setRevisionMsg("")
        const userMsg = messages?.[index]?.message;
        let aiMsg = "";

        for (let i = index; i >= 0; i--) {
            if (messages?.[i]?.role === "assistant") {
                aiMsg = messages?.[i]?.message;
                break;
            }
        }
        // console.log(userMsg, "<--Revision-->", aiMsg)
        if (aiMsg && userMsg) {
            setloading(index)
            const resp = await chatReview(aiMsg, userMsg)
            if (resp?.data?.data) {

                setRevisionMsg({ index, reviewMsg: resp.data.data })
                setloading(null)
            } else {
                setloading(null)

            }
        }
    }

    return (
        <>
            {messages.map((item, index) => (
                <>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        {item.role === "assistant" ?
                            <Avatar sizes="xs" src={IMAGE_URL+selectedScenario?.image_url} sx={{ mr: 1 }} /> : ""}

                        <Box sx={{ display: 'flex', flexDirection: "column", width: '100%' }}>
                            <MessageContainer
                                key={item.id}
                                elevation={3}
                                isownmessage={item?.role === "user"}
                                onClick={() => handleSelection(item._id)}
                            >
                                {item.role === "assistant" ?
                                    <Feedback
                                        title={"Message"}
                                        type={"message"}
                                        content={item.message}
                                        item={item}
                                        id={item._id}
                                        handleWrongFeedback={handleWrongFeedback}
                                    /> : ""}

                                <Typography
                                    component={"span"}
                                    id={"message" + item._id}
                                    style={{
                                        wordBreak: "break-word",
                                        overflowWrap: "anywhere",
                                        fontSize: "0.9rem",
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                    }}
                                    aria-describedby={id}
                                    variant="contained"
                                    onClick={handleClick}
                                >
                                    <HiglightedText
                                        content={item.message}
                                        setSelectedText={setSelectedText}
                                        selectedText={selectedText}
                                        item={item}
                                        serachWord={serachWord}
                                        handleClick={handleClick}
                                        setAnchorEl={setAnchorEl}
                                    />
                                </Typography>
                                <Box sx={{ display: 'flex' }}>
                                    {index === revisionMsg?.index ?
                                        <Typography
                                            component={"span"}
                                            sx={{
                                                wordBreak: "break-word",
                                                overflowWrap: "anywhere",
                                                fontSize: "0.8rem",
                                                display: "flex",
                                                flexWrap: "wrap",
                                                alignItems: "center",
                                                background: " #2e312f",
                                                borderRadius: "4px",
                                                color: "white",
                                                overflow: 'auto',
                                                padding: "3px 7px",
                                                userSelect: 'none'
                                            }}
                                        >{revisionMsg?.reviewMsg}</Typography>
                                        : ""}

                                    <Typography
                                        component={"span"}
                                        variant="caption"
                                        sx={{
                                            fontSize: "0.6rem",
                                            color: "black",
                                            position: "absolute",
                                            bottom: "3px",
                                            right: "8px",
                                            width: "100%",
                                            display: "flex",
                                            alignItems: 'center',
                                            justifyContent: "flex-end",
                                            userSelect: "none",
                                        }}
                                    >
                                        {loading === index && item.role === "user" ? <Box sx={{ display: 'flex', mr: 1 }}>
                                            <CircularProgress sx={{ height: "15px", width: '15px' }} size={"lg"} />
                                        </Box> : item.role === "user" && checkCase(item.message) === "Uppercase" ? <MyToolTip title={"Revision"}><IconButton size="small" onClick={() => handleRevision(index)}><SettingsBackupRestoreIcon sx={{ fontSize: "0.9rem" }} /></IconButton></MyToolTip> : ""}
                                        {formatStringToTime(item?.timestamp)}
                                    </Typography>
                                </Box>
                            </MessageContainer>

                            {/* ============= Show Only For Ai side ============= */}
                            {item.role === "assistant" ?
                                <MessageContainer
                                    key={item.id}
                                    elevation={3}
                                    isownmessage={item?.role === "user"}
                                    onClick={() => handleSelection(item._id)}
                                    isTranslation={true}
                                >
                                    <Box
                                        component={"div"}
                                        sx={{
                                            marginTop: "5px",
                                            fontSize: "0.7rem",
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Feedback
                                            title={"Translation"}
                                            type={"translation"}
                                            content={item.translation}
                                            item={item}
                                            id={item._id}
                                            handleWrongFeedback={handleWrongFeedback}
                                        />

                                        <Typography
                                            variant="caption"
                                            display="block"
                                            gutterBottom
                                        >
                                            {item.translation}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        component={"span"}
                                        variant="caption"
                                        sx={{
                                            fontSize: "0.6rem",
                                            color: "black",
                                            position: "absolute",
                                            bottom: "3px",
                                            right: "8px",
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            userSelect: "none",
                                        }}
                                    >
                                        {formatStringToTime(item?.timestamp)}
                                    </Typography>
                                </MessageContainer> : ""}
                        </Box>
                    </Box>
                </>
            ))}
        </>
    )
}

export default MessageBubble