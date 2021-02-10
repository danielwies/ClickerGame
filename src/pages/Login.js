import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import styled from "styled-components";

import LoginForm from "../components/LoginForm";
import { sendRegister, sendLogin } from "../client/ServerClient";
import backgroundImage from "../images/virusbackground.png";

export const Container = styled.div`
  background-image: url(${backgroundImage});
  width: 100vw;
  height: 100vh;
  background-size: cover;
  left: 0px;
  top: 0px;
  position: fixed;
`;

export const FormContainer = styled.div`
  position: absolute;
  width: 600px;
  height: 400px;
  background-color: #252525de;
  left: 50%;
  top: 50%;
  margin-top: -200px;
  margin-left: -300px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const Login = () => {
  //Lokale States
  const [alertType, setAlertType] = useState(false);
  const [infoAlert, setInfoAlert] = useState("Info");

  //Globale States
  const setToken = useStoreActions((actions) => actions.user.setToken);
  const setUsernameGlobal = useStoreActions(
    (actions) => actions.curUsername.setCurUsername
  );

  //Variablen und Konstanten
  let actJWT = "";
  let history = useHistory();
  const StatusCodeSuccessful = 200;

  const onLoginClick = async (username, password) => {
    const response = await sendLogin(username, password);
    if (response.status === StatusCodeSuccessful) {
      setAlertType(false);
      setInfoAlert("Login successful");
      actJWT = await response.json();
      actJWT = actJWT.access_token;
      setToken(actJWT); // Setzen des Usertokens
      setUsernameGlobal(username);
      setTimeout(() => {
        history.push("/game");
      }, 1000);
    } else {
      setAlertType(true);
      setInfoAlert("Login failed");
    }
  };

  const onRegisterClick = async (username, password) => {
    const response = await sendRegister(username, password);
    if (response.status === StatusCodeSuccessful) {
      setAlertType(false);
      setInfoAlert("Register successful");
      setTimeout(() => {
        onLoginClick(username, password);
      }, 1000);
    } else {
      setAlertType(true);
      setInfoAlert("Register failed");
    }
  };

  return (
    <Container>
      <FormContainer>
        <LoginForm
          onRegisterClick={onRegisterClick}
          onLoginClick={onLoginClick}
          alertType={alertType}
          infoAlert={infoAlert}
        />
      </FormContainer>
    </Container>
  );
};

export default Login;
