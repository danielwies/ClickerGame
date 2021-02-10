import React from "react";
import styled from "styled-components";

import backgroundImage from "../images/greybackground.png";

//Form des Icons Buttons
export const StyledIconButton = styled.button`
  background-image: url(${backgroundImage});
  position: relative;
  width: 25vw;
  min-height: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: ${(props) => (props.opacity === "true" ? "visible" : "none")};
  opacity: ${(props) => (props.opacity === "true" ? "1.0" : "0.5")};
  &:hover {
    border-color: red;
  }
`;
//Div für die Darstellung der Namen und des nextPrices
export const StyledDiv = styled.div`
  color: white;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  /* pointer-events: none; */
`;

//Styled image für die Darstellung des Icons vorne
export const IconImage = styled.img`
  width: 12%;
  min-width: 60px;
`;

const IconButton = ({ avail, text, icon, cost, amount, onClick }) => (
  <StyledIconButton
    opacity={avail.toString()}
    onClick={() => {
      onClick();
    }}
  >
    <IconImage src={require(`../images/icons/${icon}.png`)} />
    <StyledDiv>
      <span>{text}</span>
      <span>{cost}</span>
    </StyledDiv>
    <StyledDiv>{amount}</StyledDiv>
  </StyledIconButton>
);

export default IconButton;
