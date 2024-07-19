import React, { useContext, useEffect, useState } from "react";
import "./IncrementPriceTarget.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { themeContext } from "../../App";
import "../../Utils/Theme.css";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { functionsContext } from "../../Utils/Functions";
import { ethers } from "ethers";
import Autovault from "../../Components/Autovault";
import ContractAddress from "../../Components/ContractAddress";
import TotalTokens from "../../Components/TotalTokens";
import TVLComp from "../../Components/TVlComp";

export default function IncrementPriceTarget() {
  const { theme } = useContext(themeContext);
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  const { accountAddress, currencyName, userConnected } =
    useContext(Web3WalletContext);
  const { getPrice } = useContext(functionsContext);
  const [price, setPrice] = useState("0");

  const fetchPrice = async () => {
    if (accountAddress && currencyName) {
      try {
        let price = await getPrice();
        let formattedPrice = await ethers.utils.formatEther(price || "0");
        setPrice(formattedPrice);
      } catch (error) {}
    }
  };
  useEffect(() => {
    if (accountAddress) {
      fetchPrice();
    }
  });
  return (
    <>
      <div className=" ">
        <div
          className={`container-1 ${
            (theme === "darkTheme" && "Theme-block-container") ||
            (theme === "dimTheme" && "dimThemeBg") ||
            shadow
          } `}
          style={{ height: "467px" }}
        >
          <div
            className={`box-titles2 mx-3 ${theme === "darkTheme" && ""} `}
            id={``}
          >
            <h1
              className={`box-title mb-3 ${
                (theme === "darkTheme" && "bg-dark" && "text-white") ||
                (theme === "dimTheme" && "title-color")
              }`}
            >
              Token Stats
            </h1>
          </div>

          <div className={`reponsive-box1 `}>
            <div style={{marginTop:"-16px"}} >
            <hr className="d-block my-3"  />
            </div>
            <div className="d-flex pt-1" style={{ marginTop: "20px" }}>
              <div className="margin-right">
                <i
                  className={`iconSize fa-solid fa-arrow-up-right-dots ${theme}`}
                ></i>
              </div>

              <div
                className={`flex-grow-1 fontSize text-start justify-content-between ${textTheme}`}
              >
                <div className={``} style={{ fontSize: "13px" }}>
                  XEN PRICE
                </div>

                <div className={`varSize `}>
                  <span className={`spanText ${spanDarkDim}`}>
                    <>$ {price + " XEN"}</>
                  </span>
                </div>
              </div>
            </div>
            <TVLComp />
            <Autovault />
            <ContractAddress />
            <TotalTokens />
          </div>
          {/* <div className="view-main">
            <div
              className={`view-pageIncre  ${
                (theme === "darkTheme" && "Theme-view-page") ||
                (theme === "dimTheme" &&
                  "dimThemeBlockView" &&
                  "dim-theme-items-border")
              } `}
            ></div> 
          </div> */}
        </div>
      </div>
    </>
  );
}
