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

export default function BNBDAV() {
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

  const { accountAddress, userConnected } = useContext(Web3WalletContext);
  console.log("account address from dav", accountAddress);
  const {
    getParityDollarClaimed,

    handleDepositAutovault,

    fetchAutoVaultAmount,
    get_PST_Claimed,
    getClaimAllReward,
    isHolder,
  } = useContext(functionsContext);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isBNBButtonEnabled, setIsBNBButtonEnabled] = useState(false);
  const [isPDXNButtonEnabled, setIsPDXNButtonEnabled] = useState(false);
  const [isPFENIXButtonEnabled, setIsPFENIXButtonEnabled] = useState(false);
  // const [isBNBButtonEnabled, setBNBIsButtonEnabled] = useState(false);
  const [BNBParityTokenClaimed, setBNBParityTokensClaimed] = useState("0");
  const [parityTokensClaimed, setParityTokensClaimed] = useState("0");
  const [PDXNparityTokensClaimed, setPDXNParityTokensClaimed] = useState("0");
  const [PFENIXparityTokensClaimed, setPFENIXParityTokensClaimed] =
    useState("0");
  const [autoVaultAmount, setAutoVaultAmount] = useState("0");
  const [PDXNautoVaultAmount, setPDXNAutoVaultAmount] = useState("0");
  const [PFENIXautoVaultAmount, setPFENIXAutoVaultAmount] = useState("0");
  const [BNBAutovaultAMount, setBNBAutoVaultAmount] = useState("0");

  const [AVBUtton, setAVButton] = useState("0");
  const [BDXNBUtton, setBDXNButton] = useState("0");
  const [BXENBUtton, setBXENButton] = useState("0");
  const [BFENIXAVButton, setBFENIXButton] = useState("0");

  const [toBeClaimed, setToBeClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });

  const [ToPDXNClaimed, setToPDXNBeClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [ToPFENIXClaimed, setToPFENIXBeClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [BNBbeClaimed, setBNBToBeClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [isProcessingAutoVault, setIsProcessingAutoVault] = useState(false);
  const [isBNBProcessingAutoVault, setIsBNBProcessingAutoVault] =
    useState(false);
  const [isPDXNProcessingAutoVault, setIsPDXNProcessingAutoVault] =
    useState(false);
  const [isPFENIXProcessingAutoVault, setIsPFENIXProcessingAutoVault] =
    useState(false);
  const [isClaimButtonEnabled, setClaimISButtonEnabled] = useState(true);
  const [isBNBClaimButtonEnabled, setBNBClaimISButtonEnabled] = useState(true);
  const [isPDXNClaimButtonEnabled, setPDXNClaimISButtonEnabled] =
    useState(true);
  const [isPFENIXClaimButtonEnabled, setPFENIXClaimISButtonEnabled] =
    useState(true);

  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");

  const location = useLocation();
  const ispolygon = location.pathname === "/polygon/mint";
  const isAlpha = location.pathname === "/alpharoom";

  // Define a general handler function
  const HandleBeClaim = async (
    contractType,
    setStateFunction,
    accountAddress = null
  ) => {
    try {
      let parityShareTokensDetail;

      // Determine the correct way to call getParityDollarClaimed based on the presence of accountAddress
      if (accountAddress) {
        parityShareTokensDetail = await getParityDollarClaimed(
          accountAddress,
          contractType
        );
      } else {
        parityShareTokensDetail = await getParityDollarClaimed(contractType);
      }

      const parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount || "0";
      const formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount
      );
      const totalToBeClaimed = parseFloat(formattedParityClaimableAmount);
      const formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);
      const formattedWithCommas = parseFloat(
        formattedTotalToBeClaimed
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      // Update the respective state with the formatted amount
      setStateFunction({
        formatted: formattedWithCommas,
        raw: totalToBeClaimed,
      });
    } catch (error) {
      console.error("Error:", error);
      // Optionally, implement user-facing error handling here
    }
  };

  // Refactored functions utilizing the general handler
  const ToBeClaimed = async () => {
    await HandleBeClaim("BXEN", setToBeClaimed, accountAddress);
  };

  const ToBemPDXNClaimed = async () => {
    await HandleBeClaim("BDXN", setToPDXNBeClaimed);
  };

  const ToBePFENIXClaimed = async () => {
    await HandleBeClaim("BFENIX", setToPFENIXBeClaimed);
  };

  const handleClaimed = async (
    getClaimedFunction,
    setStateFunction,
    contractType = null,
    accountAddress = null
  ) => {
    try {
      let PSTClaimed;

      // Determine the correct way to call the claim function based on provided parameters
      if (accountAddress) {
        PSTClaimed = await getClaimedFunction(accountAddress);
      } else if (contractType) {
        PSTClaimed = await getClaimedFunction(contractType);
      } else {
        PSTClaimed = await getClaimedFunction();
      }

      const formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");
      const fixed = Number(formatted_PST_Claimed);

      // Format the number with commas
      const formattedWithCommas = fixed.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      });

      setStateFunction(formattedWithCommas);
    } catch (error) {
      console.error("Claimed error:", error);
    }
  };

  // Refactored functions using the general handler
  const BNBClaimed = async () => {
    await handleClaimed(
      get_PST_Claimed,
      setBNBParityTokensClaimed,
      "BNB",
      accountAddress
    );
  };

  const PSTClaimed = async () => {
    await handleClaimed(get_PST_Claimed, setParityTokensClaimed, "BXEN");
  };

  const PFENIXClaimed = async () => {
    await handleClaimed(
      get_PST_Claimed,
      setPFENIXParityTokensClaimed,
      "BFENIX"
    );
  };

  const PDXNClaimed = async () => {
    await handleClaimed(get_PST_Claimed, setPDXNParityTokensClaimed, "BDXN");
  };

  const ToBNBbeClaimed = async () => {
    try {
      // Get the parity share tokens claimable amount
      let parityShareTokensDetail = await getParityDollarClaimed(
        accountAddress,
        "BNB"
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

      console.log("BNB claimed", formattedParityClaimableAmount);

      // Update the state with the total amount to be claimed
      const formattedWithCommas = parseFloat(
        formattedTotalToBeClaimed
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      // Update the respective state with the formatted amount
      setBNBToBeClaimed({
        formatted: formattedWithCommas,
        raw: totalToBeClaimed,
      });
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  const handleClaimAllReward = async ({
    isProcessing,
    claimedAmount,
    contractType,
    getRewardFunction,
    accountAddress,
  }) => {
    if (!isProcessing) {
      console.log("Number(toBeClaimed):", Number(claimedAmount));
      console.log("toBeClaimed:", claimedAmount);

      if (Number(claimedAmount) <= 0) {
        allInOnePopup(null, "Insufficient Balance", null, `OK`, null);
        return;
      }

      try {
        const allReward = await getRewardFunction(accountAddress, contractType);
        await allReward.wait(); // Wait for the transaction to be confirmed
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

  // Refactored functions using the general handler
  const claimAllReward = async () => {
    await handleClaimAllReward({
      isProcessing: isProcessingAutoVault,
      claimedAmount: toBeClaimed.raw,
      contractType: "BXEN",
      getRewardFunction: getClaimAllReward,
      accountAddress: accountAddress,
    });
  };

  const claimPDXNAllReward = async () => {
    await handleClaimAllReward({
      isProcessing: isPDXNProcessingAutoVault,
      claimedAmount: ToPDXNClaimed.raw,
      contractType: "BDXN",
      getRewardFunction: getClaimAllReward,
      accountAddress: accountAddress,
    });
  };

  const claimPFENIXAllReward = async () => {
    await handleClaimAllReward({
      isProcessing: isPFENIXProcessingAutoVault,
      claimedAmount: ToPFENIXClaimed.raw,
      contractType: "BFENIX",
      getRewardFunction: getClaimAllReward,
      accountAddress: accountAddress,
    });
  };

  const ClaimAllBnbRewards = async () => {
    await handleClaimAllReward({
      isProcessing: isBNBProcessingAutoVault,
      claimedAmount: BNBbeClaimed.raw,
      contractType: "BNB",
      getRewardFunction: getClaimAllReward,
      accountAddress: accountAddress,
    });
  };

  let AutoAMount = 0;

  const fetchALLAutoVaultAmounts = async (
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
  const fetchAutoVaultAmounts = async () => {
    await fetchALLAutoVaultAmounts(
      "BXEN",
      10000000000,
      setAutoVaultAmount,
      setBXENButton,
      setIsButtonEnabled,
      setClaimISButtonEnabled
    );
  };
  const fetchPDXNAutoVaultAmounts = async () => {
    await fetchALLAutoVaultAmounts(
      "BDXN",
      1000,
      setPDXNAutoVaultAmount,
      setBDXNButton,
      setIsPDXNButtonEnabled,
      setPDXNClaimISButtonEnabled
    );
  };
  const fetchPFENIXAutoVaultAmounts = async () => {
    await fetchALLAutoVaultAmounts(
      "BFENIX",
      1000000,
      setPFENIXAutoVaultAmount,
      setBFENIXButton,
      setIsPFENIXButtonEnabled,
      setPDXNClaimISButtonEnabled
    );
  };
  const fetchBNBAutoVaultAmounts = async () => {
    await fetchALLAutoVaultAmounts(
      "BNB",
      1000000,
      setBNBAutoVaultAmount,
      setAVButton,
      setIsBNBButtonEnabled,
      setBNBClaimISButtonEnabled
    );
  };

  const handleDepositAutoVaults = async (
    setIsProcessing,
    contractType,
    fetchAutoVaultAmount
  ) => {
    setIsProcessing(true);

    try {
      const isSuccess = await handleDepositAutovault(contractType); // Make sure to pass the amount as well
      if (isSuccess) {
        await isSuccess.wait();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false); // Set to false when processing is complete
      fetchAutoVaultAmount(accountAddress); // Update the auto vault amount after processing
    }
  };

  const HandleDepositPDXNAutovault = async () => {
    await handleDepositAutoVaults(
      setIsPDXNProcessingAutoVault,
      "BDXN",
      fetchPDXNAutoVaultAmounts
    );
  };
  const handleDepositAVBNB = async () => {
    await handleDepositAutoVaults(
      setIsBNBProcessingAutoVault,
      "BNB",
      fetchBNBAutoVaultAmounts
    );
  };
  const HandleDepositXENAutovault = async () => {
    await handleDepositAutoVaults(
      setIsProcessingAutoVault,
      "BXEN",
      fetchAutoVaultAmounts
    );
  };
  const HandleDepositPFENIXAutovault = async () => {
    await handleDepositAutoVaults(
      setIsPFENIXProcessingAutoVault,
      "BFENIX",
      fetchPFENIXAutoVaultAmounts
    );
  };

  useEffect(() => {
    if (userConnected) {
      ToBeClaimed();
      ToBemPDXNClaimed();
      ToBePFENIXClaimed();
      BNBClaimed();
      PDXNClaimed();
      PFENIXClaimed();
      fetchPFENIXAutoVaultAmounts();
      PSTClaimed();
      ToBNBbeClaimed();
      fetchPDXNAutoVaultAmounts();
      fetchAutoVaultAmounts();
      fetchBNBAutoVaultAmounts();
    }
    // totalReachedPriceTarget();
  });

  const data = [
    {
      BNB: "Testing auto-vault targets for DAVBNB tokens. Claim your rewards.Market-making strategies have yet to start.",
      mXEN: "Testing auto-vault targets for DAVBNB tokens. Claim your rewards.Market-making strategies have yet to start.",
      mDXN: "Testing auto-vault targets for DAVBNB tokens. Claim your rewards.Market-making strategies have yet to start.",
      mFENIX:
        "Testing auto-vault targets for DAVBNB tokens. Claim your rewards.Market-making strategies have yet to start.",
    },
  ];

  const [isDAVHolders, setDAVIsHolder] = useState(false);

  useEffect(() => {
    const checkIsHolder = async (accountAddress) => {
      try {
        const isHoldingTokens = await isHolder(accountAddress, "DAVBNB");
        setDAVIsHolder(isHoldingTokens);
      } catch (error) {
        console.log(error);
      }
    };
    checkIsHolder();
  }, [accountAddress, isHolder]);

  const isHei = !ispolygon && !isAlpha && "hei";

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
                  {TokenName === "BNB" ? (
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
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12`}>
            <div
              className={`flex-grow-1 fontSize text-start ${textTitle} mb-0 ms-3 ${
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
                        (theme === "darkTheme" && "Theme-block-container") ||
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
                          onClaim={ClaimAllBnbRewards}
                          claimDisabled={
                            isBNBProcessingAutoVault || !isBNBClaimButtonEnabled
                          }
                          claimAmount={BNBbeClaimed.formatted}
                          claimRaw={BNBbeClaimed.raw}
                          autoVaultTarget={1000000}
                          autoVaultOnClick={handleDepositAVBNB}
                          autoVaultDisabled={!isBNBButtonEnabled}
                          autoVaultAmount={BNBAutovaultAMount}
                          amount={AVBUtton}
                          parityTokensClaimed={BNBParityTokenClaimed}
                          linkPath="/BNB"
                          linkText="BNB"
                          locationPath={location.pathname}
                          isActive={location.pathname === "/BNB"}
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
                          autoVaultTarget={10000000000}
                          amount={BXENBUtton}
                          autoVaultOnClick={HandleDepositXENAutovault}
                          autoVaultDisabled={!isButtonEnabled}
                          autoVaultAmount={autoVaultAmount}
                          parityTokensClaimed={parityTokensClaimed}
                          linkPath="/bXEN"
                          linkText="bXEN"
                          locationPath={location.pathname}
                          isActive={location.pathname === "/bXEN"}
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
                          autoVaultTarget={1000}
                          amount={BDXNBUtton}
                          autoVaultOnClick={HandleDepositPDXNAutovault}
                          autoVaultDisabled={!isPDXNButtonEnabled}
                          autoVaultAmount={PDXNautoVaultAmount}
                          parityTokensClaimed={PDXNparityTokensClaimed}
                          linkPath="/bDXN"
                          linkText="bDXN"
                          locationPath={location.pathname}
                          isActive={location.pathname === "/bDXN"}
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
                          claimRaw={ToPDXNClaimed.raw}
                          autoVaultTarget={1000000}
                          amount={BFENIXAVButton}
                          autoVaultOnClick={HandleDepositPFENIXAutovault}
                          autoVaultDisabled={!isPFENIXButtonEnabled}
                          autoVaultAmount={PFENIXautoVaultAmount}
                          parityTokensClaimed={PFENIXparityTokensClaimed}
                          linkPath="/bFENIX"
                          linkText="bFENIX"
                          locationPath={location.pathname}
                          isActive={location.pathname === "/bFENIX"}
                        />
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
                          className={` info-item info-columns boxes new1 ${
                            (theme === "darkTheme" && "Theme-btn-block") ||
                            (theme === "dimTheme" && "dimThemeBorder") ||
                            (theme === "lightTheme" && theme + " translite")
                          }`}
                          style={{ marginTop: "-20px" }}
                        >
                          <p className="alpha-room">ALPHA ROOM</p>
                        </div>
                        <div
                          className={`top-container ${
                            (theme === "darkTheme" && "darkThemeTrackingBg") ||
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
                                  TokenName="BNB"
                                  theme={theme}
                                  borderDarkDim={borderDarkDim}
                                  textTheme={textTheme}
                                  spanDarkDim={spanDarkDim}
                                  data={data}
                                />
                                <AlphaRoom
                                  image={SystemStateLogo}
                                  hasBorder={true}
                                  TokenName="mXEN"
                                  theme={theme}
                                  borderDarkDim={borderDarkDim}
                                  textTheme={textTheme}
                                  spanDarkDim={spanDarkDim}
                                  data={data}
                                />
                                <AlphaRoom
                                  image={SystemStateLogo}
                                  hasBorder={true}
                                  TokenName="mDXN"
                                  theme={theme}
                                  borderDarkDim={borderDarkDim}
                                  textTheme={textTheme}
                                  spanDarkDim={spanDarkDim}
                                  data={data}
                                />
                                <AlphaRoom
                                  image={SystemStateLogo}
                                  hasBorder={false}
                                  TokenName="mFENIX"
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
        </div>
      </div>
    </>
  );
}
