import React, { useEffect, useState } from "react";
import {
  submitMsgFeedback,
  submitTranslationFeedback,
} from "@/utils/apiCalling";
import { copyContent } from "@/utils/helper";
import { Box, IconButton, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "../app/globals.css";

const Feedback = (props) => {
  const [isfeedback, setIsfeedback] = useState("");
  const { title, type, content, id, item } = props;

  useEffect(() => {
    if (type === "translation" && item?.translation_feedback) {
      setIsfeedback(item?.translation_feedback);
    } else if (type === "message" && item?.message_feedback) {
      setIsfeedback(item?.message_feedback);
    }
  }, []);

  const handleFeedBack = (id, feedback) => {
    if (type === "translation") {
      if (feedback === "good") {
        submitTranslationFeedback(id, "good");
        setIsfeedback("good");
      } else {
        submitTranslationFeedback(id, "bad");
        setIsfeedback("bad");
      }
    } else {
      if (feedback === "good") {
        submitMsgFeedback(id, "good");
        setIsfeedback("good");
      } else {
        submitMsgFeedback(id, "bad");
        setIsfeedback("bad");
      }
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
        {id !== 0 ? (
          <Box
            sx={{ display: "flex", justifyContent: "end" }}
            className={"feedback_actions"}
          >
            <IconButton size="small" onClick={() => copyContent(content)}>
              <ContentCopyIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
            <IconButton size="small" onClick={() => handleFeedBack(id, "good")}>
              {isfeedback === "good" ? (
                <ThumbUpIcon sx={{ fontSize: "1rem" }} />
              ) : (
                <ThumbUpOffAltIcon sx={{ fontSize: "1rem" }} />
              )}
            </IconButton>
            <IconButton size="small" onClick={() => handleFeedBack(id, "bad")}>
              {isfeedback === "bad" ? (
                <ThumbDownAltIcon sx={{ fontSize: "1rem" }} />
              ) : (
                <ThumbDownOffAltIcon sx={{ fontSize: "1rem" }} />
              )}
            </IconButton>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default Feedback;
