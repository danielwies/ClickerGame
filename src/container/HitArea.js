import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";

import HitButton from "../components/HitButton";

export const StyledDiv = styled.div`
  margin: 40px 0 40px 0px;
  font-size: 26px;
  left: 25vw;
  top: 10%;
  position: absolute;
  text-align: center;
  width: 50vw;
  height: 100vh;
`;

const HitArea = () => {
  const [cpc, setCPC] = useState(0);
  const [clickSocket, setClickSocket] = useState();
  const token = useStoreState((state) => state.user.token);
  const setClicks = useStoreActions(
    (actions) => actions.curClicks.setCurClicks
  );
  const clicks = useStoreState((state) => state.curClicks.clicks);
  const setCPS = useStoreActions((actions) => actions.curCPS.setCurCPS);
  const cps = useStoreState((state) => state.curCPS.cps);
  const url = `ws://server.bykovski.de:8000/game`;

  // token wird aus globalen State geholt
  // wird erst ausgeführt wenn das Rendern der Komponente abgeschlossen ist
  useEffect(() => {
    const mouseClicksWS = new WebSocket(url + `/click?token=${token}`);
    // (Listener) bei einer Nachricht vom Server erhält man die gemachten Points
    mouseClicksWS.onmessage = (perClick) => {
      let data = JSON.parse(perClick.data);
      setCPC(data.points);
    };
    // Socket wird in State abgespeichert
    setClickSocket(mouseClicksWS);
    return () => {
      mouseClicksWS.close();
    };
  }, [token]);

  // wird erst ausgeführt wenn das Rendern der Komponente abgeschlossen ist
  useEffect(() => {
    const getClicksWS = new WebSocket(url + `/balance?token=${token}`);
    // (Listener) bei einer Nachricht vom Server erhält man die gemachten Points
    getClicksWS.onmessage = (actClicks) => {
      let data = JSON.parse(actClicks.data);
      setClicks(data.points);
    };
    return () => {
      getClicksWS.close();
    };
  }, [token]);

  // wird erst ausgeführt wenn das Rendern der Komponente abgeschlossen ist
  useEffect(() => {
    const genClicksWS = new WebSocket(url + `/generators?token=${token}`);
    // (Listener) bei einer Nachricht vom Server erhält man die gemachten Points
    genClicksWS.onmessage = (genClicks) => {
      let data = JSON.parse(genClicks.data);
      setCPS(data.points);
    };
    return () => {
      genClicksWS.close();
    };
  }, [token]);

  //Methode um den Hit Click zu handeln und schickt click an den WebSocket
  const onHitClick = async (event) => {
    clickSocket.send("click");
  };

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  return (
    <StyledDiv>
      <HitButton onClick={onHitClick} />
      <p>Viren insgesamt: {clicks ? formatNumber(clicks) : "0"}</p>
      <p>Viren pro Sekunde: {cps ? formatNumber(cps) : "0"}</p>
      <p>Viren pro Click: {cpc ? formatNumber(cpc) : "Loading..."}</p>
    </StyledDiv>
  );
};

export default HitArea;
