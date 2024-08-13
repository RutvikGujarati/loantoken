import React, { useContext, useEffect, useState } from "react";
import "../../Global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { themeContext } from "../../App";
import "../../Utils/Theme.css";
import "./Searchbar.css";
import metamask from "../../Assets/image.png";
import metamask_black from "../../Assets/metamask-black.png";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { Link, useLocation, useNavigate } from "react-router-dom";
import fistPump from "../../Assets/High-Resolutions-Svg/Updated/fist pump small.svg";
import SystemStateLogo from "../../Assets/High-Resolutions-Svg/Updated/logo.svg";
import { functionsContext } from "../../Utils/Functions";
import {
  conciseAddress,
  PSD_ADDRESS,
  bnbDAV,
  DAVMATIC,
  state_token,
  DAVDEFI,
} from "../../Utils/ADDRESSES/Addresses";
import { ethers } from "ethers";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [isDashboardInputDisabled, setIsDashboardInputDisabled] =
    useState(false);
  const [setIsBuyTokenInputDisabled] = useState(false);

  const { theme } = useContext(themeContext);
  let block =
    (theme === "lightTheme" && theme + " translite") ||
    (theme === "darkTheme" && theme + " transdark") ||
    (theme === "dimTheme" && theme + " transdim");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");
  let dark = theme === "lightTheme" && "text-dark";

  function addCommasAsYouType(e) {
    try {
      const inputValue = e.target.value;

      // Remove commas for numeric comparison and formatting
      const numericValue = inputValue.replace(/,/g, "");

      // Format the value with commas
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // Update the state
      setSearch(formattedValue);
      setDepositAmount(numericValue); // Keep the numeric value without commas
    } catch (error) {
      console.error("error:", error);
    }
  }

  const handleBlur = () => {
    if (search != undefined && search != "" && !search.includes(".")) {
      setSearch(`${search}.00`);
    }
  };
  const location = useLocation();
  const isHome = location.pathname === "/PLS/mint";
  const isBNB = location.pathname === "/BNB/mint";
  const isPolygon = location.pathname === "/polygon/mint";
  const isDEFI = location.pathname === "/DEFI";
  const ismFENIX = location.pathname === "/mFENIX";
  const isMatic = location.pathname === "/MATIC";
  const ismDXN = location.pathname === "/mDXN";
  const ismXEN = location.pathname === "/mXEN";
  const isXEN = location.pathname === "/XEN";
  const isPDXN = location.pathname === "/PDXN";
  const isPFENIX = location.pathname === "/PFENIX";
  const isPLS = location.pathname === "/PLS";
  const isHEX = location.pathname === "/HEX";
  const isTEXAN = location.pathname === "/TEXAN";
  const isWATT = location.pathname === "/WATT";
  const isREX = location.pathname === "/REX";
  const isLoan = location.pathname === "/LOAN";
  const isPTGC = location.pathname === "/PTGC";
  const [selectedValue, setSelectedValue] = useState("Deposit");
  const [balance, setBalance] = useState("Enter Amount");
  const [navigateToExplorer, setNavigateToExplorer] = useState("");
  const [toBeClaimed, setToBeClaimed] = useState("0");
  const [claimParityTokens, setClaimParityTokens] = useState("0");
  const [protocolFee, setProtocolFee] = useState("0");
  const [DepositAddress, setDepositAddress] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("");
  const [HoldAMount, setHoldTokens] = useState("0");

  const [allRewardAmount, setAllRewardAmount] = useState("");

  const {
    socket,
    approveAndDeposit,
    holdTokens,
    getProtocolFee,
    handleDeposit,
    handleDepositMATIC,
  } = useContext(functionsContext);
  const {
    accountAddress,
    networkName,
    userConnected,
    WalletBalance,
    currencyName,
  } = useContext(Web3WalletContext);
  const isHandleDeposit = async (e) => {
    e.preventDefault();
    const ContractType = "PSD";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositPDXN = async (e) => {
    e.preventDefault();
    const ContractType = "PDXN";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositHEX = async (e) => {
    e.preventDefault();
    const ContractType = "HEX";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositREX = async (e) => {
    e.preventDefault();
    const ContractType = "REX";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositTEXAN = async (e) => {
    e.preventDefault();
    let ContractType;
    if (isTEXAN) {
      ContractType = "TEXAN";
    }
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositLOAN = async (e) => {
    e.preventDefault();
    const ContractType = "LOAN";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositPTGC = async (e) => {
    e.preventDefault();
    const ContractType = "PTGC";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositWATT = async (e) => {
    e.preventDefault();
    const ContractType = "WATT";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositmXEN = async (e) => {
    e.preventDefault();
    const ContractType = "mxen";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositmDXN = async (e) => {
    e.preventDefault();
    const ContractType = "mdxn";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositFENIX = async (e) => {
    e.preventDefault();
    const ContractType = "mfenix";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };

  const isHandleDepositPFENIX = async (e) => {
    e.preventDefault();
    const ContractType = "PFENIX";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositPLS = async (e) => {
    e.preventDefault();
    const isSuccess = await handleDeposit(depositAmount);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositMatic = async (e) => {
    e.preventDefault();
    const isSuccess = await handleDepositMATIC(depositAmount);
    if (isSuccess) {
      setSearch("");
    }
  };
  const HoldTokensOfUser = async (accountAddress) => {
    try {
      if (!accountAddress) {
        throw new Error("Account address is undefined");
      }
      let ContractType;
      if (isHome) {
        ContractType = "DAV";
      } else if (isDEFI) {
        ContractType = "DAVDEFI";
      } else if (isBNB) {
        ContractType = "BNBDAV";
      } else if (isPolygon) {
        ContractType = "DAVMATIC";
      }
      const holdToken = await holdTokens(accountAddress, ContractType);
      const formattedPrice = ethers.utils.formatEther(holdToken || "0");
      console.log("hold tokensssssss", formattedPrice);
      setHoldTokens(formattedPrice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accountAddress) {
      HoldTokensOfUser(accountAddress);
    }
  });

  const addTokenToWallet = async () => {
    const addresses = {
      "/DEFI": { address: DAVDEFI, symbol: "DAVDEFI" },
      "/BNB/mint": { address: bnbDAV, symbol: "DAVBNB" },
      "/polygon/mint": { address: DAVMATIC, symbol: "DAVMATIC" },
      default: { address: state_token, symbol: "DAVPLS" },
    };

    // Determine which address and symbol to use based on the current path
    const currentPath = location.pathname;
    const tokenDetails = addresses[currentPath] || addresses.default;

    if (window.ethereum) {
      try {
        console.log("Token Address:", tokenDetails.address);
        console.log("Token Symbol:", tokenDetails.symbol);

        if (!tokenDetails.address) {
          throw new Error("Token address is not defined");
        }

        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: tokenDetails.address,
              symbol: tokenDetails.symbol,
              decimals: "18",
            },
          },
        });
      } catch (error) {
        console.error("Failed to add token to wallet", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  const getPlaceHolder = async () => {
    if (isHome) {
      if (selectedValue === "Deposit") {
        setPlaceHolder(balance);
        setIsDashboardInputDisabled(false);
      } else if (selectedValue === "Claim IPT & RPT") {
        setPlaceHolder(toBeClaimed);
        setIsDashboardInputDisabled(true);
        setSearch("");
      } else if (selectedValue === "Claim Parity Tokens") {
        setPlaceHolder(claimParityTokens);
        setIsDashboardInputDisabled(true);
        setSearch("");
      } else if (selectedValue === "Claim Protocol Fee") {
        console.log("setPlaceHolder(protocolFee):", protocolFee);
        setPlaceHolder(protocolFee);
        setIsBuyTokenInputDisabled(true);
        setSearch("");
      } else if (selectedValue === "Claim All Reward") {
        console.log("allrewardAmount:", allRewardAmount);
        setPlaceHolder(allRewardAmount);
        setIsDashboardInputDisabled(true);
        setSearch("");
      }
    } else {
    }
  };
  const navigate = useNavigate();

  const handleClickDEFI = () => {
    navigate("/DEFI");
  };
  const handleClickFP = () => {
    navigate("/PLS/mint");
  };
  const handleClickBNBMINT = () => {
    navigate("/BNB/mint");
  };
  const handleClickpolygonMINT = () => {
    navigate("/polygon/mint");
  };
  const ProtocolFee = async () => {
    try {
      let protocolFee = await getProtocolFee(accountAddress);
      let protocolAmount = await protocolFee?.protocolAmount;
      let fixed = Number(protocolAmount).toFixed(4) + " " + currencyName;
      setProtocolFee(fixed);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const currentAddress =
    "0xc04c964d6BdC5fe2163E84bC06d9d0775Bdb369F".toLowerCase();

  const depositAddressCheck = () => {
    return currentAddress === accountAddress;
  };

  console.log("isXEN:", isXEN);
  console.log("accountAddress:", accountAddress);
  console.log("currentAddress:", currentAddress);
  console.log("Addresses match:", depositAddressCheck());

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
  const explorer_URL = async () => {
    if ((await networkName) === "Polygon Mumbai") {
      return `https://mumbai.polygonscan.com/address`;
    } else {
      return `https://mumbai.polygonscan.com/address`;
    }
  };
  const navToExplorer = async () => {
    const baseUrl = await explorer_URL();
    if (isHome) {
      return `${baseUrl}/${PSD_ADDRESS}`;
    } else {
      return `${baseUrl}/${state_token}`;
    }
  };

  const depositHandlers = {
    PDXN: isHandleDepositPDXN,
    PLS: isHandleDepositPLS,
    PFENIX: isHandleDepositPFENIX,
    XEN: isHandleDeposit,
    // DAV: isHandleDepositDAV,
    // DAVDEFI: isHandleDepositDAVDEFI,
    // BNB: isHandleDepositBNB,
    // BNBDAV: isHandleDepositBNBDAV,
    // DAVMATIC: isHandleDepositDAVMATIC,
    MATIC: isHandleDepositMatic,
    MXEN: isHandleDepositmXEN,
    MFENIX: isHandleDepositFENIX,
    MDXN: isHandleDepositmDXN,

    LOAN: isHandleDepositLOAN,
    HEX: isHandleDepositHEX,
    PTGC: isHandleDepositPTGC,
    TEXAN: isHandleDepositTEXAN,
    REX: isHandleDepositREX,
    WATT: isHandleDepositWATT,
  };
  const DepositButton = ({ token }) => {
    const handler = depositHandlers[token];

    if (!handler) {
      console.error(`No handler found for token: ${token}`);
      return null;
    }

    return (
      <button
        disabled={
          selectedValue === "Deposit" &&
          (Number(search) <= 0 && search === "" ? true : false)
        }
        className={`fist-pump-img first_pump_serchbar ${
          (theme === "darkTheme" && "firstdumDark") ||
          (theme === "dimTheme" && "dimThemeBg")
        }`}
        onClick={(e) => handler(e, token)} // Pass token to the handler
      >
        <img src={fistPump} alt="" className="w-100 h-100" />
      </button>
    );
  };
  useEffect(() => {
    try {
      navToExplorer()
        .then((res) => {
          setNavigateToExplorer(res);
        })
        .catch((error) => {});
      if (!userConnected) {
        let fixedBalance =
          Number(WalletBalance || "0").toFixed(4) + " " + currencyName;
        setBalance(fixedBalance);
      }
    } catch (error) {}
  }, [accountAddress, networkName]);
  useEffect(() => {
    if (userConnected) {
      let fixedBalance =
        Number(WalletBalance || "0").toFixed(4) + " " + currencyName;
      setBalance(fixedBalance);
      getPlaceHolder();
      ProtocolFee();
    }
  }, [socket]);
  console.log("current account for bar", accountAddress);

  const buttonData = [
    { name: "FIRST PRINCIPLES", onClick: handleClickFP, isActive: isHome },
    { name: "DEFI", onClick: handleClickDEFI, isActive: isDEFI },
    { name: "TRADE", onClick: () => {}, isActive: false },
    { name: "MEME", onClick: () => {}, isActive: false },
    { name: "INNOVATION", onClick: () => {}, isActive: false },
    { name: "NFT / GAMING", onClick: () => {}, isActive: false },
    { name: "GOVERNANCE", onClick: () => {}, isActive: false },
  ];
  const buttonBNBData = [
    { name: "FIRST PRINCIPLES", onClick: handleClickBNBMINT, isActive: isBNB },
    { name: "DEFI", onClick: () => {}, isActive: false },
    { name: "TRADE", onClick: () => {}, isActive: false },
    { name: "MEME", onClick: () => {}, isActive: false },
    { name: "INNOVATION", onClick: () => {}, isActive: false },
    { name: "NFT / GAMING", onClick: () => {}, isActive: false },
    { name: "GOVERNANCE", onClick: () => {}, isActive: false },
  ];
  const buttonPOLYGONData = [
    {
      name: "FIRST PRINCIPLES",
      onClick: handleClickpolygonMINT,
      isActive: isPolygon,
    },
    { name: "DEFI", onClick: () => {}, isActive: false },
    { name: "TRADE", onClick: () => {}, isActive: false },
    { name: "MEME", onClick: () => {}, isActive: false },
    { name: "INNOVATION", onClick: () => {}, isActive: false },
    { name: "NFT / GAMING", onClick: () => {}, isActive: false },
    { name: "GOVERNANCE", onClick: () => {}, isActive: false },
  ];

  const getButtonClass = () => {
    switch (theme) {
      case "darkTheme":
        return "glowing-button Theme-btn-block";
      case "dimTheme":
        return "dimThemeBorder glowing-button";
      case "lightTheme":
        return "lightThemeButtonBg ";
      default:
        return "";
    }
  };
  return (
    <>
      <div
        className={`main-search p-0 lightBg darkBg ${
          (theme === "darkTheme" && "seachThemeBgDark") ||
          (theme === "dimTheme" && "seachThemeBgDim")
        }`}
      >
        <div className={`d-flex serach-container container-xxl`}>
          <div className="d-flex w-100 my-auto">
            <div className="d-flex flex-wrap justify-content-between w-100 searchBar">
              <div className="input-search firstSeach_small col-md-7 py-3">
                {isXEN ||
                isPDXN ||
                isPFENIX ||
                isPLS ||
                isHEX ||
                isLoan ||
                isPTGC ||
                isREX ||
                isWATT ||
                ismFENIX ||
                ismDXN ||
                ismXEN ||
                isMatic ||
                isTEXAN ? (
                  <>
                    {DepositAddress && (
                      <div
                        className={`search searchbar-pad ${theme} ${
                          theme === "lightTheme" && "text-dark"
                        } ${
                          (theme === "darkTheme" && "Theme-block-container") ||
                          (theme === "dimTheme" && "dimThemeBg")
                        }`}
                        // style={{ marginTop: "50px" }}
                      >
                        <p
                          className={`m-0 ms-3 tokenSize d-none d-md-block ${
                            block + dark
                          } ${
                            (theme === "lightTheme" && "depositInputLight") ||
                            (theme === "dimTheme" &&
                              "depositInputGrey darkColor")
                          } ${
                            theme === "darkTheme" &&
                            "depositInputDark darkColor"
                          }`}
                        >
                          <div style={{ marginLeft: "40px" }}>
                            {isXEN
                              ? "XEN"
                              : isPDXN
                              ? "PDXN"
                              : isPFENIX
                              ? "PFENIX"
                              : isMatic
                              ? "MATIC"
                              : ismDXN
                              ? "mDXN"
                              : ismFENIX
                              ? "mFENIX"
                              : ismXEN
                              ? "mXEN"
                              : isHEX
                              ? "HEX"
                              : isREX
                              ? "REX"
                              : isPTGC
                              ? "PTGC"
                              : isWATT
                              ? "WATT"
                              : isTEXAN
                              ? "TEXAN"
                              : isLoan
                              ? "LOAN"
                              : "PLS"}
                          </div>
                        </p>

                        <form className="w-100 search-form">
                          <input
                            className={`w-75 ms-3 me-4 form-control inputactive ${block} ${
                              (theme === "lightTheme" && "depositInputLight") ||
                              (theme === "dimTheme" &&
                                "depositInputGrey darkColor")
                            } ${
                              theme === "darkTheme" &&
                              "depositInputDark darkColor"
                            }`}
                            pattern="[0-9,.]*" // Only allow digits, commas, and dots
                            type="text"
                            disabled={isDashboardInputDisabled}
                            onBlur={handleBlur}
                            value={search}
                            placeholder={placeHolder}
                            onChange={(e) => addCommasAsYouType(e)}
                          />
                          {isXEN ? (
                            <DepositButton token="XEN" />
                          ) : isPDXN ? (
                            <DepositButton token="PDXN" />
                          ) : isPFENIX ? (
                            <DepositButton token="PFENIX" />
                          ) : isPLS ? (
                            <DepositButton token="PLS" />
                          ) : isLoan ? (
                            <DepositButton token="LOAN" />
                          ) : isHEX ? (
                            <DepositButton token="HEX" />
                          ) : isREX ? (
                            <DepositButton token="REX" />
                          ) : isTEXAN ? (
                            <DepositButton token="TEXAN" />
                          ) : isWATT ? (
                            <DepositButton token="WATT" />
                          ) : isPTGC ? (
                            <DepositButton token="PTGC" />
                          ) : isMatic ? (
                            <DepositButton token="MATIC" />
                          ) : ismXEN ? (
                            <DepositButton token="MXEN" />
                          ) : ismDXN ? (
                            <DepositButton token="MDXN" />
                          ) : ismFENIX ? (
                            <DepositButton token="MFENIX" />
                          ) : (
                            <DepositButton token="XEN" />
                          )}
                        </form>
                      </div>
                    )}
                  </>
                ) : isHome || isDEFI ? (
                  <>
                    <div
                      className={`button-group ${
                        theme === "lightTheme" ? "btGroup" : ""
                      } clusters mx-1 grid-layout`}
                    >
                      {buttonData.map((button, index) => (
                        <button
                          key={index}
                          className={`equal-width-buttons box-4 items ${getButtonClass()} ${theme}`}
                          onClick={button.onClick}
                        >
                          <span
                            className={`unbold-text ${
                              button.isActive ? "underline-text" : ""
                            }`}
                          >
                            {button.name}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div
                      className={` info-item info-column column-center first ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg") ||
                        (theme === "lightTheme" && theme + " translite")
                      }`}
                    >
                      <span className={` ${spanDarkDim} mint-dav-tokens`}>
                        {isHome || isBNB ? (
                          <> MINT DAVPLS - {HoldAMount}</>
                        ) : isDEFI ? (
                          <> MINT DAVDEFI - {HoldAMount}</>
                        ) : null}
                        <img
                          src={metamask}
                          alt="MetaMask Logo"
                          onClick={addTokenToWallet}
                          className="metamask-logo hoverable-image custom-icon-size "
                          width={15}
                          height={15}
                        />
                      </span>

                      <a
                        href={`https://scan.mypinata.cloud/ipfs/bafybeih3olry3is4e4lzm7rus5l3h6zrphcal5a7ayfkhzm5oivjro2cp4/#/address/${
                          isDEFI ? DAVDEFI : state_token
                        }`}
                        className="color-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-external-link-alt custom-icon-size"></i>
                      </a>
                    </div>
                  </>
                ) : isBNB ? (
                  <>
                    <div
                      className={`button-group ${
                        theme === "lightTheme" ? "btGroup" : ""
                      } clusters mx-1 grid-layout`}
                    >
                      {buttonBNBData.map((button, index) => (
                        <button
                          key={index}
                          className={`equal-width-buttons box-4 items ${getButtonClass()} ${theme}`}
                          onClick={button.onClick}
                        >
                          <span
                            className={`unbold-text ${
                              button.isActive ? "underline-text" : ""
                            }`}
                          >
                            {button.name}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div
                      className={` info-item info-column column-center first ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg") ||
                        (theme === "lightTheme" && theme + " translite")
                      }`}
                    >
                      <span className={` ${spanDarkDim} mint-dav-tokens`}>
                        {isBNB ? (
                          <> MINT DAVBNB - {HoldAMount}</>
                        ) : isDEFI ? (
                          <> MINT DAVDEFI - {HoldAMount}</>
                        ) : null}
                        <img
                          src={metamask}
                          alt="MetaMask Logo"
                          onClick={addTokenToWallet}
                          className="metamask-logo hoverable-image custom-icon-size "
                          width={15}
                          height={15}
                        />
                      </span>

                      <a
                        href={`https://bscscan.com/token/${
                          isDEFI ? DAVDEFI : bnbDAV
                        }`}
                        className="color-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-external-link-alt custom-icon-size"></i>
                      </a>
                    </div>
                  </>
                ) : isPolygon ? (
                  <>
                    <div
                      className={`button-group ${
                        theme === "lightTheme" ? "btGroup" : ""
                      } clusters mx-1 grid-layout`}
                    >
                      {buttonPOLYGONData.map((button, index) => (
                        <button
                          key={index}
                          className={`equal-width-buttons box-4 items ${getButtonClass()} ${theme}`}
                          onClick={button.onClick}
                        >
                          <span
                            className={`unbold-text ${
                              button.isActive ? "underline-text" : ""
                            }`}
                          >
                            {button.name}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div
                      className={` info-item info-column column-center first ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg") ||
                        (theme === "lightTheme" && theme + " translite")
                      }`}
                    >
                      <span className={` ${spanDarkDim} mint-dav-tokens`}>
                        {isPolygon ? (
                          <> MINT DAVMATIC - {HoldAMount}</>
                        ) : isDEFI ? (
                          <> MINT DAVDEFI - {HoldAMount}</>
                        ) : null}
                        <img
                          src={metamask}
                          alt="MetaMask Logo"
                          onClick={addTokenToWallet}
                          className="metamask-logo hoverable-image custom-icon-size "
                          width={15}
                          height={15}
                        />
                      </span>

                      <a
                        href={`https://polygonscan.com/address/${
                          isPolygon ? DAVMATIC : bnbDAV
                        }`}
                        className="color-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-external-link-alt custom-icon-size"></i>
                      </a>
                    </div>
                  </>
                ) : null}
              </div>

              <Link
                to={"/"}
                className="serachIconLink State searchBar2_small d-flex flex-wrap justify-content-lg-center justify-content-md-start justify-content-sm-start"
              >
                <div className="under-state">
                  <img
                    src={SystemStateLogo}
                    alt="SystemStateLogo"
                    className="SystemStateLogo"
                  />
                </div>
                <p className="state-dex-txt">System State</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
