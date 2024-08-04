import React, { useContext, useState, useEffect } from "react";
import { functionsContext } from "../../Utils/Functions";
import { themeContext } from "../../App";
import { useLocation } from "react-router-dom";

const TotalTokens = () => {
  const { theme } = useContext(themeContext);
  const { BalanceOfXenTokenContract, BalanceOfPLSContract } =
    useContext(functionsContext);
  const [balancePSD, setBalancePSD] = useState("0");
  const [balancePDXN, setBalancePDXN] = useState("0");
  const [balancePFENIX, setBalancePFENIX] = useState("0");
  const [balanceHEX, setBalanceHEX] = useState("0");
  const [balanceREX, setBalanceREX] = useState("0");
  const [balanceTEXAN, setBalanceTEXAN] = useState("0");
  const [balanceWATT, setBalanceWATT] = useState("0");
  const [balanceLOAN, setBalanceLOAN] = useState("0");
  const [balancePTGC, setBalancePTGC] = useState("0");
  const [balancePLS, setBalancePLS] = useState("0");
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");

  const getBalances = async () => {
    const balanceContractPSD = await BalanceOfXenTokenContract("PSD");
    setBalancePSD(Math.floor(balanceContractPSD) || 0);

    const balanceContractPDXN = await BalanceOfXenTokenContract("PDXN");
    console.log("pdxn balance", Math.floor(balanceContractPDXN));
    setBalancePDXN(Math.floor(balanceContractPDXN) || 0);

    const balanceContractPFENIX = await BalanceOfXenTokenContract("PFENIX");
    setBalancePFENIX(Math.floor(balanceContractPFENIX) || 0 );

    const balanceContractHEX = await BalanceOfXenTokenContract("HEX");
    setBalanceHEX(Math.floor(balanceContractHEX) || 0);

    const balanceContractTEXAN = await BalanceOfXenTokenContract("TEXAN");
    setBalanceTEXAN(Math.floor(balanceContractTEXAN) || 0 );

    const balanceContractREX = await BalanceOfXenTokenContract("REX");
    setBalanceREX(Math.floor(balanceContractREX) || 0 );

    const balanceContractWATT = await BalanceOfXenTokenContract("WATT");
    setBalanceWATT(Math.floor(balanceContractWATT) || 0);

    const balanceContractLOAN = await BalanceOfXenTokenContract("LOAN_M");
    setBalanceLOAN(Math.floor(balanceContractLOAN) || 0 );

    const balanceContractPTGC = await BalanceOfXenTokenContract("PTGC");
    setBalancePTGC(Math.floor(balanceContractPTGC) || 0 );
  };
  const getBalance = async () => {
    const balanceContractPSD = await BalanceOfPLSContract();
    setBalancePLS(Math.floor(balanceContractPSD) || 0);
  };

  useEffect(() => {
    getBalances();
    getBalance();
  }, []);

  const location = useLocation();
  const isXEN = location.pathname == "/XEN";
  const isPDXN = location.pathname == "/PDXN";
  const isPFENIX = location.pathname == "/PFENIX";
  const isPLS = location.pathname == "/PLS";
  const isHEX = location.pathname == "/HEX";
  const isTEXAN = location.pathname == "/TEXAN";
  const isWATT = location.pathname == "/WATT";
  const isREX = location.pathname == "/REX";
  const isLoan = location.pathname == "/LOAN";
  const isPTGCC = location.pathname == "/PTGC";

  return (
    <>
      <div style={{ marginTop: "-5px" }}>
        <div className="hrp">
          <hr className="thin-line " />
        </div>
        <div className="d-flex pt-1">
          <div className="">
            <i className={`iconSize fa-regular fa-money-bill-1 ${theme}`}></i>
          </div>
          <div>
            <div
              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
            >
              <div className={` `}>
                <div className={` `} style={{ marginLeft: "20px" }}>
                  Contract Balance
                </div>
              </div>
            </div>
            <div
              className={`varSize ${spanDarkDim}`}
              style={{ marginLeft: "20px" }}
            >
              <span
                className={`spanText ${
                  theme === "dimTheme" ? "color-span1" : "color-span2"
                } `}
                style={{ fontSize: "14px" }}
              >
                {isXEN && balancePSD}
                {isHEX && balanceHEX}
                {isREX && balanceREX}
                {isTEXAN && balanceTEXAN}
                {isWATT && balanceWATT}
                {isPTGCC && balancePTGC}
                {isLoan && balanceLOAN}
                {isPDXN && balancePDXN}
                {isPFENIX && balancePFENIX}
                {isPLS && balancePLS}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalTokens;
