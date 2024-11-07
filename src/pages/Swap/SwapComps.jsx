import React, { useContext, useEffect, useState } from "react";
import { themeContext } from "../../App";
import { Clipboard, ClipboardCheck, FileEarmark } from "react-bootstrap-icons"; // Import Bootstrap icons
import fistPump from "../../Assets/High-Resolutions-Svg/Updated/fist pump small.svg";
import "./swap.css";
import { allInOnePopup } from "../../Utils/ADDRESSES/Addresses";
import Swal from "sweetalert2";

const SwapComps = () => {
  const { theme } = useContext(themeContext);

  const [copied, setCopied] = useState(false);
  const contractAddress = "0x9159f1D2a9f51998Fc9Ab03fbd8f265ab14A1b3B";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copy status after 2 seconds
  };

  const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     // Set an interval to update the time every second
//     openPopUP();
//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     // Clean up the interval on unmount
//     return () => clearInterval(interval);
//   }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");

  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");

  // Function to handle popup close
//   const openPopUP = () => {
//     Swal.fire({
//       title: "Auction / OTC not live yet",
//       html: `<button id="fistPumpButton" class="fist-pump-img first_pump_serchbar ">
//       <img src="${fistPump}" alt="Fist Pump" style="width: 80px; height: 45px; border: none;
// " />
//      </button>`,
//       showConfirmButton: false,
//       allowOutsideClick: true,
//       allowEscapeKey: true,
//     });

//     document.getElementById("fistPumpButton").addEventListener("click", () => {
//       Swal.close();
//     });
//   };

  return (
    <div
      className={`top-container ${
        (theme === "darkTheme" && "darkThemeTrackingBg") ||
        (theme === "dimTheme" && "dimTheme-index-class")
      }`}
      style={{ marginTop: "20vh",marginLeft:"50vh" }}
    >
      <div
        className={`top-container hei container-xxl ${
          (theme === "darkTheme" && "darkThemeTrackingBg") ||
          (theme === "dimTheme" && "dimTheme-index-class")
        }`}
      >
        <div className="row">
          <div className="col-md-4 col-sm-6 col-12">
			
            <div
              className={`main-section ${shadow} me-auto card d-flex flex-wrap py-3 px-3 height ${
                (theme === "darkTheme" && "Theme-block-container") ||
                (theme === "dimTheme" && "dimThemeBg")
              }`}
            >
				
              <div className={`${spanDarkDim} mint-two`}>
                <div style={{ fontSize: "12px" }}>
					
                
                  {/* <div className={`${textTitle}  ${theme} py-3 fontStyle`}>
                    TRADE 30 MILLION LOAN TOKENS
                    <p className={`${textTitle}  mint-two fontStyle`}>
                      RECEIVE 2.8 MILLION PLS TOKENS
                    </p>
                  </div> */}
                  {/* <button
                    className={`fist-pump-img first_pump_serchbar  ${
                      (theme === "darkTheme" && "firstdumDark") ||
                      (theme === "dimTheme" && "dimThemeBg")
                    }`}
                    style={{ marginTop: "-15px" }}
                  >
                    <img src={fistPump} alt="" className="w-100 h-100" />
                  </button> */}
                  <div
                    className={`${textTitle} ${theme} `}
                    style={{ fontSize: "12px", marginTop: "20px" }}
                  >
                    {/* BALANCE
                    <p>0</p> */}
                    <div
                      className={`${textTitle} ${theme} fontStyle `}
                      style={{ fontSize: "12px", marginTop: "30px" }}
                    >
                      <p>TIME - {formatTime(currentTime)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6 col-12">
            <div
              className={`main-section  ${shadow} me-auto card d-flex flex-wrap py-3 px-3 height ${
                (theme === "darkTheme" && "Theme-block-container") ||
                (theme === "dimTheme" && "dimThemeBg")
              }`}
            >
              <div className={`${spanDarkDim} mint-two`}>
                <div style={{ fontSize: "12px" }}>
                  <h6>STATE TOKEN BURN - 0000 / 1.2%</h6>
                  {/* <div className={`${textTitle}  ${theme} py-3 fontStyle`}>
                    TRADE 2.6 BILLION LOAN TOKENS
                    <p className={`${textTitle}  mint-two fontStyle`}>
                      RECEIVE 334 MILLION PLS TOKENS
                    </p>
                  </div> */}
                  {/* <button
                    className={`fist-pump-img first_pump_serchbar  ${
                      (theme === "darkTheme" && "firstdumDark") ||
                      (theme === "dimTheme" && "dimThemeBg")
                    }`}
                    style={{ marginTop: "-15px" }}
                  >
                    <img src={fistPump} alt="" className="w-100 h-100" />
                  </button> */}

                  <div
                    className={`${textTitle} ${theme} `}
                    style={{ fontSize: "12px", marginTop: "20px" }}
                  >
                    {/* BALANCE
                    <p>0</p> */}
                    <div
                      className={`${textTitle} ${theme} fontStyle `}
                      style={{ fontSize: "12px", marginTop: "30px" }}
                    >
                      <p>TIME - {formatTime(currentTime)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-md-4 col-sm-12 col-12">
            <div
              className={`main-section ${shadow} me-auto card d-flex flex-wrap py-3 px-3 height ${
                (theme === "darkTheme" && "Theme-block-container") ||
                (theme === "dimTheme" && "dimThemeBg")
              }`}
            >
              <div className={`${spanDarkDim}`}>
                <h6>Other Info</h6>
                <div className={`${textTitle} ${theme} py-3 fontStyle`}>
                  TOKEN CONTRACT ADDRESS
                </div>

                <div
                  className="contract-address d-flex align-items-center"
                  style={{ fontSize: "13px" }}
                >
                  <FileEarmark className=" me-2" size={15} />
                  <a
                    href={`https://scan.mypinata.cloud/ipfs/bafybeih3olry3is4e4lzm7rus5l3h6zrphcal5a7ayfkhzm5oivjro2cp4/#/token/${contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="address-link me-2"
                  >
                    {contractAddress}
                  </a>
                  {copied ? (
                    <ClipboardCheck className="copy-icon" size={15} />
                  ) : (
                    <Clipboard
                      className="copy-icon"
                      size={15}
                      onClick={handleCopy}
                    />
                  )}
                  {copied && <span className=" text-success">Copied!</span>}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SwapComps;
