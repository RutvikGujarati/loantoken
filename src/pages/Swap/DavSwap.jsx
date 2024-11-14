import React, { useContext } from "react";
import { themeContext } from "../../App";
import pstate from "../../Assets/Token List Icon/pstate.png";
import loan from "../../Assets/Token List Icon/loan.png";
import texan from "../../Assets/Token List Icon/texan.png";
import hex from "../../Assets/Token List Icon/hex.png";
const DavSwap = () => {
  const { theme } = useContext(themeContext);
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  // Array of logo image paths
  const logos = [loan, pstate, texan, pstate, pstate, hex];

  return (
    <>
      <div className="d-flex align-items-center" style={{ marginLeft: "17vh" }}>
        <div
          className={`info-item info-columns box swap2 mt-4 mb-4 ${
            (theme === "darkTheme" && "Theme-btn-block") ||
            (theme === "dimTheme" && "dimThemeBorder") ||
            (theme === "lightTheme" && theme + "translite")
          }`}
          style={{
            backgroundColor: "#323b4c",
            color: theme === "lightTheme" ? "white" : "initial",
          }}
        >
          <p className="text-center mb-0">AUCTIONS</p>
        </div>
        <span
          className={`${spanDarkDim}`}
          style={{ marginLeft: "1rem", fontWeight: "500", color: "black" }}
        >
          Only holders of DAV tokens are eligible to participate in auctions. We
          offer a 100% higher price to fill our Inflation banks.
        </span>
      </div>
      <div
        className={`top-container ${
          (theme === "darkTheme" && "darkThemeTrackingBg") ||
          (theme === "dimTheme" && "dimTheme-index-class")
        }`}
      >
        <div
          className={`top-container container-xxl ${
            (theme === "darkTheme" && "darkThemeTrackingBg") ||
            (theme === "dimTheme" && "dimTheme-index-class")
          }`}
          style={{ marginTop: "0vh" }}
        >
          <div
            className={`main-section ${shadow} me-auto card d-flex flex-wrap py-3 px-3 ${
              (theme === "darkTheme" && "Theme-block-container") ||
              (theme === "dimTheme" && "dimThemeBg")
            }`}
          >
            <div
              className="container mt-2"
              style={{
                backgroundColor:
                  theme === "dimTheme" ? "#111a2e" : "transparent",
                borderRadius: "8px",
              }}
            >
              {/* Heading button labeled "Values" */}
              <div className="d-flex justify-content-center mb-3">
                <div className="heading-btn">
                  <button
                    className={`box-4 items mx-2 ${
                      theme === "darkTheme"
                        ? "Theme-btn-block"
                        : theme === "dimTheme"
                        ? "dimThemeBorder"
                        : "lightThemeButtonBg"
                    } ${theme}`}
                    style={{
                      color: theme === "dimTheme" ? "#ffffff" : "#fff",
                    }}
                  >
                    You Give
                  </button>
                </div>
                <div className="heading-btn2">
                  <button
                    className={`box-4 items mx-2 ${
                      theme === "darkTheme"
                        ? "Theme-btn-block"
                        : theme === "dimTheme"
                        ? "dimThemeBorder"
                        : "lightThemeButtonBg"
                    } ${theme}`}
                    style={{
                      color: theme === "dimTheme" ? "#ffffff" : "#fff",
                    }}
                  >
                    You Get
                  </button>
                </div>
              </div>

              <div className="list-group">
                {[
                  {
                    label:
                      "Ratio Swap 5 Million Loan tokens for 10 Million State tokens",
                    value: "100",
                    give: "50",
                  },
                  {
                    label:
                      "Ratio Swap 3 Million Texan tokens for 100 Million State tokens",
                    value: "200",
                    give: "100",
                  },
                  {
                    label:
                      "Ratio Swap 200 Million State tokens for 10 Million Hex tokens",
                    value: "50",
                    give: "25",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="list-group-item d-flex align-items-center justify-content-between border-0"
                    style={{
                      backgroundColor:
                        theme === "dimTheme" ? "#111a2e" : "#ffffff",
                      color: theme === "dimTheme" ? "#ffffff" : "#000000",
                      borderRadius: "8px",
                      marginTop: "-1vh",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      {/* Display a pair of logos */}
                      <div className="d-flex align-items-center me-3">
                        <img
                          src={logos[index * 2]} // First logo in the pair
                          alt={`Logo ${index * 2 + 1}`}
                          className="rounded-circle me-2"
                          style={{ width: "24px", height: "24px" }}
                        />
                        <img
                          src={logos[index * 2 + 1]} // Second logo in the pair
                          alt={`Logo ${index * 2 + 2}`}
                          className="rounded-circle"
                          style={{
                            width: "24px",
                            height: "24px",
                            backgroundColor:
                              theme === "dimTheme" ? "#ffffff" : "transparent",
                          }}
                        />
                      </div>
                      <span className="font-style">{item.label}</span>
                    </div>

                    <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                      <button
                        className={`box-4 items mx-2 ${
                          theme === "darkTheme"
                            ? "Theme-btn-block"
                            : theme === "dimTheme"
                            ? "dimThemeBorder"
                            : "lightThemeButtonBg"
                        } ${theme}`}
                      >
                        ${item.give}
                      </button>
                      <button
                        className={`box-4 items mx-2 ${
                          theme === "darkTheme"
                            ? "Theme-btn-block"
                            : theme === "dimTheme"
                            ? "dimThemeBorder"
                            : "lightThemeButtonBg"
                        } ${theme}`}
                      >
                        ${item.value} 
                      </button>
                      <button
                        className={`box-4 items mx-2 glowing-button ${
                          theme === "darkTheme"
                            ? "Theme-btn-block"
                            : theme === "dimTheme"
                            ? "dimThemeBorder"
                            : "lightThemeButtonBg"
                        } ${theme}`}
                        style={{ marginLeft: "-10vh !important" }}
                      >
                        SWAP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DavSwap;
