import React, {
  // useCallback,
  useContext,
  // useRef,
  useEffect,
  useState,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Utils/Theme.css";
import { functionsContext } from "../Utils/Functions";
import { Web3WalletContext } from "../Utils/MetamskConnect";
import { ethers } from "ethers";
import { themeContext } from "../App";
import TrackingPage from "./Tracker/TrackingPage";

const TVL = () => {
  const {
    getPLSPrice,
    getPLSDepositors,
    getPLSRatioPriceTargets,
    getPLSIncrementPriceTargets,
  } = useContext(functionsContext);
  const {
    accountAddress,
    userConnected,

    currencyName,
  } = useContext(Web3WalletContext);
  const [price, setPrice] = useState("0");
  const [totalSUm, setTotalSum] = useState("0");
  const [escrowVaultTargets, setEscrowVaultTargets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Roundtotal, setRoundTotal] = useState("0");
  const [totalVaultValue, setTotalVaultSum] = useState("0");
  const { theme } = useContext(themeContext);

  const IncrementPriceTarget = async () => {
    if (accountAddress && currencyName) {
      try {
        let price = await getPLSPrice();
        let formattedPrice = await ethers.utils.formatEther(price || "0");
        setPrice(formattedPrice);

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

    // Check if the string matches the pattern /^[0-9,.]*$/
    if (/^[0-9,.]*$/.test(stringValue)) {
      // Remove commas and then add them back using the regex pattern
      const formattedValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setTotalVaultSum(formattedValue);
      console.log("total value locked", formattedValue);
      return formattedValue;
    } else {
      // If the string doesn't match the pattern, set the total as it is
      setTotalVaultSum(stringValue);
      console.log("total value locked", stringValue);
      return stringValue;
    }
  };
  useEffect(() => {
    if (userConnected) {
      RatioPriceTargets();
      RTPpmultiplySumWithPrice();
      TotalVaultValueLocked();
    }
  });

  return (
    <>
      <>{totalVaultValue}
      </>
    </>
  );
};

export default TVL;
