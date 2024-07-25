import React, { useContext, useState, useEffect } from "react";
import "./RatioPriceTargets.css";
import "../../Utils/Theme.css";
import { Link } from "react-router-dom";
import { themeContext } from "../../App";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { functionsContext } from "../../Utils/Functions";
import { ethers } from "ethers";

export default function RatioPriceTargets() {
  const { theme } = useContext(themeContext);
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  const { accountAddress, currencyName, userConnected } =
    useContext(Web3WalletContext);
  const { socket, getRatioPriceTargets, getDepositors, closeTarget } =
    useContext(functionsContext);
  const [ratioPriceTargets, setRatioPriceTargets] = useState([]);
  const [seeFullPage, setSeeFullPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    if (userConnected) {
      fetchRatioPriceTargets();
    }
  }, [accountAddress, currencyName, theme, socket]);

  const fetchRatioPriceTargets = async () => {
    if (accountAddress) {
      try {
        let allUsersTargets = [];
        let allDepositorsAddress = await getDepositors();

        for (let address of allDepositorsAddress) {
          let targets = await getRatioPriceTargets(address);
          allUsersTargets.push(...(targets || []));
        }

        const sortedArray = allUsersTargets.sort((a, b) => {
          const numericValueA = Number(
            ethers.utils.formatEther(a?.ratioPriceTarget.toString())
          );
          const numericValueB = Number(
            ethers.utils.formatEther(b?.ratioPriceTarget.toString())
          );
          return numericValueA - numericValueB;
        });

        const processedTargets = await Promise.all(
          sortedArray.map((target, index) =>
            processTargets(target, index, currencyName)
          )
        );
        setRatioPriceTargets(processedTargets.filter(Boolean));
      } catch (error) {
        console.error("Error fetching targets:", error);
      }
    }
  };

  const processTargets = async (target, index, currencyName) => {
    try {
      const ratioPriceTarget = Number(
        ethers.utils.formatEther(target?.ratioPriceTarget.toString())
      ).toFixed(13);
      const targetAmount =
        Number(
          ethers.utils.formatEther(target?.TargetAmount.toString())
        ).toFixed(4) + " XEN";
      const timeDifference = await formatTimeDifference(
        target?.Time.toString()
      );

      if (!target.isClosed) {
        return (
          <div
            key={index}
            className={`box-items ${
              (theme === "darkTheme" && "Theme-box-item") ||
              (theme === "dimTheme" &&
                "dim-theme-items dim-theme-items-border") ||
              "viewItemsTop"
            }`}
          >
            <div className="box-1" id="box1">
              <div>
                <p>
                  <span>Transaction</span>
                </p>
                <p
                  className={`${
                    (theme === "darkTheme" && "Theme-block-time") ||
                    (theme === "dimTheme" && "Theme-block-time") ||
                    "time-opacity"
                  }`}
                >
                  {timeDifference} ago
                </p>
              </div>
            </div>
            <div className="box-1 box-2" id="box2">
              <p
                className={`d-flex flex-column para-column-fit ${
                  (theme === "darkTheme" && "Theme-col2-para") ||
                  (theme === "dimTheme" && "Theme-col2-para")
                }`}
              >
                Target Price<span>$ {ratioPriceTarget}</span>
              </p>
            </div>
            <p
              className={`box-3 ${
                (theme === "darkTheme" && "Theme-btn-block") ||
                (theme === "dimTheme" && "dimThemeBtnBg")
              }`}
            >
              {targetAmount}
            </p>
          </div>
        );
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const formatTimeDifference = async (givenTimestamp) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const seconds = currentTimestamp - Number(givenTimestamp);

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

  const handlePageChange = (newPage) => {
    if (
      newPage > 0 &&
      newPage <= Math.ceil(ratioPriceTargets.length / itemsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  const displayedTargets = ratioPriceTargets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="" style={{ marginTop: "-23px" }}>
      <div>
        <button
          className={`box-5  quicks ${
            theme === "darkTheme"
              ? "Theme-btn-block"
              : theme === "dimTheme"
              ? "dimThemeBtnBg"
              : "lightThemeButtonBg"
          } ${theme}`}
        >
          <Link
            to="/mint"
            className={`   ${
              theme ===  "dimTheme"
                ? "back"
                : "backWhite"
            }`}
          >
            BACK
          </Link>
        </button>
      </div>
      <div
        className={`container-1 ${
          (theme === "darkTheme" && "Theme-block-container") ||
          (theme === "dimTheme" && "dimThemeBg") ||
          shadow
        }`}
      >
        <div className={`box-titles1 mx-3 ${theme === "darkTheme" && ""}`}>
          <h1
            className={`box-title mb-3 ${
              (theme === "darkTheme" && "bg-dark text-white") ||
              (theme === "dimTheme" && "title-color")
            }`}
          >
            Ratio Price Targets (rPT)
          </h1>
        </div>
        <div
          className={`${seeFullPage ? "seenFullContent" : ""} reponsive-box1`}
        >
          {displayedTargets}
        </div>
        <div className="view-main">
          <div
            className={`view-pagerpt ${
              (theme === "darkTheme" && "Theme-view-page") ||
              (theme === "dimTheme" &&
                "dimThemeBlockView dim-theme-items-border")
            }`}
          >
            <div></div>
            <Link
              onClick={() => setSeeFullPage(!seeFullPage)}
              className={`${
                (theme === "darkTheme" && "text-white") ||
                (theme === "dimTheme" && "dimThemeBlockView")
              }`}
            ></Link>
            <div
              className={`table_pageIndex ${
                theme === "dimTheme" && "text-white"
              }`}
            >
              <span
                className="pageBtnDir"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &#10216;
              </span>
              <span>
                {currentPage} /{" "}
                {Math.ceil(ratioPriceTargets.length / itemsPerPage)}
              </span>
              <span
                className="pageBtnDir"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &#12297;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
