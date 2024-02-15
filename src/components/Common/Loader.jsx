import { Box, CircularProgress, styled } from "@mui/material";
import Image from "next/image";
import InsightsIcon from "@mui/icons-material/Insights";


// styled component
const StyledLoading = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  "& img": {
    // width: "auto",
    // height: "25px",
    
  },
  "& .circleProgress": {
    left: -7,
    right: 0,
    position: "absolute",
    top: "calc(50% - 25px)",
  },
});

const Loader = () => {
  return (
    <StyledLoading>
      <Box position="relative">
        {/* <InsightsIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, fill: "#40bd5c" }}
          /> */}
        <CircularProgress className="circleProgress" />
      </Box>
    </StyledLoading>
  );
};

export default Loader;
