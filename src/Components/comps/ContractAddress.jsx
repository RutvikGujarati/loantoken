import React, { useContext } from "react";
import { PSD_ADDRESS } from "../../Utils/ADDRESSES/Addresses";
import { themeContext } from "../../App";
import { Link, useLocation } from "react-router-dom";

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

  const location = useLocation();
  const isXEN = location.pathname == "/XEN";
  const isMatic = location.pathname == "/MATIC";
  const ismDXN = location.pathname == "/mDXN";
  const ismXEN = location.pathname == "/mXEN";
  const ismFENIX = location.pathname == "/mFENIX";
  const isPDXN = location.pathname == "/PDXN";
  const isPFENIX = location.pathname == "/PFENIX";
  const isHEX = location.pathname == "/HEX";
  const isTEXAN = location.pathname == "/TEXAN";
  const isWATT = location.pathname == "/WATT";
  const isREX = location.pathname == "/REX";
  const isLoan = location.pathname == "/LOAN";
  const isPTGC = location.pathname == "/PTGC";
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
                  AUTO-VAULTS TARGET
                </div>{" "}
              </div>
            </div>
            <div
              className={`varSize ${spanDarkDim}`}
              style={{ marginLeft: "18px" }}
            >
              <span
                className={`spanText  `}
                style={{ fontSize: "14px", color: "rgba(27, 138, 236, 0.89)" }}
              >
                {" "}
                {isXEN
                  ? "10,000,000,000"
                  : isHEX
                  ? "1,000,000"
                  : isLoan
                  ? "100,000,000"
                  : isREX
                  ? "50,000,000"
                  : isMatic
                  ? "100,000"
                  : ismXEN
                  ? "100,000,000"
                  : ismFENIX
                  ? "10,000,000"
                  : ismDXN
                  ? "1,000"
                  : isWATT
                  ? "50,000,000"
                  : isPTGC
                  ? "50,000,000"
                  : isTEXAN
                  ? "1,000,000,000"
                  : isPDXN
                  ? "1,000"
                  : isPFENIX
                  ? "1,000,000"
                  : "1,000,000"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractAddress;
