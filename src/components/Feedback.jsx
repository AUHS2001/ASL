import React, { useEffect, useState } from "react";
import { submitFeedback, unSubmitFeedback } from "@/utils/apiCalling";
import { copyContent } from "@/utils/helper";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import OfflinePinOutlinedIcon from "@mui/icons-material/OfflinePinOutlined";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import MyToolTip from "./Common/MyToolTip";

const Feedback = (props) => {
  const [isfeedback, setIsfeedback] = useState("");
  const { title, type, content, id, item, handleWrongFeedback } = props;

  useEffect(() => {
    if (type === "translation" && item?.translation_feedback) {
      setIsfeedback(item?.translation_feedback);
    } else if (type === "message" && item?.message_feedback) {
      setIsfeedback(item?.message_feedback);
    }
  }, []);

  const handleFeedBack = (id, feedbackType) => {
    if (feedbackType === "good" && isfeedback !== "good") {
      submitFeedback(type, id, "good");
      setIsfeedback("good");
    } else if (feedbackType === "acceptable" && isfeedback !== "acceptable") {
      setIsfeedback("acceptable");
      submitFeedback(type, id, "acceptable");
    } else if (feedbackType === "best" && isfeedback !== "best") {
      setIsfeedback("best");
      submitFeedback(type, id, "best");
    } else if (feedbackType === "wrong" && isfeedback !== "wrong") {
      // submitFeedback(type, id, "wrong");
      setIsfeedback("wrong");
      handleWrongFeedback(type, id);
    } else {
      unSubmitFeedback(type, id);
      setIsfeedback(false);
    }
  };
  return (
    <>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "2px 0px",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: "600",
            letterSpacing: 1,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{ display: "flex", justifyContent: "end" }}
          className={"feedback_actions"}
        >
          <FeedbackMenu
            handleFeedBack={handleFeedBack}
            isfeedback={isfeedback}
            id={id}
            content={content}
          />
        </Box>
      </Box>
    </>
  );
};

export default Feedback;

const FeedbackMenu = ({ handleFeedBack, isfeedback, id, content }) => {
  return (
    <>
      {/* <Paper> */}
      <Box>
        <MyToolTip title={"Copy"}>
          <IconButton size="small" onClick={() => copyContent(content)}>
            <ContentCopyIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </MyToolTip>

        <MyToolTip title={"Best"}>
          <IconButton size="small" onClick={() => handleFeedBack(id, "best")}>
            {isfeedback === "best" ? (
              <StarIcon sx={{ fontSize: "1rem" }} />
            ) : (
              <StarBorderOutlinedIcon sx={{ fontSize: "1rem" }} />
            )}
          </IconButton>
        </MyToolTip>

        <MyToolTip title={"Good"}>
          <IconButton size="small" onClick={() => handleFeedBack(id, "good")}>
            {isfeedback === "good" ? (
              <ThumbUpIcon sx={{ fontSize: "1rem" }} />
            ) : (
              <ThumbUpOffAltIcon sx={{ fontSize: "1rem" }} />
            )}
          </IconButton>
        </MyToolTip>

        <MyToolTip title={"Acceptable"}>
          <IconButton
            size="small"
            onClick={() => handleFeedBack(id, "acceptable")}
          >
            {isfeedback === "acceptable" ? (
              <OfflinePinIcon sx={{ fontSize: "1rem" }} />
            ) : (
              <OfflinePinOutlinedIcon sx={{ fontSize: "1rem" }} />
            )}
          </IconButton>
        </MyToolTip>

        <MyToolTip title={"Wrong"}>
          <IconButton size="small" onClick={() => handleFeedBack(id, "wrong")}>
            {isfeedback === "wrong" ? (
              <ThumbDownAltIcon sx={{ fontSize: "1rem" }} />
            ) : (
              <ThumbDownOffAltIcon sx={{ fontSize: "1rem" }} />
            )}
          </IconButton>
        </MyToolTip>
      </Box>
      {/* </Paper> */}
    </>
  );
};
