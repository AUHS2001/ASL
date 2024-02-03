"use client";
import { Box, Button, Card, Grid, Typography, styled } from "@mui/material";
import { H1, H4 } from "@/components/Common/Typography";
import Image from "next/image";
import Loader from "./Common/Loader";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ScenarioList from "./ScenarioList";
import ButtonLoader from "./Common/ButtonLoader";
import { useSelector } from "react-redux";
import { useState } from "react";

// ================ styled components ===================
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Heading = styled(H1)({
  fontSize: "2rem",
  fontWeight: "500",
  textAlign: "center",
  marginBottom: "32px",
});

const GridContent = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  textAlign: "center",
  transition: "all 0.3s ease",
  //   padding: "54px !important",
  // "&:hover": { boxShadow: themeShadows[12] },
  [theme.breakpoints.down("sm")]: { padding: "16px !important" },
}));

// =========================================================

const ChatAiType = () => {
  const selectedScenario = useSelector((state) => state?.aiType?.scenario);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const imgList = [
    "/images/bot.png",
    "/images/waiter.png",
    "/images/doctor.png",
  ];

  const handelChatStart = () => {
    setIsLoading(true);
    // e.preventDefault();
    if (selectedScenario) {
      router.push("/chat");
      setIsLoading(false);
    } else {
      toast.error("Select AI Assistant");
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Box mb={4}>
        <Heading>Select Your AI Assistant</Heading>
        <Grid container spacing={2}>
          <Grid item md={8} sm={6} xs={12}>
            <GridContent
              elevation={6}
              sx={{ padding: "20px", wdith: "100%", height: "100%" }}
            >
              <ScenarioList />
            </GridContent>
          </Grid>

          <Grid item md={4} sm={6} xs={12}>
            <GridContent
              elevation={6}
              sx={{
                padding: "20px",
                wdith: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selectedScenario ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={
                        selectedScenario?.ind
                          ? imgList?.[selectedScenario?.ind]
                          : imgList?.[0]
                      }
                      width={150}
                      height={150}
                      alt={"scenario-logo"}
                    />
                    <Box sx={{ maxWidth: "200px" }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <PersonPinIcon sx={{ fill: "#008de3" }} />{" "}
                        <H4 sx={{ textAlign: "left" }}>
                          {selectedScenario?.name}
                        </H4>
                      </Box>
                      <Typography
                        sx={{ textAlign: "left", ml: 3 }}
                        variant="subtitle2"
                      >
                        {selectedScenario?.description}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      my: 4,
                    }}
                  >
                    <ButtonLoader
                      variant="outlined"
                      color="warning"
                      onClick={() => handelChatStart()}
                      title={"Continue"}
                      size="medium"
                      loading={isLoading}
                    />
                  </Box>
                </>
              ) : (
                <Loader />
              )}
            </GridContent>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ChatAiType;
