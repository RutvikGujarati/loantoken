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
  watt,
} from "../../Utils/ADDRESSES/Addresses";
import "../../Utils/Theme.css";

import TokenStats from "./TokenStates";

export default function IncrementPriceTarget() {
  const { theme } = useContext(themeContext);
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");

  const location = useLocation();
  const isXEN = location.pathname === "/XEN";
  const isPDXN = location.pathname === "/PDXN";
  const isPFENIX = location.pathname === "/PFENIX";
  const isPLS = location.pathname === "/PLS";
  const isHEX = location.pathname === "/HEX";
  const isTEXAN = location.pathname === "/TEXAN";
  const isWATT = location.pathname === "/WATT";
  const isREX = location.pathname === "/REX";
  const isLoan = location.pathname === "/LOAN";
  const isPTGC = location.pathname === "/PTGC";

  return (
    <>
      {isXEN ? (
        <>
          <TokenStats
            tokenName="PSD"
            tokenAddress={PSD_ADDRESS}
            supplyLabel="DAVPLS SUPPLY"
            theme={theme}
            shadow={shadow}
          />
        </>
      ) : isPDXN ? (
        <>
          <TokenStats
            tokenName="PDXN"
            tokenAddress={PDXN_Address}
            supplyLabel="DAVPLS SUPPLY"
            theme={theme}
            shadow={shadow}
          />
        </>
      ) : isPFENIX ||
        isHEX ||
        isLoan ||
        isPTGC ||
        isREX ||
        isWATT ||
        isTEXAN ? (
        <>
          <TokenStats
            tokenName={
              isHEX
                ? "HEX"
                : isLoan
                ? "Loan"
                : isPTGC
                ? "PTGC"
                : isWATT
                ? "WATT"
                : isREX
                ? "REX"
                : "TEXAN"
            }
            tokenAddress={
              isHEX
                ? hex
                : isLoan
                ? loan_mainnet
                : isPTGC
                ? ptgc
                : isWATT
                ? watt
                : isREX
                ? rex
                : isTEXAN
                ? texan
                : PFENIX_Address
            }
            supplyLabel={
              isHEX || isLoan || isPTGC || isREX || isWATT || isTEXAN
                ? "DAVDEFI SUPPLY"
                : "DAVPLS SUPPLY"
            }
            theme={theme}
            shadow={shadow}
          />
        </>
      ) : isPLS ? (
        <>
          <TokenStats
            tokenName="PLS"
            tokenAddress={PLS_ADDRESS}
            supplyLabel="DAVPLS SUPPLY"
            theme={theme}
            shadow={shadow}
          />{" "}
        </>
      ) : null}
    </>
  );
}
