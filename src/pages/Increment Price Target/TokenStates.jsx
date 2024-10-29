import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DavMinted from "../../Components/comps/TVlComp";
import Autovault from "../../Components/comps/Autovault";
import ContractAddress from "../../Components/comps/ContractAddress";
import TotalTokens from "../../Components/comps/TotalTokens";
import { useLocation } from "react-router-dom";

const TokenStats = ({ tokenAddress, supplyLabel, theme, shadow }) => {
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const location = useLocation();
  const currentPath = location.pathname;

  const isXEN = location.pathname === "/XEN";
  const isPLS = location.pathname === "/PLS";
  const isPRATE = location.pathname === "/PRATE";
  const isPFENIX = location.pathname === "/PFENIX";
  const isHEX = location.pathname === "/HEX";
  const isTONI = location.pathname === "/TONI";
  const isPST = location.pathname === "/PTS";
  const isSPARK = location.pathname === "/SPARK";
  const isNINE_INCH = location.pathname === "/Nine_Inch";

  const tooltip =
    (theme === "dimTheme" && "dim-tooltip") ||
    (theme === "darkTheme" && "dark-tooltip");

  const FileLink = ({ href }) => (
    <div className="hover-box">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span
          className={`${tooltip} heightfixBug hoverText tooltipAlign`}
          data-tooltip="Verified Code"
          data-flow="bottom"
          style={{
            position: "relative",
            display: "inline-block",
            cursor: "pointer",
            textAlign: "center",
            whiteSpace: "nowrap",
            width: "auto",
            maxWidth: "10rem",
          }}
        >
          <i className="fas fa-file-alt custom-icon-size"></i>
        </span>
      </a>
    </div>
  );

  const specialFileLinks = `https://repo.sourcify.dev/contracts/full_match/369/${tokenAddress}`;

  const defaultFileLink = `https://repo.sourcify.dev/contracts/partial_match/369/${tokenAddress}`;

  const getFileLink = (path) => {
    if (
      isXEN ||
      isHEX ||
      isPLS ||
      isPFENIX ||
      isPRATE ||
      isTONI ||
      isNINE_INCH ||
      isSPARK ||
      isPST
    ) {
      return specialFileLinks;
    }
    return defaultFileLink;
  };

  return (
    <div className="" style={{ marginTop: "-23px" }}>
      <div
        className={`container-1 ${
          (theme === "darkTheme" && "Theme-block-container") ||
          (theme === "dimTheme" && "dimThemeBg") ||
          shadow
        } `}
        style={{ height: "465px" }}
      >
        <div className={`box-titles2 mx-3 ${theme === "darkTheme" && ""} `}>
          <h1
            className={`box-title mb-3 ${
              (theme === "darkTheme" && "bg-dark" && "text-white") ||
              (theme === "dimTheme" && "title-color")
            }`}
          >
            Token Stats
          </h1>
          <div style={{ marginLeft: "560px", marginTop: "-50px" }}>
            {currentPath.includes("MATIC") && (
              <a
                href="https://polygonscan.com/address/0xC4CD0c1BAC56FB0CB5c3b6474E1EbAb1D7492667"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-external-link-alt custom-icon-size"></i>
              </a>
            )}
            {currentPath.includes("mDXN") && (
              <div style={{ display: "inline-flex", alignItems: "center" }}>
                <a
                  href="https://polygonscan.com/address/0xC3C304636269975B528603B365b43D78AE26162A"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginRight: "8px" }}
                  className="mx-3"
                >
                  <i className="fas fa-external-link-alt custom-icon-size"></i>
                </a>
              </div>
            )}
            {currentPath.includes("mXEN") && (
              <div style={{ display: "inline-flex", alignItems: "center" }}>
                <a
                  href="https://polygonscan.com/address/0xC3C304636269975B528603B365b43D78AE26162A"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginRight: "8px" }}
                  className="mx-3"
                >
                  <i className="fas fa-external-link-alt custom-icon-size"></i>
                </a>
              </div>
            )}
            {currentPath.includes("mFENIX") && (
              <a
                href="https://polygonscan.com/address/0xD5BA70D0cF16024210E4fB6B93F8793F98725448"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-external-link-alt custom-icon-size"></i>
              </a>
            )}
            {[
              "XEN",
              "PDXN",
              "PFENIX",
              "DEFI",
              "HEX",
              "PLS",
              "REX",
              "TEXAN",
              "LOAN",
              "PTGC",
              "WATT",
              "TONI",
              "SPARK",
              "PTS",
              "NineMM",
              "Nine_Inch",
              "PRATE",
            ].some(
              (path) =>
                currentPath.includes(path) &&
                !currentPath.includes("mXEN") &&
                !currentPath.includes("bXEN")
            ) && (
              <>
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  {currentPath !== "/XEN" && (
                    <FileLink href={getFileLink(currentPath)} />
                  )}
                  <a
                    href={`https://scan.mypinata.cloud/ipfs/bafybeih3olry3is4e4lzm7rus5l3h6zrphcal5a7ayfkhzm5oivjro2cp4/#/address/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-3"
                  >
                    <i className="fas fa-external-link-alt custom-icon-size"></i>
                  </a>
                </div>
              </>
            )}
            {["BNB", "bXEN", "bDXN", "bFENIX"].some((path) =>
              currentPath.includes(path)
            ) && (
              <a
                href={`https://bscscan.com/address/${tokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-external-link-alt custom-icon-size"></i>
              </a>
            )}
          </div>
        </div>
        <div className={`reponsive-box1 `}>
          <div style={{ marginTop: "-16px" }}>
            <hr
              className={`thin-line ${
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
              className={`flex-grow-1 fontSize text-start justify-content-between ${textTheme} `}
            >
              <div style={{ fontSize: "13px" }}>{supplyLabel}</div>
              <div className={`varSize `}>
                <span
                  className={`spanText  `}
                  style={{
                    fontSize: "14px",
                    color: "rgba(27, 138, 236, 0.89)",
                  }}
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
            className={`thin-line ${
              theme === "dimTheme" ? "thin-line" : "thin-line-light"
            } ${theme}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenStats;
