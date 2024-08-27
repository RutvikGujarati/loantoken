import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { themeContext } from "../../App";
import LogoTransparent from "../../Assets/LogoTransparent.png";
import bnblogo from "../../Assets/bnb.png";
import baseIcon from "../../Assets/base.png";
import Quick_Guide from "../../Assets/Docs/Quick Guide - System State V1.7.pdf";
import ton from "../../Assets/ton.png";
import fantom from "../../Assets//fantom.png";
import pxen from "../../Assets/XEN.png";
import tron from "../../Assets/tron.png";
import solana from "../../Assets/solana.png";
import arbitrum from "../../Assets/arbitrum.png";
import optimism from "../../Assets/optimism.png";
import AvaxIcon from "../../Assets/avax.png";
import mumbaiIcon from "../../Assets/Token List Icon/chain-light.svg";
import lightETH_Icon from "../../Assets/Token List Icon/ethereum.svg";
import lightMode from "../../Assets/Icons/light-mode.png";
import darkETH_Icon from "../../Assets/Token List Icon/ethereum-original-light.svg";
import Modal from "react-modal";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { allInOnePopup } from "../../Utils/ADDRESSES/Addresses";
import { functionsContext } from "../../Utils/Functions";
import { ethers } from "ethers";
Modal.setAppElement("#root");
export default function Index() {
  const { themeMode, setThemeMode, theme } = useContext(themeContext);
  const {
    ProvidermetamaskLogin,
    userConnected,
    accountAddress,
    networkName,
    currencyName,
  } = useContext(Web3WalletContext);
  const { getPrice, socket } = useContext(functionsContext);
  const [price, setprice] = useState(0);

  const fetchPrice = async () => {
    try {
      let price = await getPrice();
      let formattedPrice = ethers.utils.formatEther(price || "0");
      setprice(formattedPrice);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const [connectedIcon, setConnectedIcon] = useState(mumbaiIcon);
  const [themeIcon, setThemeIcon] = useState(
    <i
      className="far fa-sun fa-fw dropdown-item-icon theme-icon me-1"
      data-href="#fa-sun-bright"
    />
  );
  const getIcon = async () => {
    if (currencyName) {
      if (currencyName === "PLS") {
        setConnectedIcon(LogoTransparent);
      } else if (currencyName === "MATIC") {
        setConnectedIcon(mumbaiIcon);
      } else if (currencyName === "ETH") {
        setConnectedIcon(lightETH_Icon);
      } else if (currencyName === "BNB") {
        setConnectedIcon(bnblogo);
      }
    }
  };
  const getThemeIcon = () => {
    if (theme === "lightTheme") {
      setThemeIcon(
        <i
          className="far fa-sun fa-fw dropdown-item-icon theme-icon me-1"
          data-href="#fa-sun-bright"
        />
      );
    } else if (theme === "dimTheme") {
      setThemeIcon(
        <i
          className="fa-solid fa-cloud-moon-rain fa-fw dropdown-item-icon theme-icon me-1"
          data-href="#fa-moon-stars"
        ></i>
      );
    } else if (theme === "darkTheme") {
      setThemeIcon(
        <i
          className="far fa-moon fa-fw dropdown-item-icon theme-icon me-1"
          data-href="#fa-moon"
        ></i>
      );
    }
  };

  const buttonClass =
    theme === "lightTheme"
      ? "icon-btnLight"
      : theme === "dimTheme"
      ? "icon-btnDim"
      : theme === "darkTheme"
      ? "icon-btnDark"
      : "";

  let backgroundColor = "transparent";

  useEffect(() => {
    getIcon();
    getThemeIcon();
    if (userConnected) {
      fetchPrice();
      ProvidermetamaskLogin();
    }
  }, [currencyName, theme, socket, userConnected]);
  useEffect(() => {
    // allInOnePopup(`info`, `Welcome to System State Protocol`, `This page is a demo page only`, `OK`, true)
    if (!userConnected) {
      ProvidermetamaskLogin();
    }
  }, [currencyName, userConnected]);
  const location = useLocation();
  const currentPath = location.pathname;
  const isCreateVaultsPage = currentPath === "/PLS/mint";

  const isOnInscription = "active"; // const isOnInscription = location.pathname === '/inscription' ? 'active' : ''
  const isInflationXEN = location.pathname === "/XEN";
  const isInflationPLS = location.pathname === "/PLS";
  const isPDXN = location.pathname === "/PDXN";
  const isPFENIX = location.pathname === "/PFENIX";
  const isDEFI = location.pathname === "/DEFI";
  const isHEX = location.pathname === "/HEX";
  const isSwap = location.pathname === "/swap";
  const isTEXAN = location.pathname === "/TEXAN";
  const isWATT = location.pathname === "/WATT";
  const isREX = location.pathname === "/REX";
  const isLoan = location.pathname === "/LOAN";
  const isPTGC = location.pathname === "/PTGC";

  if (
    isCreateVaultsPage ||
    isInflationPLS ||
    isInflationXEN ||
    isPDXN ||
    isPFENIX ||
    isDEFI ||
    isHEX ||
    isLoan ||
    isPTGC ||
    isREX ||
    isWATT ||
    isTEXAN
  ) {
    if (theme === "lightTheme") {
      backgroundColor = "#000";
    } else if (theme === "dimTheme") {
      backgroundColor = "#fff";
    }
  }
  const [loading, setLoading] = useState(false);
  const Loader = () => {
    return (
      <div style={loaderStyle}>
        <div className="spinner"></div>
      </div>
    );
  };

  const loaderStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(1px)", // Apply blur
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Ensure it's on top
  };

  const NavButtons = ({
    image,
    width = 25,
    height = 25,
    to,
    active = true,
  }) => (
    <div className="token-price me-0.1">
      <Link
        className={`btn btn-lg btn-white mx-1 content-center p-0 ${
          (theme === "lightTheme" && "icon-btnLight") ||
          (theme === "dimTheme" && theme + " icon-btnDim") ||
          (theme === "darkTheme" && "icon-btnDark")
        }`}
        to={to}
        style={{
          // filter: active ? "none" : "blur(1px)", // Subtle blur when inactive
          opacity: active ? 1 : 0.2, // Reduce opacity when inactive
          pointerEvents: active ? "auto" : "none", // Disable interaction if not active
          backgroundColor: active ? "#fff" : "transparent", // Transparent background when inactive
          transition: "all 0.3s ease", // Smooth transition for the effect
        }}
      >
        <div className="theme-btn-main">
          <img
            src={image}
            alt="nav-button"
            width={width}
            height={height}
            className="theme-img-round"
          />
        </div>
      </Link>
    </div>
  );

  const getPLSBackgroundColor = (route) => {
    if (
      currentPath === "/PLS/mint" ||
      [
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
        "TRADE",
      ].some(
        (path) =>
          currentPath.includes(path) &&
          !currentPath.includes("mXEN") &&
          !currentPath.includes("bXEN")
      )
    ) {
      if (theme === "lightTheme") {
        return "#000"; // Dark color for light theme
      } else if (theme === "dimTheme") {
        return "#fff"; // Light color for dim theme
      } else if (theme === "darkTheme") {
        return "#fff"; // Light color for dark theme
      }
    }
    return "transparent";
  };
  const getBNBBackgroundColor = (route) => {
    if (
      currentPath === "/BNB/mint" ||
      ["bXEN", "BNB", "bFENIX", "bDXN"].some((path) =>
        currentPath.includes(path)
      )
    ) {
      if (theme === "lightTheme") {
        return "#000"; // Dark color for light theme
      } else if (theme === "dimTheme") {
        return "#fff"; // Light color for dim theme
      } else if (theme === "darkTheme") {
        return "#fff"; // Light color for dark theme
      }
    }
    return "transparent";
  };
  const getPolygonBackgroundColor = (route) => {
    if (
      currentPath === "/polygon/mint" ||
      ["mXEN", "MATIC", "mDXN", "mFENIX"].some((path) =>
        currentPath.includes(path)
      )
    ) {
      if (theme === "lightTheme") {
        return "#000"; // Dark color for light theme
      } else if (theme === "dimTheme") {
        return "#fff"; // Light color for dim theme
      } else if (theme === "darkTheme") {
        return "#fff"; // Light color for dark theme
      }
    }
    return "transparent";
  };
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleGoToSwap = () => {
    navigate("/swap");
  };
  const switchNetwork = async (networkId) => {
    setLoading(true);

    if (window.ethereum) {
      try {
        if (!userConnected) {
          ProvidermetamaskLogin();
        }
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networkId }],
        });
        if (networkId === "0x171") {
          navigate("/PLS/mint");
          setConnectedIcon(LogoTransparent);
        } else if (networkId === "0x38") {
          navigate("/BNB/mint");
          setConnectedIcon(bnblogo);
        } else if (networkId === "0x89") {
          navigate("/polygon/mint");
          setConnectedIcon(mumbaiIcon);
        }
      } catch (switchError) {
        console.log("error on switching or user rejected for changing chain");
      } finally {
        setLoading(false); // Always stop loading after attempting the switch
      }
    } else {
      console.log("MetaMask is not installed.");
      setLoading(false); // Stop loading if MetaMask is not available
    }
  };

  return (
    <>
      <div
        className={` nav-pr py-1 sticky-top sticky-lg-top d-flex flex-row ${theme} ${
          (theme === "darkTheme" && "DarkThemeBorderBtm") ||
          (theme === "dimTheme" && "themeTrackBorderBtm") ||
          "border-bottom"
        }`}
        id="Nav-top"
      >
        <div className="container-xxl d-flex justify-content-between">
          <div
            id="ethPrice"
            className="d-flex my-auto w-100 justify-content-between align-items-sm-center gap-3 sm-font"
          >
            <div className={`d-flex align-items-center ${theme}`}>
              {loading && <Loader />} {/* Show loader when loading is true */}
              <div className="token-price me-0.1">
                <button
                  className={`btn btn-lg btn-white mx-1 content-center p-0 ${buttonClass}`}
                  onClick={(e) => {
                    e.preventDefault();
                    switchNetwork("0x171");
                  }}
                  style={{
                    backgroundColor: getPLSBackgroundColor("/PLS/mint"),
                  }}
                >
                  <div className={`theme-btn-main `}>
                    <img
                      src={LogoTransparent}
                      alt="pls"
                      width="30"
                      height="30"
                      className="theme-img-round"
                    />
                  </div>
                </button>
              </div>
              <div className="token-price me-0.1">
                <button
                  className={`btn btn-lg btn-white mx-1 content-center p-0 ${buttonClass}`}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default link behavior
                    switchNetwork("0x38");
                  }}
                  // onClick={() => switchNetwork('0x61')}
                  style={{
                    backgroundColor: getBNBBackgroundColor("/BNB/mint"),
                  }}
                >
                  <div className={`theme-btn-main `}>
                    <img
                      src={bnblogo}
                      alt="pls"
                      width="25"
                      height="25"
                      className="theme-img-round"
                    />
                  </div>
                </button>
              </div>
              <div className="token-price me-0.1">
                <button
                  className={`btn btn-lg btn-white mx-1 content-center p-0 ${buttonClass}`}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default link behavior
                    switchNetwork("0x89");
                  }}
                  // onClick={() => switchNetwork('0x61')}
                  style={{
                    backgroundColor: getPolygonBackgroundColor("/polygon/mint"),
                  }}
                >
                  <div className={`theme-btn-main `}>
                    <img
                      src={mumbaiIcon}
                      alt="pls"
                      width="25"
                      height="25"
                      className="theme-img-round"
                    />
                  </div>
                </button>
              </div>
              {/* <NavButtons image={bnblogo} /> */}
              {/* <NavButtons image={mumbaiIcon} /> */}
              <NavButtons image={AvaxIcon} active={false} />
              <NavButtons image={lightETH_Icon} active={false} />
              <NavButtons image={baseIcon} active={false} />
              <NavButtons image={ton} active={false} />
              <NavButtons
                image={fantom}
                height={35}
                width={40}
                active={false}
              />
              <NavButtons image={tron} active={false} />
              <NavButtons
                image={solana}
                height={30}
                width={30}
                active={false}
              />
              <NavButtons image={optimism} active={false} />
              <NavButtons image={arbitrum} active={false} />
            </div>

            <div className={`d-flex navBar-btn me-3 ${isOnInscription}`}>
              {isSwap && (
                <div
                  className={`box-3 quicks ${
                    (theme === "darkTheme" && "Theme-btn-block") ||
                    (theme === "dimTheme" && "dimThemeBtnBg")
                  }`}
                  style={{
                    marginTop: "3px",
                    fontSize: "10px",
                    marginRight: "10px",
                    width: "90px",
                  }}
                >
                  <Link onClick={handleGoBack}>
                    <span className="mouse-point">DAV</span>
                  </Link>
                </div>
              )}

              <div
                className={`box-3 quicks ${
                  (theme === "darkTheme" && "Theme-btn-block") ||
                  (theme === "dimTheme" && "dimThemeBtnBg")
                }`}
                style={{
                  marginTop: "3px",
                  fontSize: "10px",
                  marginRight: "10px",
                  width: "90px",
                }}
              >
                <Link to={"/swap"}>
                  <span className="text">Auction/OTC</span>
                </Link>
              </div>
              <div
                className={`box-3 quicks ${
                  (theme === "darkTheme" && "Theme-btn-block") ||
                  (theme === "dimTheme" && "dimThemeBtnBg")
                }`}
                style={{
                  marginTop: "3px",
                  fontSize: "10px",
                  marginRight: "10px",
                  width: "90px",
                }}
              >
                <span className="text">
                  <Link target="_blank" to={Quick_Guide}>
                    Quick Guide
                  </Link>
                </span>
              </div>

              <div
                className={`box-3  ${
                  (theme === "darkTheme" && "Theme-btn-block") ||
                  (theme === "dimTheme" && "dimThemeBtnBg")
                }`}
                style={{ marginTop: "3px", fontSize: "10px", width: "90px" }}
              >
                <span className=" ">
                  {userConnected
                    ? `${accountAddress.substring(
                        0,
                        4
                      )}...${accountAddress.substring(
                        accountAddress.length - 4
                      )}`
                    : "Not Connected"}
                </span>
              </div>
            </div>
          </div>
          <div id="divThemeSetting" className="dropdown  my-auto d-flex">
            <button
              className={`btn btn-lg btn-white mx-1 content-center  p-0  ${
                (theme === "lightTheme" && " icon-btnLight") ||
                (theme === "dimTheme" && theme + " icon-btnDim") ||
                (theme === "darkTheme" && " icon-btnDark")
              } `}
              type="button"
              id="dropdownMenuTopbarSettings"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "2.375rem", height: "2.375rem" }}
            >
              <div className="theme-btn-main ">
                {themeIcon}
                {/* <i className="far fa-sun fa-fw p-0 fs-6 w-100 h-100" icon="" data-href="#fa-sun-bright" /> */}
              </div>
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-end  px-2 ${
                (theme == "darkTheme" && theme + " darkUL") ||
                (theme == "dimTheme" && theme + " dimUL")
              }`}
              aria-labelledby="dropdownMenuTopbarSettings"
              style={{
                position: "absolute",
                inset: "0px 0px auto auto",
                margin: "0px",
                transform: "translate(0px, 40px)",
              }}
              data-popper-placement="bottom-end"
            >
              <li className="">
                <button
                  type="button"
                  value={themeMode}
                  className={`dropdown-item theme-btn ${
                    themeMode === "light" && "click"
                  }`}
                  data-bs-theme-value="light"
                  onClick={() => {
                    localStorage.setItem("theme", "light");
                    setThemeMode(localStorage.getItem("theme"));
                  }}
                >
                  <i
                    className="far fa-sun fa-fw dropdown-item-icon theme-icon me-1"
                    data-href="#fa-sun-bright"
                  />
                  {/* <img className="" src={lightMode} width={'25px'} height={'25px'} alt="" /> */}
                  <span className="ms-1">Light</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  value={themeMode}
                  className={`dropdown-item theme-btn ${
                    themeMode === "dim" && "click"
                  }`}
                  data-bs-theme-value="dim"
                  onClick={() => {
                    localStorage.setItem("theme", "dim");
                    setThemeMode(localStorage.getItem("theme"));
                  }}
                >
                  <i
                    className="fa-solid fa-cloud-moon-rain fa-fw dropdown-item-icon theme-icon me-1"
                    data-href="#fa-moon-stars"
                  ></i>{" "}
                  Dim
                </button>
              </li>
            </ul>

            <button
              className={`icon-btn2 btn btn-lg btn-white mx-1 content-center p-2 ${
                (theme === "lightTheme" && " icon-btnLight") ||
                (theme === "dimTheme" && theme + " icon-btnDim") ||
                (theme === "darkTheme" && " icon-btnDark")
              }  `}
              type="button"
              id="dropdownMenuLink"
              data-bs-auto-close="outside"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "2.375rem", height: "2.375rem" }}
            >
              {/* <div className="theme-btn-main minLogo h-100 w-100"> */}
              <img
                alt="currency-icon"
                className={`w-100 h-100  ${
                  (connectedIcon === "LogoTransparent" && "logoLarge") ||
                  (theme === "dimTheme" && "logoDimTwo") ||
                  (theme === "darkTheme" && "logoDarkTwo")
                }`}
                src={connectedIcon}
                data-href="#fa-sun-bright"
              />
              {/* </div> */}
            </button>
            <ul
              className={`dropdown-menu ${
                (theme == "lightTheme" && "logoLight") ||
                (theme == "dimTheme" && theme + " logoDim") ||
                (theme == "darkTheme" && "logoDark")
              } ${
                (theme == "darkTheme" && theme + " darkUL") ||
                (theme == "dimTheme" && theme + " dimUL")
              }`}
              style={{ fontSize: "13px" }}
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                {
                  <Link
                    className={`dropdown-item color-name ${
                      (theme === "lightTheme" && "color-name") ||
                      (theme === "dimTheme" && theme + " logoDim")
                    }`}
                    to="#"
                    onClick={() => !userConnected && ProvidermetamaskLogin()}
                  >
                    {userConnected ? networkName : "Connect Wallet"}
                  </Link>
                }
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`d-flex p-0 m-0 ${
            (theme === "darkTheme" && "DarkThemeBorderBtm") ||
            (theme === "dimTheme" && "themeTrackBorderBtm") ||
            "border-bottom"
          }`}
        ></div>
      </div>
    </>
  );
}
