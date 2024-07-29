import React, { useContext, useEffect, useState } from "react";
import "./IncrementPriceTarget.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { themeContext } from "../../App";
import { PSD_ADDRESS, state_token } from "../../Utils/ADDRESSES/Addresses";
import "../../Utils/Theme.css";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { functionsContext } from "../../Utils/Functions";
import { ethers } from "ethers";
import Autovault from "../../Components/comps/Autovault";
import ContractAddress from "../../Components/comps/ContractAddress";
import TotalTokens from "../../Components/comps/TotalTokens";
import TVLComp from "../../Components/comps/TVlComp";
import DavMinted from "../../Components/comps/TVlComp";

export default function IncrementPriceTarget() {
  const { theme } = useContext(themeContext);
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
  const borderDarkDim =
    (theme === "darkTheme" && "trackingBorder") ||
    (theme === "dimTheme" && "dimThemeTrackBorder");
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
        let formattedPrice = ethers.utils.formatEther(price || "0");
        console.log("token price", formattedPrice);
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
      <div className=" " style={{ marginTop: "-23px" }}>
        <div
          className={`container-1 ${
            (theme === "darkTheme" && "Theme-block-container") ||
            (theme === "dimTheme" && "dimThemeBg") ||
            shadow
          } `}
          style={{ height: "465px" }}
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
            <div style={{ marginLeft: "580px", marginTop: "-50px" }}>
              <a
                href={`https://scan.mypinata.cloud/ipfs/bafybeih3olry3is4e4lzm7rus5l3h6zrphcal5a7ayfkhzm5oivjro2cp4/#/address/${PSD_ADDRESS}`}
                // className="color-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-external-link-alt custom-icon-size"></i>
              </a>
            </div>
          </div>
          <div className={`reponsive-box1 `}>
            <div style={{ marginTop: "-16px" }}>
              <hr
                className={`  thin-line   ${
                  theme === "dimTheme" ? "thin-line" : "thin-line-light"
                } ${theme}`}
              />
            </div>
            <div className="d-flex pt-1" style={{ marginTop: "20px" }}>
              <div className="margin-right">
                <i
                  className={`iconSize fa-solid fa-money-bill-transfer ${theme}`}
                ></i>
              </div>

              <div
                className={`flex-grow-1 fontSize text-start justify-content-between ${textTheme}`}
              >
                <div className={``} style={{ fontSize: "13px" }}>
                  DAVPLS SUPPLY
                </div>

                <div className={`varSize `}>
                  <span
                    className={`spanText ${
                      theme === "dimTheme" ? "color-span1" : "color-span2"
                    } `}
                    style={{ fontSize: "14px" }}
                  >
                    888,888
                  </span>
                </div>
              </div>
            </div>
            <DavMinted />
            <Autovault />
            <ContractAddress />
            <TotalTokens />
            <hr
              style={{ marginTop: "7px" }}
              className={`  thin-line   ${
                theme === "dimTheme" ? "thin-line" : "thin-line-light"
              } ${theme}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
