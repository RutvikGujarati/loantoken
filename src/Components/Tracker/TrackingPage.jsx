import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Tracker/TrackingPage.css";
import "../../Utils/Theme.css";
import metamask from "../../Assets/metamask.png";
import man_2 from "../../Assets/2-man.png";
import man_5 from "../../Assets/5-man.png";
import man_3 from "../../Assets/3-man.png";
import man_4 from "../../Assets/4-man.png";
import man_8 from "../../Assets/8-man.png";
import { themeContext } from "../../App";
import { useLocation, Link } from "react-router-dom";
import { functionsContext } from "../../Utils/Functions";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { BigNumber, ethers } from "ethers";
import fisrtPumpBrt from "../../Assets/High-Resolutions-Svg/Updated/fist pump small.svg";
import {
  PSD_ADDRESS,
  state_token,
  PLS_ADDRESS,
  allInOnePopup,
  conciseAddress,
} from "../../Utils/ADDRESSES/Addresses";
import TVL from "../TVL";

export default function TrackingPage() {
  const { theme } = useContext(themeContext);
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");
  let block =
    (theme === "lightTheme" && theme + " translite") ||
    (theme === "darkTheme" && theme + " transdark") ||
    (theme === "dimTheme" && theme + " transdim");
  const borderDarkDim =
    (theme === "darkTheme" && "trackingBorder") ||
    (theme === "dimTheme" && "dimThemeTrackBorder");
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  const location = useLocation();
  const isHome = location.pathname == "/mint";
  const isPLS = location.pathname == "/PLS";
  const isHei = !isHome && !isPLS && "hei";

  const {
    socket,
    getToBeClaimed,
    getFormatEther,
    getParityDollarClaimed,
    getTotalValueLockedInDollar,
    getParityDollardeposits,
    getParityTokensDeposits,
    get_PSD_Claimed,
    get_PST_Claimed,
    getParityAmountDistributed,
    getPLSProtocolFee,
    getPLSPrice,
    getPLSParityDollarClaimed,
    getProtocolFee,
    BuyTwoTokens,
    BuyThirteenTokens,
    BuyFiveTokens,
    BuyEightTokens,
    getPLSParityTokensDeposits,
    mintWithPDXN,
    mintWithPFENIX,
    holdTokens,
    NumberOfUser,
    getTimeStampForCreateValut,
    getPLSClaimAllReward,
    getClaimAllReward,
    getPLSToBeClaimed,
    getPLSIncrementPriceTargets,
    handleDeposit,
    getPLS_PSD_Claimed,
    getPLS_PST_Claimed,
    getPLSUserDistributedTokens,
    getPLSRatioPriceTargets,
    getPLSParityReached,
    handleDepositAutovault,
    getPLSDepositors,
    fetchPLSAutoVaultAmount,
    getPLSParityDollardeposits,
  } = useContext(functionsContext);
  const {
    accountAddress,
    networkName,
    userConnected,
    WalletBalance,
    currencyName,
  } = useContext(Web3WalletContext);
  const [toBeClaimed, setToBeClaimed] = useState("0");
  const [PLStoBeClaimed, setPLSToBeClaimed] = useState("0");
  const [totalValueLockeds, setTotalValueLocked] = useState("0");
  const [parityDollardeposits, setParityDollardeposits] = useState("0");
  const [parityDollardepositing, setParityDollardepositing] = useState("0");
  const [parityPLSDollardeposits, setPLSParityDollardeposits] = useState("0");
  const [parityTokensDeposits, setParityTokensDeposits] = useState("0");
  const [PLSparityTokensDeposits, setPLSParityTokensDeposits] = useState("0");
  const [parityDollarClaimed, setParityDollarClaimed] = useState("0");
  const [PLSparityDollarClaimed, setPLSParityDollarClaimed] = useState("0");
  const [parityTokensClaimed, setParityTokensClaimed] = useState("0");
  const [PLSparityTokensClaimed, setPLSParityTokensClaimed] = useState("0");
  const [PercentageSeted, setPercentage] = useState("0");

  const [IsParityReached, setIsParityReached] = useState(false);
  const [HoldAMount, setHoldTokens] = useState("0");
  const [isDashboardInputDisabled, setIsDashboardInputDisabled] =
    useState(false);
  const [search, setSearch] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [price, setprice] = useState("");
  const [placeHolder, setPlaceHolder] = useState("");
  const [protocolFee, setProtocolFee] = useState("0");
  const [parityAmountDistributed, setParityAmountDistributed] = useState("0");
  const [DayStamp, setDayStamp] = useState("0");
  const [Locked, setLocked] = useState("0");
  const [navigateToExplorer, setNavigateToExplorer] = useState("");
  const [balance, setBalance] = useState("Enter Amount");

  const [autoVaultAmount, setAutoVaultAmount] = useState("0");

  const [depositAmount, setDepositAmount] = useState("");

  const [totalSUm, setTotalSum] = useState("0");
  const [escrowVaultTargets, setEscrowVaultTargets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Roundtotal, setRoundTotal] = useState("0");
  const [totalVaultValue, setTotalVaultSum] = useState("0");

  const IncrementPriceTarget = async () => {
    if (accountAddress && currencyName) {
      try {
        let price = await getPLSPrice();
        let formattedPrice = ethers.utils.formatEther(price || "0");

        let All_USERS_TARGETS = [];

        let allDepositorsAddress = await getPLSDepositors();

        for (let index = 0; index < allDepositorsAddress.length; index++) {
          const address = allDepositorsAddress[index];
          let incrementPriceTarget = await getPLSIncrementPriceTargets(address);
          All_USERS_TARGETS.push(...(incrementPriceTarget || []));
        }

        // Filter out targets that have already been reached and passed away from the current price
        const filteredTargets = All_USERS_TARGETS.filter((target) => {
          const formattedPriceTarget = ethers.utils.formatEther(
            target?.priceTarget.toString()
          );
          return Number(formattedPriceTarget) >= Number(formattedPrice);
        });

        // Sort the filtered targets
        const sortedArray = [...(filteredTargets || [])].sort((a, b) => {
          const formattedRatioTargetA = ethers.utils.formatEther(
            a?.priceTarget.toString()
          );
          const formattedRatioTargetB = ethers.utils.formatEther(
            b?.priceTarget.toString()
          );

          const numericValueA = Number(formattedRatioTargetA);
          const numericValueB = Number(formattedRatioTargetB);

          return numericValueA - numericValueB;
        });

        // Process and display targets for the current page
        const itemsPerPage = 2500;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsForCurrentPage = sortedArray.slice(startIndex, endIndex);

        try {
          let items = await Promise.all(
            itemsForCurrentPage.map((target, index) =>
              processTargets(target, index, currencyName)
            )
          );
          setEscrowVaultTargets(items.filter(Boolean));
        } catch (error) {
          console.error("Error processing targets:", error);
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
  };

  let totalSum = 0;

  const processTargets = async (target, index, currencyName) => {
    try {
      const formattedPriceTarget = ethers.utils.formatEther(
        target?.priceTarget.toString()
      );
      const formattedTargetAmount = ethers.utils.formatEther(
        target?.totalFunds.toString()
      );

      // Add the formattedTargetAmount to the total sum

      console.log("from tracking page", totalSum);

      const PriceTarget = Number(formattedPriceTarget).toFixed(6);
      const targetAmount =
        Number(formattedTargetAmount).toFixed(6) + " " + (await currencyName);

      console.log("from tracking page targetAmount", parseFloat(targetAmount));

      totalSum += parseFloat(formattedTargetAmount);
      setTotalSum(totalSum.toString());

      // Return processed target
      return {
        index,
        PriceTarget,
        targetAmount,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const IPTmultiplySumWithPrice = async () => {
    // Convert the price to a floating-point number
    // Multiply the total sum with the current price
    const totalPrice = totalSUm * price;

    console.log("price IPT", totalPrice);

    return totalPrice;
  };

  useEffect(() => {
    if (userConnected) {
      IncrementPriceTarget();
      IPTmultiplySumWithPrice();
    }
  });

  const [ratioPriceTargets, setRatioPriceTargets] = useState([]);
  const [noOfPage, setNoOfPage] = useState(0);
  const [TotalSum, setTotalSummation] = useState("0");
  const RatioPriceTargets = async () => {
    if (accountAddress) {
      try {
        let All_USERS_TARGETS = [];

        let allDepositorsAddress = await getPLSDepositors();

        for (let index = 0; index < allDepositorsAddress.length; index++) {
          const address = allDepositorsAddress[index];
          let targets = await getPLSRatioPriceTargets(address);
          All_USERS_TARGETS.push(...(targets || []));
        }

        // Filter out targets that have already been reached and passed away from the current price
        const filteredTargets = All_USERS_TARGETS.filter((target) => {
          const formattedRatioPriceTarget = ethers.utils.formatEther(
            target?.ratioPriceTarget.toString()
          );
          return Number(formattedRatioPriceTarget) >= Number(price);
        });

        // Calculate total pages
        const itemsPerPage = 2500;
        const totalPages = Math.ceil(filteredTargets.length / itemsPerPage);
        setNoOfPage(totalPages); // Update the total number of pages

        // Sort the filtered targets
        const sortedArray = [...(filteredTargets || [])].sort((a, b) => {
          const formattedRatioTargetA = ethers.utils.formatEther(
            a?.ratioPriceTarget.toString()
          );
          const formattedRatioTargetB = ethers.utils.formatEther(
            b?.ratioPriceTarget.toString()
          );

          const numericValueA = Number(formattedRatioTargetA);
          const numericValueB = Number(formattedRatioTargetB);

          return numericValueA - numericValueB;
        });

        // Process and display targets for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsForCurrentPage = sortedArray.slice(startIndex, endIndex);

        try {
          let items = await Promise.all(
            itemsForCurrentPage.map((target, index) =>
              processTargetsRPT(target, index, currencyName)
            )
          );
          setRatioPriceTargets(items.filter(Boolean));
        } catch (error) {
          console.error("Error processing targets:", error);
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
  };

  let totalSummation = 0;
  const processTargetsRPT = async (target, index, currencyName) => {
    try {
      const formattedRatioTarget = ethers.utils.formatEther(
        target?.ratioPriceTarget.toString()
      );
      const ratioPriceTarget = Number(formattedRatioTarget).toFixed(6);
      const formattedTargetAmount = ethers.utils.formatEther(
        target?.TargetAmount.toString()
      );
      const targetAmount =
        Number(formattedTargetAmount).toFixed(22) + " " + currencyName ??
        currencyName;

      totalSummation += parseFloat(targetAmount);
      setTotalSummation(totalSummation);
      console.log("from tracking RTP summation", totalSummation);
      return {
        index,
        ratioPriceTarget,
        targetAmount,
      };
    } catch (error) {
      console.log("error:", error);
    }
  };

  const RTPpmultiplySumWithPrice = async () => {
    const totalRTPPrice = TotalSum * price;

    console.log("price RTP", totalRTPPrice);

    return totalRTPPrice;
  };

  const TotalVaultValueLocked = () => {
    const totalvalue = totalSUm * price + TotalSum * price;
    const roundedTotal = Number(totalvalue.toFixed(10));
    console.log("roundeeeeed total", roundedTotal);
    setRoundTotal(roundedTotal);
    // Convert the rounded total to string
    const stringValue = roundedTotal.toString();

    setTotalVaultSum(stringValue);
    console.log("total value locked", stringValue);
    return stringValue;
  };

  useEffect(() => {
    if (userConnected) {
      RatioPriceTargets();
      RTPpmultiplySumWithPrice();
      TotalVaultValueLocked();
    }
  });

  const explorer_URL = async () => {
    if ((await networkName) === "Polygon Mumbai") {
      return `https://mumbai.polygonscan.com/address`;
    } else if ((await networkName) === "Pulsechain Testnet") {
      return `https://scan.v4.testnet.pulsechain.com/#/address`;
    } else {
      return `https://mumbai.polygonscan.com/address`;
    }
  };
  const navToExplorer = async () => {
    const baseUrl = await explorer_URL();
    if (isHome) {
      return `${baseUrl}/${state_token}`;
    } else {
      return `${baseUrl}/${state_token}`;
    }
  };
  const depositAddress =
    "0x5E19e86F1D10c59Ed9290cb986e587D2541e942C".toLowerCase();
  const percentage = () => {
    const deposits = parityPLSDollardeposits;
    const vaultValue = Number(totalVaultValue);

    console.log("vaults total value from context", totalVaultValue);
    console.log("deposits in dollar  from context", deposits);

    if (!isNaN(deposits) && !isNaN(vaultValue) && Locked !== 0) {
      let division = deposits / vaultValue;
      setPercentage(division.toFixed(4));
    } else {
      setPercentage("0.0000");
    }
  };
  const claimAllPLSReward = async () => {
    console.log("Number(toBeClaimed):", Number(PLStoBeClaimed));
    console.log("toBeClaimed:", PLStoBeClaimed);

    if (Number(PLStoBeClaimed) <= 0) {
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
  };
  // Done
  const ToBeClaimed = async () => {
    try {
      // Get the IPT and RPT rewards
      let iptAndRptReward = await getToBeClaimed(accountAddress);
      let formattedIptAndRptReward = ethers.utils.formatEther(
        iptAndRptReward || "0"
      );

      // Get the user's distributed tokens
      let userDistributedTokens = await getPLSUserDistributedTokens(
        accountAddress
      );
      let formattedUserDistributedTokens = parseFloat(userDistributedTokens);

      // Get the parity share tokens claimable amount
      let parityShareTokensDetail = await getParityDollarClaimed(
        accountAddress
      );
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );

      // Get the protocol fee
      let protocolFeeDetail = await getProtocolFee(accountAddress);
      let protocolAmount = protocolFeeDetail?.protocolAmount || 0;

      // Check if parity is reached or exceeded
      let { isParityReachedOrExceed } = await getPLSParityReached(
        accountAddress
      );

      // Adjust the total amount to be claimed based on parity status
      let totalToBeClaimed =
        parseFloat(formattedIptAndRptReward) +
        parseFloat(formattedUserDistributedTokens) +
        parseFloat(protocolAmount);

      // Add parity claimable amount only if parity is not reached or exceeded
      if (!isParityReachedOrExceed) {
        totalToBeClaimed += parseFloat(formattedParityClaimableAmount);
      }

      // Format the total amount
      let formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);

      // Update the state with the total amount to be claimed
      setToBeClaimed(formattedTotalToBeClaimed);
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };
  const ToPLSBeClaimed = async () => {
    try {
      // Get the user's distributed tokens
      let iptAndRptReward = await getToBeClaimed(accountAddress);
      let formattedIptAndRptReward = ethers.utils.formatEther(
        iptAndRptReward || "0"
      );

      let userDistributedTokens = await getPLSUserDistributedTokens(
        accountAddress
      );
      let formattedUserDistributedTokens = parseFloat(userDistributedTokens);

      // Get the parity share tokens claimable amount
      let parityShareTokensDetail = await getParityDollarClaimed(
        accountAddress
      );
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );

      // Get the protocol fee
      let protocolFeeDetail = await getProtocolFee(accountAddress);
      let protocolAmount = protocolFeeDetail?.protocolAmount || 0;

      // Check if parity is reached or exceeded
      let { isParityReachedOrExceed } = await getPLSParityReached(
        accountAddress
      );

      // Adjust the total amount to be claimed based on parity status
      let totalToBeClaimed =
        parseFloat(formattedIptAndRptReward) +
        parseFloat(formattedUserDistributedTokens) +
        parseFloat(protocolAmount);

      // Add parity claimable amount only if parity is not reached or exceeded
      if (!isParityReachedOrExceed) {
        totalToBeClaimed += parseFloat(formattedParityClaimableAmount);
      }

      // Format the total amount
      let formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);

      setPLSToBeClaimed(formattedTotalToBeClaimed);
    } catch (error) {
      console.log("error:", error);
    }
  };
  const HoldTokensOfUser = async (accountAddress) => {
    try {
      if (!accountAddress) {
        throw new Error("Account address is undefined");
      }
      const holdToken = await holdTokens(accountAddress);
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
      percentage();
    }
  });
  const handleBlur = () => {
    if (search !== undefined && search !== "" && !search.includes(".")) {
      setSearch(`${search}.00`);
    }
  };

  // Done
  const TotalValueLockedInDollar = async () => {
    try {
      let totalPsdShare = await getTotalValueLockedInDollar();
      let formattedTotalPsdShare = ethers.utils.formatEther(
        totalPsdShare || "0"
      );
      let fixed = Number(formattedTotalPsdShare).toFixed(2);
      setTotalValueLocked(fixed);
    } catch (error) {
      console.log("error:", error);
    }
  };
  // Done

  function addCommasAsYouType(e) {
    try {
      const inputValue = e.target.value;
      setDepositAmount(inputValue);
      if (/^[0-9,.]*$/.test(inputValue)) {
        const numericValue = inputValue.replace(/,/g, "");
        const formattedValue = numericValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        const formattedWithDecimals = `${formattedValue} .00`;
        setSearch(formattedValue);
      }
    } catch (error) {
      console.error("error:", error);
    }
  }

  const isHandleDeposit = async (e) => {
    e.preventDefault();

    const isSuccess = await handleDeposit(depositAmount);
    if (isSuccess) {
      setSearch("");
    }
  };
  const fetchPrice = async () => {
    try {
      let price = await getPLSPrice();
      let formattedPrice = ethers.utils.formatEther(price || "0");
      setprice(formattedPrice);
    } catch (error) {
      console.error("error:", error);
    }
  };

  //   const percentage = () => {
  //     const deposits = Number(parityDollardepositing);
  //     // const vaultValue = Number(Roundtotal);

  //     if (!isNaN(deposits) && !isNaN(vaultValue) && vaultValue !== 0) {
  //       let division = deposits / vaultValue;
  //       setPercentage(division.toFixed(4));
  //     } else {
  //       setPercentage("0.00");
  //     }
  //   };

  useEffect(() => {
    try {
      if (!userConnected) {
        let fixedBalance =
          Number(WalletBalance || "0").toFixed(4) + " " + currencyName;
        setBalance(fixedBalance);
      }
    } catch (error) {}
  }, [accountAddress, networkName]);

  const ParityDollardeposits = async () => {
    try {
      let ParityDollardeposits = await getParityDollardeposits(accountAddress);
      let formattedParityDollardeposits = ethers.utils.formatEther(
        ParityDollardeposits || "0"
      );
      let fixed = Number(formattedParityDollardeposits).toFixed(2);
      setParityDollardeposits(fixed);
    } catch (error) {
      console.error(error);
    }
  };
  const ParityPLSDollardeposits = async () => {
    try {
      let ParityDollardeposits = await getPLSParityDollardeposits(
        accountAddress
      );
      let formattedParityDollardeposits = ethers.utils.formatEther(
        ParityDollardeposits || "0"
      );
      let fixed = Number(formattedParityDollardeposits).toFixed(2);
      setPLSParityDollardeposits(fixed);
    } catch (error) {
      console.error(error);
    }
  };

  // Done
  const ParityTokensDeposits = async () => {
    try {
      let ParityTokensDeposits = await getParityTokensDeposits(accountAddress);
      let formattedParityTokensDeposits = ethers.utils.formatEther(
        ParityTokensDeposits || "0"
      );
      let fixed =
        Number(formattedParityTokensDeposits).toFixed(4) + " " + currencyName;
      setParityTokensDeposits(fixed);
    } catch (error) {
      console.error(error);
    }
  };
  const PLSParityTokensDeposits = async () => {
    try {
      let ParityTokensDeposits = await getPLSParityTokensDeposits(
        accountAddress
      );
      let formattedParityTokensDeposits = ethers.utils.formatEther(
        ParityTokensDeposits || "0"
      );
      let fixed =
        Number(formattedParityTokensDeposits).toFixed(4) + " " + currencyName;
      setPLSParityTokensDeposits(fixed);
    } catch (error) {
      console.error(error);
    }
  };
  const PSDClaimed = async () => {
    try {
      let PSDClaimed = await get_PSD_Claimed(accountAddress);
      let formatted_PSD_Claimed = ethers.utils.formatEther(PSDClaimed || "0");
      let fixed = Number(formatted_PSD_Claimed).toFixed(2);

      setParityDollarClaimed(fixed);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const PSDPLSClaimed = async () => {
    try {
      let PSDClaimed = await getPLS_PSD_Claimed(accountAddress);
      let formatted_PSD_Claimed = ethers.utils.formatEther(PSDClaimed || "0");
      let fixed = Number(formatted_PSD_Claimed).toFixed(6);
      setPLSParityDollarClaimed(fixed);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const PSTClaimed = async () => {
    try {
      let PSTClaimed = await get_PST_Claimed(accountAddress);
      let formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");
      let fixed = Number(formatted_PST_Claimed).toFixed(4) + " " + currencyName;
      setParityTokensClaimed(fixed);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const PLSPSTClaimed = async () => {
    try {
      let PSTClaimed = await getPLS_PST_Claimed(accountAddress);
      let formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");
      let fixed = Number(formatted_PST_Claimed).toFixed(4) + " " + currencyName;
      setPLSParityTokensClaimed(fixed);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const ParityAmountDistributed = async () => {
    try {
      let ParityAmountDistributed = await getParityAmountDistributed(
        accountAddress
      );
      let formatted_ParityAmountDistributed = await getFormatEther(
        ParityAmountDistributed || "0"
      );
      let fixed =
        Number(formatted_ParityAmountDistributed).toFixed(4) +
        " " +
        currencyName;
      setParityAmountDistributed(fixed);
    } catch (error) {
      console.log("ParityAmountDistributed error: ", error);
    }
  };

  const isParityReached = async () => {
    try {
      let isReached = await getPLSParityReached(accountAddress);
      setIsParityReached(isReached);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  let AutoAMount = 0;
  const fetchAutoVaultAmounts = async (address) => {
    try {
      let autoVaultAmount = await fetchPLSAutoVaultAmount(accountAddress);

      console.log("AutoVaults from tracking:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      AutoAMount += autoVaultAmountNumber;
      setAutoVaultAmount(autoVaultAmountNumber.toFixed(2));
      if (AutoAMount > 1000) {
        setIsButtonEnabled(true);
      } else {
        setIsButtonEnabled(false);
      }
    } catch (error) {
      console.error("fetchAutoVaultAmounts error:", error);
      setAutoVaultAmount("0");
    }
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

  const getDay = async () => {
    const Day = await getTimeStampForCreateValut();
    setDayStamp(Day);
  };

  const addTokenToWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: "0x29F2173fE01F92a3535cA807E43BadB10199B817",
              symbol: "DAVPLS",
              decimals: "18",
              image: { fisrtPumpBrt },
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
  Number.prototype.noExponents = function () {
    let data = String(this).split(/[eE]/);
    if (data.length == 1) return data[0];

    let z = "",
      sign = this < 0 ? "-" : "",
      str = data[0].replace(".", ""),
      mag = Number(data[1]) + 1;

    if (mag < 0) {
      z = sign + "0.";
      while (mag++) z += "0";
      return z + str.replace(/^\-/, "");
    }
    mag -= str.length;
    while (mag--) z += "0";
    return str + z;
  };
  let n = 2e-7;

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
      TotalValueLockedInDollar();
      ToBeClaimed();
      ToPLSBeClaimed();
      ParityDollardeposits();
      ParityPLSDollardeposits();
      ParityTokensDeposits();
      PLSParityTokensDeposits();
      PSDClaimed();
      PSDPLSClaimed();
      fetchPrice();
      PSTClaimed();
      PLSPSTClaimed();
      ParityAmountDistributed();
      isParityReached();
      fetchAutoVaultAmounts();
      ProtocolFee();
      getDay();
    }
  }, [accountAddress, currencyName, socket, NumberOfUser]);

  const tooltip =
    (theme === "dimTheme" && "dim-tooltip") ||
    (theme === "darkTheme" && "dark-tooltip");

  //Testing purpose this code written here

  return (
    <>
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
            {isHome ? (
              <>
                <div class="row row-cols-5">
                  <div class="col">
                    <div
                      class={`col border-right ${borderDarkDim}  d-flex justify-content-between `}
                    >
                      <hr className="d-block d-lg-none d-md-none" />
                      <div className="d-flex mint-token-container">
                        <div className="margin-right">
                          <i
                            className={`iconSize fa-solid fa-coins fa-money-bill-transfer ${theme}`}
                          ></i>
                        </div>
                        <div
                          className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                        >
                          <div className={`${textTitle} mint-two`}>
                            <div>MINT 1 DAV TOKEN</div>
                            <div className="d-flex flex-column mb-0.1 button-group ">
                              <button
                                className={`  box-4 mx-2 glowing-button  ${
                                  theme === "darkTheme"
                                    ? "Theme-btn-block"
                                    : theme === "dimTheme"
                                    ? "dimThemeBtnBg"
                                    : "lightThemeButtonBg"
                                } ${theme}`}
                                onClick={() => mintWithPDXN(1, 450)}
                              >
                                450 pDXN
                              </button>
                            </div>
                            <div className="d-flex flex-column mb-0.1 button-group">
                              <button
                                className={`  box-4 mx-2 glowing-button  ${
                                  theme === "darkTheme"
                                    ? "Theme-btn-block"
                                    : theme === "dimTheme"
                                    ? "dimThemeBtnBg"
                                    : "lightThemeButtonBg"
                                } ${theme}`}
                                onClick={() => mintWithPFENIX(1, 5000000)}
                              >
                                5,000,000 pFENIX
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-end pb-3 "
                          style={{ marginBottom: "10px" }}
                        >
                          <span
                            className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                            data-tooltip="DAV TOKENS MUST REMAIN IN THE WALLET THAT MINTED THEM."
                            data-flow="bottom"
                          >
                            <i
                              className={`fas mx-2 fa-exclamation-circle ${theme}`}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col">
                    <div
                      class={`col border-right ${borderDarkDim}  d-flex justify-content-between `}
                    >
                      <hr className="d-block d-lg-none d-md-none" />
                      <div className="d-flex mint-token-container">
                        <div className="margin-right">
                          <i
                            className={`iconSize fa-solid fa-coins fa-money-bill-transfer ${theme}`}
                          ></i>
                        </div>
                        <div
                          className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                        >
                          <div className={`${textTitle} mint-two`}>
                            <div>MINT 2 DAV TOKENS</div>
                            <div className="d-flex flex-column mb-0.1 button-group ">
                              <button
                                className={`  box-4 mx-2 glowing-button  ${
                                  theme === "darkTheme"
                                    ? "Theme-btn-block"
                                    : theme === "dimTheme"
                                    ? "dimThemeBtnBg"
                                    : "lightThemeButtonBg"
                                } ${theme}`}
                                onClick={() => BuyTwoTokens(2, 500000)}
                              >
                                500,000 PLS
                              </button>
                            </div>
                            <img
                              // style={{ marginTop: "24px" }}
                              src={man_2}
                              alt="2_man"
                              height={"50px"}
                              width={"50px"}
                              className={`man-margin  ${
                                theme === "dimTheme" ? "inverse-filters" : ""
                              } `}
                            />
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-end pb-3 "
                          style={{ marginBottom: "10px" }}
                        >
                          <span
                            className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                            data-tooltip="DAV TOKENS MUST REMAIN IN THE WALLET THAT MINTED THEM."
                            data-flow="bottom"
                          >
                            <i
                              className={`fas mx-2 fa-exclamation-circle ${theme}`}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div
                      class={`col border-right ${borderDarkDim}  d-flex justify-content-between `}
                    >
                      <hr className="d-block d-lg-none d-md-none" />
                      <div className="d-flex mint-token-container">
                        <div className="margin-right">
                          <i
                            className={`iconSize fa-solid fa-coins fa-money-bill-transfer ${theme}`}
                          ></i>
                        </div>
                        <div
                          className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                        >
                          <div className={`${textTitle} mint-two`}>
                            <div>MINT 5 DAV TOKENS</div>
                            <div className="d-flex flex-column mb-0.1 button-group ">
                              <button
                                className={`  box-4 mx-2 glowing-button  ${
                                  theme === "darkTheme"
                                    ? "Theme-btn-block"
                                    : theme === "dimTheme"
                                    ? "dimThemeBtnBg"
                                    : "lightThemeButtonBg"
                                } ${theme}`}
                                onClick={() => BuyFiveTokens(5, 1000000)}
                              >
                                1,000,000 PLS
                              </button>
                            </div>
                            <img
                              // style={{ marginTop: "24px" }}
                              src={man_3}
                              alt="2_man"
                              height={"50px"}
                              width={"60px"}
                              className={` man-margin3 ${
                                theme === "dimTheme" ? "inverse-filters" : ""
                              } `}
                            />
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-end pb-3 "
                          style={{ marginBottom: "10px" }}
                        >
                          <span
                            className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                            data-tooltip="DAV TOKENS MUST REMAIN IN THE WALLET THAT MINTED THEM."
                            data-flow="bottom"
                          >
                            <i
                              className={`fas mx-2 fa-exclamation-circle ${theme}`}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div
                      class={`col border-right ${borderDarkDim}  d-flex justify-content-between `}
                    >
                      <hr className="d-block d-lg-none d-md-none" />
                      <div className="d-flex mint-token-container">
                        <div className="margin-right">
                          <i
                            className={`iconSize fa-solid fa-coins fa-money-bill-transfer ${theme}`}
                          ></i>
                        </div>
                        <div
                          className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                        >
                          <div className={`${textTitle} mint-two`}>
                            <div>MINT 8 DAV TOKENS</div>
                            <div className="d-flex flex-column mb-0.1 button-group ">
                              <button
                                className={`  box-4 mx-2 glowing-button  ${
                                  theme === "darkTheme"
                                    ? "Theme-btn-block"
                                    : theme === "dimTheme"
                                    ? "dimThemeBtnBg"
                                    : "lightThemeButtonBg"
                                } ${theme}`}
                                onClick={() => BuyEightTokens(8, 1500000)}
                              >
                                1,500,000 PLS
                              </button>
                            </div>
                            <img
                              // style={{ marginTop: "24px" }}
                              src={man_4}
                              alt="2_man"
                              height={"50px"}
                              width={"80px"}
                              className={`man-margin4  ${
                                theme === "dimTheme" ? "inverse-filters" : ""
                              } `}
                            />
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-end pb-3 "
                          style={{ marginBottom: "10px" }}
                        >
                          <span
                            className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                            data-tooltip="DAV TOKENS MUST REMAIN IN THE WALLET THAT MINTED THEM."
                            data-flow="bottom"
                          >
                            <i
                              className={`fas mx-2 fa-exclamation-circle ${theme}`}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class={`col  d-flex justify-content-between `}>
                      <div className="d-flex mint-token-container">
                        <div className="margin-right">
                          <i
                            className={`iconSize fa-solid fa-coins fa-money-bill-transfer ${theme}`}
                          ></i>
                        </div>
                        <div
                          className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                        >
                          <div className={`${textTitle} mint-two`}>
                            <div>MINT 13 DAV TOKENS</div>
                            <div className="d-flex flex-column mb-0.1 button-group ">
                              <button
                                className={`  box-4 mx-2 glowing-button  ${
                                  theme === "darkTheme"
                                    ? "Theme-btn-block"
                                    : theme === "dimTheme"
                                    ? "dimThemeBtnBg"
                                    : "lightThemeButtonBg"
                                } ${theme}`}
                                onClick={() => BuyThirteenTokens(13, 2000000)}
                              >
                                2,000,000 PLS
                              </button>
                            </div>
                            <img
                              // style={{ marginTop: "24px" }}
                              src={man_5}
                              alt="2_man"
                              height={"50px"}
                              style={{marginBottom:"-30px"}}
                              width={"100px"}
                              className={`man-margin5  ${
                                theme === "dimTheme" ? "inverse-filters" : ""
                              } `}
                            />
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-end pb-3 "
                          style={{ marginBottom: "-20px" }}
                        >
                          <span
                            className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                            data-tooltip="DAV TOKENS MUST REMAIN IN THE WALLET THAT MINTED THEM."
                            data-flow="bottom"
                          >
                            <i
                              className={`fas mx-2 fa-exclamation-circle ${theme}`}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : isPLS ? (
              <div className="row g-lg-10">
                <div
                  className={`col-md-4 border-right ${borderDarkDim} col-lg-3 d-flex flex-column justify-content-between`}
                >
                  <div>
                    <div className={`d-flex uniqHeightxyz`}>
                      <div className=" margin-right">
                        <i
                          className={`iconSize fa-solid fa-money-bill-transfer ${theme}`}
                        ></i>
                      </div>
                      <div
                        className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                      >
                        <div>
                          <div className={`${textTitle}`}>
                            DEPOSIT TOKENS INTO THE INFLATION BANK
                          </div>
                          <form>
                            <input
                              className={` form-control   inputactive input-padding place-padding ${block} ${textTitle} ${
                                theme === "lightTheme"
                                  ? "depositInputLight input-placeholder-light"
                                  : ""
                              } ${
                                theme === "dimTheme"
                                  ? "depositInputGrey darkColor input-placeholder-dim"
                                  : ""
                              } ${
                                theme === "darkTheme"
                                  ? "depositInputDark darkColor input-placeholder-dark"
                                  : ""
                              }${theme === "dimTheme" && "dimThemeBtnBg"}`}
                              pattern="[0-9,.]*" // Only allow digits, commas, and dots
                              type="text"
                              disabled={isDashboardInputDisabled}
                              onBlur={handleBlur}
                              value={search}
                              placeholder={placeHolder}
                              onChange={(e) => addCommasAsYouType(e)}
                              style={{
                                backgroundColor: "transparent",
                                width: "235px",
                                height: "37px", // Adjust height as needed
                                padding: "5px", // Adjust padding as needed
                                fontWeight: "normal",
                                fontSize: "15px",
                              }}
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex bt-padding align-items-center pumpBoxImg">
                      <button
                        onClick={(e) => {
                          isHandleDeposit(e);
                        }}
                        className={`first_pump_boxIcon ${
                          (theme === "darkTheme" && "firstdumDark") ||
                          (theme === "dimTheme" && "dimThemeBg")
                        } `}
                        // style={{
                        //   cursor: "not-allowed",
                        // }}
                        disabled={depositAddress !== accountAddress}
                        style={{
                          cursor:
                            depositAddress === accountAddress
                              ? "pointer"
                              : "not-allowed",
                        }}
                      >
                        <img
                          src={fisrtPumpBrt}
                          alt="firstpump"
                          className="w-100 h-100"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="hrp">{/* <hr className="my-3" /> */}</div>
                  <div className="d-flex h-40">
                    <div className="margin-right">
                      <i
                      // className={`iconSize fa-solid fa-cubes-stacked ${theme}`}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start  ${textTheme}`}
                    >
                      <div>
                        <div
                          className={`${textTitle} `}
                          style={{ fontSize: "11px", marginLeft: "60px" }}
                        >
                          {/* Contract Address{" "} */}
                        </div>

                        <div className={`varSize ${spanDarkDim}`}>
                          <div
                            style={{ marginTop: "-50px", marginRight: "35px" }}
                            className={`info-item2  ${
                              (theme === "darkTheme" && "Theme-btn-block") ||
                              (theme === "dimTheme" && "dimThemeBtnBg")
                            } `}
                          >
                            <p className="contract">
                              Contract Address{" "}
                              <div
                                // to={navigateToExplorer}
                                target="_blank"
                                className={`info-link ${textTitle} ${spanDarkDim}`}
                              >
                                <p className="contract1">
                                  {" "}
                                  {conciseAddress(PLS_ADDRESS)}
                                </p>
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-end pb-3"></div>
                  </div>
                </div>
                <div
                  className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                >
                  <hr className="d-block d-lg-none d-md-none " />
                  <div className="d-flex h-50">
                    <div className="d-flex uniqHeightxyz"></div>
                    <div className="margin-right ">
                      <i
                        className={`iconSize fa-solid fa-money-bill-transfer ${theme}`}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                    >
                      <div className={`${textTitle}`}>
                        <div className={`${textTitle}`}>TO BE CLAIMED</div>
                        <div className="varSize">
                          <span className={`spanText ${spanDarkDim}`}>
                            <div>{PLStoBeClaimed + " " + currencyName}</div>
                          </span>
                        </div>
                        <div className="d-flex align-items-center pumpBoxImg deposit-bt">
                          <button
                            onClick={() => {
                              claimAllPLSReward();
                            }}
                            className={`first_pump_boxIcon ${
                              (theme === "darkTheme" && "firstdumDark") ||
                              (theme === "dimTheme" && "dimThemeBg")
                            } `}
                          >
                            <img
                              src={fisrtPumpBrt}
                              alt="firstpump"
                              className="w-100 h-100"
                            />
                          </button>
                        </div>
                      </div>

                      <div className="d-flex align-items-end pb-3">
                        <span
                          className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                          data-tooltip="CLAIM REWARDS"
                          data-flow="bottom"
                        >
                          {" "}
                          <i
                            className={`fas mx-2 fa-exclamation-circle ${theme}`}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex h-50">
                    <div className="margin-right">
                      <i
                        className={`iconSize fa-regular fa-money-bill-1 ${theme}`}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                    >
                      <div>
                        <div className={`${textTitle}`}>
                          <div className={` ${textTitle} `}> PSD</div>{" "}
                        </div>
                        <div className={`varSize `}>
                          <span className={`spanText ${spanDarkDim}`}>
                            {" "}
                            $ {parityPLSDollardeposits} ({PercentageSeted} %)
                          </span>
                        </div>
                        <div>
                          <div
                            className={`${textTitle}`}
                            style={{ marginTop: "10px" }}
                          ></div>
                          <div className={`varSize ${spanDarkDim}`}>
                            <span className={`spanText ${spanDarkDim} fs-5`}>
                              <>$ {PLSparityDollarClaimed}</>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-end pb-3">
                      <span
                        style={{ marginTop: "90px" }}
                        className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                        data-tooltip="Parity Shares in Dollars. Indicating the total $ value deposited  AND CLAIMED"
                        data-flow="bottom"
                      >
                        {" "}
                        <i
                          className={`fas mx-2 fa-exclamation-circle ${theme}`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                >
                  <hr className="d-block d-lg-none d-md-none " />

                  <div className="d-flex h-50">
                    <div className="margin-right">
                      <i
                        className={`iconSize fa-solid fa-money-bill-transfer ${theme}`}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                    >
                      <div>
                        <div className={`${textTitle}`}>
                          <div
                            className={`${textTitle} `}
                            style={{ fontSize: "11px" }}
                          >
                            Decentralized Autonomous Vaults
                          </div>{" "}
                          <div className={`varSize ${spanDarkDim}`}>
                            <span className={`spanText ${spanDarkDim} `}>
                              {" "}
                              <>{autoVaultAmount} PLS</>
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center pumpBoxImg deposit-bt">
                          <button
                            onClick={() => {
                              if (isButtonEnabled) {
                                handleDepositAutovault();
                              }
                            }}
                            className={`first_pump_boxIcon ${
                              (theme === "darkTheme" && "firstdumDark") ||
                              (theme === "dimTheme" && "dimThemeBg")
                            } ${!isButtonEnabled ? "disabled-button" : ""}`}
                            disabled={!isButtonEnabled}
                            style={{
                              cursor: isButtonEnabled
                                ? "pointer"
                                : "not-allowed",
                            }}
                          >
                            <img
                              src={fisrtPumpBrt}
                              alt="firstpump"
                              className="w-100 h-100"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="d-flex align-items-end pb-3">
                        <span
                          className={`${tooltip} hoverText tooltipAlign`}
                          data-tooltip="ONLY APPLICABLE TO DAV TOKEN HOLDERS."
                          data-flow="bottom"
                        >
                          {" "}
                          <i
                            className={`fas mx-2 fa-exclamation-circle ${theme}`}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex h-70" style={{ height: "-100px" }}>
                    <div className="margin-right">
                      <i
                        className={`iconSize fa-solid fa-arrow-up-right-dots ${theme}`}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                    >
                      <div>
                        <div className={`${textTitle}`}>
                          <div className={``}> PST </div>
                        </div>
                        <div className={`varSize ${spanDarkDim}`}>
                          <span className={`spanText ${spanDarkDim}`}>
                            {" "}
                            {PLSparityTokensDeposits}
                          </span>
                          <div
                            className={`varSize ${spanDarkDim}`}
                            style={{ marginTop: "10px" }}
                          >
                            <span className={`spanText ${spanDarkDim} fs-5`}>
                              {PLSparityTokensClaimed}

                              {/* {IsParityReached && (
                                <span
                                  className={`${tooltip} hoverText hoverText`}
                                  style={{ color: "red" }}
                                  data-tooltip="Token Parity Achieved"
                                  data-flow="bottom"
                                >
                                  {" "}
                                  <i
                                    className={`fas mx-2 fa-exclamation-circle ${theme}`}
                                  ></i>
                                </span>
                              )} */}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* <InfoBox data='Indicating the total number of tokens claimed' /> */}
                    </div>
                    <div className="d-flex align-items-end pb-3">
                      <span
                        style={{ marginTop: "90px" }}
                        className={`${tooltip} hoverText tooltipAlign`}
                        data-tooltip="Parity Shares in Tokens. Indicating the total tokens deposited  AND CLAIMED"
                        data-flow="bottom"
                      >
                        {" "}
                        <i
                          className={`fas mx-2 fa-exclamation-circle ${theme}`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" col-lg-3 extraFlex">
                  <hr className="d-lg-none d-block my-3" />

                  <div className="d-flex pt-1">
                    <div className="margin-right">
                      <i
                        className={`iconSize fa-solid fa-money-bill-transfer ${theme}`}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start justify-content-between ${textTheme}`}
                    >
                      <div className={`${textTitle}`}>PLS PRICE</div>

                      <div className={`varSize ${spanDarkDim}`}>
                        <span className={`spanText ${spanDarkDim}`}>
                          <>$ {price + " " + currencyName}</>
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-end pb-3">
                      <span
                        className={`${tooltip} hoverText tooltipAlign`}
                        style={{ marginTop: "80px" }}
                        data-tooltip="CURRENT TOKEN PRICE"
                        data-flow="bottom"
                      >
                        {" "}
                        <i
                          className={`fas mx-2 fa-exclamation-circle ${theme}`}
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div style={{ marginTop: "-1px" }}>
                    <div className="hrp">
                      <hr className="my-3 " />
                    </div>
                  </div>
                  <div className="d-flex  h-50">
                    <div className="margin-right ">
                      <i
                        className={`iconSize fa-solid fa-comments-dollar ${theme}`}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme} `}
                    >
                      <div>
                        <div className={`${textTitle}  `}>
                          <div className={`${textTitle}  `}>
                            $ TVL ( LIQUIDITY )
                          </div>{" "}
                        </div>
                        <div className={`varSize ${spanDarkDim}`}>
                          <span className={`spanText ${spanDarkDim} fs-5`}>
                            {" "}
                            <>
                              $ <TVL />
                            </>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-end pb-3">
                      <span
                        className={`${tooltip} hoverText tooltipAlign`}
                        data-tooltip="The number of tokens in vaults * current price."
                        data-flow="bottom"
                      >
                        {" "}
                        <i
                          className={`fas mx-2 fa-exclamation-circle ${theme}`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
