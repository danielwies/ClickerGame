import React, { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import styled from "styled-components";

import clickersBackground from "../images/blackbackground.png";
import IconButton from "../components/IconButton";

export const GeneratorsContainer = styled.div`
  width: 25vw;
  height: 105vh;
  background-image: url(${clickersBackground});
  left: 75vw;
  top: 5vh;
  position: fixed;
`;

export const StyledHeadlines = styled.h2`
  color: white;
  left: 0vw;
  top: 0vh;
  display: flex;
  justify-content: space-between;
`;

const GeneratorArea = () => {
  const generatorUrl = "http://server.bykovski.de:8000/generators/";
  const token = useStoreState((state) => state.user.token);
  const [curGenerators, setCurGenerators] = useState({});
  const [availableGens, setAvailableGens] = useState({});
  const [curNextGenPrices, setNextGenPrices] = useState({});
  const [curGensLoading, setCurGensLoading] = useState(true);
  const [availGensLoading, setAvailGensLoading] = useState(true);
  const curClicks = useStoreState((state) => state.curClicks.clicks);

  useEffect(() => {
    const getCurrentGenerators = async () => {
      const urlAllGens = generatorUrl + "current-user";
      const responseAllGens = await fetch(urlAllGens, {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      let data = await responseAllGens.json();
      setCurGenerators(data);
      setCurGensLoading(false);
    };

    const getAvailableGenerators = async () => {
      const url = generatorUrl + "available";
      const response = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      let availableGenerators = await response.json();
      setAvailableGens(availableGenerators);
      setAvailGensLoading(false);
    };

    const getNextGenPrices = async () => {
      if (availableGens && !availGensLoading) {
        for (const generator of availableGens) {
          const urlNextPrice = generatorUrl + generator.id + "/next-price";
          const responseNextPrice = await fetch(urlNextPrice, {
            method: "GET",
            headers: new Headers({
              Authorization: `Bearer ${token}`,
            }),
          });

          const nextPrice = await responseNextPrice.json();
          setNextGenPrices((prevState) => ({
            curNextGenPrices: {
              ...prevState.curNextGenPrices,
              [generator.id]: nextPrice,
            },
          }));
        }
      }
    };
    getAvailableGenerators();
    getNextGenPrices();
    getCurrentGenerators();
  }, [curClicks]);

  const findUserGen = (id) => {
    if (curGenerators && !curGensLoading) {
      if (curGenerators.length === 0) {
        return;
      }
      return curGenerators.find((userGen) => {
        return userGen.generator.id === id;
      });
    }
  };

  const findAvailableGen = (id) => {
    if (availableGens && !availGensLoading) {
      if (availableGens.length === 0) {
        return;
      }
      return availableGens.find((availGen) => {
        return availGen.id === id;
      });
    }
  };

  const generators = [
    { text: "Schlafstörung", icon: "schlafstörung", id: "1" },
    { text: "Bauchschmerzen", icon: "bauchschmerzen", id: "2" },
    { text: "Paranoia", icon: "paranoia", id: "3" },
    { text: "Ausschlag", icon: "ausschlag", id: "4" },
    { text: "Herzrasen", icon: "herzrasen", id: "5" },
    { text: "Abzesse", icon: "abzesse", id: "6" },
    { text: "Tumor", icon: "tumor", id: "12" },
    { text: "Laehmung", icon: "lähmung", id: "7" },
    { text: "Lungenentzündung", icon: "lungenentzündung", id: "8" },
    { text: "Aneurysma", icon: "aneurysma", id: "9" },
    { text: "Lungenfibrose", icon: "lungenfibrose", id: "10" },
    { text: "Herzversagen", icon: "herzversagen", id: "11" },
  ];

  async function buyGenerator(id) {
    const url = generatorUrl + id + "/buy";
    await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  let buttons = null;
  if (availableGens) {
    buttons = [];
    for (const generator of generators) {
      const curGen = findUserGen(generator.id);
      const availGen = findAvailableGen(generator.id);
      if (!availGen) {
        continue;
      }
      buttons.push(
        <IconButton
          avail={
            curNextGenPrices.curNextGenPrices
              ? curClicks > curNextGenPrices.curNextGenPrices[availGen.id]
                ? true
                : false
              : false
          }
          key={generator.id}
          text={generator.text}
          icon={generator.icon}
          id={generator.id}
          cost={
            curNextGenPrices.curNextGenPrices
              ? curNextGenPrices.curNextGenPrices[availGen.id]
                ? formatNumber(curNextGenPrices.curNextGenPrices[availGen.id])
                : "Loading..."
              : "Loading..."
          }
          amount={typeof curGen === "undefined" ? 0 : curGen.amount}
          onClick={() => buyGenerator(generator.id)}
        />
      );
    }
  }

  return (
    <GeneratorsContainer>
      <StyledHeadlines>Symptome</StyledHeadlines>
      {buttons}
    </GeneratorsContainer>
  );
};

export default GeneratorArea;
