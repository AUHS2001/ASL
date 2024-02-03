"use client";
import React from "react";
import { Card, lighten, styled } from "@mui/material";
import { H4, Paragraph } from "../components/Common/Typography";
import { useSelector } from "react-redux";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: "24px",
  boxShadow: "none",
  marginBottom: "44px",
  background: lighten(theme.palette.primary.main, 0.85),
}));

const ScenarioBar = () => {
    const selectedScenario = useSelector((state) => state?.aiType?.scenario);

  return (
    <>
      <StyledCard>
        <H4 color="primary.main">
          {selectedScenario?.description}
        </H4>

        <Paragraph color="text.secondary" maxWidth={770}>
        {selectedScenario?.scene}
        </Paragraph>
      </StyledCard>
    </>
  );
};

export default ScenarioBar;
