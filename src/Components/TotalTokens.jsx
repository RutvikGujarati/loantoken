import React, { useContext, useState, useEffect } from "react";
import { PSD_ADDRESS } from "../Utils/ADDRESSES/Addresses";
import { functionsContext } from "../Utils/Functions";
import { themeContext } from "../App";

 const TotalTokens = () => {
  const { theme } = useContext(themeContext);
  const { BalanceOfXenTokenContract } = useContext(functionsContext);
  const [balance, setbalance] = useState("0");
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");

  const getbalance = async () => {
    const balanceContract = await BalanceOfXenTokenContract();
    console.log("balance of contract", balanceContract);
    setbalance(balanceContract);
  };

  useEffect(() => {
    getbalance();
  });
  return (
    <>
      <div style={{ marginTop: "-5px" }}>
        <div className="hrp">
          <hr className="my-3 " />
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
                <div
                  className={` `}
                  style={{ marginLeft: "20px" }}
                >
                  {" "}
                  Contract Balance
                </div>{" "}
              </div>
            </div>
            <div
              className={`varSize ${spanDarkDim}`}
              style={{ marginLeft: "20px" }}
            >
              <span className={`spanText ${spanDarkDim}`}>
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
