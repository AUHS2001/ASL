"use client";
import React from "react";
import { Card, lighten, styled } from "@mui/material";
import { H4, Paragraph } from "./Common/Typography";
import { useSelector } from "react-redux";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: "24px",
  boxShadow: "none",
  marginBottom: "44px",
  background: lighten(theme.palette.primary.main, 0.85),
}));

const MessageBar = () => {
    const selectedScenario = useSelector((state) => state?.aiType?.scenario);

  return (
    <>
      <StyledCard>
        <H4 color="primary.main">
          {selectedScenario?.description}
        </H4>

        <Paragraph color="text.secondary" >
        {selectedScenario?.scene}
        </Paragraph>
      </StyledCard>
    </>
  );
};

export default MessageBar;
