import React, { useContext, useEffect, useState } from "react";
import "../../Global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { themeContext } from "../../App";
import "../../Utils/Theme.css";
import "./Searchbar.css";
import metamask from "../../Assets/image.png";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { Link, useLocation, useNavigate } from "react-router-dom";
import fistPump from "../../Assets/High-Resolutions-Svg/Updated/fist pump small.svg";
import { functionsContext } from "../../Utils/Functions";
import {
  PSD_ADDRESS,
  bnbDAV,
  DAVMATIC,
  state_token,
  DAVDEFI,
  DAVTRADE,
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
  const currentPath = location.pathname;
  const isHome = location.pathname === "/PLS/mint";
  const isSwap = location.pathname === "/swap";
  const isBNB = location.pathname === "/BNB/mint";
  const isPolygon = location.pathname === "/polygon/mint";
  const isDEFI = location.pathname === "/DEFI";
  const isTRADE = location.pathname === "/TRADE";
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

  const isNINE_MM = location.pathname === "/NineMM";
  const isNINE_INCH = location.pathname === "/Nine_Inch";
  const isPRATE = location.pathname === "/PRATE";
  const isTONI = location.pathname === "/TONI";
  const isPST = location.pathname === "/PTS";
  const isSPARK = location.pathname === "/SPARK";

  const isBNBPage = location.pathname === "/BNB";
  const isBXEN = location.pathname === "/bXEN";
  const BDXN = location.pathname === "/bDXN";
  const BFENIX = location.pathname === "/bFENIX";

  const [selectedValue, setSelectedValue] = useState("Deposit");
  const [balance, setBalance] = useState("Enter Amount");
  const [navigateToExplorer, setNavigateToExplorer] = useState("");
  const [toBeClaimed, setToBeClaimed] = useState("0");
  const [claimParityTokens, setClaimParityTokens] = useState("0");
  const [protocolFee, setProtocolFee] = useState("0");
  const [DepositAddress, setDepositAddress] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("");

  const [allRewardAmount, setAllRewardAmount] = useState("");

  const {
    socket,
    approveAndDeposit,
    holdTokens,
    getProtocolFee,
    handleDeposit,
    handleDepositMATIC,
    handleDepositBNB,
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
  const isHandleDepositNINE_INCH = async (e) => {
    e.preventDefault();
    const ContractType = "9INCH";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositNINE_MM = async (e) => {
    e.preventDefault();
    const ContractType = "9MM";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositSPARK = async (e) => {
    e.preventDefault();
    const ContractType = "SPARK";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositPTS = async (e) => {
    e.preventDefault();
    const ContractType = "PTS";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositPRATE = async (e) => {
    e.preventDefault();
    const ContractType = "PRAT";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositTONI = async (e) => {
    e.preventDefault();
    const ContractType = "TONI";
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
  const isHandleDepositBXEN = async (e) => {
    e.preventDefault();
    const ContractType = "BXEN";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositBDXN = async (e) => {
    e.preventDefault();
    const ContractType = "BDXN";
    const isSuccess = await approveAndDeposit(depositAmount, ContractType);
    if (isSuccess) {
      setSearch("");
    }
  };
  const isHandleDepositBFENIX = async (e) => {
    e.preventDefault();
    const ContractType = "BFENIX";
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
  const isHandleDepositBNB = async (e) => {
    e.preventDefault();
    const isSuccess = await handleDepositBNB(depositAmount);
    if (isSuccess) {
      setSearch("");
    }
  };
  const [holdDavBNB, setHoldDavBNB] = useState("0");
  const [holdDavMAtic, setHoldDavMatic] = useState("0");
  const [holdDavPLS, setHoldDavPLS] = useState("0");

  const [holdDavDEFI, setHoldDavDEFI] = useState("0");
  const [holdDavTRADE, setHoldDavTRADE] = useState("0");

  const HoldTokensOfUser = async (accountAddress, contractType, setState) => {
    try {
      if (!accountAddress) {
        throw new Error("Account address is undefined");
      }

      const holdToken = await holdTokens(accountAddress, contractType);
      const formattedPrice = ethers.utils.formatEther(holdToken || "0");
      console.log(`Hold tokens for ${contractType}:`, formattedPrice);
      setState(formattedPrice);
    } catch (error) {
      console.error(error);
    }
  };

  // Call each function separately
  useEffect(() => {
    const fetchHoldAmounts = async () => {
      await HoldTokensOfUser(accountAddress, "DAVPLS", setHoldDavPLS);
      await HoldTokensOfUser(accountAddress, "DAVBNB", setHoldDavBNB);
      await HoldTokensOfUser(accountAddress, "DAVMATIC", setHoldDavMatic);
      await HoldTokensOfUser(accountAddress, "DAVDEFI", setHoldDavDEFI);
      await HoldTokensOfUser(accountAddress, "DAVTRADE", setHoldDavTRADE);
    };

    fetchHoldAmounts();
  }, []);

  const tokens = {
    DAVDEFI: { address: DAVDEFI, symbol: "DAVDEFI" },
    DAVTRADE: { address: DAVTRADE, symbol: "DAVTRADE" },
    DAVBNB: { address: bnbDAV, symbol: "DAVBNB" },
    DAVMATIC: { address: DAVMATIC, symbol: "DAVMATIC" },
    DAVPLS: { address: state_token, symbol: "DAVPLS" },
  };

  // Function to add token to MetaMask
  const addTokenToWallet = async (token) => {
    if (window.ethereum) {
      try {
        console.log("Adding Token:", token);
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: token.address,
              symbol: token.symbol,
              decimals: 18,
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

  const tooltip =
    (theme === "dimTheme" && "dim-tooltip") ||
    (theme === "lightTheme" && "light-tooltip") ||
    (theme === "darkTheme" && "dark-tooltip");

  const FileLink = ({ href }) => (
    <div className="">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "white" }}
      >
        <span
          className={`${tooltip} heightfixBug hoverText tooltipAlign`}
          data-tooltip="Verified Code"
          data-flow="bottom"
          style={{
            cursor: "pointer",
            textAlign: "center",
            whiteSpace: "nowrap",
            width: "auto",
            zIndex: "9999",
          }}
        >
          <i className="fas fa-file-alt custom-icon-size"></i>
        </span>
      </a>
      <span
        className={`hover-text  ${
          theme === "lightTheme" ? "inverse-filter" : ""
        } ${theme}`}
        style={{ color: "white" }}
      >
        Verified Code
      </span>
    </div>
  );

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
  const handleClickTRADE = () => {
    navigate("/TRADE");
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
    TONI: isHandleDepositTONI,
    PTS: isHandleDepositPTS,
    "9MM": isHandleDepositNINE_MM,
    "9INCH": isHandleDepositNINE_INCH,
    SPARK: isHandleDepositSPARK,
    PRAT: isHandleDepositPRATE,

    // DAV: isHandleDepositDAV,
    // DAVDEFI: isHandleDepositDAVDEFI,
    // BNB: isHandleDepositBNB,
    // BNBDAV: isHandleDepositBNBDAV,
    // DAVMATIC: isHandleDepositDAVMATIC,
    MATIC: isHandleDepositMatic,
    MXEN: isHandleDepositmXEN,
    MFENIX: isHandleDepositFENIX,
    MDXN: isHandleDepositmDXN,

    BNB: isHandleDepositBNB,
    BXEN: isHandleDepositBXEN,
    BFENIX: isHandleDepositBFENIX,
    BDXN: isHandleDepositBDXN,

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
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => setIsCollapsed(!isCollapsed);
  const buttonData = [
    { name: "FIRST PRINCIPLES", onClick: handleClickFP, isActive: isHome },
    { name: "DEFI", onClick: handleClickDEFI, isActive: isDEFI },
    { name: "TRADE", onClick: handleClickTRADE, isActive: isTRADE },
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

  const buttonGroups = {
    default: buttonData,
    BNB: buttonBNBData,
    POLYGON: buttonPOLYGONData,
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
                isTONI ||
                isPST ||
                isNINE_INCH ||
                isNINE_MM ||
                isSPARK ||
                isPRATE ||
                isREX ||
                isWATT ||
                ismFENIX ||
                ismDXN ||
                ismXEN ||
                isMatic ||
                isBNBPage ||
                isBXEN ||
                BDXN ||
                BFENIX ||
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
                              : isPRATE
                              ? "PRATE"
                              : isTONI
                              ? "TONI"
                              : isSPARK
                              ? "SPARK"
                              : isNINE_INCH
                              ? "9INCH"
                              : isNINE_MM
                              ? "9MM"
                              : isPST
                              ? "PTS"
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
                              : isBNBPage
                              ? "BNB"
                              : isBXEN
                              ? "BXEN"
                              : BDXN
                              ? "BDXN"
                              : BFENIX
                              ? "BFENIX"
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
                          ) : isBNBPage ? (
                            <DepositButton token="BNB" />
                          ) : isBXEN ? (
                            <DepositButton token="BXEN" />
                          ) : BDXN ? (
                            <DepositButton token="BDXN" />
                          ) : BFENIX ? (
                            <DepositButton token="BFENIX" />
                          ) : ismXEN ? (
                            <DepositButton token="MXEN" />
                          ) : ismDXN ? (
                            <DepositButton token="MDXN" />
                          ) : isNINE_INCH ? (
                            <DepositButton token="9INCH" />
                          ) : isNINE_MM ? (
                            <DepositButton token="9MM" />
                          ) : isSPARK ? (
                            <DepositButton token="SPARK" />
                          ) : isTONI ? (
                            <DepositButton token="TONI" />
                          ) : isPST ? (
                            <DepositButton token="PTS" />
                          ) : isPRATE ? (
                            <DepositButton token="PRAT" />
                          ) : ismFENIX ? (
                            <DepositButton token="MFENIX" />
                          ) : (
                            <DepositButton token="XEN" />
                          )}
                        </form>
                      </div>
                    )}
                  </>
                ) : isHome || isDEFI || isTRADE ? (
                  <>
                    {/* <div
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
                    </div> */}
                    {/* <div
                      className={` info-item info-column column-center first ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg") ||
                        (theme === "lightTheme" && theme + " translite")
                      }`}
                      style={{ position: "relative" }} // Ensure parent has relative positioning
                    >
                      <span className={`  mint-dav-tokens`}>
                        {isHome ? (
                          <> MINT DAVPLS - {HoldAMount}</>
                        ) : isDEFI ? (
                          <> MINT DAVDEFI - {HoldAMount}</>
                        ) : isTRADE ? (
                          <> MINT DAVTRADE - {HoldAMount}</>
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
                      {currentPath !== "/PLS/mint" && (
                        <div
                          style={{
                            marginLeft: isDEFI
                              ? "10px"
                              : isTRADE
                              ? "0px"
                              : "10px",
                          }}
                        >
                          <FileLink
                            href={`https://repo.sourcify.dev/contracts/full_match/369/${
                              isDEFI
                                ? DAVDEFI
                                : isTRADE
                                ? DAVTRADE
                                : state_token
                            }`}
                          />
                        </div>
                      )}

                      <a
                        href={`https://scan.mypinata.cloud/ipfs/bafybeih3olry3is4e4lzm7rus5l3h6zrphcal5a7ayfkhzm5oivjro2cp4/#/address/${
                          isDEFI ? DAVDEFI : isTRADE ? DAVTRADE : state_token
                        }`}
                        className="color-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-external-link-alt custom-icon-size"></i>
                      </a>
                    </div> */}
                    <div
                      className={`info-item info-column column-center first ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg") ||
                        (theme === "lightTheme" && theme + " translite")
                      }`}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          marginLeft: "100px",
                        }}
                      >
                        <span>MINT DAV TOKENS</span>
                      </div>
                    </div>
                    <div
                      className="col"
                      style={{
                        marginTop: "-5.5vh",
                        marginLeft: "20rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        className={` ${spanDarkDim}`}
                        style={{ color: "white" }}
                      >
                        Manage the supply and demand of listed tokens.
                      </span>
                    </div>
                    <div className="topp"></div>
                  </>
                ) : isBNB ? (
                  <>
                    <div className="topp">
                      <div
                        onClick={handleClickBNBMINT}
                        className={`info-item info-column column-center first ${
                          (theme === "darkTheme" && "Theme-btn-block") ||
                          (theme === "dimTheme" && "dimThemeBtnBg") ||
                          (theme === "lightTheme" && theme + " translite")
                        }`}
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "space-between", // Space between elements
                          alignItems: "center",
                          height: "100%",
                          width: "100%",
                          cursor: "pointer",
                        }}
                      >
                        {/* Centered Content: Text + Logo */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            marginLeft: "100px",
                          }}
                        >
                          <span
                            className={` ${
                              window.location.pathname === "/BNB/mint"
                                ? "blue-underline"
                                : ""
                            }`}
                          >
                            DAVBNB - {holdDavBNB}
                          </span>

                          <img
                            src={metamask}
                            alt="MetaMask Logo"
                            onClick={() => addTokenToWallet(tokens.DAVBNB)}
                            className="metamask-logo hoverable-image custom-icon-size"
                            width={15}
                            height={15}
                          />
                        </div>

                        <a
                          href={`https://bscscan.com/token/${bnbDAV}`}
                          className="color-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: "8px" }}
                        >
                          <i className="fas fa-external-link-alt custom-icon-size"></i>
                        </a>
                      </div>
                    </div>
                    {/* <div
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
                      <span className={`  mint-dav-tokens`}>
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
                    </div> */}
                  </>
                ) : isPolygon ? (
                  <>
                    <div className="topp">
                      <div
                        onClick={handleClickpolygonMINT}
                        className={`info-item info-column column-center first ${
                          (theme === "darkTheme" && "Theme-btn-block") ||
                          (theme === "dimTheme" && "dimThemeBtnBg") ||
                          (theme === "lightTheme" && theme + " translite")
                        }`}
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "space-between", // Space between elements
                          alignItems: "center",
                          height: "100%",
                          width: "100%",
                          cursor: "pointer",
                        }}
                      >
                        {/* Centered Content: Text + Logo */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            marginLeft: "100px",
                          }}
                        >
                          <span
                            className={` ${
                              window.location.pathname === "/polygon/mint"
                                ? "blue-underline"
                                : ""
                            }`}
                          >
                            DAVMATIC - {holdDavMAtic}
                          </span>

                          <img
                            src={metamask}
                            alt="MetaMask Logo"
                            onClick={() => addTokenToWallet(tokens.DAVMATIC)}
                            className="metamask-logo hoverable-image custom-icon-size"
                            width={15}
                            height={15}
                          />
                        </div>

                        <a
                          href={`https://polygonscan.com/address/${DAVMATIC}`}
                          className="color-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: "8px" }}
                        >
                          <i className="fas fa-external-link-alt custom-icon-size"></i>
                        </a>
                      </div>
                    </div>
                    {/* <div
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
                      <span className={`  mint-dav-tokens`}>
                        {isPolygon ? (
                          <> MINT DAVMATIC - {"HoldAMount"}</>
                        ) : isDEFI ? (
                          <> MINT DAVDEFI - {"HoldAMount"}</>
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
                    </div> */}
                  </>
                ) : isSwap ? (
                  <>
                    <div className="row align-items-center">
                      <div
                        className={`col-auto info-item info-columns box second3 ${
                          (theme === "darkTheme" && "Theme-btn-block") ||
                          (theme === "dimTheme" && "dimThemeBorder") ||
                          (theme === "lightTheme" && theme + " translite")
                        }`}
                        style={{ marginTop: "-17vh", marginLeft: "0.7rem" }}
                      >
                        <p className="text-center">STATE TOKEN</p>
                      </div>

                      <div
                        className="col"
                        style={{
                          marginTop: "-18vh",
                          marginLeft: "20rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span
                          className={` ${spanDarkDim} ${
                            theme === "lightTheme" && "color-white "
                          }`}
                          style={{ fontWeight: "500" }}
                        >
                          The native token & currency on Pulsechain is pState
                          token
                        </span>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
