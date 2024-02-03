import React from "react";
import Tooltip from "@mui/material/Tooltip";

export default function MyToolTip({ children, title, placement = "bottom",sx }) {
  return (
    <Tooltip title={title} placement={placement} sx={sx} variant="outlined">
      {children}
    </Tooltip>
  );
}
