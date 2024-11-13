import React, { useContext, useState, useEffect } from "react";
import "../dav.css";
import "../../../Utils/Theme.css";
import toni from "../../../Assets/Token List Icon/toni.png";
import inch from "../../../Assets/Token List Icon/9inch.png";
import spark from "../../../Assets/Token List Icon/spark.png";
import pts from "../../../Assets/Token List Icon/pts.png";
import prate from "../../../Assets/Token List Icon/prate.png";
import mm from "../../../Assets/Token List Icon/9mm.jpeg";
import { themeContext } from "../../../App";
import { Link, useLocation } from "react-router-dom";
import { Web3WalletContext } from "../../../Utils/MetamskConnect";
import { functionsContext } from "../../../Utils/Functions";
import { ethers } from "ethers";

import { allInOnePopup } from "../../../Utils/ADDRESSES/Addresses";

export const DAVTrade = () => {
  const { theme } = useContext(themeContext);

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
  const [ToPTSclaimed, setToBePTSClaimed] = useState({
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
  const TObeNIneMMClaimed = async () => {
    await TobeAllClaimed("ninemm", setToBeNineMMClaimed);
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
  const claimAllNineInchReward = async () => {
    const contractType = "9INCH";
    const toBeClaimed = ToNine_InchClaimed.raw;
    await claimAllReward(
      contractType,
      toBeClaimed,
      isNine_InchProcessingAutoVault
    );
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
    const toBeClaimed = ToPTSclaimed.raw;
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
      TObeNIneMMClaimed();
      PRATESClaimed();
      fetchPRATEAutoVaultAmounts();
      fetchAutoVaultAmounts();
      fetchNine_InchAutoVaultAmounts();
      fetchTONIAutoVaultAmounts();
    }
  });
  const [selectedTokenImage, setSelectedTokenImage] = useState(prate);
  const [linkPath, setLinkPath] = useState("/PRATE");

  const [selectedToken, setSelectedToken] = useState("prate");

  const handleTokenChange = (token) => {
    setSelectedToken(token);

    switch (token) {
      case "prate":
        setSelectedTokenImage(prate);
        setLinkPath("/PRATE");
        break;
      case "toni":
        setSelectedTokenImage(toni);
        setLinkPath("/TONI");
        break;
      case "9inch":
        setSelectedTokenImage(inch);
        setLinkPath("/Nine_Inch");
        break;
      case "spark":
        setSelectedTokenImage(spark);
        setLinkPath("/SPARK");
        break;
      case "pts":
        setSelectedTokenImage(pts);
        setLinkPath("/PTS");
        break;
      case "9mm":
        setSelectedTokenImage(mm);
        setLinkPath("/NineMM");
        break;
      default:
        console.warn("Invalid token selected for", token);
    }
  };

  const claimButtonMap = {
    prate: !isPRATEButtonEnabled || isPRATEProcessingAutoVault,
    toni: !isTONIButtonEnabled || isTONIProcessingAutoVault,
    "9inch": !isNine_InchButtonEnabled || isNine_InchProcessingAutoVault,
    spark: !isSPARKButtonEnabled || isSPARKProcessingAutoVault,
    pts: !isPTSButtonEnabled || isPTSProcessingAutoVault,
    "9mm": !isNineMMButtonEnabled || isProcessingAutoVault,
  };

  const AutoVaultAMountMap = {
    prate: PRATEautoVaultAmount,
    toni: TONIautoVaultAmount,
    "9inch": Nine_InchautoVaultAmount,
    spark: SPARKautoVaultAmount,
    pts: PTSautoVaultAmount,
    "9mm": NineMMautoVaultAmount,
  };

  const autoVaultButtonMap = {
    prate: isPRATEClaimButtonEnabled,
    toni: isTONIClaimButtonEnabled,
    "9inch": isNine_InchClaimButtonEnabled,
    spark: isSPARKClaimButtonEnabled,
    pts: isPTSClaimButtonEnabled,
    "9mm": isNineMMClaimButtonEnabled,
  };
  const ClaimAmountMap = {
    prate: ToPRATEClaimed.raw,
    toni: ToTONIClaimed.raw,
    "9inch": ToNine_InchClaimed.raw,
    spark: ToSPARKClaimed.raw,
    pts: ToPTSclaimed.raw,
    "9mm": toBeNineMMClaimed.raw,
  };
  const ClaimedAmountMap = {
    prate: parityPRATETokensClaimed,
    toni: TONIparityTokensClaimed,
    "9inch": Nine_InchparityTokensClaimed,
    spark: SPARKparityTokensClaimed,
    pts: PTSparityTokensClaimed,
    "9mm": NineMMparityTokensClaimed,
  };

  // Function to handle action (auto vault or claim) when button is clicked
  const handleActionClick = (actionType) => {
    switch (selectedTokenImage) {
      case prate:
        if (actionType === "autoVault") {
          handlePRATEDeposit();
        } else if (claimButtonMap["prate"]) {
          claimPRATEAllReward();
        }
        break;

      case toni:
        if (actionType === "autoVault") {
          handleTONIDeposit();
        } else if (claimButtonMap["toni"]) {
          claimTONIAllReward();
        }
        break;

      case pts:
        if (actionType === "autoVault") {
          handlePTSDeposit();
        } else if (claimButtonMap["pts"]) {
          claimAllPTSReward();
        }
        break;

      case "9inch":
        if (actionType === "autoVault") {
          handleNine_InchDeposit();
        } else if (claimButtonMap["9inch"]) {
          claimAllNineInchReward();
        }
        break;
      case spark:
        if (actionType === "autoVault") {
          handleSPARKDeposit();
        } else if (claimButtonMap["spark"]) {
          claimAllSPARKReward();
        }
        break;
      case "9mm":
        if (actionType === "autoVault") {
          handleNineMMDeposit();
        } else if (claimButtonMap["9mm"]) {
          claimAllNineInchReward();
        }
        break;

      default:
        console.warn("Invalid token selected for", selectedTokenImage);
    }
  };

  const [DepositAddress, setDepositAddress] = useState(false);
  const currentAddress =
    "0x14093F94E3D9E59D1519A9ca6aA207f88005918c".toLowerCase();
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

  const isHei =
    !isHome && !isAlpha && !isInflationPLS && !isInflationXEN && "hei";

  return (
    <div className="row align-items-center mb-3">
      <div
        className="col d-flex align-items-center mx-3" // Use flexbox for horizontal layout
      >
        <div
          className="rounded-circle mx-3"
          style={{ display: "inline-block" }}
        >
          <Link
            className={`hover-container enter ${
              location.pathname === linkPath ? "ins active" : ""
            }`}
            role="button"
            to={linkPath}
            style={{
              display: "inline-block",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative", // To position the hover text
              width: "30px",
              height: "30px",
            }}
          >
            <img
              src={selectedTokenImage}
              alt="Token"
              className={`logo-img ${theme === "lightTheme" ? "" : ""}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <span className={`hover-text ${theme}`}>PLS</span>
          </Link>
        </div>
        <select
          className="form-select form-select-sm small-select"
          onChange={(e) => handleTokenChange(e.target.value)}
          style={{ width: "1rem", marginTop: "-4px" }}
        >
          <option value="9mm">9MM</option>
          <option value="pts">PTS</option>
          <option value="9inch">9INCH</option>
          <option value="toni">TONI</option>
          <option value="spark">SPARK</option>
          <option value="prate">PRATE</option>
        </select>
      </div>

      <div className="col text-center">
        <button
          className={`box-4 mx-2 glowing-button ${
            theme === "darkTheme"
              ? "Theme-btn-block"
              : theme === "dimTheme"
              ? "dimThemeBtnBg"
              : "lightThemeButtonBg"
          } ${theme}`}
          onClick={() => handleActionClick("autoVault")}
          disabled={!autoVaultButtonMap[selectedTokenImage]}
        >
          AUTO-VAULT
        </button>
        <span className={`${spanDarkDim}`}>
          {AutoVaultAMountMap[selectedToken] || "0.00"}
        </span>
      </div>
      <div className="col text-center">
        <button
          className={`box-4 items mx-2 glowing-button ${
            theme === "darkTheme"
              ? "Theme-btn-block"
              : theme === "dimTheme"
              ? "dimThemeBorder"
              : "lightThemeButtonBg"
          } ${theme}`}
          onClick={() => handleActionClick("click")}
          disabled={!claimButtonMap[selectedTokenImage]}
        >
          CLAIM
        </button>
        <span className={`${spanDarkDim}`}>
          {ClaimAmountMap[selectedToken] || "0.0"}
        </span>
      </div>
      <div className="col text-center">
        <span className={`${spanDarkDim}`}>
          {ClaimedAmountMap[selectedToken] || "0.00"}
        </span>
      </div>
      {DepositAddress && (
        <div className="col text-center d-flex align-items-center justify-content-center">
          <input
            type="text"
            className="form-control form-control-sm me-2"
            placeholder="Enter amount"
            style={{ maxWidth: "100px" }}
          />
          <button
            className={`box-4 items mx-2 glowing-button ${
              theme === "darkTheme"
                ? "Theme-btn-block"
                : theme === "dimTheme"
                ? "dimThemeBorder"
                : "lightThemeButtonBg"
            } ${theme}`}
          >
            DEPOSIT
          </button>
        </div>
      )}
    </div>
  );
};

export default DAVTrade;
