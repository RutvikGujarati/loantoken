import React, { useContext, useState, useEffect } from "react";
import { functionsContext } from "../../Utils/Functions";
import { themeContext } from "../../App";
import { useLocation } from "react-router-dom";

const TotalTokens = () => {
  const { theme } = useContext(themeContext);
  const { BalanceOfXenTokenContract } = useContext(functionsContext);
  const [balancePSD, setBalancePSD] = useState("0");
  const [balancePDXN, setBalancePDXN] = useState("0");
  const [balancePFENIX, setBalancePFENIX] = useState("0");
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");

  const getBalances = async () => {
    const balanceContractPSD = await BalanceOfXenTokenContract('PSD');
    setBalancePSD(Math.floor(balanceContractPSD));

    const balanceContractPDXN = await BalanceOfXenTokenContract('PDXN');
    console.log("pdxn balance",Math.floor(balanceContractPDXN))
    setBalancePDXN(Math.floor(balanceContractPDXN));

    const balanceContractPFENIX = await BalanceOfXenTokenContract('PFENIX');
    setBalancePFENIX(Math.floor(balanceContractPFENIX));
  };

  useEffect(() => {
    getBalances();
  }, []);

  const location = useLocation();
  const isXEN = location.pathname == "/XEN";
  const isPDXN = location.pathname == "/PDXN";
  const isPFENIX = location.pathname == "/PFENIX";

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
                {isPDXN && balancePDXN}
                {isPFENIX && balancePFENIX}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalTokens;
