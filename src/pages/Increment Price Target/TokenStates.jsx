import React from "react";
import DavMinted from "../../Components/comps/TVlComp";
import Autovault from "../../Components/comps/Autovault";
import ContractAddress from "../../Components/comps/ContractAddress";
import TotalTokens from "../../Components/comps/TotalTokens";

const TokenStats = ({
  tokenAddress,
  supplyLabel,
  theme,
  shadow,
}) => {
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");

  return (
    <div className=" " style={{ marginTop: "-23px" }}>
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
          <div style={{ marginLeft: "580px", marginTop: "-50px" }}>
            <a
              href={`https://scan.mypinata.cloud/ipfs/bafybeih3olry3is4e4lzm7rus5l3h6zrphcal5a7ayfkhzm5oivjro2cp4/#/address/${tokenAddress}`}
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
              className={`flex-grow-1 fontSize text-start justify-content-between ${textTheme}`}
            >
              <div style={{ fontSize: "13px" }}>{supplyLabel}</div>
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
