import React, { useContext } from "react";
import { PSD_ADDRESS } from "../Utils/ADDRESSES/Addresses";
import { themeContext } from "../App";
import { Link } from "react-router-dom";

const ContractAddress = () => {
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
  return (
    <>
      <div style={{ marginTop: "-10px" }}>
        <div className="hrp">
          <hr className="my-3 " />
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
                  Contract Address
                </div>{" "}
              </div>
            </div>
            <div
              className={`varSize ${spanDarkDim}`}
              style={{ marginLeft: "18px" }}
            >
              <span className={`spanText ${spanDarkDim} `}>
                {" "}
                <>
                  {" "}
                  <Link
                    target="_blank"
                    style={{ textDecoration: "none" }}
                    to={`https://scan.v4.testnet.pulsechain.com/#/address/${PSD_ADDRESS}`}
                  >
                    {" "}
                    {PSD_ADDRESS}{" "}
                  </Link>
                </>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractAddress;
