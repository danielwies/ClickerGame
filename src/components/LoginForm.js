import React, { useState } from "react";
import styled from "styled-components";

import Button from "./Button";
import TextInput from "./TextInput";
import Useralert from "./Useralert";

export const StyledForm = styled.form`
  h1 {
    color: #fff;
  }
  h2 {
    color: #fff;
  }
  margin: 40px 0 40px 0px;
  Useralert {
    color: white;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const LoginForm = ({ onRegisterClick, onLoginClick, alertType, infoAlert }) => {
  const [password, setPw] = useState("MilkBoy94");
  const [username, setUsername] = useState("MilkBoy94");

  return (
    <StyledForm>
      <h1>Play now!</h1>
      <TextInput
        type="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
      />
      <TextInput
        type="password"
        value={password}
        onChange={(event) => setPw(event.target.value)}
        placeholder="Password"
      />
      <ButtonContainer>
        <Button
          onClick={(event) => {
            event.preventDefault();
            onRegisterClick(username, password);
          }}
        >
          Register
        </Button>
        <Button
          onClick={(event) => {
            event.preventDefault();
            onLoginClick(username, password);
          }}
        >
          Login
        </Button>
      </ButtonContainer>
      <Useralert type={alertType} info={infoAlert} />
    </StyledForm>
  );
};

export default LoginForm;
