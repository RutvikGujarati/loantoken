import React, { useContext, useState, useEffect } from "react";
import "./RatioPriceTargets.css";
import "../../Utils/Theme.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const { accountAddress, userConnected } = useContext(Web3WalletContext);
  const { getuserAllDetails } = useContext(functionsContext);
  const [userAutoVaults, setUserAutoVaults] = useState([]);
  const [seeFullPage, setSeeFullPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const location = useLocation();
  const isXEN = location.pathname == "/XEN";
  const isMatic = location.pathname == "/MATIC";
  const ismXEN = location.pathname == "/mXEN";
  const ismDXN = location.pathname == "/mDXN";
  const ismFENIX = location.pathname == "/mFENIX";
  const isPDXN = location.pathname == "/PDXN";
  const isPFENIX = location.pathname == "/PFENIX";
  const isPLS = location.pathname == "/PLS";
  const isHEX = location.pathname == "/HEX";
  const isTEXAN = location.pathname == "/TEXAN";
  const isWATT = location.pathname == "/WATT";
  const isREX = location.pathname == "/REX";
  const isLoan = location.pathname == "/LOAN";
  const isPTGC = location.pathname == "/PTGC";

  const isNINE_MM = location.pathname === "/NineMM";
  const isNINE_INCH = location.pathname === "/Nine_Inch";
  const isPRATE = location.pathname === "/PRATE";
  const isTONI = location.pathname === "/TONI";
  const isPST = location.pathname === "/PTS";
  const isSPARK = location.pathname === "/SPARK";

  const isBNB = location.pathname === "/BNB";
  const isBXEN = location.pathname === "/bXEN";
  const BDXN = location.pathname === "/bDXN";
  const BFENIX = location.pathname === "/bFENIX";

  useEffect(() => {
    if (accountAddress) {
      fetchUserAutoVaults();
    }
  }, [accountAddress, theme]);

  const fetchUserAutoVaults = async () => {
    try {
      const contractType = isXEN
        ? "PSD"
        : isNINE_INCH
        ? "9INCH"
        : isNINE_MM
        ? "9MM"
        : isSPARK
        ? "SPARK"
        : isTONI
        ? "TONI"
        : isPST
        ? "PTS"
        : isPRATE
        ? "PRAT"
        : isPDXN
        ? "PDXN"
        : isPFENIX
        ? "PFENIX"
        : isMatic
        ? "MATIC"
        : ismXEN
        ? "mxen"
        : ismDXN
        ? "mdxn"
        : ismFENIX
        ? "mfenix"
        : isBNB
        ? "BNB"
        : isBXEN
        ? "BXEN"
        : BDXN
        ? "BDXN"
        : BFENIX
        ? "BFENIX"
        : isHEX
        ? "HEX"
        : isLoan
        ? "LOAN_M"
        : isPTGC
        ? "PTGC"
        : isREX
        ? "REX"
        : isTEXAN
        ? "TEXAN"
        : isWATT
        ? "WATT"
        : isPLS
        ? "PLS"
        : null;

      const { userDetails } = await getuserAllDetails(contractType);
      const [addresses, autoVaults, balances] = userDetails;
      const combinedData = addresses.map((address, index) => ({
        address,
        autoVault: Number(
          ethers.utils.formatEther(autoVaults[index].toString())
        ).toFixed(2),
        balance: Number(
          ethers.utils.formatEther(balances[index].toString())
        ).toFixed(2),
      }));

      // Sort by autoVault amount in descending order
      const sortedData = combinedData.sort((a, b) => b.autoVault - a.autoVault);
      const formattedData = sortedData.map((item) => ({
        ...item,
        autoVault: parseFloat(item.autoVault).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      }));
      // Update the state with the sorted data
      setUserAutoVaults(formattedData);
    } catch (error) {
      console.error("Error fetching user auto vaults:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (
      newPage > 0 &&
      newPage <= Math.ceil(userAutoVaults.length / itemsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="" style={{ marginTop: "-170px" }}>
      <div>
        <button
          className={`box-5 quicks ${
            theme === "darkTheme"
              ? "Theme-btn-block"
              : theme === "dimTheme"
              ? "dimThemeBtnBg"
              : "lightThemeButtonBg"
          } ${theme}`}
          onClick={handleGoBack}
        >
          BACK
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
            Auto Vaults
          </h1>
        </div>
        <div
          className={`${seeFullPage ? "seenFullContent" : ""} reponsive-box1`}
        >
          {userAutoVaults
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((user, index) => (
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
                      <span>Wallet address</span>
                    </p>
                    <p
                      className={`${
                        (theme === "darkTheme" && "Theme-block-time") ||
                        (theme === "dimTheme" && "Theme-block-time") ||
                        "time-opacity"
                      }`}
                    >
                      {user.address.substring(0, 6)}...
                      {user.address.substring(user.address.length - 6)}
                    </p>
                  </div>
                </div>
                <div className="box-1 box-2" id="box2">
                  <p
                    className={`d-flex flex-column para-column-fit dav-holding ${
                      (theme === "darkTheme" && "Theme-col2-para") ||
                      (theme === "dimTheme" && "Theme-col2-para")
                    }`}
                  >
                    DAV Holding<span>{user.balance} DAV</span>
                  </p>
                </div>
                <p
                  className={`box-3 autoVaultValue ${
                    (theme === "darkTheme" && "Theme-btn-block") ||
                    (theme === "dimTheme" && "dimThemeBtnBg")
                  }`}
                >
                  {user.autoVault}{" "}
                  {isXEN
                    ? "XEN"
                    : isPDXN
                    ? "PDXN"
                    : isPFENIX
                    ? "PFENIX"
                    : "PLS"}
                </p>
              </div>
            ))}
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
                {Math.ceil(userAutoVaults.length / itemsPerPage)}
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
