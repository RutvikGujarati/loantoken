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

export default function PolygonDav() {
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
    getMaticParityDollarClaimed,

    handleDepositAutovault,

    fetchAutoVaultAmount,
    getMatic_PST_Claimed,
    get_PST_Claimed,
    getClaimAllReward,
    isHolder,
    fetchMaticAutoVaultAmount,
    handleDepositAutovaults,
    getMaticClaimAllReward,
  } = useContext(functionsContext);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isMaticButtonEnabled, setIsMaticButtonEnabled] = useState(false);
  const [isPDXNButtonEnabled, setIsPDXNButtonEnabled] = useState(false);
  const [isPFENIXButtonEnabled, setIsPFENIXButtonEnabled] = useState(false);
  // const [isMaticButtonEnabled, setMaticIsButtonEnabled] = useState(false);
  const [MaticparityTokensClaimed, setMaticParityTokensClaimed] = useState("0");
  const [parityTokensClaimed, setParityTokensClaimed] = useState("0");
  const [PDXNparityTokensClaimed, setPDXNParityTokensClaimed] = useState("0");
  const [PFENIXparityTokensClaimed, setPFENIXParityTokensClaimed] =
    useState("0");
  const [autoVaultAmount, setAutoVaultAmount] = useState("0");
  const [PDXNautoVaultAmount, setPDXNAutoVaultAmount] = useState("0");
  const [PFENIXautoVaultAmount, setPFENIXAutoVaultAmount] = useState("0");
  const [MaticautoVaultAmount, setMaticAutoVaultAmount] = useState("0");
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
  const [MaticBeClaimed, setMaticToBeClaimed] = useState({
    raw: "0.0000",
    formatted: "0.0000",
  });
  const [isProcessingAutoVault, setIsProcessingAutoVault] = useState(false);
  const [isMaticProcessingAutoVault, setIsMaticProcessingAutoVault] =
    useState(false);
  const [isPDXNProcessingAutoVault, setIsPDXNProcessingAutoVault] =
    useState(false);
  const [isPFENIXProcessingAutoVault, setIsPFENIXProcessingAutoVault] =
    useState(false);
  const [isClaimButtonEnabled, setClaimISButtonEnabled] = useState(true);
  const [isMaticClaimButtonEnabled, setMaticClaimISButtonEnabled] =
    useState(true);
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
    await HandleBeClaim("mxen", setToBeClaimed, accountAddress);
  };

  const ToBemPDXNClaimed = async () => {
    await HandleBeClaim("mdxn", setToPDXNBeClaimed);
  };

  const ToBePFENIXClaimed = async () => {
    await HandleBeClaim("mfenix", setToPFENIXBeClaimed);
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
  const MaticClaimed = async () => {
    await handleClaimed(
      getMatic_PST_Claimed,
      setMaticParityTokensClaimed,
      null,
      accountAddress
    );
  };

  const PSTClaimed = async () => {
    await handleClaimed(get_PST_Claimed, setParityTokensClaimed, "mxen");
  };

  const PFENIXClaimed = async () => {
    await handleClaimed(
      get_PST_Claimed,
      setPFENIXParityTokensClaimed,
      "mfenix"
    );
  };

  const PDXNClaimed = async () => {
    await handleClaimed(get_PST_Claimed, setPDXNParityTokensClaimed, "mdxn");
  };

  const ToMaticBeClaimed = async () => {
    try {
      // Get the parity share tokens claimable amount
      let parityShareTokensDetail = await getParityDollarClaimed(
        accountAddress,"MATIC"
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

      console.log("Matic claimed", formattedParityClaimableAmount);

      // Update the state with the total amount to be claimed
      const formattedWithCommas = parseFloat(
        formattedTotalToBeClaimed
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
      // Update the respective state with the formatted amount
      setMaticToBeClaimed({
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
      contractType: "mxen",
      getRewardFunction: getClaimAllReward,
      accountAddress: accountAddress,
    });
  };

  const claimPDXNAllReward = async () => {
    await handleClaimAllReward({
      isProcessing: isPDXNProcessingAutoVault,
      claimedAmount: ToPDXNClaimed,
      contractType: "mdxn",
      getRewardFunction: getClaimAllReward,
      accountAddress: accountAddress,
    });
  };

  const claimPFENIXAllReward = async () => {
    await handleClaimAllReward({
      isProcessing: isPFENIXProcessingAutoVault,
      claimedAmount: ToPFENIXClaimed,
      contractType: "mfenix",
      getRewardFunction: getClaimAllReward,
      accountAddress: accountAddress,
    });
  };

  const claimMaticAllReward = async () => {
    await handleClaimAllReward({
      isProcessing: isMaticProcessingAutoVault,
      claimedAmount: MaticBeClaimed,
      getRewardFunction: getMaticClaimAllReward,
      accountAddress: accountAddress,
    });
  };

  let AutoAMount = 0;

  const fetchAutoVaultAmounts = async () => {
    try {
      const contractType = "mxen";
      let autoVaultAmount = await fetchAutoVaultAmount(
        accountAddress,
        contractType
      );

      console.log("AutoVaults from tracking:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      AutoAMount += autoVaultAmountNumber;
      setAutoVaultAmount(autoVaultAmountNumber.toFixed(2));
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
      const contractType = "mdxn";
      let autoVaultAmount = await fetchAutoVaultAmount(contractType);

      console.log("AutoVaults from PDXN:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);
      if (autoVaultAmountNumber > 1000) {
        setIsPDXNButtonEnabled(true);
        setPDXNClaimISButtonEnabled(false);
      } else {
        setIsPDXNButtonEnabled(false);
      }

      setPDXNAutoVaultAmount(autoVaultAmountNumber.toFixed(2).toLocaleString());
    } catch (error) {
      console.error("fetchPDXNAutoVaultAmounts error:", error);
      setPDXNAutoVaultAmount("0");
    }
  };

  const fetchPFENIXAutoVaultAmounts = async () => {
    try {
      const contractType = "mfenix";
      let autoVaultAmount = await fetchAutoVaultAmount(contractType);

      console.log("AutoVaults from PDXN:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);
      if (autoVaultAmountNumber > 1000000) {
        setIsPFENIXButtonEnabled(true);
        setPFENIXClaimISButtonEnabled(false);
      } else {
        setIsPFENIXButtonEnabled(false);
      }

      setPFENIXAutoVaultAmount(autoVaultAmountNumber.toFixed(2));
    } catch (error) {
      console.error("fetchPDXNAutoVaultAmounts error:", error);
      setPFENIXAutoVaultAmount("0.00");
    }
  };

  const fetchMaticAutoVaultAmounts = async (address) => {
    try {
      let autoVaultAmount = await fetchMaticAutoVaultAmount(accountAddress);

      console.log("AutoVaults from tracking:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      if (autoVaultAmountNumber > 1000000) {
        setIsMaticButtonEnabled(true);
        setMaticClaimISButtonEnabled(false);
      } else {
        setIsMaticButtonEnabled(false);
      }

      setMaticAutoVaultAmount(autoVaultAmountNumber.toFixed(2));
    } catch (error) {
      console.error("fetchAutoVaultAmounts error:", error);
      setMaticAutoVaultAmount("0");
    }
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

  const handleDepositAVMatic = async () => {
    setIsMaticProcessingAutoVault(true);
    try {
      allInOnePopup(null, "Create a new Vault", null, `OK`, null);

      let deposit = await handleDepositAutovaults(AutoAMount, "MATIC");
      deposit.wait();
      allInOnePopup(null, "Done - Inflation Locked", null, `OK`, null);
      // Reset AutoAMount to 0 after successful deposit
      AutoAMount = 0;
      setMaticAutoVaultAmount("0");
      // setMaticIsButtonEnabled(false);
    } catch (error) {
      console.error("Deposit error:", error);
    } finally {
      setIsMaticProcessingAutoVault(false);
      fetchMaticAutoVaultAmounts();
    }
  };

  const HandleDepositPDXNAutovault = async () => {
    await handleDepositAutoVaults(
      setIsPDXNProcessingAutoVault,
      "mdxn",
      fetchPDXNAutoVaultAmounts
    );
  };
  const HandleDepositXENAutovault = async () => {
    await handleDepositAutoVaults(
      setIsProcessingAutoVault,
      "mxen",
      fetchAutoVaultAmounts
    );
  };
  const HandleDepositPFENIXAutovault = async () => {
    await handleDepositAutoVaults(
      setIsPFENIXProcessingAutoVault,
      "mfenix",
      fetchPFENIXAutoVaultAmounts
    );
  };

  useEffect(() => {
    if (userConnected) {
      ToBeClaimed();
      ToBemPDXNClaimed();
      ToBePFENIXClaimed();
      MaticClaimed();
      PDXNClaimed();
      PFENIXClaimed();
      fetchPFENIXAutoVaultAmounts();
      PSTClaimed();
      ToMaticBeClaimed();
      fetchPDXNAutoVaultAmounts();
      fetchAutoVaultAmounts();
      fetchMaticAutoVaultAmounts();
    }
    // totalReachedPriceTarget();
  });

  const data = [
    {
      Matic:
        "Testing auto-vault targets for DAVMATIC tokens. Claim your rewards.Market-making strategies have yet to start.",
      mXEN: "Testing auto-vault targets for DAVMATIC tokens. Claim your rewards.Market-making strategies have yet to start.",
      mDXN: "Testing auto-vault targets for DAVMATIC tokens. Claim your rewards.Market-making strategies have yet to start.",
      mFENIX:
        "Testing auto-vault targets for DAVMATIC tokens. Claim your rewards.Market-making strategies have yet to start.",
    },
  ];

  const [isDAVHolders, setDAVIsHolder] = useState(false);

  useEffect(() => {
    const checkIsHolder = async (accountAddress) => {
      try {
        const isHoldingTokens = await isHolder(accountAddress, "DAVMATIC");
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
                  {TokenName === "Matic" ? (
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
        <div>
          <div>
            <div
              className={` info-item info-columns box new2 ${
                (theme === "darkTheme" && "Theme-btn-block") ||
                (theme === "dimTheme" && "dimThemeBorder") ||
                (theme === "lightTheme" && theme + " translite")
              }`}
            >
              <p>CLAIM REWARDS / AUTO-VAULTS</p>
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
                        onClaim={claimMaticAllReward}
                        claimDisabled={
                          isMaticProcessingAutoVault ||
                          !isMaticClaimButtonEnabled
                        }
                        claimAmount={MaticBeClaimed.formatted}
                        claimRaw={MaticBeClaimed.raw}
                        autoVaultTarget={1000000}
                        autoVaultOnClick={handleDepositAVMatic}
                        autoVaultDisabled={!isMaticButtonEnabled}
                        autoVaultAmount={MaticautoVaultAmount}
                        parityTokensClaimed={MaticparityTokensClaimed}
                        linkPath="/MATIC"
                        linkText="MATIC"
                        locationPath={location.pathname}
                        isActive={location.pathname === "/MATIC"}
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
                        autoVaultOnClick={HandleDepositXENAutovault}
                        autoVaultDisabled={!isButtonEnabled}
                        autoVaultAmount={autoVaultAmount}
                        parityTokensClaimed={parityTokensClaimed}
                        linkPath="/mXEN"
                        linkText="mXEN"
                        locationPath={location.pathname}
                        isActive={location.pathname === "/mXEN"}
                      />
                      <ClaimSection
                        hasBorder={true}
                        theme={theme}
                        borderDarkDim={borderDarkDim}
                        textTheme={textTheme}
                        spanDarkDim={spanDarkDim}
                        onClaim={claimPDXNAllReward}
                        claimDisabled={
                          isPDXNProcessingAutoVault || !isPDXNClaimButtonEnabled
                        }
                        claimAmount={ToPDXNClaimed.formatted}
                        claimRaw={ToPDXNClaimed.raw}
                        autoVaultTarget={1000}
                        autoVaultOnClick={HandleDepositPDXNAutovault}
                        autoVaultDisabled={!isPDXNButtonEnabled}
                        autoVaultAmount={PDXNautoVaultAmount}
                        parityTokensClaimed={PDXNparityTokensClaimed}
                        linkPath="/mDXN"
                        linkText="mDXN"
                        locationPath={location.pathname}
                        isActive={location.pathname === "/mDXN"}
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
                        autoVaultOnClick={HandleDepositPFENIXAutovault}
                        autoVaultDisabled={!isPFENIXButtonEnabled}
                        autoVaultAmount={PFENIXautoVaultAmount}
                        parityTokensClaimed={PFENIXparityTokensClaimed}
                        linkPath="/mFENIX"
                        linkText="mFENIX"
                        locationPath={location.pathname}
                        isActive={location.pathname === "/mFENIX"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {isDAVHolders && (
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
                          (theme === "darkTheme" && "Theme-block-container") ||
                          (theme === "dimTheme" && "dimThemeBg")
                        }`}
                      >
                        <div className="row g-lg-10">
                          <AlphaRoom
                            image={SystemStateLogo}
                            hasBorder={true}
                            TokenName="Matic"
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
                // {/* end the section here*/}
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
