import React, { useContext, useState, useEffect } from "react";
import "./dav.css";
import "../../Utils/Theme.css";
import { Link } from "react-router-dom";
import LogoTransparent from "../../Assets/LogoTransparent.png";
import pxen from "../../Assets/XEN.png";
import pdxn from "../../Assets/Token List Icon/DXN.svg";
import PFENIX from "../../Assets/Token List Icon/pfenix.svg";
import SystemStateLogo from "../../Assets/High-Resolutions-Svg/Updated/logo.svg";

import { themeContext } from "../../App";
import { useLocation } from "react-router-dom";
// import { TotalSumProvider  } from "../../Components/Tracker/TrackingPage";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { functionsContext } from "../../Utils/Functions";
import { ethers } from "ethers";

import { allInOnePopup } from "../../Utils/ADDRESSES/Addresses";

export const DavDefi = () => {
  const { theme } = useContext(themeContext);

  // const { toBeHEXClaimed , ClaimAllReward} = useContext(XenTrackingContext);

  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");
  const borderDarkDim =
    (theme === "darkTheme" && "trackingBorder") ||
    (theme === "dimTheme" && "dimThemeTrackBorder");
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");

  const { accountAddress, userConnected, currencyName } =
    useContext(Web3WalletContext);
  console.log("account address from dav", accountAddress);
  const {
    getParityDollarClaimed,
    isDAVDEFIHolder,
    handleDepositAutovault,

    fetchAutoVaultAmount,
    getPLS_PST_Claimed,
    get_PST_Claimed,
    getClaimAllReward,
    isHolder,

    fetchPLSAutoVaultAmount,
  } = useContext(functionsContext);

  const [isHEXButtonEnabled, setIsHEXButtonEnabled] = useState(false);
  const [isLOANButtonEnabled, setIsLOANButtonEnabled] = useState(false);
  const [isPTGCButtonEnabled, setIsPTGCButtonEnabled] = useState(false);
  const [isWATTButtonEnabled, setIsWATTButtonEnabled] = useState(false);
  const [isTEXANButtonEnabled, setIsTEXANButtonEnabled] = useState(false);
  const [isREXButtonEnabled, setIsREXButtonEnabled] = useState(false);
  // const [isPLSButtonEnabled, setPLSIsButtonEnabled] = useState(false);
  const [HEXparityTokensClaimed, setHEXParityTokensClaimed] = useState("0");
  const [parityTEXANTokensClaimed, setTEXANParityTokensClaimed] = useState("0");
  const [REXparityTokensClaimed, setREXParityTokensClaimed] = useState("0");
  const [WATTparityTokensClaimed, setWATTParityTokensClaimed] = useState("0");
  const [PTGCparityTokensClaimed, setPTGCParityTokensClaimed] = useState("0");
  const [LOANparityTokensClaimed, setLOANParityTokensClaimed] = useState("0");
  const [HEXautoVaultAmount, setHEXAutoVaultAmount] = useState("0");
  const [PTGCautoVaultAmount, setPTGCAutoVaultAmount] = useState("0");
  const [WATTautoVaultAmount, setWATTAutoVaultAmount] = useState("0");
  const [LOANautoVaultAmount, setLOANAutoVaultAmount] = useState("0");
  const [TEXANautoVaultAmount, setTEXANAutoVaultAmount] = useState("0");
  const [REXautoVaultAmount, setREXAutoVaultAmount] = useState("0");
  const [PLSautoVaultAmount, setPLSAutoVaultAmount] = useState("0");
  const [toBeHEXClaimed, setToBeHEXClaimed] = useState("0.000");
  const [ToTEXANClaimed, setToBeTEXANClaimed] = useState("0.000");
  const [ToREXClaimed, setToBeREXClaimed] = useState("0.000");
  const [ToLOANClaimed, setToBeLOANClaimed] = useState("0.000");
  const [ToPTGCClaimed, setToBePTGCClaimed] = useState("0.000");
  const [ToWATClaimed, setToBeWATTClaimed] = useState("0.000");
  const [PLStoBeHEXClaimed, setPLSToBeClaimed] = useState("0.0000");
  const [parityDollardeposits, setParityDollardeposits] = useState("0");
  const [totalsumofPOints, setsumofPoints] = useState("0");
  const [isProcessingAutoVault, setIsProcessingAutoVault] = useState(false);
  const [isPLSProcessingAutoVault, setIsPLSProcessingAutoVault] =
    useState(false);
  const [isTEXANProcessingAutoVault, setIsTEXANProcessingAutoVault] =
    useState(false);
  const [isREXProcessingAutoVault, setisREXProcessingAutoVault] =
    useState(false);
  const [isLOANProcessingAutoVault, setisLoanProcessingAutoVault] =
    useState(false);
  const [isPTGCProcessingAutoVault, setisPTGCProcessingAutoVault] =
    useState(false);
  const [isWATTProcessingAutoVault, setisWATTProcessingAutoVault] =
    useState(false);
  const [isHEXClaimButtonEnabled, setHEXClaimISButtonEnabled] = useState(true);
  const [isPLSClaimButtonEnabled, setPLSClaimISButtonEnabled] = useState(true);
  const [isTEXANClaimButtonEnabled, setTEXANClaimISButtonEnabled] =
    useState(true);
  const [isREXClaimButtonEnabled, setREXClaimISButtonEnabled] = useState(true);
  const [isLOANClaimButtonEnabled, setLOANClaimISButtonEnabled] =
    useState(true);
  const [isPTGCClaimButtonEnabled, setPTGCClaimISButtonEnabled] =
    useState(true);
  const [isWATTClaimButtonEnabled, setWATTClaimISButtonEnabled] =
    useState(true);

  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");

  const location = useLocation();
  const isHome = location.pathname == "/mint";
  const isDEFI = location.pathname == "/DEFI";
  const isAlpha = location.pathname === "/alpharoom";
  const isInflationPLS = location.pathname == "/PLS";
  const isInflationXEN = location.pathname == "/XEN";

  const ToBeHEXClaimed = async () => {
    try {
      const contractType = "HEX";
      let parityShareTokensDetail = await getParityDollarClaimed(contractType);

      console.log("user function");
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );

      let totalToBeClaimed = parseFloat(formattedParityClaimableAmount);
      console.log("to claiming", formattedParityClaimableAmount);

      // Format the total amount
      let formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);

      // Update the state with the total amount to be claimed
      setToBeHEXClaimed(formattedTotalToBeClaimed);
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };
  const ToBeTEXANClaimed = async () => {
    try {
      const contractType = "TEXAN";
      let parityShareTokensDetail = await getParityDollarClaimed(contractType);

      console.log("user function");
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );

      let totalToBeClaimed = parseFloat(formattedParityClaimableAmount);
      console.log("to claiming", formattedParityClaimableAmount);

      // Format the total amount
      let formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);

      console.log("pdxn claim", totalToBeClaimed);

      // Update the state with the total amount to be claimed
      setToBeTEXANClaimed(formattedTotalToBeClaimed);
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };
  const ToBeREXClaimed = async () => {
    try {
      const contractType = "REX";
      let parityShareTokensDetail = await getParityDollarClaimed(contractType);

      console.log("user function");
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );

      let totalToBeClaimed = parseFloat(formattedParityClaimableAmount);
      console.log("to claiming", formattedParityClaimableAmount);

      // Format the total amount
      let formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);

      console.log("pdxn claim", totalToBeClaimed);

      // Update the state with the total amount to be claimed
      setToBeREXClaimed(formattedTotalToBeClaimed);
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };
  const ToBeLOANClaimed = async () => {
    try {
      const contractType = "LOAN_M";
      let parityShareTokensDetail = await getParityDollarClaimed(contractType);

      console.log("user function");
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );

      let totalToBeClaimed = parseFloat(formattedParityClaimableAmount);
      console.log("to claiming", formattedParityClaimableAmount);

      // Format the total amount
      let formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);

      console.log("pdxn claim", totalToBeClaimed);

      // Update the state with the total amount to be claimed
      setToBeLOANClaimed(formattedTotalToBeClaimed);
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };
  const ToBePTGCClaimed = async () => {
    try {
      const contractType = "PTGC";
      let parityShareTokensDetail = await getParityDollarClaimed(contractType);

      console.log("user function");
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );

      let totalToBeClaimed = parseFloat(formattedParityClaimableAmount);
      console.log("to claiming", formattedParityClaimableAmount);

      // Format the total amount
      let formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);

      console.log("pdxn claim", totalToBeClaimed);

      // Update the state with the total amount to be claimed
      setToBePTGCClaimed(formattedTotalToBeClaimed);
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };
  const ToBeWATTClaimed = async () => {
    try {
      const contractType = "WATT";
      let parityShareTokensDetail = await getParityDollarClaimed(contractType);

      console.log("user function");
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );

      let totalToBeClaimed = parseFloat(formattedParityClaimableAmount);
      console.log("to claiming", formattedParityClaimableAmount);

      // Format the total amount
      let formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);

      console.log("pdxn claim", totalToBeClaimed);

      // Update the state with the total amount to be claimed
      setToBeWATTClaimed(formattedTotalToBeClaimed);
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  const claimTokens = async (contractType, tokenLabel, setTokenClaimed) => {
    try {
      let PSTClaimed;

      PSTClaimed = await get_PST_Claimed(contractType);

      const formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");
      const fixed = Number(formatted_PST_Claimed).toFixed(0);
      const formattedWithCommas = fixed.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      setTokenClaimed(formattedWithCommas);
    } catch (error) {
      console.error(`${tokenLabel}Claimed error:`, error);
    }
  };

  // Usage examples
  const HEXPSDClaimed = async () => {
    await claimTokens("HEX", "HEX", setHEXParityTokensClaimed);
  };

  const TEXANSClaimed = async () => {
    await claimTokens("TEXAN", "TEXAN", setTEXANParityTokensClaimed);
  };

  const LOANClaimed = async () => {
    await claimTokens("LOAN_M", "LOAN", setLOANParityTokensClaimed);
  };

  const REXClaimed = async () => {
    await claimTokens("REX", "REX", setREXParityTokensClaimed);
  };

  const PTGCClaimed = async () => {
    await claimTokens("PTGC", "PTGC", setPTGCParityTokensClaimed);
  };

  const WATTClaimed = async () => {
    await claimTokens("WATT", "WATT", setWATTParityTokensClaimed);
  };

  const claimAllReward = async (
    contractType,
    toBeClaimed,
    isProcessingAutoVault
  ) => {
    if (!isProcessingAutoVault) {
      console.log("Number(toBeClaimed):", Number(toBeClaimed));
      console.log("toBeClaimed:", toBeClaimed);

      if (Number(toBeClaimed) <= 0) {
        allInOnePopup(null, "Insufficient Balance", null, `OK`, null);
        return;
      }

      try {
        const allReward = await getClaimAllReward(accountAddress, contractType);
        await allReward.wait();
        allInOnePopup(null, "Successfully Claimed", null, `OK`, null);
        console.log("allReward:", allReward);
      } catch (error) {
        if (error.code === 4001) {
          // MetaMask user rejected the transaction
          allInOnePopup(null, "Transaction Rejected", null, `OK`, null);
          console.error("User rejected the transaction:", error.message);
        } else {
          allInOnePopup(null, "Transaction Rejected.", null, `OK`, null);
          console.error(
            "Transaction error:",
            error?.data?.message || error.message
          );
        }
      }
    }
  };

  // Usage for HEX rewards
  const claimAllHEXReward = async () => {
    const contractType = "HEX";
    const toBeClaimed = toBeHEXClaimed;
    await claimAllReward(contractType, toBeClaimed, isProcessingAutoVault);
  };

  // Usage for PDXN rewards
  const claimTEXANAllReward = async () => {
    const contractType = "TEXAN";
    const toBeClaimed = ToTEXANClaimed;
    const isProcessingAutoVault = isTEXANProcessingAutoVault;
    await claimAllReward(contractType, toBeClaimed, isProcessingAutoVault);
  };

  const claimREXAllReward = async () => {
    const contractType = "REX";
    const toBeClaimed = ToREXClaimed;
    await claimAllReward(contractType, toBeClaimed, isREXProcessingAutoVault);
  };
  const claimAllLoan_MReward = async () => {
    const contractType = "LOAN_M";
    const toBeClaimed = ToLOANClaimed;
    await claimAllReward(contractType, toBeClaimed, isLOANProcessingAutoVault);
  };
  const claimAllPTGCReward = async () => {
    const contractType = "PTGC";
    const toBeClaimed = ToPTGCClaimed;
    await claimAllReward(contractType, toBeClaimed, isPTGCProcessingAutoVault);
  };
  const claimAllWATTReward = async () => {
    const contractType = "WATT";
    const toBeClaimed = ToWATClaimed;
    await claimAllReward(contractType, toBeClaimed, isWATTProcessingAutoVault);
  };

  const fetchAutoVaultAmounts = async (
    contractType,
    threshold,
    setAutoVaultAmount,
    setIsButtonEnabled,
    setClaimISButtonEnabled
  ) => {
    try {
      const autoVaultAmount = await fetchAutoVaultAmount(contractType);
      console.log(`AutoVaults from ${contractType}:`, autoVaultAmount);

      const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      if (typeof setAutoVaultAmount === "function") {
        setAutoVaultAmount(autoVaultAmountNumber.toFixed(2));
      } else {
        throw new Error("setAutoVaultAmount is not a function");
      }

      if (autoVaultAmountNumber > threshold) {
        if (typeof setIsButtonEnabled === "function") {
          setIsButtonEnabled(true);
        } else {
          throw new Error("setIsButtonEnabled is not a function");
        }
        if (typeof setClaimISButtonEnabled === "function") {
          setClaimISButtonEnabled(false);
        } else {
          throw new Error("setClaimISButtonEnabled is not a function");
        }
      } else {
        if (typeof setIsButtonEnabled === "function") {
          setIsButtonEnabled(false);
        } else {
          throw new Error("setIsButtonEnabled is not a function");
        }
      }
    } catch (error) {
      console.error(`fetchAutoVaultAmounts for ${contractType} error:`, error);
      if (typeof setAutoVaultAmount === "function") {
        setAutoVaultAmount("0");
      }
    }
  };

  // Usage examples
  const fetchHEXAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts(
      "HEX",
      1000000,
      setHEXAutoVaultAmount,
      setIsHEXButtonEnabled,
      setHEXClaimISButtonEnabled
    );
  };

  const fetchTEXANAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts(
      "TEXAN",
      1000000000,
      setTEXANAutoVaultAmount,
      setIsTEXANButtonEnabled,
      setTEXANClaimISButtonEnabled
    );
  };

  const fetchREXAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts(
      "REX",
      50000000,
      setREXAutoVaultAmount,
      setIsREXButtonEnabled,
      setREXClaimISButtonEnabled
    );
  };

  const fetchLOANAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts(
      "LOAN",
      1000000000,
      setLOANAutoVaultAmount,
      setIsLOANButtonEnabled,
      setLOANClaimISButtonEnabled
    );
  };

  const fetchPTGCAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts(
      "PTGC",
      50000000,
      setPTGCAutoVaultAmount,
      setIsPTGCButtonEnabled,
      setPTGCClaimISButtonEnabled
    );
  };

  const fetchWATTAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts(
      "WATT",
      5000000,
      setWATTAutoVaultAmount,
      setIsWATTButtonEnabled,
      setWATTClaimISButtonEnabled
    );
  };
  const setAllProcessingAutoVaults = (state) => {
    setIsTEXANProcessingAutoVault(state);
    setisREXProcessingAutoVault(state);
    setisLoanProcessingAutoVault(state);
    setisPTGCProcessingAutoVault(state);
    setisWATTProcessingAutoVault(state);
  };
  const isHandleDepositAutovault = async (contractType) => {
    setAllProcessingAutoVaults(true);
    try {
      const isSuccess = await handleDepositAutovault(contractType);
      await isSuccess.wait(); // Wait for the transaction to be mined
    } catch (error) {
      console.log(`Error handling deposit for ${contractType}:`, error);
    } finally {
      setAllProcessingAutoVaults(false);
      // Update the auto vault amount after processing
      fetchAutoVaultAmounts(
        contractType,
        getThresholdForContractType(contractType),
        getSetAutoVaultAmountFunction(contractType),
        getIsButtonEnabledFunction(contractType),
        getClaimISButtonEnabledFunction(contractType)
      );
    }
  };

  const getThresholdForContractType = (contractType) => {
    switch (contractType) {
      case "HEX":
        return 1000000000;
      case "REX":
        return 50000000;
      case "PTGC":
        return 50000000;
      case "LOAN":
        return 1000000000;
      case "WATT":
        return 5000000;
      case "TEXAN":
        return 1000000000;
      default:
        throw new Error(`Unknown contract type: ${contractType}`);
    }
  };

  const getSetAutoVaultAmountFunction = (contractType) => {
    switch (contractType) {
      case "HEX":
        return setHEXAutoVaultAmount;
      case "REX":
        return setREXAutoVaultAmount;
      case "PTGC":
        return setPTGCAutoVaultAmount;
      case "LOAN":
        return setLOANAutoVaultAmount;
      case "WATT":
        return setWATTAutoVaultAmount;
      case "TEXAN":
        return setTEXANAutoVaultAmount;
      default:
        throw new Error(`Unknown contract type: ${contractType}`);
    }
  };

  const getIsButtonEnabledFunction = (contractType) => {
    switch (contractType) {
      case "HEX":
        return setIsHEXButtonEnabled;
      case "REX":
        return setIsREXButtonEnabled;
      case "PTGC":
        return setIsPTGCButtonEnabled;
      case "LOAN":
        return setIsLOANButtonEnabled;
      case "WATT":
        return setIsWATTButtonEnabled;
      case "TEXAN":
        return setIsTEXANButtonEnabled;
      default:
        throw new Error(`Unknown contract type: ${contractType}`);
    }
  };

  const getClaimISButtonEnabledFunction = (contractType) => {
    switch (contractType) {
      case "HEX":
        return setHEXClaimISButtonEnabled;
      case "REX":
        return setREXClaimISButtonEnabled;
      case "PTGC":
        return setPTGCClaimISButtonEnabled;
      case "LOAN":
        return setLOANClaimISButtonEnabled;
      case "WATT":
        return setWATTClaimISButtonEnabled;
      case "TEXAN":
        return setTEXANClaimISButtonEnabled;
      default:
        throw new Error(`Unknown contract type: ${contractType}`);
    }
  };

  // Usage examples for handling deposits
  const handleHEXDeposit = async () => {
    await isHandleDepositAutovault("HEX");
  };

  const handleREXDeposit = async () => {
    await isHandleDepositAutovault("REX");
  };

  const handlePTGCDeposit = async () => {
    await isHandleDepositAutovault("PTGC");
  };

  const handleLOANDeposit = async () => {
    await isHandleDepositAutovault("LOAN");
  };

  const handleWATTDeposit = async () => {
    await isHandleDepositAutovault("WATT");
  };

  const handleTEXANDeposit = async () => {
    await isHandleDepositAutovault("TEXAN");
  };

  useEffect(() => {
    if (userConnected) {
      ToBeHEXClaimed();
      ToBeTEXANClaimed();
      ToBeREXClaimed();
      HEXPSDClaimed();
      fetchHEXAutoVaultAmounts();
      REXClaimed();
      fetchAutoVaultAmounts();
      fetchPTGCAutoVaultAmounts();
      PTGCClaimed();
      LOANClaimed();
      fetchWATTAutoVaultAmounts();
      WATTClaimed();
      ToBeLOANClaimed();
      ToBePTGCClaimed();
      ToBeWATTClaimed();
      TEXANSClaimed();
      fetchTEXANAutoVaultAmounts();
      fetchAutoVaultAmounts();
      fetchLOANAutoVaultAmounts();
      fetchREXAutoVaultAmounts();
    }
  });

  const data = [
    {
      PLS: "Our daily market-making strategies have not yet begun. These strategies will be accessible exclusively to DAV token holders.",
      PXEN: "Our daily market-making strategies have not yet begun. These strategies will be accessible exclusively to DAV token holders.",
      PDXN: "Our daily market-making strategies have not yet begun. These strategies will be accessible exclusively to DAV token holders.",
      PFENIX:
        "Our daily market-making strategies have not yet begun. These strategies will be accessible exclusively to DAV token holders.",
    },
  ];

  const [isDAVDEFIHolders, setDAVDEFIIsHolder] = useState(false);

  useEffect(() => {
    const checkIsHolder = async (accountAddress) => {
      try {
        let ContractType = "DAVDEFI";
        const isHoldingDAVDEFITokens = await isDAVDEFIHolder(
          accountAddress,
          ContractType
        );
        console.log("davdefi holds", isHoldingDAVDEFITokens);
        setDAVDEFIIsHolder(isHoldingDAVDEFITokens);
      } catch (error) {
        console.log(error);
      }
    };
    checkIsHolder();
  }, [accountAddress, isHolder]);

  // const pageStyle = {
  //   backgroundColor:
  //     theme === "dimTheme" ? "#141f35" : theme === "dimTheme" ? "#555" : "#fff",
  //   color: theme === "darkTheme" || theme === "dimTheme" ? "#fff" : "#000",
  //   minHeight: "100vh",
  // };

  const isHei =
    !isHome && !isAlpha && !isInflationPLS && !isInflationXEN && "hei";

  return (
    <div>
      <div className="container1">
        <div
          className={` info-item info-columns box new ${
            (theme === "darkTheme" && "Theme-btn-block") ||
            (theme === "dimTheme" && "dimThemeBorder") ||
            (theme === "lightTheme" && theme + " translite")
          }`}
        >
          <p>CLAIM REWARDS / AUTO-VAULTS</p>
        </div>

        <div
          className="tracking"
          style={{
            marginTop: "100px",
            marginBottom: "200px",
            marginLeft: "-10px",
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
                <div className="row g-lg-10">
                  <div
                    className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                  >
                    <hr className="d-block d-lg-none d-md-none" />
                    <div
                      className="d-flex pt-1 mint-token-container"
                      style={{ marginTop: "-5px" }}
                    >
                      <div className={`margin-right ${theme}`}>
                        <Link
                          className={`margin-right enter  ${
                            location.pathname == "/HEX" && "ins active"
                          }  ${
                            theme === "lightTheme" ? "inverse-filter" : ""
                          } `}
                          role="button"
                          to="/HEX"
                        >
                          <div className="hover-container">
                            <img
                              src={SystemStateLogo}
                              alt="Logo"
                              width="30"
                              height="30"
                            />
                            <span
                              className={`hover-text   ${
                                theme === "lightTheme" ? "inverse-filter" : ""
                              } ${theme}`}
                            >
                              HEX
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div
                        className={`flex-grow-1 fontSize text-start justify-content-between ${textTheme}`}
                      >
                        <div className=" d-flex  button-group ">
                          <button
                            className={`  box-4 mx-2 glowing-button  ${
                              theme === "darkTheme"
                                ? "Theme-btn-block"
                                : theme === "dimTheme"
                                ? "dimThemeBtnBg"
                                : "lightThemeButtonBg"
                            } ${theme}`}
                            onClick={() => claimAllHEXReward()}
                            disabled={
                              isProcessingAutoVault || !isHEXClaimButtonEnabled
                            }
                            style={{
                              cursor:
                                isProcessingAutoVault ||
                                !isHEXClaimButtonEnabled
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            CLAIM
                          </button>
                          <span className={`spanValue ${spanDarkDim}`}>
                            {toBeHEXClaimed}
                          </span>
                        </div>
                        <div className="d-flex  button-group ">
                          <button
                            className={` box-4 mx-2 glowing-button  ${
                              theme === "darkTheme"
                                ? "Theme-btn-block"
                                : theme === "dimTheme"
                                ? "dimThemeBtnBg"
                                : "lightThemeButtonBg"
                            } ${theme}`}
                            onClick={() => {
                              handleHEXDeposit();
                            }}
                            disabled={!isHEXButtonEnabled}
                            style={{
                              cursor: isHEXButtonEnabled
                                ? "pointer"
                                : "not-allowed",
                            }}
                          >
                            AUTO-VAULT
                          </button>
                          <span className={`spanValue ${spanDarkDim}`}>
                            {HEXautoVaultAmount}
                          </span>
                        </div>
                        <div className="center-container">
                          <span className={`spanCenter ${spanDarkDim}`}>
                            {HEXparityTokensClaimed}&nbsp;HEX
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                  >
                    <hr className="d-block d-lg-none d-md-none" />
                    <div className="d-flex mint-token-container">
                      <div className={`margin-right iconContainer ${theme} `}>
                        <Link
                          className={`margin-right enter  ${
                            location.pathname == "/TEXAN" && "ins active"
                          }  ${
                            theme === "lightTheme" ? "inverse-filter" : ""
                          } `}
                          role="button"
                          to="/TEXAN"
                        >
                          <div className="hover-container">
                            <img
                              src={SystemStateLogo}
                              alt="Logo"
                              width="30"
                              height="30"
                            />
                            <span
                              className={`hover-text   ${
                                theme === "lightTheme" ? "inverse-filter" : ""
                              } ${theme}`}
                            >
                              TEXAN
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div
                        className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                      >
                        <div>
                          <div className=" d-flex  button-group">
                            <button
                              className={`  box-4 items mx-2 glowing-button  ${
                                (theme === "darkTheme" && "Theme-btn-block") ||
                                (theme === "dimTheme" && "dimThemeBorder") ||
                                (theme === "lightTheme" && "lightThemeButtonBg")
                              } ${theme}`}
                              onClick={() => claimTEXANAllReward()}
                              disabled={
                                isTEXANProcessingAutoVault ||
                                !isTEXANClaimButtonEnabled
                              }
                              style={{
                                cursor:
                                  isTEXANProcessingAutoVault ||
                                  !isTEXANClaimButtonEnabled
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              CLAIM
                            </button>
                            <span className={`spanValue ${spanDarkDim}`}>
                              {ToTEXANClaimed}
                            </span>
                          </div>
                          <div className="d-flex  button-group">
                            <button
                              className={`  box-4 mx-2 glowing-button  ${
                                theme === "darkTheme"
                                  ? "Theme-btn-block"
                                  : theme === "dimTheme"
                                  ? "dimThemeBtnBg"
                                  : "lightThemeButtonBg"
                              } ${theme}`}
                              onClick={() => {
                                handleTEXANDeposit();
                              }}
                              disabled={!isTEXANButtonEnabled}
                              style={{
                                cursor: isTEXANButtonEnabled
                                  ? "pointer"
                                  : "not-allowed",
                              }}
                            >
                              AUTO-VAULT
                            </button>
                            <span className={`spanValue ${spanDarkDim}`}>
                              {TEXANautoVaultAmount}
                            </span>
                          </div>
                          <div className="center-container">
                            <span className={`spanCenter ${spanDarkDim}`}>
                              {parityTEXANTokensClaimed}&nbsp;TEXAN
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                  >
                    <hr className="d-block d-lg-none d-md-none" />
                    <div className="d-flex mint-token-container">
                      <div className={`margin-right iconContainer ${theme} `}>
                        <Link
                          className={`margin-right enter  ${
                            location.pathname == "/REX" && "ins active"
                          }  ${
                            theme === "lightTheme" ? "inverse-filter" : ""
                          } `}
                          role="button"
                          to="/REX"
                        >
                          <div className="hover-container">
                            <img
                              src={SystemStateLogo}
                              alt="Logo"
                              width="30"
                              height="30"
                            />
                            <span
                              className={`hover-text   ${
                                theme === "lightTheme" ? "inverse-filter" : ""
                              } ${theme}`}
                            >
                              REX
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div
                        className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                      >
                        <div>
                          <div className=" d-flex  button-group">
                            <button
                              className={`  box-4 items mx-2 glowing-button  ${
                                (theme === "darkTheme" && "Theme-btn-block") ||
                                (theme === "dimTheme" && "dimThemeBorder") ||
                                (theme === "lightTheme" && "lightThemeButtonBg")
                              } ${theme}`}
                              onClick={() => claimREXAllReward()}
                              disabled={
                                isREXProcessingAutoVault ||
                                !isREXClaimButtonEnabled
                              }
                              style={{
                                cursor:
                                  isREXProcessingAutoVault ||
                                  !isREXClaimButtonEnabled
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              CLAIM
                            </button>
                            <span className={`spanValue ${spanDarkDim}`}>
                              {ToREXClaimed}
                            </span>
                          </div>
                          <div className="d-flex  button-group">
                            <button
                              className={`  box-4 mx-2 glowing-button  ${
                                theme === "darkTheme"
                                  ? "Theme-btn-block"
                                  : theme === "dimTheme"
                                  ? "dimThemeBtnBg"
                                  : "lightThemeButtonBg"
                              } ${theme}`}
                              onClick={() => {
                                handleREXDeposit();
                              }}
                              disabled={!isREXButtonEnabled}
                              style={{
                                cursor: isREXButtonEnabled
                                  ? "pointer"
                                  : "not-allowed",
                              }}
                            >
                              AUTO-VAULT
                            </button>
                            <span className={`spanValue ${spanDarkDim}`}>
                              {REXautoVaultAmount}
                            </span>
                          </div>
                          <div className="center-container">
                            <span className={`spanCenter ${spanDarkDim}`}>
                              {REXparityTokensClaimed}&nbsp;REX
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 extraFlex">
                    <hr className="d-lg-none d-block my-3" />
                    <div
                      className="d-flex pt-1 mint-token-container"
                      style={{ marginTop: "-5px" }}
                    >
                      <div className={`margin-right ${theme}`}>
                        <Link
                          className={`margin-right enter  ${
                            location.pathname == "/LOAN" && "ins active"
                          }  ${
                            theme === "lightTheme" ? "inverse-filter" : ""
                          } `}
                          role="button"
                          to="/LOAN"
                        >
                          <div className="hover-container">
                            <img
                              src={SystemStateLogo}
                              alt="Logo"
                              width="30"
                              height="30"
                            />
                            <span
                              className={`hover-text   ${
                                theme === "lightTheme" ? "inverse-filter" : ""
                              } ${theme}`}
                            >
                              LOAN
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div
                        className={`flex-grow-1 fontSize text-start justify-content-between ${textTheme}`}
                      >
                        <div className=" d-flex  button-group ">
                          <button
                            className={`  box-4 mx-2 glowing-button  ${
                              theme === "darkTheme"
                                ? "Theme-btn-block"
                                : theme === "dimTheme"
                                ? "dimThemeBtnBg"
                                : "lightThemeButtonBg"
                            } ${theme}`}
                            onClick={() => claimAllLoan_MReward()}
                            disabled={
                              isLOANProcessingAutoVault ||
                              !isLOANClaimButtonEnabled
                            }
                            style={{
                              cursor:
                                isLOANProcessingAutoVault ||
                                !isLOANClaimButtonEnabled
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            CLAIM
                          </button>
                          <span className={`spanValue ${spanDarkDim}`}>
                            {ToLOANClaimed}
                          </span>
                        </div>
                        <div className="d-flex  button-group ">
                          <button
                            className={` box-4 mx-2 glowing-button  ${
                              theme === "darkTheme"
                                ? "Theme-btn-block"
                                : theme === "dimTheme"
                                ? "dimThemeBtnBg"
                                : "lightThemeButtonBg"
                            } ${theme}`}
                            onClick={() => {
                              handleLOANDeposit();
                            }}
                            disabled={!isLOANButtonEnabled}
                            style={{
                              cursor: isLOANButtonEnabled
                                ? "pointer"
                                : "not-allowed",
                            }}
                          >
                            AUTO-VAULT
                          </button>
                          <span className={`spanValue ${spanDarkDim}`}>
                            {LOANautoVaultAmount}
                          </span>
                        </div>
                        <div className="center-container">
                          <span className={`spanCenter ${spanDarkDim}`}>
                            {LOANparityTokensClaimed}&nbsp;LOAN
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "170px" }}>
              <div
                className={`top-container ${
                  (theme === "darkTheme" && "darkThemeTrackingBg") ||
                  (theme === "dimTheme" && "dimTheme-index-class")
                }`}
                style={{ marginTop: "100px" }}
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
                    <div className="row g-lg-10">
                      <div
                        className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                      >
                        <hr className="d-block d-lg-none d-md-none" />
                        <div
                          className="d-flex pt-1 mint-token-container"
                          style={{ marginTop: "-5px" }}
                        >
                          <div className={`margin-right ${theme}`}>
                            <Link
                              className={`margin-right enter  ${
                                location.pathname == "/PTGC" && "ins active"
                              }  ${
                                theme === "lightTheme" ? "inverse-filter" : ""
                              } `}
                              role="button"
                              to="/PTGC"
                            >
                              <div className="hover-container">
                                <img
                                  src={SystemStateLogo}
                                  alt="Logo"
                                  width="30"
                                  height="30"
                                />
                                <span
                                  className={`hover-text   ${
                                    theme === "lightTheme"
                                      ? "inverse-filter"
                                      : ""
                                  } ${theme}`}
                                >
                                  PTGC
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div
                            className={`flex-grow-1 fontSize text-start justify-content-between ${textTheme}`}
                          >
                            <div className=" d-flex  button-group ">
                              <button
                                className={`  box-4 mx-2 glowing-button  ${
                                  theme === "darkTheme"
                                    ? "Theme-btn-block"
                                    : theme === "dimTheme"
                                    ? "dimThemeBtnBg"
                                    : "lightThemeButtonBg"
                                } ${theme}`}
                                onClick={() => claimAllPTGCReward()}
                                disabled={
                                  isPTGCProcessingAutoVault ||
                                  !isPTGCClaimButtonEnabled
                                }
                                style={{
                                  cursor:
                                    isPTGCProcessingAutoVault ||
                                    !isPTGCClaimButtonEnabled
                                      ? "not-allowed"
                                      : "pointer",
                                }}
                              >
                                CLAIM
                              </button>
                              <span className={`spanValue ${spanDarkDim}`}>
                                {ToPTGCClaimed}
                              </span>
                            </div>
                            <div className="d-flex  button-group ">
                              <button
                                className={` box-4 mx-2 glowing-button  ${
                                  theme === "darkTheme"
                                    ? "Theme-btn-block"
                                    : theme === "dimTheme"
                                    ? "dimThemeBtnBg"
                                    : "lightThemeButtonBg"
                                } ${theme}`}
                                onClick={() => {
                                  handlePTGCDeposit();
                                }}
                                disabled={!isPTGCButtonEnabled}
                                style={{
                                  cursor: isPTGCButtonEnabled
                                    ? "pointer"
                                    : "not-allowed",
                                }}
                              >
                                AUTO-VAULT
                              </button>
                              <span className={`spanValue ${spanDarkDim}`}>
                                {PTGCautoVaultAmount}
                              </span>
                            </div>
                            <div className="center-container">
                              <span className={`spanCenter ${spanDarkDim}`}>
                                {PTGCparityTokensClaimed}&nbsp;PTGC
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                      >
                        <hr className="d-block d-lg-none d-md-none" />
                        <div className="d-flex mint-token-container">
                          <div
                            className={`margin-right iconContainer ${theme} `}
                          >
                            <Link
                              className={`margin-right enter  ${
                                location.pathname == "/WATT" && "ins active"
                              }  ${
                                theme === "lightTheme" ? "inverse-filter" : ""
                              } `}
                              role="button"
                              to="/WATT"
                            >
                              <div className="hover-container">
                                <img
                                  src={SystemStateLogo}
                                  alt="Logo"
                                  width="30"
                                  height="30"
                                />
                                <span
                                  className={`hover-text   ${
                                    theme === "lightTheme"
                                      ? "inverse-filter"
                                      : ""
                                  } ${theme}`}
                                >
                                  WATT
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div
                            className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                          >
                            <div>
                              <div className=" d-flex  button-group">
                                <button
                                  className={`  box-4 items mx-2 glowing-button  ${
                                    (theme === "darkTheme" &&
                                      "Theme-btn-block") ||
                                    (theme === "dimTheme" &&
                                      "dimThemeBorder") ||
                                    (theme === "lightTheme" &&
                                      "lightThemeButtonBg")
                                  } ${theme}`}
                                  onClick={() => claimAllWATTReward()}
                                  disabled={
                                    isWATTProcessingAutoVault ||
                                    !isWATTClaimButtonEnabled
                                  }
                                  style={{
                                    cursor:
                                      isWATTProcessingAutoVault ||
                                      !isWATTClaimButtonEnabled
                                        ? "not-allowed"
                                        : "pointer",
                                  }}
                                >
                                  CLAIM
                                </button>
                                <span className={`spanValue ${spanDarkDim}`}>
                                  {ToWATClaimed}
                                </span>
                              </div>
                              <div className="d-flex  button-group">
                                <button
                                  className={`  box-4 mx-2 glowing-button  ${
                                    theme === "darkTheme"
                                      ? "Theme-btn-block"
                                      : theme === "dimTheme"
                                      ? "dimThemeBtnBg"
                                      : "lightThemeButtonBg"
                                  } ${theme}`}
                                  onClick={() => {
                                    handleWATTDeposit();
                                  }}
                                  disabled={!isWATTButtonEnabled}
                                  style={{
                                    cursor: isWATTButtonEnabled
                                      ? "pointer"
                                      : "not-allowed",
                                  }}
                                >
                                  AUTO-VAULT
                                </button>
                                <span className={`spanValue ${spanDarkDim}`}>
                                  {WATTautoVaultAmount}
                                </span>
                              </div>
                              <div className="center-container">
                                <span className={`spanCenter ${spanDarkDim}`}>
                                  {WATTparityTokensClaimed}&nbsp;WATT
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isDAVDEFIHolders && (
            <div className="alpha-room-container">
              <div
                className={`info-item info-columns boxes new1 ${
                  (theme === "darkTheme" && "Theme-btn-block") ||
                  (theme === "dimTheme" && "dimThemeBorder") ||
                  (theme === "lightTheme" && theme + " translite")
                }`}
              >
                <p className="alpha-room">ALPHA ROOM</p>
              </div>
              <div
                className={`top-container ${
                  (theme === "darkTheme" && "darkThemeTrackingBg") ||
                  (theme === "dimTheme" && "dimTheme-index-class")
                }`}
                style={{ marginTop: "100px" }}
              >
                <div
                  className={`top-container ${isHei} container-xxl ${
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
                    <div className="row g-lg-10">
                      {[
                        { name: "HEX", src: SystemStateLogo },
                        { name: "TEXAN", src: SystemStateLogo },
                        { name: "REX", src: SystemStateLogo },
                        { name: "LOAN", src: SystemStateLogo },
                      ].map((token, idx) => (
                        <div
                          key={idx}
                          className={`col-md-4 col-lg-3 d-flex flex-column justify-content-center ${
                            idx < 3 ? `border-right ${borderDarkDim}` : ""
                          }`}
                        >
                          <hr className="d-block d-lg-none d-md-none" />
                          <div className="d-flex mint-token-container">
                            <div className={`margin-right ${theme}`}>
                              <div
                                className={`margin-right enter ${
                                  theme === "lightTheme" ? "inverse-filter" : ""
                                }`}
                                style={{ marginRight: "5px" }} // Adjust the margin value as needed
                              >
                                <img
                                  src={token.src}
                                  alt="Logo"
                                  width="30"
                                  height="30"
                                />
                              </div>
                            </div>
                            <div
                              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                            >
                              <div>
                                <div className="varSize">
                                  <span className={`spanTex ${spanDarkDim}`}>
                                    {token.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`top-container ${
                  (theme === "darkTheme" && "darkThemeTrackingBg") ||
                  (theme === "dimTheme" && "dimTheme-index-class")
                }`}
                style={{ marginTop: "80px" }}
              >
                <div
                  className={`top-container ${isHei} container-xxl ${
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
                    <div className="row g-lg-10">
                      {[
                        { name: "PTGC", src: SystemStateLogo },
                        { name: "WATT", src: SystemStateLogo },
                      ].map((token, idx) => (
                        <div
                          key={idx}
                          className={`col-md-6 col-lg-3 d-flex flex-column justify-content-center ${
                            idx === 0 ? "border-right" : ""
                          } ${borderDarkDim}`}
                        >
                          <hr className="d-block d-lg-none d-md-none" />
                          <div className="d-flex mint-token-container">
                            <div className={`margin-right ${theme}`}>
                              <div
                                className={`margin-right enter    ${
                                  theme === "lightTheme" ? "inverse-filter" : ""
                                } `}
                                style={{ marginRight: "5px" }}
                              >
                                <img
                                  src={token.src}
                                  alt="Logo"
                                  width="30"
                                  height="30"
                                />
                              </div>
                            </div>
                            <div
                              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                            >
                              <div>
                                <div className="varSize">
                                  <span className={`spanTex ${spanDarkDim}`}>
                                    {token.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DavDefi;
