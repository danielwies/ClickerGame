import React, { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import styled from "styled-components";

import clickersBackground from "../images/blackbackground.png";
import IconButton from "../components/IconButton";

export const UpgradesContainer = styled.div`
  width: 25vw;
  height: 105vh;
  background-image: url(${clickersBackground});
  left: 0vw;
  top: 5vh;
  position: fixed;
`;

export const StyledHeadlines = styled.h2`
  color: white;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: space-between;
`;

const UpgradeArea = () => {
  const upgradeUrl = "http://server.bykovski.de:8000/upgrades/";

  const [curUpgrades, setCurUpgrades] = useState({});
  const [availableUpgs, setAvailableUpgs] = useState({});
  const token = useStoreState((state) => state.user.token);
  const curClicks = useStoreState((state) => state.curClicks.clicks);

  useEffect(() => {
    const getCurrentUpgrades = async () => {
      const urlAllUpgs = upgradeUrl + "current-user";
      const responseAllUpgs = await fetch(urlAllUpgs, {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      let data = await responseAllUpgs.json();
      setCurUpgrades(data);
    };

    const getAvailableUpgrades = async () => {
      const url = upgradeUrl + "available";
      const response = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      let availableUpgrades = await response.json();
      setAvailableUpgs(availableUpgrades);
    };

    getCurrentUpgrades();
    getAvailableUpgrades();
  }, [curClicks, token]);

  const findCurUpgs = (id) => {
    if (curUpgrades && typeof curUpgrades.length !== "undefined") {
      if (curUpgrades.length === 0) {
        return;
      }
      return curUpgrades.find((curUpgs) => {
        return curUpgs.upgrade.id === id;
      });
    }
  };

  const findAvailableUpgs = (id) => {
    if (availableUpgs && typeof availableUpgs.length !== "undefined") {
      if (availableUpgs.length === 0) {
        return;
      }
      return availableUpgs.find((availUpgs) => {
        return availUpgs.id === id;
      });
    }
  };

  const upgrades = [
    { text: "Erbrechen", icon: "erbrechen", id: "1" },
    { text: "Husten", icon: "husten", id: "2" },
    { text: "Niesen", icon: "niesen", id: "3" },
    { text: "Vögel", icon: "vögel", id: "4" },
    { text: "Ratten", icon: "ratten", id: "5" },
    { text: "Moskitos", icon: "moskitos", id: "6" },
    { text: "Luft", icon: "luft", id: "7" },
    { text: "Wasser", icon: "wasser", id: "8" },
  ];

  async function buyUpgrade(id) {
    const url = upgradeUrl + id + "/buy";
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

  let availButtons = null;
  let curButtons = null;

  if (availableUpgs) {
    availButtons = [];
    for (const upgrade of upgrades) {
      const availUpg = findAvailableUpgs(upgrade.id);
      if (!availUpg) {
        continue;
      }

      availButtons.push(
        <IconButton
          avail={
            availUpg.cost ? (curClicks > availUpg.cost ? true : false) : false
          }
          key={upgrade.id}
          text={upgrade.text}
          icon={upgrade.icon}
          id={upgrade.id}
          cost={availUpg.cost ? formatNumber(availUpg.cost) : "Loading..."}
          amount={"Inaktiv"}
          onClick={() => buyUpgrade(upgrade.id)}
        />
      );
    }
  }

  if (curUpgrades) {
    curButtons = [];
    for (const upgrade of upgrades) {
      const curUpg = findCurUpgs(upgrade.id);
      if (!curUpg) {
        continue;
      }

      curButtons.push(
        <IconButton
          avail={false}
          key={upgrade.id}
          text={upgrade.text}
          icon={upgrade.icon}
          id={upgrade.id}
          cost={
            curUpg.upgrade.cost
              ? formatNumber(curUpg.upgrade.cost)
              : "Loading..."
          }
          amount={"Aktiv"}
          onClick={() => {}}
        />
      );
    }
  }

  return (
    <UpgradesContainer>
      <StyledHeadlines>Übertragung</StyledHeadlines>
      {curButtons}
      {availButtons}
    </UpgradesContainer>
  );
};

export default UpgradeArea;
