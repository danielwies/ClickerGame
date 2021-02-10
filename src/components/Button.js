import React from "react";
import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: red;
  color: black;
  border: 0;
  outline: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  width: 155px;
  margin: 5px;
  transition: all 0.5s;
  &:hover {
    background: white;
    padding-right: 50px;
  }
`;

const Button = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>
    <div>{children}</div>
  </StyledButton>
);

export default Button;
