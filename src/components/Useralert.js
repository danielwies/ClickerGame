import React from "react";
import styled from "styled-components";

export const StyledUseralert = styled.div`
  display: ${(props) => (props.display === "true" ? "block" : "none")};
  background-color: red;
  border: none;
  color: white;
  margin-left: 50px;
  margin-right: 50px;
  padding: 1px;
`;

const Useralert = ({ type, info }) => (
  <StyledUseralert type={type.toString()} display={type.toString()} info={info}>
    <p>{info}</p>
  </StyledUseralert>
);

export default Useralert;
