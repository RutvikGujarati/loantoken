import React, { useContext, useState, useEffect } from "react";
import { PSD_ADDRESS } from "../../Utils/ADDRESSES/Addresses";
import { themeContext } from "../../App";
import { functionsContext } from "../../Utils/Functions";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

const DavHolding = () => {
  const { theme } = useContext(themeContext);
  const { holdTokens } = useContext(functionsContext);
  const { accountAddress } = useContext(Web3WalletContext);
  const [HoldAMount, setHoldTokens] = useState("0");
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");

  const HoldTokensOfUser = async () => {
    try {
      if (!accountAddress) {
        throw new Error("Account address is undefined");
      }
      const holdToken = await holdTokens(accountAddress);
      const formattedPrice = ethers.utils.formatEther(holdToken || "0");
      console.log("hold tokensssssss", formattedPrice);
      setHoldTokens(formattedPrice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accountAddress) {
      HoldTokensOfUser(accountAddress);
    }
  });
  return (
    <>
      <div style={{ marginTop: "-7px" }}>
        <div className="hrp">
          <hr className="thin-line" />
        </div>
        <div className="d-flex pt-1">
          <div className="">
            <i className={`iconSize fa-solid fa-solid fa-link ${theme}`}></i>{" "}
          </div>
          <div>
            <div
              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme} `}
            >
              <div className={`  `}>
                <div className={` `} style={{ marginLeft: "18px" }}>
                  {" "}
                  Dav Holdings
                </div>{" "}
              </div>
            </div>
            <div
              className={`varSize ${spanDarkDim}`}
              style={{ marginLeft: "18px" }}
            >
              <span
                className={`spanText ${spanDarkDim} `}
                style={{ fontSize: "14px" }}
              >
                {HoldAMount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DavHolding;
