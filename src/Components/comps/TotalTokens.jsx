import React, { useContext, useState, useEffect } from "react";
import { functionsContext } from "../../Utils/Functions";
import { themeContext } from "../../App";
import { ethers } from "ethers";

const TotalTokens = () => {
  const { theme } = useContext(themeContext);
  const { BalanceOfXenTokenContract } = useContext(functionsContext);
  const [balance, setbalance] = useState("0");
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");

  const getbalance = async () => {
    const balanceContract = await BalanceOfXenTokenContract();
    const balanceRoundedDown = Math.floor(balanceContract); // Round down the balance
    setbalance(balanceRoundedDown);
  };

  useEffect(() => {
    getbalance();
  });
  return (
    <>
      <div style={{ marginTop: "-5px" }}>
        <div className="hrp">
          <hr className="thin-line " />
        </div>
        <div className="d-flex pt-1">
          <div className="">
            <i className={`iconSize fa-regular fa-money-bill-1 ${theme}`}></i>{" "}
          </div>
          <div>
            <div
              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme} `}
            >
              <div className={` `}>
                <div className={` `} style={{ marginLeft: "20px" }}>
                  {" "}
                  Contract Balance
                </div>{" "}
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
                {" "}
                <> {balance}</>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalTokens;
