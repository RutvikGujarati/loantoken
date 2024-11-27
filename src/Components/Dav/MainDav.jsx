import { Link, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { themeContext } from "../../App";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { DavContext } from "../../context/DavContext";
import DavDefi from "./BottomPages/DavDefi";
import DAVTrade from "./BottomPages/DAVTRADE";
import DAV from "./Dav";

const MainDav = () => {
  const location = useLocation();
  const { theme } = useContext(themeContext);
  const { accountAddress } = useContext(Web3WalletContext);
  const isHome = location.pathname == "/PLS/mint";
  const isTrade = location.pathname == "/TRADE";
  const isAlpha = location.pathname === "/alpharoom";
  const isInflationPLS = location.pathname == "/PLS";
  const isInflationXEN = location.pathname == "/XEN";
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");
  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  const isHei =
    !isHome && !isAlpha && !isInflationPLS && !isInflationXEN && "hei";

  const { selectedDav } = useContext(DavContext);

  const renderComponent = () => {
    switch (selectedDav) {
      case "DAVPLS":
        return <DAV />;
      case "DAVDEFI":
        return <DavDefi />;
      case "DAVTRADE":
        return <DAVTrade />;
      default:
        return null;
    }
  };

  const [DepositAddress, setDepositAddress] = useState(false);
  const currentAddress =
    "0xc04c964d6BdC5fe2163E84bC06d9d0775Bdb369F".toLowerCase();
  useEffect(() => {
    const checkIsDepositer = () => {
      try {
        if (currentAddress === accountAddress) {
          setDepositAddress(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkIsDepositer();
  }, [accountAddress, DepositAddress]);

  return (
    <>
      <div className={`container-fluid`}>
        <div
          className={`flex-grow-1 fontSize text-start ${textTitle} mb-0 ms-3 ${
            theme === "dimTheme" && "text-white"
          }`}
        >
          <div className="row justify-content-center">
            <div className="col-auto">
              <div
                className={`info-item info-columns box new ${
                  (theme === "darkTheme" && "Theme-btn-block") ||
                  (theme === "dimTheme" && "dimThemeBorder") ||
                  (theme === "lightTheme" && theme + " translite")
                }`}
                style={{ marginTop: "-23vh", marginLeft: "15px" }}
              >
                <p className="text-center">INFLATION BANK</p>
              </div>
              <div
                className="col"
                style={{
                  marginTop: "-5vh",
                  marginLeft: "21rem",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  className={` ${spanDarkDim}`}
                  style={{ fontWeight: "600",fontSize:"13px", color: "black" }}
                >
                  Manage the supply and demand of listed tokens.
                </span>
              </div>
              <div
                className="tracking"
                style={{
                  marginTop: "35px",
                  marginLeft: "-15px",
                }}
              >
                <div
                  className={`top-container ${
                    (theme === "darkTheme" && "darkThemeTrackingBg") ||
                    (theme === "dimTheme" && "dimTheme-index-class")
                  }`}
                >
                  <div
                    className={`top-container ${isHei} container-xxl  ${
                      (theme === "darkTheme" && "darkThemeTrackingBg") ||
                      (theme === "dimTheme" && "dimTheme-index-class")
                    }`}
                  >
                    <div
                      className={`main-section ${shadow} me-auto card d-flex flex-wrap py-3 px-3 ${
                        (theme === "darkTheme" && "Theme-block-container") ||
                        (theme === "dimTheme" && "dimThemeBg")
                      }`}
                    >
                      <div className="container my-2">
                        {/* Header Row */}
                        <div className="row mb-3 text-center">
                          <div className="col">
                            <span
                              className={`${spanDarkDim}`}
                              style={{
                                marginLeft: DepositAddress ? "60px" : "0", // Adjust value as needed
                              }}
                            >
                              TOKEN
                            </span>
                          </div>

                          <div className="col"></div>
                          <div className="col"></div>
                          <div className="col">
                            <span className={`${spanDarkDim}`}>CLAIMED</span>
                          </div>
                          {DepositAddress && (
                            <div className="col">
                              <span className={`${spanDarkDim}`}>DEPOSIT</span>
                            </div>
                          )}
                        </div>

                        {renderComponent()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDav;
