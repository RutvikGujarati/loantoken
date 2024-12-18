import React, { useContext } from "react";
import "./IncrementPriceTarget.css";
import { useLocation } from "react-router-dom";
import { themeContext } from "../../App";
import {
  hex,
  loan_mainnet,
  PDXN_Address,
  PFENIX_Address,
  PLS_ADDRESS,
  PSD_ADDRESS,

  ptgc,
  rex,
  texan,
  bnbDAV,
  watt,

  MATIC_contract,
  mDXN,
  mFENIX,
  mXEN,
  Nine_MM,
  NINE_INCH,
  PTS,
  TONI,
  SPARK,
  PRAT,
  BNB,
  BXEN,
  BDXN,
  BFENIX
  
} from "../../Utils/ADDRESSES/Addresses";
import "../../Utils/Theme.css";
import TokenStats from "./TokenStates";

const tokenConfig = {
  "/XEN": {
    tokenName: "PSD",
    tokenAddress: PSD_ADDRESS,
    supplyLabel: "DAVPLS SUPPLY",
  },
  "/NineMM": {
    tokenName: "9MM",
    tokenAddress: Nine_MM,
    supplyLabel: "DAVTRADE SUPPLY",
  },
  "/Nine_Inch": {
    tokenName: "9INCH",
    tokenAddress: NINE_INCH,
    supplyLabel: "DAVTRADE SUPPLY",
  },
  "/PTS": {
    tokenName: "PTS",
    tokenAddress: PTS,
    supplyLabel: "DAVTRADE SUPPLY",
  },
  "/TONI": {
    tokenName: "TONI",
    tokenAddress: TONI,
    supplyLabel: "DAVTRADE SUPPLY",
  },
  "/SPARK": {
    tokenName: "SPARK",
    tokenAddress: SPARK,
    supplyLabel: "DAVTRADE SUPPLY",
  },
  "/PRATE": {
    tokenName: "PRATE",
    tokenAddress: PRAT,
    supplyLabel: "DAVTRADE SUPPLY",
  },
  "/BNB": {
    tokenName: "BNB",
    tokenAddress:BNB ,
    supplyLabel: "DAVBNB SUPPLY",
  },
  "/bXEN": {
    tokenName: "BXEN",
    tokenAddress: BXEN,
    supplyLabel: "DAVBNB SUPPLY",
  },
  "/bDXN": {
    tokenName: "BDXN",
    tokenAddress: BDXN,
    supplyLabel: "DAVBNB SUPPLY",
  },
  "/bFENIX": {
    tokenName: "BFENIX",
    tokenAddress: BFENIX,
    supplyLabel: "DAVBNB SUPPLY",
  },
  "/MATIC": {
    tokenName: "MATIC",
    tokenAddress: MATIC_contract,
    supplyLabel: "DAVMATIC SUPPLY",
  },
  "/mDXN": {
    tokenName: "mDXN",
    tokenAddress: mDXN,
    supplyLabel: "DAVMATIC SUPPLY",
  },
  "/mXEN": {
    tokenName: "mXEN",
    tokenAddress: mXEN,
    supplyLabel: "DAVMATIC SUPPLY",
  },
  "/mFENIX": {
    tokenName: "mFENIX",
    tokenAddress: mFENIX,
    supplyLabel: "DAVMATIC SUPPLY",
  },

  "/PDXN": {
    tokenName: "PDXN",
    tokenAddress: PDXN_Address,
    supplyLabel: "DAVPLS SUPPLY",
  },
  "/PFENIX": {
    tokenName: "PFENIX",
    tokenAddress: PFENIX_Address,
    supplyLabel: "DAVPLS SUPPLY",
  },
  "/HEX": {
    tokenName: "HEX",
    tokenAddress: hex,
    supplyLabel: "DAVDEFI SUPPLY",
  },
  "/LOAN": {
    tokenName: "Loan",
    tokenAddress: loan_mainnet,
    supplyLabel: "DAVDEFI SUPPLY",
  },
  "/PTGC": {
    tokenName: "PTGC",
    tokenAddress: ptgc,
    supplyLabel: "DAVDEFI SUPPLY",
  },
  "/REX": {
    tokenName: "REX",
    tokenAddress: rex,
    supplyLabel: "DAVDEFI SUPPLY",
  },
  "/WATT": {
    tokenName: "WATT",
    tokenAddress: watt,
    supplyLabel: "DAVDEFI SUPPLY",
  },
  "/TEXAN": {
    tokenName: "TEXAN",
    tokenAddress: texan,
    supplyLabel: "DAVDEFI SUPPLY",
  },
  "/PLS": {
    tokenName: "PLS",
    tokenAddress: PLS_ADDRESS,
    supplyLabel: "DAVPLS SUPPLY",
  },
};

export default function IncrementPriceTarget() {
  const { theme } = useContext(themeContext);
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");

  const location = useLocation();
  const config = tokenConfig[location.pathname];

  if (!config) {
    return null;
  }

  return (
    <TokenStats
      tokenName={config.tokenName}
      tokenAddress={config.tokenAddress}
      supplyLabel={config.supplyLabel}
      theme={theme}
      shadow={shadow}
    />
  );
}
