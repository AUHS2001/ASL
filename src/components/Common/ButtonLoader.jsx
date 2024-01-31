import React from "react";
import { Button, CircularProgress } from "@mui/material";

const ButtonLoader = ({ onClick, title, loading, ...props }) => {
  return (
    <Button onClick={() => onClick && onClick()} disabled={loading} {...props}>
      {loading ? <CircularProgress size={20} /> : title}
    </Button>
  );
};

export default ButtonLoader;
