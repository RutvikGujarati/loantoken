import React, { useContext, useState, useEffect } from "react";
import "../dav.css";
import "../../../Utils/Theme.css";
import SystemStateLogo from "../../../Assets/High-Resolutions-Svg/Updated/logo.svg";

import { themeContext } from "../../../App";
import { useLocation } from "react-router-dom";
// import { TotalSumProvider  } from "../../Components/Tracker/TrackingPage";
import { Web3WalletContext } from "../../../Utils/MetamskConnect";
import { functionsContext } from "../../../Utils/Functions";
import { ethers } from "ethers";

import { allInOnePopup } from "../../../Utils/ADDRESSES/Addresses";
import ClaimSection from "../Claim";

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

  const [isDAVDEFIHolders, setDAVDEFIIsHolder] = useState(false);

  useEffect(() => {
    const checkIsHolder = async (accountAddress) => {
      try {
        const isHoldingDAVDEFITokens = await isDAVDEFIHolder(accountAddress);
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
        <div className={`container-fluid`}>
          <div className={`row`}>
            <div className={`col-12`}>
              <div
                className={`flex-grow-1 fontSize text-start ${
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
					  style={{position:"relative", marginTop:"-20vh",marginLeft:"2vh"}}
                    >
                      <p className="text-center">INFLATION BANK</p>
                    </div>
                  </div>
                </div>

                <div
                  className="tracking"
                  style={{
                    marginTop: "115px",
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
                        {isDEFI ? (
                          <>
                            <div className="row g-lg-10">
                              <ClaimSection
                                hasBorder={true}
                                theme={theme}
                                borderDarkDim={borderDarkDim}
                                textTheme={textTheme}
                                spanDarkDim={spanDarkDim}
                                onClaim={claimAllHEXReward}
                                claimDisabled={
                                  isProcessingAutoVault ||
                                  !isHEXClaimButtonEnabled
                                }
                                claimAmount={toBeHEXClaimed.formatted}
                                claimRaw={toBeHEXClaimed.raw}
                                autoVaultTarget={1000000}
                                autoVaultOnClick={handleHEXDeposit}
                                autoVaultDisabled={!isHEXButtonEnabled}
                                autoVaultAmount={HEXautoVaultAmount}
                                parityTokensClaimed={HEXparityTokensClaimed}
                                linkPath="/HEX"
                                linkText="HEX"
                                locationPath={location.pathname}
                                isActive={location.pathname === "/HEX"}
                              />

                              <ClaimSection
                                hasBorder={true}
                                theme={theme}
                                borderDarkDim={borderDarkDim}
                                textTheme={textTheme}
                                spanDarkDim={spanDarkDim}
                                onClaim={claimTEXANAllReward}
                                claimDisabled={
                                  isTEXANProcessingAutoVault ||
                                  !isTEXANClaimButtonEnabled
                                }
                                claimAmount={ToTEXANClaimed.formatted}
                                claimRaw={ToTEXANClaimed.raw}
                                autoVaultTarget={1000000000}
                                autoVaultOnClick={handleTEXANDeposit}
                                autoVaultDisabled={!isTEXANButtonEnabled}
                                autoVaultAmount={TEXANautoVaultAmount}
                                parityTokensClaimed={parityTEXANTokensClaimed}
                                linkPath="/TEXAN"
                                linkText="TEXAN"
                                locationPath={location.pathname}
                                isActive={location.pathname === "/TEXAN"}
                              />
                              <ClaimSection
                                hasBorder={true}
                                theme={theme}
                                borderDarkDim={borderDarkDim}
                                textTheme={textTheme}
                                spanDarkDim={spanDarkDim}
                                onClaim={claimREXAllReward}
                                claimDisabled={
                                  isREXProcessingAutoVault ||
                                  !isREXClaimButtonEnabled
                                }
                                claimAmount={ToREXClaimed.formatted}
                                claimRaw={ToREXClaimed.raw}
                                autoVaultTarget={50000000}
                                autoVaultOnClick={handleREXDeposit}
                                autoVaultDisabled={!isREXButtonEnabled}
                                autoVaultAmount={REXautoVaultAmount}
                                parityTokensClaimed={REXparityTokensClaimed}
                                linkPath="/REX"
                                linkText="REX"
                                locationPath={location.pathname}
                                isActive={location.pathname === "/REX"}
                              />
                              <ClaimSection
                                hasBorder={false}
                                theme={theme}
                                borderDarkDim={borderDarkDim}
                                textTheme={textTheme}
                                spanDarkDim={spanDarkDim}
                                onClaim={claimAllLoan_MReward}
                                claimDisabled={
                                  isLOANProcessingAutoVault ||
                                  !isLOANClaimButtonEnabled
                                }
                                claimAmount={ToLOANClaimed.formatted}
                                claimRaw={ToLOANClaimed.raw}
                                autoVaultTarget={1000000000}
                                autoVaultOnClick={handleLOANDeposit}
                                autoVaultDisabled={!isLOANButtonEnabled}
                                autoVaultAmount={LOANautoVaultAmount}
                                parityTokensClaimed={LOANparityTokensClaimed}
                                linkPath="/LOAN"
                                linkText="LOAN"
                                locationPath={location.pathname}
                                isActive={location.pathname === "/LOAN"}
                              />
                            </div>
                          </>
                        ) : null}
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
                              (theme === "darkTheme" &&
                                "Theme-block-container") ||
                              (theme === "dimTheme" && "dimThemeBg")
                            }`}
                          >
                            {isDEFI ? (
                              <>
                                <div className="row g-lg-10">
                                  <ClaimSection
                                    hasBorder={true}
                                    theme={theme}
                                    borderDarkDim={borderDarkDim}
                                    textTheme={textTheme}
                                    spanDarkDim={spanDarkDim}
                                    onClaim={claimAllPTGCReward}
                                    claimDisabled={
                                      isPTGCProcessingAutoVault ||
                                      !isPTGCClaimButtonEnabled
                                    }
                                    claimAmount={ToPTGCClaimed.formatted}
                                    claimRaw={ToPTGCClaimed.raw}
                                    autoVaultTarget={50000000}
                                    autoVaultOnClick={handlePTGCDeposit}
                                    autoVaultDisabled={!isPTGCButtonEnabled}
                                    autoVaultAmount={PTGCautoVaultAmount}
                                    parityTokensClaimed={
                                      PTGCparityTokensClaimed
                                    }
                                    linkPath="/PTGC"
                                    linkText="PTGC"
                                    locationPath={location.pathname}
                                    isActive={location.pathname === "/PTGC"}
                                  />
                                  <ClaimSection
                                    hasBorder={true}
                                    theme={theme}
                                    borderDarkDim={borderDarkDim}
                                    textTheme={textTheme}
                                    spanDarkDim={spanDarkDim}
                                    onClaim={claimAllWATTReward}
                                    claimDisabled={
                                      isWATTProcessingAutoVault ||
                                      !isWATTClaimButtonEnabled
                                    }
                                    claimAmount={ToWATClaimed.formatted}
                                    claimRaw={ToWATClaimed.raw}
                                    autoVaultTarget={5000000}
                                    autoVaultOnClick={handleWATTDeposit}
                                    autoVaultDisabled={!isWATTButtonEnabled}
                                    autoVaultAmount={WATTautoVaultAmount}
                                    parityTokensClaimed={
                                      WATTparityTokensClaimed
                                    }
                                    linkPath="/WATT"
                                    linkText="WATT"
                                    locationPath={location.pathname}
                                    isActive={location.pathname === "/WATT"}
                                  />
                                </div>
                              </>
                            ) : null}
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
    </div>
  );
};

export default DavDefi;
