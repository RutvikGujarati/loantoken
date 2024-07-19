import React, { useContext, useState, useEffect } from "react";
import "./dav.css";
import "../../Utils/Theme.css";
import { Link } from "react-router-dom";
import LogoTransparent from "../../Assets/LogoTransparent.png";
import pxen from "../../Assets/XEN.png";
import pdxn from "../../Assets/Token List Icon/DXN.svg";
import PFENIX from "../../Assets/Token List Icon/pfenix.svg";

import { themeContext } from "../../App";
import { useLocation } from "react-router-dom";
// import { TotalSumProvider  } from "../../Components/Tracker/TrackingPage";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { functionsContext } from "../../Utils/Functions";
import { ethers } from "ethers";

import { allInOnePopup } from "../../Utils/ADDRESSES/Addresses";

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
    handleDepositAutovaults,
    getProtocolFee,
    fetchAutoVaultAmount,
    getPLS_PST_Claimed,
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
  const [isPLSButtonEnabled, setPLSIsButtonEnabled] = useState(false);
  const [PLSparityTokensClaimed, setPLSParityTokensClaimed] = useState("0");
  const [parityTokensClaimed, setParityTokensClaimed] = useState("0");
  const [autoVaultAmount, setAutoVaultAmount] = useState("0");
  const [PLSautoVaultAmount, setPLSAutoVaultAmount] = useState("0");
  const [toBeClaimed, setToBeClaimed] = useState("0.0000");
  const [PLStoBeClaimed, setPLSToBeClaimed] = useState("0.0000");
  const [parityDollardeposits, setParityDollardeposits] = useState("0");
  const [totalsumofPOints, setsumofPoints] = useState("0");

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
  const isHome = location.pathname == "/mint";
  const isAlpha = location.pathname === "/alpharoom";
  const isInflationPLS = location.pathname == "/PLS";
  const isInflationXEN = location.pathname == "/XEN";

  const ToBeClaimed = async () => {
    try {
      // Get the IPT and RPT rewards
      let iptAndRptReward = await getToBeClaimed(accountAddress);
      let formattedIptAndRptReward = ethers.utils.formatEther(
        iptAndRptReward || "0"
      );

      // Get the user's distributed tokens
      let userDistributedTokens = await getUserDistributedTokens(
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
      let { isParityReachedOrExceed } = await getParityReached(accountAddress);

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
  const PSTClaimed = async () => {
    try {
      let PSTClaimed = await get_PST_Claimed(accountAddress);
      let formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");
      let fixed = Number(formatted_PST_Claimed).toFixed(4) + " XEN";
      setParityTokensClaimed(fixed);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const ToPLSBeClaimed = async () => {
    try {
      // Get the IPT and RPT rewards
      let iptAndRptReward = await getPLSToBeClaimed(accountAddress);
      let formattedIptAndRptReward = ethers.utils.formatEther(
        iptAndRptReward || "0"
      );

      // Get the user's distributed tokens
      let userDistributedTokens = await getPLSUserDistributedTokens(
        accountAddress
      );
      let formattedUserDistributedTokens = parseFloat(userDistributedTokens);

      // Get the parity share tokens claimable amount
      let parityShareTokensDetail = await getPLSParityDollarClaimed(
        accountAddress
      );
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );

      // Get the protocol fee
      let protocolFeeDetail = await getPLSProtocolFee(accountAddress);
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
      setPLSToBeClaimed(formattedTotalToBeClaimed);
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  const claimAllReward = async () => {
    console.log("Number(toBeClaimed):", Number(toBeClaimed));
    console.log("toBeClaimed:", toBeClaimed);

    if (Number(toBeClaimed) <= 0) {
      allInOnePopup(null, "Insufficient Balance", null, `OK`, null);
      return;
    }

    try {
      // allInOnePopup(null, 'Processing...', 'Please wait while we claim your rewards', `OK`, null);
      const allReward = await getClaimAllReward(accountAddress);
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
  const claimPLSAllReward = async () => {
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

  let AutoAMount = 0;

  const fetchAutoVaultAmounts = async (address) => {
    try {
      let autoVaultAmount = await fetchAutoVaultAmount(accountAddress);

      console.log("AutoVaults from tracking:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      AutoAMount += autoVaultAmountNumber;
      setAutoVaultAmount(autoVaultAmountNumber.toFixed(2));
      if (AutoAMount > 1000000) {
        setIsButtonEnabled(true);
      } else {
        setIsButtonEnabled(false);
      }
    } catch (error) {
      console.error("fetchAutoVaultAmounts error:", error);
      setAutoVaultAmount("0");
    }
  };
  const fetchPLSAutoVaultAmounts = async (address) => {
    try {
      let autoVaultAmount = await fetchPLSAutoVaultAmount(accountAddress);

      console.log("AutoVaults from tracking:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      setPLSAutoVaultAmount(autoVaultAmountNumber.toFixed(2));
      if (AutoAMount > 1000000) {
        isPLSButtonEnabled(true);
      } else {
        isPLSButtonEnabled(false);
      }
    } catch (error) {
      console.error("fetchAutoVaultAmounts error:", error);
      setPLSAutoVaultAmount("0");
    }
  };

  const handleDepositAV = async () => {
    try {
      allInOnePopup(null, "Create a new Vault", null, `OK`, null);

      let deposit = await handleDepositAutovaults(AutoAMount);
      deposit.wait();
      allInOnePopup(null, "Done - Inflation Locked", null, `OK`, null);
      // Reset AutoAMount to 0 after successful deposit
      AutoAMount = 0;
      setAutoVaultAmount("0");
      setIsButtonEnabled(false);
    } catch (error) {
      console.error("Deposit error:", error);
    }
  };

  const handleDepositAVPLS = async () => {
    try {
      allInOnePopup(null, "Create a new Vault", null, `OK`, null);

      let deposit = await handlePLSDepositAutovaults(AutoAMount);
      deposit.wait();
      allInOnePopup(null, "Done - Inflation Locked", null, `OK`, null);
      // Reset AutoAMount to 0 after successful deposit
      AutoAMount = 0;
      setPLSAutoVaultAmount("0");
      setPLSIsButtonEnabled(false);
    } catch (error) {
      console.error("Deposit error:", error);
    }
  };

  useEffect(() => {
    if (userConnected) {
      ToBeClaimed();
      PLSPSTClaimed();
      PSTClaimed();
      ToPLSBeClaimed();
      fetchAutoVaultAmounts();
      fetchPLSAutoVaultAmounts();
    }
    // totalReachedPriceTarget();
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

  const totalsumofPoints = () => {
    try {
      let sum =
        parseFloat(paritydeposit.replace(/,/g, "")) +
        parseFloat(parityDollardeposits.replace(/,/g, ""));
      let fixed =
        parseFloat(sum)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ";

      setsumofPoints(fixed);
    } catch (error) {
      console.log(error);
    }
  };

  const getDay = async () => {
    const Day = await getTimeStampForCreateValut();
    setDayStamp(Day);
  };

  useEffect(() => {
    if (userConnected) {
      ParityDollardeposits();
      ParityTokensDepositforPoint();
      totalsumofPoints();
      getDay();
    }
  });

  const [isHolders, setIsHolder] = useState(false);

  useEffect(() => {
    const checkIsHolder = async (accountAddress) => {
      try {
        const isHoldingTokens = await isHolder(accountAddress);

        setIsHolder(isHoldingTokens);
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
    <>
      <div
        className={`flex-grow-1 fontSize text-start ${textTitle} mb-0 ms-3 ${
          theme === "dimTheme" && "text-white"
        } `}
      >
        {isHome ? (
          <>
            <div>
              <div
                className={` info-item info-columns box new ${
                  (theme === "darkTheme" && "Theme-btn-block") ||
                  (theme === "dimTheme" && "dimThemeBorder") ||
                  (theme === "lightTheme" && theme + " translite")
                }`}
              >
                <p>CLAIM REWARDS / AUTO-VAULTS</p>
              </div>

              <div className="tracking" style={{ marginTop: "100px" }}>
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
                          <div className="d-flex mint-token-container">
                            <Link
                              className={`margin-right enter${
                                location.pathname == "/PLS" && "ins"
                              }`}
                              role="button"
                              to="/PLS"
                              // target="_blank"
                            >
                              <img
                                src={LogoTransparent}
                                alt="Logo"
                                width="30"
                                height="30"
                                className={`iconSize ${theme}`}
                              />
                            </Link>

                            <div
                              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                            >
                              <div className={`${textTitle} mint-two`}>
                                <div className="d-flex  button-group  ">
                                  <button
                                    className={`  box-4 items mx-2 glowing-button  ${
                                      (theme === "darkTheme" &&
                                        "Theme-btn-block") ||
                                      (theme === "dimTheme" &&
                                        "dimThemeBorder") ||
                                      (theme === "lightTheme" &&
                                        "lightThemeButtonBg")
                                    } ${theme}`}
                                    onClick={() => claimPLSAllReward()}
                                  >
                                    CLAIM
                                  </button>
                                  <span className={`spanValue2 ${spanDarkDim}`}>
                                    {PLStoBeClaimed}
                                  </span>
                                </div>
                                <div className="d-flex  button-group items">
                                  <button
                                    onClick={() => {
                                      if (isPLSButtonEnabled) {
                                        handleDepositAVPLS();
                                      }
                                    }}
                                    disabled={!isPLSButtonEnabled}
                                    style={{
                                      cursor: isPLSButtonEnabled
                                        ? "pointer"
                                        : "not-allowed",
                                    }}
                                    className={` box-4 items mx-2 glowing-button  ${
                                      theme === "darkTheme"
                                        ? "Theme-btn-block"
                                        : theme === "dimTheme"
                                        ? "dimThemeBtnBg"
                                        : "lightThemeButtonBg"
                                    } ${theme}`}
                                    // onClick={() => mintWithPDXN(2, 0.00)}
                                  >
                                    AUTO-VAULT
                                  </button>
                                  <span className={`spanValue ${spanDarkDim}`}>
                                    {PLSautoVaultAmount}
                                  </span>
                                </div>
                                <div className={`spanCenter1 ${spanDarkDim}`}>
                                  <span>{PLSparityTokensClaimed}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                        >
                          <hr className="d-block d-lg-none d-md-none" />
                          <div
                            className={`d-flex mint-token-container ${theme}`}
                            // style={{ marginTop: "-20px" }}
                          >
                            <Link
                              className={`margin-right enter  ${
                                location.pathname == "/XEN" && "ins active"
                              }`}
                              role="button"
                              to="/XEN"
                              // target="_blank"
                            >
                              <img
                                src={pxen}
                                alt="Logo"
                                width="30"
                                height="30"
                                className={`iconSize ${theme}`}
                              />
                            </Link>
                            <div
                              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                            >
                              <div className={`${textTitle} `}>
                                <div className="d-flex  button-group items-a ">
                                  <button
                                    className={`  box-4 mx-1 glowing-button  ${
                                      theme === "darkTheme"
                                        ? "Theme-btn-block"
                                        : theme === "dimTheme"
                                        ? "dimThemeBtnBg"
                                        : "lightThemeButtonBg"
                                    } ${theme}`}
                                    onClick={() => claimAllReward()}
                                  >
                                    CLAIM
                                  </button>
                                  <span className={`spanValue2 ${spanDarkDim}`}>
                                    {toBeClaimed}
                                  </span>
                                </div>
                                <div className="d-flex  button-group items-b">
                                  <button
                                    onClick={() => {
                                      if (isButtonEnabled) {
                                        handleDepositAV();
                                      }
                                    }}
                                    disabled={!isButtonEnabled}
                                    style={{
                                      cursor: isButtonEnabled
                                        ? "pointer"
                                        : "not-allowed",
                                    }}
                                    className={` box-4 items mx-2 glowing-button  ${
                                      theme === "darkTheme"
                                        ? "Theme-btn-block"
                                        : theme === "dimTheme"
                                        ? "dimThemeBtnBg"
                                        : "lightThemeButtonBg"
                                    } ${theme}`}
                                  >
                                    AUTO-VAULT
                                  </button>
                                  <span className={`spanValue8 ${spanDarkDim}`}>
                                    {autoVaultAmount}
                                  </span>
                                </div>
                                <span className={`spanCenter ${spanDarkDim}`}>
                                  {parityTokensClaimed}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                        >
                          <hr className="d-block d-lg-none d-md-none" />
                          <div
                            className="d-flex mint-token-container"
                            // style={{ marginTop: "-15px" }}
                          >
                            <div
                              className={`margin-right iconContainer ${theme} `}
                            >
                              <img
                                src={pdxn}
                                alt="Logo"
                                width="30"
                                height="30"
                                className={`iconSize ${theme}`}
                              />
                            </div>
                            <div
                              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                            >
                              <div>
                                <div className=" d-flex  button-group">
                                  <button
                                    className={`  box-4 mx-2 glowing-button  ${
                                      theme === "darkTheme"
                                        ? "Theme-btn-block"
                                        : theme === "dimTheme"
                                        ? "dimThemeBtnBg"
                                        : "lightThemeButtonBg"
                                    } ${theme}`}
                                    // onClick={() => BuyTokens(5, 1000000)}
                                  >
                                    CLAIM
                                  </button>
                                  <span className={`spanValue ${spanDarkDim}`}>
                                    0.00
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
                                    // onClick={() => mintWithPDXN(5, 1750)}
                                  >
                                    AUTO-VAULT
                                  </button>
                                  <span className={`spanValue ${spanDarkDim}`}>
                                    0.00
                                  </span>
                                </div>
                                <span className={`spanCenter ${spanDarkDim}`}>
                                  0.00
                                </span>
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
                              <img
                                src={PFENIX}
                                alt="Logo"
                                width="30"
                                height="30"
                                className={`iconSize ${theme}`}
                              />
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
                                  // onClick={() => BuyTokens(5, 1000000)}
                                >
                                  CLAIM
                                </button>
                                <span className={`spanValue ${spanDarkDim}`}>
                                  0.00
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
                                  // onClick={() => mintWithPDXN(5, 1750)}
                                >
                                  AUTO-VAULT
                                </button>
                                <span className={`spanValue ${spanDarkDim}`}>
                                  0.00
                                </span>
                              </div>
                              <span className={`spanCenter ${spanDarkDim}`}>
                                0.00
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {isHolders && (
                  <div>
                    <div
                      className={` info-item info-columns boxes new1 ${
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
                            <div
                              className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                            >
                              <hr className="d-block d-lg-none d-md-none" />
                              <div className="d-flex mint-token-container">
                                <div className={`margin-right`}>
                                  <img
                                    src={LogoTransparent}
                                    alt="Logo"
                                    width="30"
                                    height="30"
                                    className={`iconSize `}
                                  />
                                </div>
                                <div
                                  className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                                >
                                  <div>
                                    <div className="varSize">
                                      <span
                                        className={`spanTex ${spanDarkDim}`}
                                      >
                                        PLS
                                      </span>
                                    </div>
                                    <span
                                      className={`normalText ${spanDarkDim}`}
                                    >
                                      {data.map((dataItem, index) => (
                                        <React.Fragment key={index}>
                                          {dataItem.PLS}
                                        </React.Fragment>
                                      ))}
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
                                <div className={`margin-right ${theme}`}>
                                  <img
                                    src={pxen}
                                    alt="Logo"
                                    width="30"
                                    height="30"
                                    className={`iconSize ${theme}`}
                                  />
                                </div>
                                <div
                                  className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                                >
                                  <div>
                                    <div className="varSize">
                                      <span
                                        className={`spanTex ${spanDarkDim}`}
                                      >
                                        PXEN
                                      </span>
                                    </div>
                                    <span
                                      className={`normalText ${spanDarkDim}`}
                                    >
                                      {data.map((dataItem, index) => (
                                        <React.Fragment key={index}>
                                          {dataItem.PXEN}
                                        </React.Fragment>
                                      ))}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
                            >
                              <hr className="d-block d-lg-none d-md-none" />
                              <div
                                className={`d-flex mint-token-container ${theme}`}
                              >
                                <div className="margin-right">
                                  <img
                                    src={pdxn}
                                    alt="Logo"
                                    width="30"
                                    height="30"
                                    className={`iconSize ${theme}`}
                                  />
                                </div>
                                <div
                                  className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                                >
                                  <div>
                                    <div className="varSize">
                                      <span
                                        className={`spanTex ${spanDarkDim}`}
                                      >
                                        PDXN
                                      </span>
                                    </div>
                                    <span
                                      className={`normalText ${spanDarkDim}`}
                                    >
                                      {data.map((dataItem, index) => (
                                        <React.Fragment key={index}>
                                          {dataItem.PDXN}
                                        </React.Fragment>
                                      ))}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`col-md-4  col-lg-3 d-flex flex-column justify-content-center `}
                            >
                              <hr className="d-block d-lg-none d-md-none" />
                              <div className="d-flex mint-token-container">
                                <div className={`margin-right ${theme}`}>
                                  <img
                                    src={PFENIX}
                                    alt="Logo"
                                    width="30"
                                    height="30"
                                    className={`iconSize ${theme}`}
                                  />
                                </div>
                                <div
                                  className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                                >
                                  <div>
                                    <div className="varSize">
                                      <span
                                        className={`spanTex ${spanDarkDim}`}
                                      >
                                        PFENIX
                                      </span>
                                    </div>
                                    <span
                                      className={`normalText ${spanDarkDim}`}
                                    >
                                      {data.map((dataItem, index) => (
                                        <React.Fragment key={index}>
                                          {dataItem.PFENIX}
                                        </React.Fragment>
                                      ))}
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
                  // {/* end the section here*/}
                )}
              </div>
            </div>
          </>
        ) : isAlpha ? (
          <></>
        ) : isInflationPLS ? (
          <>
            {/* <div style={{ marginLeft: "550px", marginTop: "-20px" }}>
              <p>DAV token must remain in the wallet that minted them.</p>
            </div> */}
            <div style={{ marginLeft: "170px", marginTop: "-10px" }}>
              <div
                className="d-flex align-items-center "
                style={{ marginLeft: "-50px" }}
              >
                <i
                  className={`iconSize fa-solid fa-solid fa-link ${theme}`}
                ></i>

                <p
                  className={`flex-grow-1 fontSize text-start ${textTitle} ${spanDarkDim} mb-0 ms-2`}
                >
                  INFORMATION
                </p>
              </div>
              <div className="pad">
                <div className={`info-content `}>
                  <div className="info-column column-left">
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>DAY {DayStamp}</p>
                    </div>
                    {/* <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        VLP Contract Address -{" "}
                        <Link
                          to={navigateToExplorer}
                          target="_blank"
                          className={`info-link ${textTitle} ${spanDarkDim}`}
                        >
                          {conciseAddress(PSD_ADDRESS)}
                        </Link>
                      </p>
                    </div> */}
                    {/* <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        DAV Contract Address -{" "}
                        <Link
                          to={statetokenNavigate}
                          target="_blank"
                          className={`info-link ${textTitle} ${spanDarkDim}`}
                        >
                          {conciseAddress(state_token)}
                        </Link>
                      </p>
                    </div> */}
                  </div>
                  <div className="info-column column-center">
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        Future Airdrop Points -{" "}
                        <span
                          className={`info-data ${textTitle} ${spanDarkDim}`}
                        >
                          {totalsumofPOints} points
                        </span>
                      </p>
                    </div>
                    {/* <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        DAV Token Mints -{" "}
                        <span
                          className={`info-data ${textTitle} ${spanDarkDim}`}
                        >
                          {totalMinted}
                        </span>
                      </p>
                    </div> */}
                    {/* <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        DAV Token Supply -{" "}
                        <span
                          className={`info-data ${textTitle} ${spanDarkDim}`}
                        >
                          422000
                        </span>
                      </p>
                    </div> */}
                  </div>
                  <div className="info-column column-right">
                    <div
                      className={`info-item  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } `}
                    >
                      <p>
                        Documentation{" "}
                        <a
                          href="https://system-state-documentation.gitbook.io/"
                          className="link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : isInflationXEN ? (
          <div></div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
