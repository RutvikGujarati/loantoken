import React, { useContext, useState } from "react";
import "./RatioPriceTargets.css";
// import { useLocation } from "react-router-dom";
import "../../Utils/Theme.css";
import { Link } from "react-router-dom";
import { themeContext } from "../../App";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { functionsContext } from "../../Utils/Functions";
import { useEffect } from "react";
import { ethers } from "ethers";

export default function RatioPriceTargets() {
  const { theme } = useContext(themeContext);
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  const { accountAddress, currencyName, userConnected } =
    useContext(Web3WalletContext);
  const { socket, getRatioPriceTargets, getDepositors } =
    useContext(functionsContext);
  const [ratioPriceTargets, setRatioPriceTargets] = useState([]);
  const [seeFullPage, setseeFullPage] = useState(false);
  const [nextPage, setNextPage] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const RatioPriceTargets = async () => {
    if (accountAddress) {
      try {
        let All_USERS_TARGETS = [];

        let allDepositorsAddress = await getDepositors();
        // console.log('allDepositorsAddress111',allDepositorsAddress)

        for (let index = 0; index < allDepositorsAddress.length; index++) {
          const address = allDepositorsAddress[index];
          let targets = await getRatioPriceTargets(address);
          All_USERS_TARGETS.push(...(targets || []));
        }

        // console.log('All_USERS_TARGETS::::::::::',All_USERS_TARGETS);
        // console.log('lengthRPtArray',All_USERS_TARGETS.length)
        if (All_USERS_TARGETS.length > 25) {
          setNoOfPage(Math.ceil(All_USERS_TARGETS.length / 25));
        } else {
          setNoOfPage(1);
        }

        const sortedArray = [...(All_USERS_TARGETS || [])].sort((a, b) => {
          const formattedRatioTargetA = ethers.utils.formatEther(
            a?.ratioPriceTarget.toString()
          );
          const formattedRatioTargetB = ethers.utils.formatEther(
            b?.ratioPriceTarget.toString()
          );

          const numericValueA = Number(formattedRatioTargetA);
          const numericValueB = Number(formattedRatioTargetB);

          return numericValueA - numericValueB;
        });

        try {
          let items = await Promise.all(
            sortedArray.map((target, index) =>
              processTargets(target, index, currencyName)
            )
          );
          setRatioPriceTargets(items.filter(Boolean));
        } catch (error) {
          console.error("Error processing targets:", error);
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
  };
  const processTargets = async (target, index, currencyName) => {
    try {
      const formattedRatioTarget = ethers.utils.formatEther(
        target?.ratioPriceTarget.toString()
      );
      const ratioPriceTarget = Number(formattedRatioTarget).toFixed(13);
      const formattedTargetAmount = ethers.utils.formatEther(
        target?.TargetAmount.toString()
      );
      const targetAmount = Number(formattedTargetAmount).toFixed(4) + " XEN";
      const givenTimestamp = target?.Time.toString();
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const timeDifferenceInSeconds = currentTimestamp - Number(givenTimestamp);
      const timeDifference = await formatTimeDifference(
        Number(timeDifferenceInSeconds)
      );

      if (!target.isClosed)
        return (
          <div
            key={index}
            className={`box-items  ${
              (theme === "darkTheme" && "Theme-box-item") ||
              (theme === "dimTheme" &&
                "dim-theme-items" &&
                "dim-theme-items-border") ||
              "viewItemsTop"
            }`}
          >
            <div className="box-1" id="box1">
              <div>
                {" "}
                <p>
                  {" "}
                  <span>Transaction</span>{" "}
                </p>
                <p
                  className={`${
                    (theme === "darkTheme" && "Theme-block-time") ||
                    (theme === "dimTheme" && "Theme-block-time") ||
                    "time-opacity "
                  }`}
                >
                  {timeDifference} ago
                </p>
              </div>
            </div>
            <div className="box-1 box-2" id="box2">
              <p
                className={`d-flex flex-column para-column-fit  ${
                  (theme === "darkTheme" && "Theme-col2-para") ||
                  (theme === "dimTheme" && "Theme-col2-para")
                }`}
              >
                Target Price<span>  $ {ratioPriceTarget}</span>{" "}
              </p>
            </div>
            <p
              className={`box-3  ${
                (theme === "darkTheme" && "Theme-btn-block") ||
                (theme === "dimTheme" && "dimThemeBtnBg")
              }`}
            >
              {" "}
              {targetAmount}
            </p>
          </div>
        );
    } catch (error) {
      console.log("error:", error);
    }
  };

  const formatTimeDifference = async (seconds) => {
    if (seconds >= 60 * 60 * 24) {
      const days = Math.floor(seconds / (24 * 60 * 60));
      return `${days} day${days > 1 ? "s" : ""}`;
    } else if (seconds >= 60 * 60) {
      const hours = Math.floor(seconds / (60 * 60));
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    }
  };
  useEffect(() => {
    if (userConnected) {
      RatioPriceTargets();
      // PLSRatioPriceTargets();
    }
  }, [accountAddress, currencyName, theme, socket]);

  return (
    <>
      <div className=" ">
        <div
          className={`container-1 ${
            (theme === "darkTheme" && "Theme-block-container") ||
            (theme === "dimTheme" && "dimThemeBg") ||
            shadow
          } `}
        >
          <div
            className={`box-titles1 mx-3 ${theme === "darkTheme" && ""} `}
            id={``}
          >
            <h1
              className={`box-title mb-3 ${
                (theme === "darkTheme" && "bg-dark" && "text-white") ||
                (theme === "dimTheme" && "title-color")
              }`}
            >
              Ratio Price Targets (rPT)
            </h1>
          </div>
          <div
            className={`${
              seeFullPage ? "seenFullContent" : ""
            } reponsive-box1 `}
          >
            {ratioPriceTargets}
          </div>
          <div className="view-main">
            <div
              className={`view-pagerpt  ${
                (theme === "darkTheme" && "Theme-view-page") ||
                (theme === "dimTheme" &&
                  "dimThemeBlockView" &&
                  "dim-theme-items-border")
              } `}
            >
              <div></div>
              <Link
                onClick={() => setseeFullPage(!seeFullPage)}
                className={`${
                  (theme === "darkTheme" && "text-white") ||
                  (theme === "dimTheme" &&
                    "dimThemeBlockView" &&
                    "dimThemeBlockView")
                } `}
              ></Link>
              <div
                className={`table_pageIndex ${
                  theme === "dimTheme" && "text-white"
                }`}
              >
                <span
                  className="pageBtnDir"
                  onClick={() => {
                    if (currentPage > 1 && currentPage <= noOfPage) {
                      setNextPage(nextPage - 25);
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                >
                  &#10216;
                </span>
                <span>
                  {currentPage} / {noOfPage}
                </span>
                <span
                  className="pageBtnDir"
                  onClick={() => {
                    if (currentPage < noOfPage) {
                      setNextPage(nextPage + 25);
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  {" "}
                  &#12297;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}