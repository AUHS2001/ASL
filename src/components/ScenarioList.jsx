"use client";
import { Box, Button, Card, Grid, Typography, styled } from "@mui/material";
import { H1, H4, Paragraph, Small } from "@/components/Common/Typography";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "./Common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setAIType } from "@/store/features/aiTypeSlice";
import { getScenarioList } from "@/utils/apiCalling";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
const ScenarioList = ({ setIsScenrioModal }) => {
  const [isLoading, setIsloading] = useState(true);
  const [aiTypeList, setAITypeList] = useState(null);
  const [preScenrio, setPreScenrio] = useState(
    JSON.parse(localStorage.getItem("currScenario"))
  );
  const selectedScenario = useSelector((state) => state?.aiType?.scenario);
  const dispatch = useDispatch();

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
        if (preScenrio && !selectedScenario) {
          dispatch(setAIType(preScenrio));
        } else if (!selectedScenario) {
          const currScenario = { ...resp?.data?.[0], ind: 0 };
          localStorage.setItem("currScenario", JSON.stringify(currScenario));
          dispatch(setAIType(currScenario));
        }
        setIsloading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handeScenario = (item, ind) => {
    dispatch(setAIType({ ...item, ind }));
    localStorage.setItem("currScenario", JSON.stringify({ ...item, ind }));
    if (setIsScenrioModal) {
      setIsScenrioModal(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            padding: "20px",
            wdith: "100%",
            height: "50.7vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      ) : (
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
      )}
    </>
  );
};

export default ScenarioList;
