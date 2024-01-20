import * as React from "react";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export default function HighlightTooltip({
  children,
  selectedText,
  id,
  loading,
  videoLookUp,
}) {
  return (
    <div>
      <HtmlTooltip
        title={
          selectedText.id === id && selectedText.highlightText ? (
            <>
              {" "}
              <Box sx={{ display: "flex",width:'200px',height:'200px',justifyContent:"center",alignItems:'center' }}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>
                  <div style={{display:'flex',flexDirection:"column",justifyContent:"center",alignItem:"center"}}>

                  <Chip style={{marginBottom:"5px",width:'200px'}} label={selectedText.highlightText} size="small" />

                    <video src={videoLookUp?.data} style={{width:"100%",height:"100%",}} controls autoPlay>

                    </video>
                  </div>
                  </>
                )}
              </Box>
            </>
          ) : (
            ""
          )
        }
      >
        {/* <Button> */}
        {children}
        {/* </Button> */}
      </HtmlTooltip>
    </div>
  );
}
