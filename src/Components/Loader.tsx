import React from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const Loader = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default Loader;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
  width: 100%;
`;
