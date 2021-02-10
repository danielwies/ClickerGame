import React from "react";
import styled from "styled-components";

export const StyledInput = styled.input`
  background: #f2f2f2;
  outline: 0;
  border: 0;
  width: 50%;
  margin: 15px 0px 15px 0px;
  padding: 15px 0px 15px 20px;
  font-size: 14px;
`;

const TextInput = ({ type, id, placeholder, onChange }) => (
  <StyledInput
    type={type}
    id={id}
    placeholder={placeholder}
    onChange={onChange}
    autoComplete="on"
  />
);

export default TextInput;
