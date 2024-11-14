import React, { useContext, useState, useEffect } from "react";
import "./dav.css";
import "../../Utils/Theme.css";
import { Link } from "react-router-dom";
import pls from "../../Assets/LogoTransparent.png";

import { themeContext } from "../../App";
import { useLocation } from "react-router-dom";
// import { TotalSumProvider  } from "../../Components/Tracker/TrackingPage";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { functionsContext } from "../../Utils/Functions";
import { ethers } from "ethers";
import pdxn from "../../Assets/Token List Icon/dxn.webp";
import pfenix from "../../Assets/Token List Icon/pfenix.svg";
import wpls from "../../Assets/Token List Icon/wpls.png";

import xen from "../../Assets/XEN.png";

import { allInOnePopup } from "../../Utils/ADDRESSES/Addresses";

import ClaimSectionComp from "./ClaimSection";
import { useDepositContext } from "../../context/DepositContext";

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
    getParityDollarClaimed,
    getPLSParityDollarClaimed,

    handleDepositAutovault,

    fetchAutoVaultAmount,
    getPLS_PST_Claimed,
    get_PST_Claimed,
    getClaimAllReward,
	handleDeposit,
    fetchPLSAutoVaultAmount,
    getParityTokensDeposits,
    getParityDollardeposits,
    approveAndDeposit,
    getPLSClaimAllReward,
  } = useContext(functionsContext);
  const [DayStamp, setDayStamp] = useState("0");
  const [paritydeposit, setParitydeposit] = useState("0");

  //Autovaults target button disabling from fetch function
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isPLSButtonEnabled, setIsPLSButtonEnabled] = useState(false);
  const [isPDXNButtonEnabled, setIsPDXNButtonEnabled] = useState(false);
  const [isPFENIXButtonEnabled, setIsPFENIXButtonEnabled] = useState(false);

  const [PLSparityTokensClaimed, setPLSParityTokensClaimed] = useState("0");
  const [parityTokensClaimed, setParityTokensClaimed] = useState("0");
  const [PDXNparityTokensClaimed, setPDXNParityTokensClaimed] = useState("0");
  const [PFENIXparityTokensClaimed, setPFENIXParityTokensClaimed] =
    useState("0");

  //Autovault amounts saving from fetch function
  const [autoVaultAmount, setAutoVaultAmount] = useState("0");
  const [PDXNautoVaultAmount, setPDXNAutoVaultAmount] = useState("0");
  const [PFENIXautoVaultAmount, setPFENIXAutoVaultAmount] = useState("0");
  const [PLSautoVaultAmount, setPLSAutoVaultAmount] = useState("0");

  const [AVBUtton, setAVButton] = useState("0");
  const [PDXNAVButton, setPDXNAVButton] = useState("0");
  const [AVPFENIXButton, setAVPFENIXBUtton] = useState("0");
  const [PLSforButton, setPLSforButton] = useState("0");

  const [toBeClaimed, setToBeClaimed] = useState({
    raw: "0",
    formatted: "0",
  });
  const [ToPDXNClaimed, setToPDXNBeClaimed] = useState({
    raw: "0",
    formatted: "0",
  });
  const [ToPFENIXClaimed, setToPFENIXBeClaimed] = useState({
    raw: "0",
    formatted: "0",
  });
  const [PLStoBeClaimed, setPLSToBeClaimed] = useState({
    raw: "0",
    formatted: "0",
  });

  const [parityDollardeposits, setParityDollardeposits] = useState("0");

  //autovault button disable when it is processing
  const [isProcessingAutoVault, setIsProcessingAutoVault] = useState(false);
  const [isPLSProcessingAutoVault, setIsPLSProcessingAutoVault] =
    useState(false);
  const [isPDXNProcessingAutoVault, setIsPDXNProcessingAutoVault] =
    useState(false);
  const [isPFENIXProcessingAutoVault, setIsPFENIXProcessingAutoVault] =
    useState(false);

  // disable claim button when autovault is processing
  const [isClaimButtonEnabled, setClaimISButtonEnabled] = useState(true);
  const [isPLSClaimButtonEnabled, setPLSClaimISButtonEnabled] = useState(true);
  const [isPDXNClaimButtonEnabled, setPDXNClaimISButtonEnabled] =
    useState(true);
  const [isPFENIXClaimButtonEnabled, setPFENIXClaimISButtonEnabled] =
    useState(true);

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
  const isSwap = location.pathname === "/swap";
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

      // Convert to number, then format with commas and two decimal places
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);
      const formattedWithCommas = autoVaultAmountNumber.toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );

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
  const HandleDepositXENAutovault = async () => {
    setIsProcessingAutoVault(true);

    try {
      const contractType = "PSD";
      const isSuccess = await handleDepositAutovault(contractType);
      if (isSuccess) {
        await isSuccess.wait();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessingAutoVault(true);
      fetchAutoVaultAmounts(accountAddress); // Update the auto vault amount after processing
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

  const [selectedTokenImage, setSelectedTokenImage] = useState(pls);
  const [linkPath, setLinkPath] = useState("/PLS");

  const claimButtonMap = {
    pls: !isPLSClaimButtonEnabled || isPLSProcessingAutoVault,
    pdxn: !isPDXNClaimButtonEnabled || isPDXNProcessingAutoVault,
    xen: !isClaimButtonEnabled || isProcessingAutoVault,
    pfenix: !isPFENIXClaimButtonEnabled || isPFENIXProcessingAutoVault,
  };

  const autoVaultButtonMap = {
    pls: !isPLSButtonEnabled,
    pdxn: !isPDXNButtonEnabled,
    xen: !isButtonEnabled,
    pfenix: !isPFENIXButtonEnabled,
  };

  const AutoVaultAMountMap = {
    pls: PLSautoVaultAmount,
    pdxn: PDXNautoVaultAmount,
    xen: autoVaultAmount,
    pfenix: PFENIXautoVaultAmount,
  };
  const ClaimAmountMap = {
    pls: PLStoBeClaimed.formatted,
    pdxn: ToPDXNClaimed.formatted,
    xen: toBeClaimed.formatted,
    pfenix: ToPFENIXClaimed.formatted,
  };
  const ClaimedAmountMap = {
    pls: PLSparityTokensClaimed,
    pdxn: PDXNparityTokensClaimed,
    xen: parityTokensClaimed,
    pfenix: PFENIXparityTokensClaimed,
  };

  const [search, setSearch] = useState("");

//   const { depositAmount } = useDepositContext(); 
  const [depositXENAmount, setXENDepositAmount] = useState("");
  const [depositPDXNAmount, setPDXNDepositAmount] = useState("");
  const [depositPFENIXAmount, setPFENIXDepositAmount] = useState("");
  const [depositPLSAmount, setPLSDepositAmount] = useState("");


  const isHandleDepositXEN = async (e) => {
    e.preventDefault();
    const ContractType = "PSD";
    const isSuccess = await approveAndDeposit(depositXENAmount, ContractType);
    if (isSuccess) {
		setXENDepositAmount(""); // Clear input or do other necessary actions
    }
  };
  const isHandleDepositPDXN = async (e) => {
    e.preventDefault();
    const ContractType = "PDXN";
    const isSuccess = await approveAndDeposit(depositPDXNAmount, ContractType);
    if (isSuccess) {
      setPDXNDepositAmount("");
    }
  };
  const isHandleDepositPFENIX = async (e) => {
    e.preventDefault();
    const ContractType = "PFENIX";
    const isSuccess = await approveAndDeposit(depositPFENIXAmount, ContractType);
    if (isSuccess) {
      setPFENIXDepositAmount("");
    }
  };

  const isHandleDepositPLS = async (e) => {
    e.preventDefault();
    const isSuccess = await handleDeposit(depositPLSAmount);
    if (isSuccess) {
		setPLSDepositAmount("");
    }
  };

  const [selectedToken, setSelectedToken] = useState("pls");

  const handleTokenChange = (token) => {
    setSelectedToken(token);

    switch (token) {
      case "pls":
        setSelectedTokenImage(pls);
        setLinkPath("/PLS");
        break;
      case "xen":
        setSelectedTokenImage(xen);
        setLinkPath("/XEN");
        break;
      case "pdxn":
        setSelectedTokenImage(pdxn);
        setLinkPath("/PDXN");
        break;
      case "pfenix":
        setSelectedTokenImage(pfenix);
        setLinkPath("/PFENIX");
        break;
      default:
        console.warn("Invalid token selected for", token);
    }
  };

  // Function to handle action (auto vault or claim) when button is clicked
  const handleActionClick = (actionType) => {
    switch (selectedTokenImage) {
      case pls:
        if (actionType === "autoVault") {
          handleDepositAVPLS();
        } else if (claimButtonMap["pls"]) {
          claimPLSAllReward();
        }
        break;

      case pdxn:
        if (actionType === "autoVault") {
          HandleDepositPDXNAutovault();
        } else if (claimButtonMap["pdxn"]) {
          claimPDXNAllReward();
        }
        break;

      case xen:
        if (actionType === "autoVault") {
          HandleDepositXENAutovault();
        } else if (claimButtonMap["xen"]) {
          claimAllReward();
        }
        break;

      case pfenix:
        if (actionType === "autoVault") {
          HandleDepositPFENIXAutovault();
        } else if (claimButtonMap["pfenix"]) {
          claimPFENIXAllReward();
        }
        break;

      default:
        console.warn("Invalid token selected for", selectedTokenImage);
    }
  };

  console.log("Selected Token:", selectedToken);
  console.log("Auto Vault Amount:", AutoVaultAMountMap[selectedToken]);
  console.log("claim Amount:", ClaimAmountMap[selectedToken]);
  console.log("claimed Amount:", ClaimedAmountMap[selectedToken]);


  return (
    <>
      <ClaimSectionComp
        linkPath={"/PLS"}
        image={wpls}
        TokenName={"PLS"}
        AutoVaultClick={handleDepositAVPLS}
        claimRewards={claimPLSAllReward}

		DepositFunction={isHandleDepositPLS}
		depositAmount={depositPLSAmount}
        setDepositAmount={setPLSDepositAmount}

        claimButtonMap={claimButtonMap.pls}
        AutoVaultAMountMap={AutoVaultAMountMap.pls}
        autoVaultButtonMap={autoVaultButtonMap.pls}
        ClaimAmountMap={ClaimAmountMap.pls}
        ClaimedAmountMap={ClaimedAmountMap.pls}
      />
      <ClaimSectionComp
        linkPath={"/XEN"}
        image={xen}
        TokenName={"XEN"}
        inverse={true}
        AutoVaultAMountMap={AutoVaultAMountMap.xen}
        AutoVaultClick={HandleDepositXENAutovault}
        claimRewards={claimAllReward}
		DepositFunction={isHandleDepositXEN}
		depositAmount={depositXENAmount}
        setDepositAmount={setXENDepositAmount}
        claimButtonMap={claimButtonMap.xen}
        autoVaultButtonMap={autoVaultButtonMap.xen}
        ClaimAmountMap={ClaimAmountMap.xen}
        ClaimedAmountMap={ClaimedAmountMap.xen}
      />
      <ClaimSectionComp
        linkPath={"/PDXN"}
        image={pdxn}
        TokenName={"PDXN"}
        inverse={true}
        AutoVaultAMountMap={AutoVaultAMountMap.pdxn}
        AutoVaultClick={HandleDepositPDXNAutovault}
        claimRewards={claimPDXNAllReward}

		DepositFunction={isHandleDepositPDXN}
		depositAmount={depositPDXNAmount}
        setDepositAmount={setPDXNDepositAmount}

        claimButtonMap={claimButtonMap.pdxn}
        autoVaultButtonMap={autoVaultButtonMap.pdxn}
        ClaimAmountMap={ClaimAmountMap.pdxn}
        ClaimedAmountMap={ClaimedAmountMap.pdxn}
      />
      <ClaimSectionComp
        linkPath={"/PFENIX"}
        image={pfenix}
        TokenName={"PFENIX"}
        inverse={true}
        AutoVaultAMountMap={AutoVaultAMountMap.pfenix}
        AutoVaultClick={HandleDepositPFENIXAutovault}
        claimRewards={claimPFENIXAllReward}

		DepositFunction={isHandleDepositPFENIX}
		depositAmount={depositPFENIXAmount}
        setDepositAmount={setPFENIXDepositAmount}

        claimButtonMap={claimButtonMap.pfenix}
        autoVaultButtonMap={autoVaultButtonMap.pfenix}
        ClaimAmountMap={ClaimAmountMap.pfenix}
        ClaimedAmountMap={ClaimedAmountMap.pfenix}
      />
    </>
  );
}
