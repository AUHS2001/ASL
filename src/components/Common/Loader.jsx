import React from "react";
import "../../styles/loader.css";
import { Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <>
      {/* <div className="custom-loader"></div> */}
      <Backdrop
        open={open}
        sx={{ color: "#ffff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </>
  );
};

export default Loader;
