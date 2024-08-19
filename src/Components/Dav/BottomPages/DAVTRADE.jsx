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

export const DAVTrade = () => {
  const { theme } = useContext(themeContext);

  // const { toBeNineMMClaimed , ClaimAllReward} = useContext(XenTrackingContext);

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

  const [isNineMMButtonEnabled, setIsNineMMButtonEnabled] = useState(false);
  const [isNine_InchButtonEnabled, setIsNine_InchButtonEnabled] =
    useState(false);
  const [isSPARKButtonEnabled, setIsSPARKButtonEnabled] = useState(false);
  const [isPTSButtonEnabled, setIsPTSButtonEnabled] = useState(false);
  const [isPRATEButtonEnabled, setIsPRATEButtonEnabled] = useState(false);
  const [isTONIButtonEnabled, setIsTONIButtonEnabled] = useState(false);
  // const [isPLSButtonEnabled, setPLSIsButtonEnabled] = useState(false);
  const [NineMMparityTokensClaimed, setNineMMParityTokensClaimed] =
    useState("0");
  const [parityPRATETokensClaimed, setPRATEParityTokensClaimed] = useState("0");
  const [TONIparityTokensClaimed, setTONIParityTokensClaimed] = useState("0");
  const [PTSparityTokensClaimed, setPTSParityTokensClaimed] = useState("0");
  const [SPARKparityTokensClaimed, setSPARKParityTokensClaimed] = useState("0");
  const [Nine_InchparityTokensClaimed, setNine_InchParityTokensClaimed] =
    useState("0");
  const [NineMMautoVaultAmount, setNineMMAutoVaultAmount] = useState("0");
  const [SPARKautoVaultAmount, setSPARKAutoVaultAmount] = useState("0");
  const [PTSautoVaultAmount, setPTSAutoVaultAmount] = useState("0");
  const [Nine_InchautoVaultAmount, setNine_InchAutoVaultAmount] = useState("0");
  const [PRATEautoVaultAmount, setPRATEAutoVaultAmount] = useState("0");
  const [TONIautoVaultAmount, setTONIAutoVaultAmount] = useState("0");

  const [AVBUtton, setAVButton] = useState("0");
  const [SPARKBUtton, setSPARKButton] = useState("0");
  const [PSTBUtton, setPSTButton] = useState("0");
  const [TONIAVButton, setTONIAVButton] = useState("0");
  const [AVNINE_MMButton, setAVNINE_MMBUtton] = useState("0");
  const [NINE_INCHforButton, setNINE_INCHforButton] = useState("0");

  const [toBeNineMMClaimed, setToBeNineMMClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [ToPRATEClaimed, setToBePRATEClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [ToTONIClaimed, setToBeTONIClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [ToNine_InchClaimed, setToBeNine_InchClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [ToSPARKClaimed, setToBeSPARKClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [ToWATClaimed, setToBePTSClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [isProcessingAutoVault, setIsProcessingAutoVault] = useState(false);

  const [isPRATEProcessingAutoVault, setIsPRATEProcessingAutoVault] =
    useState(false);
  const [isTONIProcessingAutoVault, setisTONIProcessingAutoVault] =
    useState(false);
  const [isNine_InchProcessingAutoVault, setisLoanProcessingAutoVault] =
    useState(false);
  const [isSPARKProcessingAutoVault, setisSPARKProcessingAutoVault] =
    useState(false);
  const [isPTSProcessingAutoVault, setisPTSProcessingAutoVault] =
    useState(false);
  const [isNineMMClaimButtonEnabled, setNineMMClaimISButtonEnabled] =
    useState(true);
  const [isPRATEClaimButtonEnabled, setPRATEClaimISButtonEnabled] =
    useState(true);
  const [isTONIClaimButtonEnabled, setTONIClaimISButtonEnabled] =
    useState(true);
  const [isNine_InchClaimButtonEnabled, setNine_InchClaimISButtonEnabled] =
    useState(true);
  const [isSPARKClaimButtonEnabled, setSPARKClaimISButtonEnabled] =
    useState(true);
  const [isPTSClaimButtonEnabled, setPTSClaimISButtonEnabled] = useState(true);

  const location = useLocation();
  const isHome = location.pathname == "/PLS/mint";
  const isTrade = location.pathname == "/TRADE";
  const isAlpha = location.pathname === "/alpharoom";
  const isInflationPLS = location.pathname == "/PLS";
  const isInflationXEN = location.pathname == "/XEN";

  const TobeAllClaimed = async (contractType, setTobeClaimed) => {
    try {
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

      // Format the total amount with commas
      const formattedWithCommas = parseFloat(
        formattedTotalToBeClaimed
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });

      // Update the state with the total amount to be claimed
      setTobeClaimed({
        raw: formattedTotalToBeClaimed, // store the raw numeric value
        formatted: formattedWithCommas, // store the comma-formatted value
      });
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  const ToBeNineMMClaimed = async () => {
    await TobeAllClaimed("9MM", setToBeNineMMClaimed);
  };

  const ToBePRATEClaimed = async () => {
    await TobeAllClaimed("PRAT", setToBePRATEClaimed);
  };
  const ToBeTONIClaimed = async () => {
    await TobeAllClaimed("TONI", setToBeTONIClaimed);
  };
  const ToBeNine_InchClaimed = async () => {
    await TobeAllClaimed("9INCH", setToBeNine_InchClaimed);
  };
  const ToBeSPARKClaimed = async () => {
    await TobeAllClaimed("SPARK", setToBeSPARKClaimed);
  };
  const ToBePTSClaimed = async () => {
    await TobeAllClaimed("PTS", setToBePTSClaimed);
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
  const NineMMPSDClaimed = async () => {
    await claimTokens("9MM", "9MM", setNineMMParityTokensClaimed);
  };

  const PRATESClaimed = async () => {
    await claimTokens("PRAT", "PRAT", setPRATEParityTokensClaimed);
  };

  const Nine_InchClaimed = async () => {
    await claimTokens("9INCH", "9INCH", setNine_InchParityTokensClaimed);
  };

  const TONIClaimed = async () => {
    await claimTokens("TONI", "TONI", setTONIParityTokensClaimed);
  };

  const SPARKClaimed = async () => {
    await claimTokens("SPARK", "SPARK", setSPARKParityTokensClaimed);
  };

  const PTSClaimed = async () => {
    await claimTokens("PTS", "PTS", setPTSParityTokensClaimed);
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

  // Usage for NineMM rewards
  const claimAllNineMMReward = async () => {
    const contractType = "9MM";
    const toBeClaimed = toBeNineMMClaimed.raw;
    await claimAllReward(contractType, toBeClaimed, isProcessingAutoVault);
  };

  // Usage for PDXN rewards
  const claimPRATEAllReward = async () => {
    const contractType = "PRATE";
    const toBeClaimed = ToPRATEClaimed.raw;
    const isProcessingAutoVault = isPRATEProcessingAutoVault;
    await claimAllReward(contractType, toBeClaimed, isProcessingAutoVault);
  };

  const claimTONIAllReward = async () => {
    const contractType = "TONI";
    const toBeClaimed = ToTONIClaimed.raw;
    await claimAllReward(contractType, toBeClaimed, isTONIProcessingAutoVault);
  };
  const claimAllLoan_MReward = async () => {
    const contractType = "9INCH";
    const toBeClaimed = ToNine_InchClaimed.raw;
    await claimAllReward(
      contractType,
      toBeClaimed,
      isNine_InchProcessingAutoVault
    );
  };
  const claimAllSPARKReward = async () => {
    const contractType = "SPARK";
    const toBeClaimed = ToSPARKClaimed.raw;
    await claimAllReward(contractType, toBeClaimed, isSPARKProcessingAutoVault);
  };
  const claimAllPTSReward = async () => {
    const contractType = "PTS";
    const toBeClaimed = ToWATClaimed.raw;
    await claimAllReward(contractType, toBeClaimed, isPTSProcessingAutoVault);
  };

  const fetchAutoVaultAmounts = async (
    contractType,
    threshold,
    setAutoVaultAmount,
    setNormalAMount,
    setIsButtonEnabled,
    setClaimISButtonEnabled
  ) => {
    try {
      const autoVaultAmount = await fetchAutoVaultAmount(contractType);
      console.log(`AutoVaults from ${contractType}:`, autoVaultAmount);

      const autoVaultAmountNumber = parseFloat(autoVaultAmount);
      const formattedWithCommas = parseFloat(
        autoVaultAmountNumber
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      if (typeof setAutoVaultAmount === "function") {
        setAutoVaultAmount(formattedWithCommas);
        setNormalAMount(autoVaultAmountNumber);
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
  const fetchNineMMAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts(
      "9MM",
      1000000,
      setNineMMAutoVaultAmount,
      setAVNINE_MMBUtton,
      setIsNineMMButtonEnabled,
      setNineMMClaimISButtonEnabled
    );
  };

  const fetchPRATEAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts(
      "PRATE",
      10000000,
      setPRATEAutoVaultAmount,
      setAVButton,
      setIsPRATEButtonEnabled,
      setPRATEClaimISButtonEnabled
    );
  };

  const fetchTONIAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts(
      "TONI",
      1000000,
      setTONIAutoVaultAmount,
      setTONIAVButton,
      setIsTONIButtonEnabled,
      setTONIClaimISButtonEnabled
    );
  };

  const fetchNine_InchAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts(
      "9INCH",
      10000000,
      setNine_InchAutoVaultAmount,
      setNINE_INCHforButton,
      setIsNine_InchButtonEnabled,
      setNine_InchClaimISButtonEnabled
    );
  };

  const fetchSPARKAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts(
      "SPARK",
      350000,
      setSPARKAutoVaultAmount,
      setSPARKButton,
      setIsSPARKButtonEnabled,
      setSPARKClaimISButtonEnabled
    );
  };

  const fetchPTSAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts(
      "PTS",
      1000000,
      setPTSAutoVaultAmount,
      setPSTButton,
      setIsPTSButtonEnabled,
      setPTSClaimISButtonEnabled
    );
  };
  const setAllProcessingAutoVaults = (state) => {
    setIsPRATEProcessingAutoVault(state);
    setIsProcessingAutoVault(state);
    setisTONIProcessingAutoVault(state);
    setisLoanProcessingAutoVault(state);
    setisSPARKProcessingAutoVault(state);
    setisPTSProcessingAutoVault(state);
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
      case "9MM":
        return 1000000000;
      case "TONI":
        return 50000000;
      case "SPARK":
        return 50000000;
      case "9INCH":
        return 1000000000;
      case "PTS":
        return 5000000;
      case "PRATE":
        return 1000000000;
      default:
        throw new Error(`Unknown contract type: ${contractType}`);
    }
  };

  const getSetAutoVaultAmountFunction = (contractType) => {
    switch (contractType) {
      case "9MM":
        return setNineMMAutoVaultAmount;
      case "TONI":
        return setTONIAutoVaultAmount;
      case "SPARK":
        return setSPARKAutoVaultAmount;
      case "9INCH":
        return setNine_InchAutoVaultAmount;
      case "PTS":
        return setPTSAutoVaultAmount;
      case "PRATE":
        return setPRATEAutoVaultAmount;
      default:
        throw new Error(`Unknown contract type: ${contractType}`);
    }
  };

  const getIsButtonEnabledFunction = (contractType) => {
    switch (contractType) {
      case "9MM":
        return setIsNineMMButtonEnabled;
      case "TONI":
        return setIsTONIButtonEnabled;
      case "SPARK":
        return setIsSPARKButtonEnabled;
      case "9INCH":
        return setIsNine_InchButtonEnabled;
      case "PTS":
        return setIsPTSButtonEnabled;
      case "PRATE":
        return setIsPRATEButtonEnabled;
      default:
        throw new Error(`Unknown contract type: ${contractType}`);
    }
  };

  const getClaimISButtonEnabledFunction = (contractType) => {
    switch (contractType) {
      case "9MM":
        return setNineMMClaimISButtonEnabled;
      case "TONI":
        return setTONIClaimISButtonEnabled;
      case "SPARK":
        return setSPARKClaimISButtonEnabled;
      case "9INCH":
        return setNine_InchClaimISButtonEnabled;
      case "PTS":
        return setPTSClaimISButtonEnabled;
      case "PRATE":
        return setPRATEClaimISButtonEnabled;
      default:
        throw new Error(`Unknown contract type: ${contractType}`);
    }
  };

  // Usage examples for handling deposits
  const handleNineMMDeposit = async () => {
    await isHandleDepositAutovault("9MM");
  };

  const handleTONIDeposit = async () => {
    await isHandleDepositAutovault("TONI");
  };

  const handleSPARKDeposit = async () => {
    await isHandleDepositAutovault("SPARK");
  };

  const handleNine_InchDeposit = async () => {
    await isHandleDepositAutovault("9INCH");
  };

  const handlePTSDeposit = async () => {
    await isHandleDepositAutovault("PTS");
  };

  const handlePRATEDeposit = async () => {
    await isHandleDepositAutovault("PRAT");
  };

  useEffect(() => {
    if (userConnected) {
      ToBeNineMMClaimed();
      ToBePRATEClaimed();
      ToBeTONIClaimed();
      NineMMPSDClaimed();
      fetchNineMMAutoVaultAmounts();
      TONIClaimed();
      fetchAutoVaultAmounts();
      fetchSPARKAutoVaultAmounts();
      SPARKClaimed();
      Nine_InchClaimed();
      fetchPTSAutoVaultAmounts();
      PTSClaimed();
      ToBeNine_InchClaimed();
      ToBeSPARKClaimed();
      ToBePTSClaimed();
      PRATESClaimed();
      fetchPRATEAutoVaultAmounts();
      fetchAutoVaultAmounts();
      fetchNine_InchAutoVaultAmounts();
      fetchTONIAutoVaultAmounts();
    }
  });

  const [isDAVDEFIHolders, setDAVDEFIIsHolder] = useState(false);

  useEffect(() => {
    const checkIsHolder = async (accountAddress) => {
      try {
        const isHoldingDAVDEFITokens = await isHolder(
          accountAddress,
          "DAVTRADE"
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
    <div className="container1">
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12`}>
            <div
              className={`flex-grow-1 fontSize text-start  mb-0 ms-3 ${
                theme === "dimTheme" && "text-white"
              }`}
            >
              <div className="row justify-content-center">
                <div className="col-auto">
                  <div
                    className={`info-item info-columns box new2  ${
                      (theme === "darkTheme" && "Theme-btn-block") ||
                      (theme === "dimTheme" && "dimThemeBorder") ||
                      (theme === "lightTheme" && theme + " translite")
                    }`}
                  >
                    <p className="text-center">CLAIM REWARDS / AUTO-VAULTS</p>
                  </div>
                </div>
              </div>

              <div
                className="tracking"
                style={{
                  marginTop: "90px",
                  marginBottom: "200px",
                  marginLeft: "-30px",
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
                      <>
                        <div className="row g-lg-10">
                          <ClaimSection
                            hasBorder={true}
                            theme={theme}
                            borderDarkDim={borderDarkDim}
                            textTheme={textTheme}
                            spanDarkDim={spanDarkDim}
                            onClaim={claimAllNineMMReward}
                            claimDisabled={
                              isProcessingAutoVault ||
                              !isNineMMClaimButtonEnabled
                            }
                            claimAmount={toBeNineMMClaimed.formatted}
                            claimRaw={toBeNineMMClaimed.raw}
                            autoVaultTarget={1000000}
                            autoVaultOnClick={handleNineMMDeposit}
                            autoVaultDisabled={!isNineMMButtonEnabled}
                            autoVaultAmount={NineMMautoVaultAmount}
                            amount={AVNINE_MMButton}
                            parityTokensClaimed={NineMMparityTokensClaimed}
                            linkPath="/NineMM"
                            linkText="9MM"
                            locationPath={location.pathname}
                            isActive={location.pathname === "/NineMM"}
                          />

                          <ClaimSection
                            hasBorder={true}
                            theme={theme}
                            borderDarkDim={borderDarkDim}
                            textTheme={textTheme}
                            spanDarkDim={spanDarkDim}
                            onClaim={claimPRATEAllReward}
                            claimDisabled={
                              isPRATEProcessingAutoVault ||
                              !isPRATEClaimButtonEnabled
                            }
                            claimAmount={ToPRATEClaimed.formatted}
                            claimRaw={ToPRATEClaimed.raw}
                            autoVaultTarget={10000000}
                            autoVaultOnClick={handlePRATEDeposit}
                            autoVaultDisabled={!isPRATEButtonEnabled}
                            autoVaultAmount={PRATEautoVaultAmount}
                            amount={AVBUtton}
                            parityTokensClaimed={parityPRATETokensClaimed}
                            linkPath="/PRATE"
                            linkText="PRATE"
                            locationPath={location.pathname}
                            isActive={location.pathname === "/PRATE"}
                          />
                          <ClaimSection
                            hasBorder={true}
                            theme={theme}
                            borderDarkDim={borderDarkDim}
                            textTheme={textTheme}
                            spanDarkDim={spanDarkDim}
                            onClaim={claimTONIAllReward}
                            claimDisabled={
                              isTONIProcessingAutoVault ||
                              !isTONIClaimButtonEnabled
                            }
                            claimAmount={ToTONIClaimed.formatted}
                            claimRaw={ToTONIClaimed.raw}
                            autoVaultTarget={1000000}
                            autoVaultAmount={TONIautoVaultAmount}
                            autoVaultOnClick={handleTONIDeposit}
                            autoVaultDisabled={!isTONIButtonEnabled}
                            amount={TONIAVButton}
                            parityTokensClaimed={TONIparityTokensClaimed}
                            linkPath="/TONI"
                            linkText="TONI"
                            locationPath={location.pathname}
                            isActive={location.pathname === "/TONI"}
                          />
                          <ClaimSection
                            hasBorder={false}
                            theme={theme}
                            borderDarkDim={borderDarkDim}
                            textTheme={textTheme}
                            spanDarkDim={spanDarkDim}
                            onClaim={claimAllLoan_MReward}
                            claimDisabled={
                              isNine_InchProcessingAutoVault ||
                              !isNine_InchClaimButtonEnabled
                            }
                            claimAmount={ToNine_InchClaimed.formatted}
                            claimRaw={ToNine_InchClaimed.raw}
                            autoVaultTarget={10000000}
                            autoVaultOnClick={handleNine_InchDeposit}
                            autoVaultDisabled={!isNine_InchButtonEnabled}
                            autoVaultAmount={Nine_InchautoVaultAmount}
                            amount={NINE_INCHforButton}
                            parityTokensClaimed={Nine_InchparityTokensClaimed}
                            linkPath="/Nine_Inch"
                            linkText="9INCH"
                            locationPath={location.pathname}
                            isActive={location.pathname === "/Nine_Inch"}
                          />
                        </div>
                      </>
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
                          <>
                            <div className="row g-lg-10">
                              <ClaimSection
                                hasBorder={true}
                                theme={theme}
                                borderDarkDim={borderDarkDim}
                                textTheme={textTheme}
                                spanDarkDim={spanDarkDim}
                                onClaim={claimAllSPARKReward}
                                claimDisabled={
                                  isSPARKProcessingAutoVault ||
                                  !isSPARKClaimButtonEnabled
                                }
                                claimAmount={ToSPARKClaimed.formatted}
                                claimRaw={ToSPARKClaimed.raw}
                                autoVaultTarget={350000}
                                autoVaultOnClick={handleSPARKDeposit}
                                autoVaultDisabled={!isSPARKButtonEnabled}
                                autoVaultAmount={SPARKautoVaultAmount}
                                amount={SPARKBUtton}
                                parityTokensClaimed={SPARKparityTokensClaimed}
                                linkPath="/SPARK"
                                linkText="SPARK"
                                locationPath={location.pathname}
                                isActive={location.pathname === "/SPARK"}
                              />
                              <ClaimSection
                                hasBorder={true}
                                theme={theme}
                                borderDarkDim={borderDarkDim}
                                textTheme={textTheme}
                                spanDarkDim={spanDarkDim}
                                onClaim={claimAllPTSReward}
                                claimDisabled={
                                  isPTSProcessingAutoVault ||
                                  !isPTSClaimButtonEnabled
                                }
                                claimAmount={ToWATClaimed.formatted}
                                claimRaw={ToWATClaimed.raw}
                                autoVaultTarget={1000000}
                                autoVaultOnClick={handlePTSDeposit}
                                autoVaultDisabled={!isPTSButtonEnabled}
                                autoVaultAmount={PTSautoVaultAmount}
                                amount={PSTBUtton}
                                parityTokensClaimed={PTSparityTokensClaimed}
                                linkPath="/PTS"
                                linkText="PTS"
                                locationPath={location.pathname}
                                isActive={location.pathname === "/PTS"}
                              />
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isTrade && isDAVDEFIHolders && (
          <div className={`container-fluid`} style={{ marginTop: "-250px" }}>
            <div
              className={`flex-grow-1 fontSize text-start   ${
                theme === "dimTheme" && "text-white"
              }`}
            >
              <div className="row justify-content-center">
                <div className="col-auto"></div>
                <div
                  className={`info-item info-columns box new5 ${
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
                  style={{ marginTop: "100px",marginRight:"10px" }}
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
                          { name: "9MM", src: SystemStateLogo },
                          { name: "PRATE", src: SystemStateLogo },
                          { name: "TONI", src: SystemStateLogo },
                          { name: "9INCH", src: SystemStateLogo },
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
                                    theme === "lightTheme"
                                      ? "inverse-filter"
                                      : ""
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
                  style={{ marginTop: "80px" ,marginRight:"10px"}}
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
                          { name: "SPARK", src: SystemStateLogo },
                          { name: "PTS", src: SystemStateLogo },
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
                                    theme === "lightTheme"
                                      ? "inverse-filter"
                                      : ""
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DAVTrade;
