"use client";
import { Box, Button, Card, Grid, Typography, styled } from "@mui/material";
import { H1, H4, Paragraph, Small } from "@/components/Common/Typography";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "./Common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setAIType } from "@/store/features/aiTypeSlice";
import { getScenarioList } from "@/utils/apiCalling";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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

const StyledCard = styled(Card)(({ theme, index, aiScenario }) => ({
  margin: "8px",
  display: "flex",
  cursor: "pointer",
  padding: "15px 20px",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "10px",
  border: `1px solid ${
    index === aiScenario.ind ? theme.palette.primary.main : "transparent"
  }`,
  color: index === aiScenario.ind && theme.palette.primary.main,

  transition: "all 200ms ease-in",
  "& .icon": {
    fontSize: "40px",
    marginBottom: "10px",
    transition: "all 200ms ease-in",
    color: index === aiScenario.ind && theme.palette.primary.main,
  },
}));

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
  const [isLoading, setIsloading] = useState(true);
  const [aiTypeList, setAITypeList] = useState(null);
  const selectedScenario = useSelector((state) => state?.aiType?.scenario);
  const dispatch = useDispatch();
  const router = useRouter();

  const imgList = [
    "/images/bot.png",
    "/images/waiter.png",
    "/images/doctor.png",
  ];

  useEffect(() => {
    getAiScenarios();
  }, []);

  const getAiScenarios = async () => {
    try {
      const resp = await getScenarioList();
      console.log(resp.data, "res");
      if (resp.data) {
        setAITypeList(resp.data);
        dispatch(setAIType({ ...resp?.data?.[0], ind: 0 }));
        setIsloading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handeScenario = (item, ind) => {
    dispatch(setAIType({ ...item, ind }));
  };

  const handelChatStart = (e) => {
    e.preventDefault();
    if (selectedScenario) {
      router.push("/chat");
    } else {
      toast.error("Select AI Assistant");
    }
  };

  return (
    <Container>
      <Box mb={4}>
        <Heading>Select Your AI Assistant</Heading>
        {!isLoading ? (
          <Grid container spacing={2}>
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
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={(e) => handelChatStart(e)}
                  >
                    Continue
                  </Button>
                </Box>
              </GridContent>
            </Grid>
            <Grid item md={8} sm={6} xs={12}>
              <GridContent
                elevation={6}
                sx={{ padding: "20px", wdith: "100%", height: "100%" }}
              >
                <Box
                  m={-1}
                  flexWrap="wrap"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "white",
                    width: "100%",
                    height: "100%",
                    minHeight: "60vh",
                    maxHeight: "60vh",
                    overflow: "auto",
                  }}
                >
                  {aiTypeList?.map((item, ind) => (
                    <StyledCard
                      index={ind}
                      aiScenario={selectedScenario}
                      key={"scenario" + ind}
                      onClick={() => handeScenario(item, ind)}
                    >
                      <Image
                        src={imgList?.[ind]}
                        width={100}
                        height={100}
                        className="icon"
                      />
                      <H4>{item.name}</H4>
                    </StyledCard>
                  ))}
                </Box>
              </GridContent>
            </Grid>
          </Grid>
        ) : (
          <Box
            sx={{
              padding: "20px",
              wdith: "100%",
              height: "64vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ChatAiType;
