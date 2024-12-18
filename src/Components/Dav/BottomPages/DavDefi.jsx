import React, { useContext, useState, useEffect } from "react";
import "../dav.css";
import "../../../Utils/Theme.css";
import SystemStateLogo from "../../../Assets/High-Resolutions-Svg/Updated/logo.svg";

import hex from "../../../Assets/Token List Icon/hex.png";
import texan from "../../../Assets/Token List Icon/texan.png";
import loan from "../../../Assets/Token List Icon/loan.png";
import watt from "../../../Assets/Token List Icon/watt.png";
import rex from "../../../Assets/Token List Icon/rex.png";
import ptgc from "../../../Assets/Token List Icon/ptgc.png";

import { themeContext } from "../../../App";
import { Link, useLocation } from "react-router-dom";
// import { TotalSumProvider  } from "../../Components/Tracker/TrackingPage";
import { Web3WalletContext } from "../../../Utils/MetamskConnect";
import { functionsContext } from "../../../Utils/Functions";
import { ethers } from "ethers";

import { allInOnePopup } from "../../../Utils/ADDRESSES/Addresses";
import ClaimSection from "../Claim";
import { DavContext } from "../../../context/DavContext";
import ClaimSectionComp from "../ClaimSection";

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
    approveAndDeposit,
    handleDeposit,
    fetchAutoVaultAmount,
    get_PST_Claimed,
    getClaimAllReward,
    isHolder,
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
  const [toBeHEXClaimed, setToBeHEXClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [ToTEXANClaimed, setToBeTEXANClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [ToREXClaimed, setToBeREXClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [ToLOANClaimed, setToBeLOANClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [ToPTGCClaimed, setToBePTGCClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [ToWATClaimed, setToBeWATTClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [isProcessingAutoVault, setIsProcessingAutoVault] = useState(false);

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
  const [isTEXANClaimButtonEnabled, setTEXANClaimISButtonEnabled] =
    useState(true);
  const [isREXClaimButtonEnabled, setREXClaimISButtonEnabled] = useState(true);
  const [isLOANClaimButtonEnabled, setLOANClaimISButtonEnabled] =
    useState(true);
  const [isPTGCClaimButtonEnabled, setPTGCClaimISButtonEnabled] =
    useState(true);
  const [isWATTClaimButtonEnabled, setWATTClaimISButtonEnabled] =
    useState(true);

  const location = useLocation();
  const isHome = location.pathname == "/PLS/mint";
  const isDEFI = location.pathname == "/DEFI";
  const isTRade = location.pathname == "/TRADE";
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
      const formattedWithCommas = parseFloat(
        formattedTotalToBeClaimed
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      // Update the state with the total amount to be claimed
      setToBeHEXClaimed({
        raw: formattedTotalToBeClaimed, // store the raw numeric value
        formatted: formattedWithCommas, // store the comma-formatted value
      });
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
      const formattedWithCommas = parseFloat(
        formattedTotalToBeClaimed
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      // Update the state with the total amount to be claimed
      setToBeTEXANClaimed({
        raw: formattedTotalToBeClaimed, // store the raw numeric value
        formatted: formattedWithCommas, // store the comma-formatted value
      });
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
      const formattedWithCommas = parseFloat(
        formattedTotalToBeClaimed
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      // Update the state with the total amount to be claimed
      setToBeREXClaimed({
        raw: formattedTotalToBeClaimed, // store the raw numeric value
        formatted: formattedWithCommas, // store the comma-formatted value
      });
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
      const formattedWithCommas = parseFloat(
        formattedTotalToBeClaimed
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      // Update the state with the total amount to be claimed
      setToBeLOANClaimed({
        raw: formattedTotalToBeClaimed, // store the raw numeric value
        formatted: formattedWithCommas, // store the comma-formatted value
      });
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
      const formattedWithCommas = parseFloat(
        formattedTotalToBeClaimed
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      // Update the state with the total amount to be claimed
      setToBePTGCClaimed({
        raw: formattedTotalToBeClaimed, // store the raw numeric value
        formatted: formattedWithCommas, // store the comma-formatted value
      });
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
      const formattedWithCommas = parseFloat(
        formattedTotalToBeClaimed
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      // Update the state with the total amount to be claimed
      setToBeWATTClaimed({
        raw: formattedTotalToBeClaimed, // store the raw numeric value
        formatted: formattedWithCommas, // store the comma-formatted value
      });
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
    const toBeClaimed = toBeHEXClaimed.raw;
    await claimAllReward(contractType, toBeClaimed, isProcessingAutoVault);
  };

  // Usage for PDXN rewards
  const claimTEXANAllReward = async () => {
    const contractType = "TEXAN";
    const toBeClaimed = ToTEXANClaimed.raw;
    const isProcessingAutoVault = isTEXANProcessingAutoVault;
    await claimAllReward(contractType, toBeClaimed, isProcessingAutoVault);
  };

  const claimREXAllReward = async () => {
    const contractType = "REX";
    const toBeClaimed = ToREXClaimed.raw;
    await claimAllReward(contractType, toBeClaimed, isREXProcessingAutoVault);
  };
  const claimAllLoan_MReward = async () => {
    const contractType = "LOAN_M";
    const toBeClaimed = ToLOANClaimed.raw;
    await claimAllReward(contractType, toBeClaimed, isLOANProcessingAutoVault);
  };
  const claimAllPTGCReward = async () => {
    const contractType = "PTGC";
    const toBeClaimed = ToPTGCClaimed.raw;
    await claimAllReward(contractType, toBeClaimed, isPTGCProcessingAutoVault);
  };
  const claimAllWATTReward = async () => {
    const contractType = "WATT";
    const toBeClaimed = ToWATClaimed.raw;
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
    setIsProcessingAutoVault(state);
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

  const [selectedTokenImage, setSelectedTokenImage] = useState(hex);
  const [linkPath, setLinkPath] = useState("/HEX");

  const [selectedToken, setSelectedToken] = useState("hex");

  const handleTokenChange = (token) => {
    setSelectedToken(token);

    switch (token) {
      case "hex":
        setSelectedTokenImage(hex);
        setLinkPath("/HEX");
        break;
      case "texan":
        setSelectedTokenImage(texan);
        setLinkPath("/TEXAN");
        break;
      case "rex":
        setSelectedTokenImage(rex);
        setLinkPath("/REX");
        break;
      case "loan":
        setSelectedTokenImage(loan);
        setLinkPath("/LOAN");
        break;
      case "watt":
        setSelectedTokenImage(watt);
        setLinkPath("/WATT");
        break;
      case "ptgc":
        setSelectedTokenImage(ptgc);
        setLinkPath("/PTGC");
        break;
      default:
        console.warn("Invalid token selected for", token);
    }
  };

  const claimButtonMap = {
    hex: !isHEXClaimButtonEnabled || isProcessingAutoVault,
    rex: !isREXClaimButtonEnabled || isREXProcessingAutoVault,
    ptgc: !isPTGCClaimButtonEnabled || isPTGCProcessingAutoVault,
    texan: !isTEXANClaimButtonEnabled || isTEXANProcessingAutoVault,
    loan: !isLOANClaimButtonEnabled || isLOANProcessingAutoVault,
    watt: !isWATTClaimButtonEnabled || isWATTProcessingAutoVault,
  };

  const AutoVaultAMountMap = {
    hex: HEXautoVaultAmount,
    rex: REXautoVaultAmount,
    ptgc: PTGCautoVaultAmount,
    texan: TEXANautoVaultAmount,
    loan: LOANautoVaultAmount,
    watt: WATTautoVaultAmount,
  };

  const autoVaultButtonMap = {
    hex: !isHEXButtonEnabled,
    rex: !isREXButtonEnabled,
    ptgc: !isPTGCButtonEnabled,
    texan: !isTEXANButtonEnabled,
    loan: !isLOANButtonEnabled,
    watt: !isWATTButtonEnabled,
  };
  const ClaimAmountMap = {
    hex: toBeHEXClaimed.formatted,
    rex: ToREXClaimed.formatted,
    ptgc: ToPTGCClaimed.formatted,
    texan: ToTEXANClaimed.formatted,
    loan: ToLOANClaimed.formatted,
    watt: ToWATClaimed.formatted,
  };
  const ClaimedAmountMap = {
    hex: HEXparityTokensClaimed,
    rex: REXparityTokensClaimed,
    ptgc: PTGCparityTokensClaimed,
    texan: parityTEXANTokensClaimed,
    loan: LOANparityTokensClaimed,
    watt: WATTparityTokensClaimed,
  };

  // Function to handle action (auto vault or claim) when button is clicked
  const handleActionClick = (actionType) => {
    switch (selectedTokenImage) {
      case hex:
        if (actionType === "autoVault") {
          handleHEXDeposit();
        } else if (claimButtonMap["pls"]) {
          claimAllHEXReward();
        }
        break;

      case rex:
        if (actionType === "autoVault") {
          handleREXDeposit();
        } else if (claimButtonMap["pdxn"]) {
          claimREXAllReward();
        }
        break;

      case texan:
        if (actionType === "autoVault") {
          handleTEXANDeposit();
        } else if (claimButtonMap["xen"]) {
          claimTEXANAllReward();
        }
        break;

      case ptgc:
        if (actionType === "autoVault") {
          handlePTGCDeposit();
        } else if (claimButtonMap["pfenix"]) {
          claimAllPTGCReward();
        }
        break;
      case watt:
        if (actionType === "autoVault") {
          handleWATTDeposit();
        } else if (claimButtonMap["pfenix"]) {
          claimAllWATTReward();
        }
        break;
      case loan:
        if (actionType === "autoVault") {
          handleLOANDeposit();
        } else if (claimButtonMap["pfenix"]) {
          claimAllLoan_MReward();
        }
        break;

      default:
        console.warn("Invalid token selected for", selectedTokenImage);
    }
  };
  const isHei =
    !isHome && !isAlpha && !isInflationPLS && !isInflationXEN && "hei";

  const [depositHEXAmount, setHEXDepositAmount] = useState("");
  const [depositREXAmount, setREXDepositAmount] = useState("");
  const [depositTEXANAmount, setTEXANDepositAmount] = useState("");
  const [depositWATTAmount, setWATTDepositAmount] = useState("");
  const [depositPTGCAmount, setPTGCDepositAmount] = useState("");
  const [depositLOANAmount, setLOANDepositAmount] = useState("");

  const GlobalhandleDeposit = async (
    e,
    contractType,
    depositAmount,
    setDepositAmount
  ) => {
    e.preventDefault();

    // Access the button element and disable it
    const button = e.currentTarget;
    button.disabled = true;
    const originalText = button.innerText;
    button.innerText = "Processing...";

    const isSuccess =
      contractType === "PLS"
        ? await handleDeposit(depositAmount)
        : await approveAndDeposit(depositAmount, contractType);

    if (isSuccess) {
      setDepositAmount(""); // Clear input on success
    }

    // Re-enable the button and restore original text
    button.disabled = false;
    button.innerText = originalText;
  };

  const isHandleDepositHEX = (e) =>
    GlobalhandleDeposit(e, "HEX", depositHEXAmount, setHEXDepositAmount);
  const isHandleDepositREX = (e) =>
    GlobalhandleDeposit(e, "REX", depositREXAmount, setREXDepositAmount);
  const isHandleDepositTEXAN = (e) =>
    GlobalhandleDeposit(e, "TEXAN", depositTEXANAmount, setTEXANDepositAmount);
  const isHandleDepositPTGC = (e) =>
    GlobalhandleDeposit(e, "PTGC", depositPTGCAmount, setPTGCDepositAmount);
  const isHandleDepositWATT = (e) =>
    GlobalhandleDeposit(e, "WATT", depositWATTAmount, setWATTDepositAmount);
  const isHandleDepositLOAN = (e) =>
    GlobalhandleDeposit(e, "LOAN", depositLOANAmount, setLOANDepositAmount);

  return (
    <>
      <ClaimSectionComp
        linkPath={"/HEX"}
        image={hex}
        TokenName={"HEX"}
        AutoVaultClick={handleHEXDeposit}
        AutoVaultAMountMap={AutoVaultAMountMap.hex}
        claimRewards={claimAllHEXReward}
        DepositFunction={isHandleDepositHEX}
        depositAmount={depositHEXAmount}
        setDepositAmount={setHEXDepositAmount}
        claimButtonMap={claimButtonMap.hex}
        autoVaultButtonMap={autoVaultButtonMap.hex}
        ClaimAmountMap={ClaimAmountMap.hex}
        ClaimedAmountMap={ClaimedAmountMap.hex}
      />
      <ClaimSectionComp
        linkPath={"/TEXAN"}
        image={texan}
        TokenName={"TEXAN"}
        AutoVaultClick={handleTEXANDeposit}
        AutoVaultAMountMap={AutoVaultAMountMap.texan}
        claimRewards={claimTEXANAllReward}
        DepositFunction={isHandleDepositTEXAN}
        depositAmount={depositTEXANAmount}
        setDepositAmount={setTEXANDepositAmount}
        claimButtonMap={claimButtonMap.texan}
        autoVaultButtonMap={autoVaultButtonMap.texan}
        ClaimAmountMap={ClaimAmountMap.texan}
        ClaimedAmountMap={ClaimedAmountMap.texan}
      />
      <ClaimSectionComp
        linkPath={"/REX"}
        image={rex}
        TokenName={"REX"}
        AutoVaultClick={handleREXDeposit}
        AutoVaultAMountMap={AutoVaultAMountMap.rex}
        claimRewards={claimREXAllReward}
        DepositFunction={isHandleDepositREX}
        depositAmount={depositREXAmount}
        setDepositAmount={setREXDepositAmount}
        claimButtonMap={claimButtonMap.rex}
        autoVaultButtonMap={autoVaultButtonMap.rex}
        ClaimAmountMap={ClaimAmountMap.rex}
        ClaimedAmountMap={ClaimedAmountMap.rex}
      />
      <ClaimSectionComp
        linkPath={"/LOAN"}
        image={loan}
        TokenName={"LOAN"}
        AutoVaultClick={handleLOANDeposit}
        AutoVaultAMountMap={AutoVaultAMountMap.loan}
        claimRewards={claimAllLoan_MReward}
        DepositFunction={isHandleDepositLOAN}
        depositAmount={depositLOANAmount}
        setDepositAmount={setLOANDepositAmount}
        claimButtonMap={claimButtonMap.loan}
        autoVaultButtonMap={autoVaultButtonMap.loan}
        ClaimAmountMap={ClaimAmountMap.loan}
        ClaimedAmountMap={ClaimedAmountMap.loan}
      />
      <ClaimSectionComp
        linkPath={"/PTGC"}
        image={ptgc}
        TokenName={"PTGC"}
        AutoVaultClick={handlePTGCDeposit}
        AutoVaultAMountMap={AutoVaultAMountMap.ptgc}
        claimRewards={claimAllPTGCReward}
        claimButtonMap={claimButtonMap.ptgc}
        DepositFunction={isHandleDepositPTGC}
        depositAmount={depositPTGCAmount}
        setDepositAmount={setPTGCDepositAmount}
        autoVaultButtonMap={autoVaultButtonMap.ptgc}
        ClaimAmountMap={ClaimAmountMap.ptgc}
        ClaimedAmountMap={ClaimedAmountMap.ptgc}
      />
      <ClaimSectionComp
        linkPath={"/WATT"}
        image={watt}
        TokenName={"WATT"}
        AutoVaultClick={handleWATTDeposit}
        AutoVaultAMountMap={AutoVaultAMountMap.watt}
        claimRewards={claimAllWATTReward}
        DepositFunction={isHandleDepositWATT}
        depositAmount={depositWATTAmount}
        setDepositAmount={setWATTDepositAmount}
        claimButtonMap={claimButtonMap.watt}
        autoVaultButtonMap={autoVaultButtonMap.watt}
        ClaimAmountMap={ClaimAmountMap.watt}
        ClaimedAmountMap={ClaimedAmountMap.watt}
      />
    </>
  );
};

export default DavDefi;
