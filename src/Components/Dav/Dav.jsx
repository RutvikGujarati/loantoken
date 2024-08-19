import React, { useContext, useState, useEffect } from "react";
import "./dav.css";
import "../../Utils/Theme.css";
import { Link } from "react-router-dom";
import SystemStateLogo from "../../Assets/High-Resolutions-Svg/Updated/logo.svg";

import { themeContext } from "../../App";
import { useLocation } from "react-router-dom";
// import { TotalSumProvider  } from "../../Components/Tracker/TrackingPage";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { functionsContext } from "../../Utils/Functions";
import { ethers } from "ethers";

import { allInOnePopup } from "../../Utils/ADDRESSES/Addresses";
import DavDefi from "./BottomPages/DavDefi";
import BNBDAV from "./BottomPages/BNBDav";
import PolygonDav from "./BottomPages/PolygonClaim";
import ClaimSection from "./Claim";
import DAVTrade from "./BottomPages/DAVTRADE";

export default function DAV() {
  // const {setsumofPoints} = useContext(airdrop)
  const { theme } = useContext(themeContext);

  // const { toBeClaimed , ClaimAllReward} = useContext(XenTrackingContext);

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
    getToBeClaimed,
    getPLSToBeClaimed,
    getPLSUserDistributedTokens,
    getParityDollarClaimed,
    getPLSParityDollarClaimed,
    getPLSParityReached,
    getParityReached,
    handleDepositAutovault,
    getProtocolFee,
    getDistributedAmount,
    fetchAutoVaultAmount,
    getPLS_PST_Claimed,
    viewUserShareForDistribution,
    get_PST_Claimed,
    getUserDistributedTokens,
    getClaimAllReward,
    isHolder,
    getPLSProtocolFee,
    fetchPLSAutoVaultAmount,
    getTimeStampForCreateValut,
    getParityTokensDeposits,
    getParityDollardeposits,
    handlePLSDepositAutovaults,
    getPLSClaimAllReward,
  } = useContext(functionsContext);
  const [DayStamp, setDayStamp] = useState("0");
  const [paritydeposit, setParitydeposit] = useState("0");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isPLSButtonEnabled, setIsPLSButtonEnabled] = useState(false);
  const [isPDXNButtonEnabled, setIsPDXNButtonEnabled] = useState(false);
  const [isPFENIXButtonEnabled, setIsPFENIXButtonEnabled] = useState(false);
  // const [isPLSButtonEnabled, setPLSIsButtonEnabled] = useState(false);
  const [PLSparityTokensClaimed, setPLSParityTokensClaimed] = useState("0");
  const [parityTokensClaimed, setParityTokensClaimed] = useState("0");
  const [PDXNparityTokensClaimed, setPDXNParityTokensClaimed] = useState("0");
  const [PFENIXparityTokensClaimed, setPFENIXParityTokensClaimed] =
    useState("0");
  const [autoVaultAmount, setAutoVaultAmount] = useState("0");

  const [PDXNautoVaultAmount, setPDXNAutoVaultAmount] = useState("0");

  const [PFENIXautoVaultAmount, setPFENIXAutoVaultAmount] = useState("0");

  const [PLSautoVaultAmount, setPLSAutoVaultAmount] = useState("0");

  const [AVBUtton, setAVButton] = useState("0");
  const [PDXNAVButton, setPDXNAVButton] = useState("0");
  const [AVPFENIXButton, setAVPFENIXBUtton] = useState("0");
  const [PLSforButton, setPLSforButton] = useState("0");

  const [toBeClaimed, setToBeClaimed] = useState("0");
  const [ToPDXNClaimed, setToPDXNBeClaimed] = useState("0");
  const [ToPFENIXClaimed, setToPFENIXBeClaimed] = useState("0");
  const [PLStoBeClaimed, setPLSToBeClaimed] = useState("0");
  const [parityDollardeposits, setParityDollardeposits] = useState("0");
  const [totalsumofPOints, setsumofPoints] = useState("0");
  const [isProcessingAutoVault, setIsProcessingAutoVault] = useState(false);
  const [isPLSProcessingAutoVault, setIsPLSProcessingAutoVault] =
    useState(false);
  const [isPDXNProcessingAutoVault, setIsPDXNProcessingAutoVault] =
    useState(false);
  const [isPFENIXProcessingAutoVault, setIsPFENIXProcessingAutoVault] =
    useState(false);
  const [isClaimButtonEnabled, setClaimISButtonEnabled] = useState(true);
  const [isPLSClaimButtonEnabled, setPLSClaimISButtonEnabled] = useState(true);
  const [isPDXNClaimButtonEnabled, setPDXNClaimISButtonEnabled] =
    useState(true);
  const [isPFENIXClaimButtonEnabled, setPFENIXClaimISButtonEnabled] =
    useState(true);

  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
  const ParityDollardeposits = async () => {
    try {
      let ParityDollardeposits = await getParityDollardeposits(accountAddress);
      let formattedParityDollardeposits = ethers.utils.formatEther(
        ParityDollardeposits || "0"
      );
      let fixed = Number(formattedParityDollardeposits).toFixed(2);

      // setDepositAmount(inputValue);
      if (/^[0-9,.]*$/.test(fixed)) {
        const numericValue = fixed.replace(/,/g, "");
        const formattedValue = numericValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        // const formattedWithDecimals = `${formattedValue} .00`;
        setParityDollardeposits(formattedValue);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const location = useLocation();
  const isHome = location.pathname === "/PLS/mint";
  const isBNB = location.pathname === "/BNB/mint";
  const isPolygon = location.pathname === "/polygon/mint";
  const isDEFI = location.pathname === "/DEFI";
  const isTrade = location.pathname === "/TRADE";
  const isAlpha = location.pathname === "/alpharoom";
  const isInflationPLS = location.pathname === "/PLS";
  const isInflationXEN = location.pathname === "/XEN";

  const ToBeClaimed = async () => {
    try {
      let usePSD = true;
      let parityShareTokensDetail = await getParityDollarClaimed(
        accountAddress,
        usePSD
      );
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
      const formattedWithCommas = parseFloat(
        formattedTotalToBeClaimed
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      // Update the state with the total amount to be claimed
      setToBeClaimed({
        raw: formattedTotalToBeClaimed, // store the raw numeric value
        formatted: formattedWithCommas, // store the comma-formatted value
      });
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };
  const ToBePDXNClaimed = async () => {
    try {
      const contractType = "PDXN";
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
      setToPDXNBeClaimed({
        raw: formattedTotalToBeClaimed, // store the raw numeric value
        formatted: formattedWithCommas, // store the comma-formatted value
      });
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };
  const ToBePFENIXClaimed = async () => {
    try {
      const contractType = "PFENIX";
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
      setToPFENIXBeClaimed({
        raw: formattedTotalToBeClaimed, // store the raw numeric value
        formatted: formattedWithCommas, // store the comma-formatted value
      });
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  const PLSPSDClaimed = async () => {
    try {
      let PSTClaimed = await getPLS_PST_Claimed(accountAddress);
      let formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");
      let fixed = Number(formatted_PST_Claimed);

      const formattedWithCommas = fixed.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      });
      setPLSParityTokensClaimed(formattedWithCommas);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const PSTClaimed = async () => {
    try {
      const contractType = "PSD";
      const PSTClaimed = await get_PST_Claimed(contractType);
      const formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");
      const fixed = Number(formatted_PST_Claimed);
      // const fixed = 2534354354;
      const formattedWithCommas = fixed.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      });
      setParityTokensClaimed(formattedWithCommas);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const PFENIXClaimed = async () => {
    try {
      const contractType = "PFENIX";
      const PSTClaimed = await get_PST_Claimed(contractType);
      const formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");
      const fixed = Number(formatted_PST_Claimed);
      // const fixed = 35655345453;

      // Format the number with commas
      const formattedWithCommas = fixed.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      });

      setPFENIXParityTokensClaimed(formattedWithCommas);
    } catch (error) {
      console.error("PFENIXClaimed error:", error);
    }
  };

  const PDXNClaimed = async () => {
    try {
      const contractType = "PDXN";
      const PSTClaimed = await get_PST_Claimed(contractType);
      const formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");
      const fixed = Number(formatted_PST_Claimed);
      const formattedWithCommas = fixed.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      });

      setPDXNParityTokensClaimed(formattedWithCommas);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const ToPLSBeClaimed = async () => {
    try {
      // Get the parity share tokens claimable amount
      let parityShareTokensDetail = await getPLSParityDollarClaimed(
        accountAddress
      );
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );

      // Adjust the total amount to be claimed based on parity status
      let totalToBeClaimed = parseFloat(formattedParityClaimableAmount);

      // Format the total amount
      let formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);

      console.log("PLS claimed", formattedParityClaimableAmount);

      // Update the state with the total amount to be claimed
      const formattedWithCommas = parseFloat(
        formattedTotalToBeClaimed
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });

      setPLSToBeClaimed({
        raw: formattedTotalToBeClaimed, // store the raw numeric value
        formatted: formattedWithCommas, // store the comma-formatted value
      });
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  const claimAllReward = async () => {
    if (!isProcessingAutoVault) {
      console.log("Number(toBeClaimed):", Number(toBeClaimed.raw));
      console.log("toBeClaimed:", toBeClaimed.formatted);

      if (Number(toBeClaimed.raw) <= 0) {
        allInOnePopup(null, "Insufficient Balance", null, `OK`, null);
        return;
      }

      try {
        const contractType = "PSD";
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

  const claimPDXNAllReward = async () => {
    if (!isPDXNProcessingAutoVault) {
      console.log("Number(toBeClaimed):", Number(ToPDXNClaimed.raw));
      console.log("toBeClaimed:", ToPDXNClaimed.raw);

      if (Number(ToPDXNClaimed.raw) <= 0) {
        allInOnePopup(null, "Insufficient Balance", null, `OK`, null);
        return;
      }
      try {
        const contractType = "PDXN";
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
  const claimPFENIXAllReward = async () => {
    if (!isPFENIXProcessingAutoVault) {
      console.log("Number(toBeClaimed):", Number(ToPFENIXClaimed.raw));
      console.log("toBeClaimed:", ToPFENIXClaimed.raw);

      if (Number(ToPFENIXClaimed.raw) <= 0) {
        allInOnePopup(null, "Insufficient Balance", null, `OK`, null);
        return;
      }
      try {
        const contractType = "PFENIX";
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

  const claimPLSAllReward = async () => {
    if (!isPLSProcessingAutoVault) {
      console.log("Number(toBeClaimed):", Number(PLStoBeClaimed.raw));
      console.log("toBeClaimed:", PLStoBeClaimed.raw);

      if (Number(PLStoBeClaimed.raw) <= 0) {
        allInOnePopup(null, "Insufficient Balance", null, `OK`, null);
        return;
      }

      try {
        // allInOnePopup(null, 'Processing...', 'Please wait while we claim your rewards', `OK`, null);
        const allReward = await getPLSClaimAllReward(accountAddress);
        await allReward.wait(); // Wait for the transaction to be confirmed
        // setToBeClaimedReward(allReward);
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

  let AutoAMount = 0;

  const fetchAutoVaultAmounts = async () => {
    try {
      const contractType = "PSD";
      let autoVaultAmount = await fetchAutoVaultAmount(
        accountAddress,
        contractType
      );

      console.log("AutoVaults from tracking:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount).toFixed(2);

      AutoAMount += autoVaultAmountNumber;
      const formattedWithCommas = parseFloat(
        autoVaultAmountNumber
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setAutoVaultAmount(formattedWithCommas);
      setAVButton(autoVaultAmountNumber);
      if (AutoAMount > 10000000000) {
        setIsButtonEnabled(true);
        setClaimISButtonEnabled(false);
      } else {
        setIsButtonEnabled(false);
      }
    } catch (error) {
      console.error("fetchAutoVaultAmounts error:", error);
      setAutoVaultAmount("0");
    }
  };
  const fetchPDXNAutoVaultAmounts = async () => {
    try {
      const contractType = "PDXN";
      let autoVaultAmount = await fetchAutoVaultAmount(contractType);

      console.log("AutoVaults from PDXN:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount).toFixed(2);
      const formattedWithCommas = parseFloat(
        autoVaultAmountNumber
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      if (autoVaultAmountNumber > 1000) {
        setIsPDXNButtonEnabled(true);
        setPDXNClaimISButtonEnabled(false);
      } else {
        setIsPDXNButtonEnabled(false);
      }

      setPDXNAutoVaultAmount(formattedWithCommas);
      setPDXNAVButton(autoVaultAmountNumber);
    } catch (error) {
      console.error("fetchPDXNAutoVaultAmounts error:", error);
      setPDXNAutoVaultAmount("0");
    }
  };

  const fetchPFENIXAutoVaultAmounts = async () => {
    try {
      const contractType = "PFENIX";
      let autoVaultAmount = await fetchAutoVaultAmount(contractType);

      console.log("AutoVaults from PDXN:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount).toFixed(2);
      const formattedWithCommas = parseFloat(
        autoVaultAmountNumber
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      if (autoVaultAmountNumber > 1000000) {
        setIsPFENIXButtonEnabled(true);
        setPFENIXClaimISButtonEnabled(false);
      } else {
        setIsPFENIXButtonEnabled(false);
      }

      setPFENIXAutoVaultAmount(formattedWithCommas);
      setAVPFENIXBUtton(autoVaultAmountNumber);
    } catch (error) {
      console.error("fetchPDXNAutoVaultAmounts error:", error);
      setPFENIXAutoVaultAmount("0.00");
    }
  };

  const fetchPLSAutoVaultAmounts = async (address) => {
    try {
      const contractType = "PSD";
      let autoVaultAmount = await fetchPLSAutoVaultAmount(
        accountAddress,
        contractType
      );

      console.log("AutoVaults from tracking:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount).toFixed(2);
      const formattedWithCommas = parseFloat(
        autoVaultAmountNumber
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      if (autoVaultAmountNumber > 1000000) {
        setIsPLSButtonEnabled(true);
        setPLSClaimISButtonEnabled(false);
      } else {
        setIsPLSButtonEnabled(false);
      }

      setPLSAutoVaultAmount(formattedWithCommas);
      setPLSforButton(autoVaultAmountNumber);
    } catch (error) {
      console.error("fetchAutoVaultAmounts error:", error);
      setPLSAutoVaultAmount("0");
    }
  };

  const handleDepositAVPLS = async () => {
    setIsPLSProcessingAutoVault(true);
    try {
      allInOnePopup(null, "Create a new Vault", null, `OK`, null);

      let deposit = await handleDepositAutovault("PLS");
      deposit.wait();
      allInOnePopup(null, "Done - Inflation Locked", null, `OK`, null);
      // Reset AutoAMount to 0 after successful deposit
      AutoAMount = 0;
      setPLSAutoVaultAmount("0");
      // setPLSIsButtonEnabled(false);
    } catch (error) {
      console.error("Deposit error:", error);
    } finally {
      setIsPLSProcessingAutoVault(false);
      fetchPLSAutoVaultAmounts();
    }
  };

  const HandleDepositPDXNAutovault = async () => {
    setIsPDXNProcessingAutoVault(true);

    try {
      const contractType = "PDXN";
      const isSuccess = await handleDepositAutovault(contractType); // Make sure to pass the amount as well
      if (isSuccess) {
        await isSuccess.wait();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPDXNProcessingAutoVault(true);
      fetchPDXNAutoVaultAmounts(accountAddress); // Update the auto vault amount after processing
    }
  };
  const HandleDepositPFENIXAutovault = async () => {
    setIsPFENIXProcessingAutoVault(true);
    try {
      const contractType = "PFENIX";
      const isSuccess = await handleDepositAutovault(contractType); // Make sure to pass the amount as well
      if (isSuccess) {
        await isSuccess.wait();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPFENIXProcessingAutoVault(true);
      fetchPFENIXAutoVaultAmounts(accountAddress); // Update the auto vault amount after processing
    }
  };

  useEffect(() => {
    if (userConnected) {
      ToBeClaimed();
      ToBePDXNClaimed();
      ToBePFENIXClaimed();
      PLSPSDClaimed();
      PDXNClaimed();
      PFENIXClaimed();
      fetchPFENIXAutoVaultAmounts();
      PSTClaimed();
      ToPLSBeClaimed();
      fetchPDXNAutoVaultAmounts();
      fetchAutoVaultAmounts();
      fetchPLSAutoVaultAmounts();
    }
    // totalReachedPriceTarget();
  });

  const data = [
    {
      PLS: "Testing auto-vault targets for DAVPLS tokens. Claim your rewards.Market-making strategies have yet to start.",
      PXEN: "Testing auto-vault targets for DAVPLS tokens. Claim your rewards.Market-making strategies have yet to start.",
      PDXN: "Testing auto-vault targets for DAVPLS tokens. Claim your rewards.Market-making strategies have yet to start.",
      PFENIX:
        "Testing auto-vault targets for DAVPLS tokens. Claim your rewards.Market-making strategies have yet to start.",
    },
  ];

  const ParityTokensDepositforPoint = async () => {
    try {
      let ParityTokensDeposits = await getParityTokensDeposits(accountAddress);
      let formattedParityTokensDeposits = ethers.utils.formatEther(
        ParityTokensDeposits || "0"
      );
      let fixed =
        parseFloat(formattedParityTokensDeposits)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ";
      setParitydeposit(fixed);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userConnected) {
      ParityDollardeposits();
      ParityTokensDepositforPoint();
    }
  });

  const [isDAVHolders, setDAVIsHolder] = useState(false);

  useEffect(() => {
    const checkIsHolder = async (accountAddress) => {
      try {
        const isHoldingTokens = await isHolder(accountAddress, "DAV");
        setDAVIsHolder(isHoldingTokens);
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
    !isHome &&
    !isBNB &&
    !isAlpha &&
    !isInflationPLS &&
    !isInflationXEN &&
    "hei";

  const AlphaRoom = ({
    hasBorder,
    TokenName,
    image,
    theme,
    borderDarkDim,
    textTheme,
    spanDarkDim,
    data,
  }) => {
    const tokenData = data[0][TokenName];

    return (
      <div
        className={`col-md-4 col-lg-3 d-flex flex-column justify-content-center ${
          hasBorder ? `border-right ${borderDarkDim}` : ""
        }`}
      >
        <hr className="d-block d-lg-none d-md-none" />
        <div className="d-flex mint-token-container">
          <div
            className={`margin-right ${
              theme === "lightTheme" ? "inverse-filter" : ""
            }`}
          >
            <img
              src={image}
              alt="Logo"
              width="30"
              height="30"
              className="iconSize"
            />
          </div>
          <div
            className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
          >
            <div>
              <div className="varSize">
                <span className={`spanTex ${spanDarkDim}`}>
                  {TokenName === "PLS" ? (
                    TokenName
                  ) : (
                    <>
                      <span className="lowercase-first-letter">
                        {TokenName.charAt(0).toLowerCase()}
                      </span>
                      {TokenName.slice(1)}
                    </>
                  )}
                </span>
              </div>
              <span className={`normalText ${spanDarkDim}`}>{tokenData}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`flex-grow-1 fontSize text-start ${textTitle} mb-0 ms-3 ${
          theme === "dimTheme" && "text-white"
        } `}
      >
        {isHome ? (
          <>
            <div className={`container-fluid`}>
              <div
                className={`flex-grow-1 fontSize text-start ${textTitle} mb-0 ms-3 ${
                  theme === "dimTheme" && "text-white"
                }`}
              >
                <div className="row justify-content-center">
                  <div className="col-auto">
                    <div
                      className={`info-item info-columns box new  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBorder") ||
                        (theme === "lightTheme" && theme + " translite")
                      }`}
                    >
                      <p className="text-center">CLAIM REWARDS / AUTO-VAULTS</p>
                    </div>
                    <div
                      className="tracking"
                      style={{
                        marginTop: "100px",
                        marginBottom: "100px",
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
                              (theme === "darkTheme" &&
                                "Theme-block-container") ||
                              (theme === "dimTheme" && "dimThemeBg")
                            }`}
                          >
                            <div className="row g-lg-10">
                              <ClaimSection
                                hasBorder={true}
                                theme={theme}
                                borderDarkDim={borderDarkDim}
                                textTheme={textTheme}
                                spanDarkDim={spanDarkDim}
                                onClaim={claimPLSAllReward}
                                claimDisabled={
                                  isPLSProcessingAutoVault ||
                                  !isPLSClaimButtonEnabled
                                }
                                claimAmount={PLStoBeClaimed.formatted}
                                claimRaw={PLStoBeClaimed.raw}
                                autoVaultOnClick={handleDepositAVPLS}
                                autoVaultTarget={1000000}
                                autoVaultDisabled={!isPLSButtonEnabled}
                                autoVaultAmount={PLSautoVaultAmount}
                                amount={PLSforButton}
                                parityTokensClaimed={PLSparityTokensClaimed}
                                linkPath="/PLS"
                                linkText="PLS"
                                locationPath={location.pathname}
                                isActive={location.pathname === "/PLS"}
                              />
                              <ClaimSection
                                hasBorder={true}
                                theme={theme}
                                borderDarkDim={borderDarkDim}
                                textTheme={textTheme}
                                spanDarkDim={spanDarkDim}
                                onClaim={claimAllReward}
                                claimDisabled={
                                  isProcessingAutoVault || !isClaimButtonEnabled
                                }
                                claimAmount={toBeClaimed.formatted}
                                claimRaw={toBeClaimed.raw}
                                autoVaultOnClick={handleDepositAutovault}
                                autoVaultDisabled={!isButtonEnabled}
                                autoVaultTarget={10000000000}
                                autoVaultAmount={autoVaultAmount}
                                amount={AVBUtton}
                                parityTokensClaimed={parityTokensClaimed}
                                linkPath="/XEN"
                                linkText="XEN"
                                locationPath={location.pathname}
                                isActive={location.pathname === "/XEN"}
                              />
                              <ClaimSection
                                hasBorder={true}
                                theme={theme}
                                borderDarkDim={borderDarkDim}
                                textTheme={textTheme}
                                spanDarkDim={spanDarkDim}
                                onClaim={claimPDXNAllReward}
                                claimDisabled={
                                  isPDXNProcessingAutoVault ||
                                  !isPDXNClaimButtonEnabled
                                }
                                claimAmount={ToPDXNClaimed.formatted}
                                claimRaw={ToPDXNClaimed.raw}
                                autoVaultOnClick={HandleDepositPDXNAutovault}
                                autoVaultDisabled={!isPDXNButtonEnabled}
                                autoVaultTarget={1000}
                                autoVaultAmount={PDXNautoVaultAmount}
                                amount={PDXNAVButton}
                                parityTokensClaimed={PDXNparityTokensClaimed}
                                linkPath="/PDXN"
                                linkText="PDXN"
                                locationPath={location.pathname}
                                isActive={location.pathname === "/PDXN"}
                              />
                              <ClaimSection
                                theme={theme}
                                borderDarkDim={borderDarkDim}
                                textTheme={textTheme}
                                spanDarkDim={spanDarkDim}
                                onClaim={claimPFENIXAllReward}
                                claimDisabled={
                                  isPFENIXProcessingAutoVault ||
                                  !isPFENIXClaimButtonEnabled
                                }
                                claimAmount={ToPFENIXClaimed.formatted}
                                claimRaw={ToPFENIXClaimed.raw}
                                autoVaultTarget={1000000}
                                autoVaultOnClick={HandleDepositPFENIXAutovault}
                                autoVaultDisabled={!isPFENIXButtonEnabled}
                                autoVaultAmount={PFENIXautoVaultAmount}
                                amount={AVPFENIXButton}
                                parityTokensClaimed={PFENIXparityTokensClaimed}
                                linkPath="/PFENIX"
                                linkText="PFENIX"
                                locationPath={location.pathname}
                                isActive={location.pathname === "/PFENIX"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {isDAVHolders && (
                  <div className={`container-fluid`}>
                    <div
                      className={`flex-grow-1 fontSize text-start ${textTitle} mb-0 ms-3 ${
                        theme === "dimTheme" && "text-white"
                      }`}
                    >
                      <div className="row justify-content-center">
                        <div className="col-auto">
                          <div
                            className={`info-item info-columns boxes new1 ${
                              (theme === "darkTheme" && "Theme-btn-block") ||
                              (theme === "dimTheme" && "dimThemeBorder") ||
                              (theme === "lightTheme" && theme + " translite")
                            }`}
                          >
                            <p className="text-center">ALPHA ROOM</p>
                          </div>
                          <div
                            className={`top-container ${
                              (theme === "darkTheme" &&
                                "darkThemeTrackingBg") ||
                              (theme === "dimTheme" && "dimTheme-index-class")
                            }`}
                            style={{ marginTop: "100px", marginRight: "50px" }}
                          >
                            <div
                              className={`top-container ${isHei} container-xxl  ${
                                (theme === "darkTheme" &&
                                  "darkThemeTrackingBg") ||
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
                                <div className="row g-lg-10">
                                  <AlphaRoom
                                    image={SystemStateLogo}
                                    hasBorder={true}
                                    TokenName="PLS"
                                    theme={theme}
                                    borderDarkDim={borderDarkDim}
                                    textTheme={textTheme}
                                    spanDarkDim={spanDarkDim}
                                    data={data}
                                  />
                                  <AlphaRoom
                                    image={SystemStateLogo}
                                    hasBorder={true}
                                    TokenName="PXEN"
                                    theme={theme}
                                    borderDarkDim={borderDarkDim}
                                    textTheme={textTheme}
                                    spanDarkDim={spanDarkDim}
                                    data={data}
                                  />
                                  <AlphaRoom
                                    image={SystemStateLogo}
                                    hasBorder={true}
                                    TokenName="PDXN"
                                    theme={theme}
                                    borderDarkDim={borderDarkDim}
                                    textTheme={textTheme}
                                    spanDarkDim={spanDarkDim}
                                    data={data}
                                  />
                                  <AlphaRoom
                                    image={SystemStateLogo}
                                    hasBorder={false}
                                    TokenName="PFENIX"
                                    theme={theme}
                                    borderDarkDim={borderDarkDim}
                                    textTheme={textTheme}
                                    spanDarkDim={spanDarkDim}
                                    data={data}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  // {/* end the section here*/}
                )}
              </div>
            </div>
          </>
        ) : isDEFI ? (
          <DavDefi />
        ) : isTrade ? (
          <DAVTrade />
        ) : isBNB ? (
          <BNBDAV />
        ) : isPolygon ? (
          <PolygonDav />
        ) : isInflationPLS ? (
          <></>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
