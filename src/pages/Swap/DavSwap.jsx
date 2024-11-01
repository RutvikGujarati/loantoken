import React, { useContext } from "react";
import { themeContext } from "../../App";
import pstate from "../../Assets/Token List Icon/pstate.png";
import loan from "../../Assets/Token List Icon/loan.png";
import texan from "../../Assets/Token List Icon/texan.png";
import hex from "../../Assets/Token List Icon/hex.png";
const DavSwap = () => {
  const { theme } = useContext(themeContext);

  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  // Array of logo image paths
  const logos = [loan, pstate, texan, pstate, pstate, hex];

  return (
    <>
      <div
        className={`info-item info-columns box swap2 mt-4 mb-4 ${
          (theme === "darkTheme" && "Theme-btn-block") ||
          (theme === "dimTheme" && "dimThemeBorder") ||
          (theme === "lightTheme" && theme + "translite")
        }`}
        style={{ marginLeft: "17vh" }}
      >
        <p className="text-center">AUCTIONS</p>
      </div>
      <div
        className={`top-container ${
          (theme === "darkTheme" && "darkThemeTrackingBg") ||
          (theme === "dimTheme" && "dimTheme-index-class")
        }`}
      >
        <div
          className={`top-container  container-xxl  ${
            (theme === "darkTheme" && "darkThemeTrackingBg") ||
            (theme === "dimTheme" && "dimTheme-index-class")
          }`}
          style={{ marginTop: "30vh" }}
        >
          <div
            className={`main-section ${shadow} me-auto card d-flex flex-wrap py-3 px-3 ${
              (theme === "darkTheme" && "Theme-block-container") ||
              (theme === "dimTheme" && "dimThemeBg")
            }`}
          >
            <div
              className="container mt-4"
              style={{
                backgroundColor:
                  theme === "dimTheme" ? "#111a2e" : "transparent",
                // padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div className="list-group">
                {[
                  {
                    label:
                      "Ratio Swap 5 Million Loan tokens for 10 Million State tokens",
                  },
                  {
                    label:
                      "Ratio Swap 3 Million Texan tokens for 100 Million State tokens",
                  },
                  {
                    label:
                      "Ratio Swap 200 Million State tokens for 10 Million Hex tokens",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="list-group-item d-flex align-items-center justify-content-between border-0 "
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
                      <span className="font-style">{item.label}</span>{" "}
                      {/* Updated line */}
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        className={`box-4 items mx-2  ${
                          theme === "darkTheme"
                            ? "Theme-btn-block"
                            : theme === "dimTheme"
                            ? "dimThemeBorder"
                            : "lightThemeButtonBg"
                        } ${theme}`}
                      >
                        $0.00
                      </button>
                      <button
                        className={`box-4 items mx-2  ${
                          theme === "darkTheme"
                            ? "Theme-btn-block"
                            : theme === "dimTheme"
                            ? "dimThemeBorder"
                            : "lightThemeButtonBg"
                        } ${theme}`}
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
