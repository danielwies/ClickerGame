import React from "react";
import styled, { keyframes } from "styled-components";

import backgroundImage from "../images/virusimage.png";

const spin = keyframes`
  from {-webkit-transform: rotate(0deg);}
  to{transform: rotate(360deg);}
  duration: infinite;
`;

export const StyledDiv = styled.div`
  height: 250px;
`;

export const StyledHitButton = styled.button`
  background: url(${backgroundImage});
  border: 0;
  outline: none;
  background-repeat: no-repeat;
  background-size: contain;
  width: 250px;
  height: 250px;
  animation: ${spin} 15s linear infinite;

  /* Click-Animation */
  &:active {
    width: 245px;
    height: 245px;
  }

  &:active:after {
    width: 250px;
    height: 250px;
  }
`;

const HitButton = ({ onClick }) => (
  <StyledDiv>
    <StyledHitButton onClick={onClick} />
  </StyledDiv>
);

export default HitButton;
