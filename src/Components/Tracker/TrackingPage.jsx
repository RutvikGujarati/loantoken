import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Tracker/TrackingPage.css";
import "../../Utils/Theme.css";
import man_2 from "../../Assets/2-man.png";

import man_5 from "../../Assets/5-man.png";
import man_1 from "../../Assets/1-man.png";
import man_3 from "../../Assets/3-man.png";
import man_4 from "../../Assets/4-man.png";
import { themeContext } from "../../App";
import { useLocation } from "react-router-dom";
import { functionsContext } from "../../Utils/Functions";

export default function TrackingPage() {
  const { theme } = useContext(themeContext);
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
  const borderDarkDim =
    (theme === "darkTheme" && "trackingBorder") ||
    (theme === "dimTheme" && "dimThemeTrackBorder");
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  const location = useLocation();
  const isHome = location.pathname == "/PLS/mint";
  const isBNB = location.pathname == "/BNB/mint";
  const isPolygon = location.pathname == "/polygon/mint";
  const isDEFI = location.pathname == "/DEFI";
  const isTrade = location.pathname == "/TRADE";
  const isPLS = location.pathname == "/PLS";
  const isHei = !isHome && !isPLS && !isDEFI && "hei";

  const {
    // getTotalMaxLimits,
    buyTokens,
    mintWithPDXN,
    mintWithPFENIX,
    mintWithHEX,
    mintWithBDXN,
    mintWithMDXN,
    mintWithREX,
    mintWithTEXAN,
    mintWithLOAN,
    mintWithWATT,
    mintWithPTGC,

    mintWith2PLSX,
    mintWit5PLSX,
    mintWith8PLSX,
    mintWith13PLSX,
    mintWith9INCH,
    mintWith9MM,
    mintWithSPARK,
    mintWithTONI,
    mintWithPRATE,
    mintWithPTS,
  } = useContext(functionsContext);

  const [selectedToken, setSelectedToken] = useState("HEX");

  const tokens = {
    HEX: { priceToken: "5,000", onClick: () => mintWithHEX(1, 5000) },
    TEXAN: {
      priceToken: "15,000,000",
      onClick: () => mintWithTEXAN(1, 15000000),
    },
    REX: { priceToken: "50,000,000", onClick: () => mintWithREX(1, 50000000) },
    LOAN: {
      priceToken: "12,000,000",
      onClick: () => mintWithLOAN(1, 12000000),
    },
    PTGC: { priceToken: "1,000,000", onClick: () => mintWithPTGC(1, 1000000) },
    WATT: { priceToken: "30,000", onClick: () => mintWithWATT(1, 30000) },
  };
  const [priceToken, setPriceToken] = useState(tokens["HEX"].priceToken);
  const handleTokenChange = (event) => {
    const token = event.target.value;
    setSelectedToken(token);
    setPriceToken(tokens[token].priceToken);
  };

  const [isPdxnButtonDisabled, setPdxnIsButtonDisabled] = useState(false);
  const [isPfenixButtonDisabled, setPfenixIsButtonDisabled] = useState(false);
  const [isTwoPLSButtonDisabled, setTwoPLSButtonDisabled] = useState(false);
  const [isFivePLSButtonDisabled, setFivePLSButtonDisabled] = useState(false);
  const [isEightPLSButtonDisabled, setEightPLSButtonDisabled] = useState(false);
  const [isthirteenPLSButtonDisabled, setThirteenPLSButtonDisabled] =
    useState(false);
//   useEffect(() => {
//     if (location.pathname === "/PLS/mint") {
//       const fetchLimits = async () => {
//         const {
//           pdxnMinted,
//           pFENIXMinted,
//           PLSTWOTokenMinted,
//           PLSFIVETokenMinted,
//           PLSEightTokenMinted,
//           PLSThirteenTokenMinted,
//         } = await getTotalMaxLimits();

//         setPdxnIsButtonDisabled(Number(pdxnMinted) >= 277);
//         setPfenixIsButtonDisabled(Number(pFENIXMinted) >= 111);
//         setTwoPLSButtonDisabled(Number(PLSTWOTokenMinted) >= 440000);
//         setFivePLSButtonDisabled(Number(PLSFIVETokenMinted) >= 250000);
//         setEightPLSButtonDisabled(Number(PLSEightTokenMinted) >= 140000);
//         setThirteenPLSButtonDisabled(Number(PLSThirteenTokenMinted) >= 58500);
//       };

//       fetchLimits();
//     }
//   }, []);

  const tooltip =
    (theme === "dimTheme" && "dim-tooltip") ||
    (theme === "darkTheme" && "dark-tooltip");

  const FirstColumn = ({
    borderDarkDim,
    theme,
    contractType,
    textTheme,
    handler,
    textTitle,
    tooltip,
    isPdxnButtonDisabled,
    isPfenixButtonDisabled,
    mintWithPDXN,
    mintWithPFENIX,
    mintWithBDXN,
    mintWithMDXN,
    mintWithHEX,
    mintWithTEXAN,
    mintWithREX,
    mintWithLOAN,
    mintWithPTGC,
    mintWithWATT,
  }) => {
    const DAVTokens = {
      PDXN: { DAVPriceToken: "450", onClick: () => mintWithPDXN(1, 450) },
      PFENIX: {
        DAVPriceToken: "5,000,000",
        onClick: () => mintWithPFENIX(1, 5000000),
      },
    };

    const BNBDAVTokens = {
      BDXN: { BNBDAVPriceToken: "5,000", onClick: () => mintWithBDXN(1, 5000) },
      BFENIX: {
        BNBDAVPriceToken: "750,000",
        onClick: () => mintWithPFENIX(1, 750000),
      },
    };

    const MATICDAVTokens = {
      MDXN: {
        MATICDAVPriceToken: "2,000",
        onClick: () => mintWithMDXN(1, 2000),
      },
      MFENIX: {
        MATICDAVPriceToken: "4,000,000",
        onClick: () => mintWithPFENIX(1, 4000000),
      },
    };

    const TradeTokens = {
      // "9MM": { TradePriceToken: "1,500", onClick: () => mintWith9MM(1, 1500) },

      "9INCH": {
        TradePriceToken: "4,000,000",
        onClick: () => mintWith9INCH(1, 4000000),
      },
      PTS: {
        TradePriceToken: "500",
        onClick: () => mintWithPTS(1, 500),
      },
      SPARK: {
        TradePriceToken: "1,500",
        onClick: () => mintWithSPARK(1, 1500),
      },
      PRATE: {
        TradePriceToken: "10,000,000",
        onClick: () => mintWithPRATE(1, 10000000),
      },
      TONI: {
        TradePriceToken: "21,000",
        onClick: () => mintWithTONI(1, 21000),
      },
    };

    const handleTradeTokenChange = (event) => {
      const token = event.target.value;
      setTradeSelectedToken(token);
      setTradePriceToken(TradeTokens[token].TradePriceToken);
    };

    const [TradeSelectedToken, setTradeSelectedToken] = useState("9INCH");
    const [TradePriceToken, setTradePriceToken] = useState(
      TradeTokens["9INCH"].TradePriceToken
    );

    const [DAVSelectedToken, setDAVSelectedToken] = useState("PDXN");
    const [DAVPriceToken, setDAVPriceToken] = useState(
      DAVTokens["PDXN"].DAVPriceToken
    );

    const [BNBDAVSelectedToken, setBNBDAVSelectedToken] = useState("BDXN");
    const [BNBDAVPriceToken, setBNBDAVPriceToken] = useState(
      BNBDAVTokens["BDXN"].BNBDAVPriceToken
    );

    const [MATICDAVSelectedToken, setMATICDAVSelectedToken] = useState("MDXN");
    const [MATICDAVPriceToken, setMATICDAVPriceToken] = useState(
      MATICDAVTokens["MDXN"].MATICDAVPriceToken
    );

    const handleDAVTokenChange = (event) => {
      const token = event.target.value;
      setDAVSelectedToken(token);
      setDAVPriceToken(DAVTokens[token].DAVPriceToken);
    };

    const handleBNBDAVTokenChange = (event) => {
      const token = event.target.value;
      setBNBDAVSelectedToken(token);
      setBNBDAVPriceToken(BNBDAVTokens[token].BNBDAVPriceToken);
    };

    const handleMATICTokenChange = (event) => {
      const token = event.target.value;
      setMATICDAVSelectedToken(token);
      setMATICDAVPriceToken(MATICDAVTokens[token].MATICDAVPriceToken);
    };

    const selectedToken =
      contractType === "DAV"
        ? DAVSelectedToken
        : contractType === "BNBDAV"
        ? BNBDAVSelectedToken
        : contractType === "DAVTrade"
        ? TradeSelectedToken
        : MATICDAVSelectedToken;

    const selectedPriceToken =
      contractType === "DAV"
        ? DAVPriceToken
        : contractType === "BNBDAV"
        ? BNBDAVPriceToken
        : contractType === "DAVTrade"
        ? TradePriceToken
        : MATICDAVPriceToken;

    const tokens =
      contractType === "DAV"
        ? DAVTokens
        : contractType === "BNBDAV"
        ? BNBDAVTokens
        : contractType === "DAVTrade"
        ? TradeTokens
        : MATICDAVTokens;

    const handleTokenChange =
      contractType === "DAV"
        ? handleDAVTokenChange
        : contractType === "BNBDAV"
        ? handleBNBDAVTokenChange
        : contractType === "DAVTrade"
        ? handleTradeTokenChange
        : handleMATICTokenChange;

    return (
      <div className="col">
        <div
          className={`col border-right ${borderDarkDim} d-flex justify-content-between`}
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
                <div className="d-flex flex-column mb-0.1 button-group">
                  <div className="d-flex align-items-center">
                    <button
                      className={`box-4 mx-2 glowing-button ${
                        theme === "darkTheme"
                          ? "Theme-btn-block"
                          : theme === "dimTheme"
                          ? "dimThemeBtnBg"
                          : "lightThemeButtonBg"
                      } ${theme}`}
                      onClick={tokens[selectedToken].onClick}
                      disabled={
                        selectedToken === "PDXN" || selectedToken === "BDXN"
                          ? isPdxnButtonDisabled
                          : isPfenixButtonDisabled
                      }
                    >
                      {selectedPriceToken} {selectedToken}
                    </button>
                    <select
                      className="form-select form-select-sm small-select mx-2"
                      value={selectedToken}
                      onChange={handleTokenChange}
                    >
                      {Object.keys(tokens).map((token) => (
                        <option key={token} value={token}>
                          {token} -{" "}
                          {tokens[token].DAVPriceToken ||
                            tokens[token].BNBDAVPriceToken ||
                            tokens[token].MATICDAVPriceToken ||
                            tokens[token].TradePriceToken}
                        </option>
                      ))}
                    </select>
                  </div>
                  <img
                    src={man_1}
                    alt="2_man"
                    height={"45px"}
                    style={{ marginBottom: "-55px", marginTop: "10px" }}
                    width={"45px"}
                    className={`man-margin1 ${
                      theme === "dimTheme" ? "inverse-filters" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
            <div
              className="d-flex align-items-end pb-4"
              style={{ marginTop: "90px", marginLeft: "-45px" }}
            >
              <span
                className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                data-tooltip="DAV TOKENS MUST REMAIN IN THE WALLET THAT MINTED THEM."
                data-flow="bottom"
              >
                <i className={`fas mx-2 fa-exclamation-circle ${theme}`}></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MintTokenRow = ({
    hasBorder,
    tokens,
    cost,
    unit,
    handler,
    quantity,
    disabled,
    img,
    imgWidth,
    imgBottom,
    borderDarkDim,
    theme,
    textTheme,
    textTitle,
    tooltip,
  }) => {
    const buttonStyles = {
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
    };

    const buttonClass = `box-4 mx-2 glowing-button ${
      theme === "darkTheme"
        ? "Theme-btn-block"
        : theme === "dimTheme"
        ? "dimThemeBtnBg"
        : "lightThemeButtonBg"
    } ${theme}`;

    const renderButton = (network) => (
      <button
        className={buttonClass}
        onClick={() => handler(tokens, cost, quantity, network)}
        disabled={disabled}
        style={buttonStyles}
      >
        {`${cost.toLocaleString()} ${unit}`}
      </button>
    );

    const renderImage = () =>
      img && (
        <div className="d-flex justify-content-center">
          <img
            src={img}
            alt={`${tokens}_man`}
            height={"50px"}
            width={`${imgWidth}px`}
            style={{ marginBottom: imgBottom || 0 }}
            className={`${theme === "dimTheme" ? "inverse-filters" : ""}`}
          />
        </div>
      );

    return (
      <div className="col">
        <div
          className={`col ${
            hasBorder ? `border-right ${borderDarkDim}` : ""
          } d-flex justify-content-between`}
        >
          <div
            className="d-flex mint-token-container"
            style={{ height: "133px" }}
          >
            <div className="margin-right">
              <i
                className={`iconSize fa-solid fa-coins fa-money-bill-transfer ${theme}`}
              ></i>
            </div>
            <div
              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
            >
              <div className={`${textTitle} mint-two`}>
                <div>{`MINT ${tokens} DAV TOKEN${tokens > 1 ? "S" : ""}`}</div>
                <div className="d-flex flex-column mb-0.1 button-group">
                  {isHome && renderButton("DAV")}
                  {isPolygon && renderButton("DAVMATIC")}
                  {isBNB && renderButton("BNBDAV")}
                  {isTrade && renderButton("DAVTRADE")}
                  {isDEFI && renderButton("DAVDEFI")}
                </div>
                {renderImage()}
              </div>
            </div>
            <div
              className="d-flex align-items-end pb-3"
              style={{ marginBottom: imgBottom || "10px" }}
            >
              <span
                className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                data-tooltip="DAV TOKENS MUST REMAIN IN THE WALLET THAT MINTED THEM."
                data-flow="bottom"
              >
                <i className={`fas mx-2 fa-exclamation-circle ${theme}`}></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                  <FirstColumn
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    contractType={"DAV"}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                    isPdxnButtonDisabled={isPdxnButtonDisabled}
                    isPfenixButtonDisabled={isPfenixButtonDisabled}
                    mintWithPDXN={mintWithPDXN}
                    mintWithPFENIX={mintWithPFENIX}
                    man_2={man_2}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={2}
                    cost={500000}
                    quantity={2}
                    unit="PLS"
                    handler={() => buyTokens(2, 500000, 2, "DAV")}
                    disabled={isTwoPLSButtonDisabled}
                    img={man_2}
                    imgWidth={50}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={5}
                    cost={1000000}
                    quantity={5}
                    unit="PLS"
                    handler={() => buyTokens(5, 1000000, 5, "DAV")}
                    disabled={isFivePLSButtonDisabled}
                    img={man_3}
                    imgWidth={60}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={8}
                    cost={1500000}
                    quantity={8}
                    unit="PLS"
                    handler={() => buyTokens(8, 1500000, 8, "DAV")}
                    disabled={isEightPLSButtonDisabled}
                    img={man_4}
                    imgWidth={80}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    tokens={13}
                    cost={2000000}
                    unit="PLS"
                    quantity={13}
                    handler={() => buyTokens(13, 2000000, 13, "DAV")}
                    disabled={isthirteenPLSButtonDisabled}
                    img={man_5}
                    imgWidth={100}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                </div>
              </>
            ) : isBNB ? (
              <>
                <div class="row row-cols-5">
                  <FirstColumn
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                    contractType={"BNBDAV"}
                    // isPdxnButtonDisabled={isPdxnButtonDisabled}
                    // isPfenixButtonDisabled={isPfenixButtonDisabled}
                    mintWithBDXN={mintWithBDXN}
                    mintWithPFENIX={mintWithPFENIX}
                    man_2={man_2}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={2}
                    cost={0.1}
                    quantity={2}
                    handler={() => buyTokens(2, 0.1, 2, "BNBDAV")}
                    unit="BNB"
                    // disabled={isTwoPLSButtonDisabled}
                    img={man_2}
                    imgWidth={50}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={5}
                    cost={0.2}
                    unit="BNB"
                    quantity={5}
                    handler={() => buyTokens(5, 0.2, 5, "BNBDAV")}
                    // disabled={isFivePLSButtonDisabled}
                    img={man_3}
                    imgWidth={60}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={8}
                    cost={0.3}
                    unit="BNB"
                    quantity={8}
                    handler={() => buyTokens(8, 0.3, 8, "BNBDAV")}
                    // disabled={isEightPLSButtonDisabled}
                    img={man_4}
                    imgWidth={80}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    tokens={13}
                    cost={0.4}
                    unit="BNB"
                    quantity={13}
                    handler={() => buyTokens(13, 0.4, 13, "BNBDAV")}
                    disabled={isthirteenPLSButtonDisabled}
                    img={man_5}
                    imgWidth={100}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                </div>
              </>
            ) : isPolygon ? (
              <>
                <div class="row row-cols-5">
                  <FirstColumn
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                    contractType={"DAVMATIC"}
                    // isPdxnButtonDisabled={isPdxnButtonDisabled}
                    // isPfenixButtonDisabled={isPfenixButtonDisabled}
                    mintWithMDXN={mintWithMDXN}
                    mintWithPFENIX={mintWithPFENIX}
                    man_2={man_2}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={2}
                    cost={60}
                    unit="MATIC"
                    quantity={2}
                    handler={() => buyTokens(2, 60, 2, "DAVMATIC")}
                    // disabled={isTwoPLSButtonDisabled}
                    img={man_2}
                    imgWidth={50}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={5}
                    cost={120}
                    unit="MATIC"
                    quantity={5}
                    handler={() => buyTokens(5, 120, 5, "DAVMATIC")}
                    // disabled={isFivePLSButtonDisabled}
                    img={man_3}
                    imgWidth={60}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={8}
                    cost={180}
                    unit="MATIC"
                    quantity={8}
                    handler={() => buyTokens(8, 180, 8, "DAVMATIC")}
                    // disabled={isEightPLSButtonDisabled}
                    img={man_4}
                    imgWidth={80}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    tokens={13}
                    cost={240}
                    unit="MATIC"
                    quantity={13}
                    handler={() => buyTokens(13, 240, 13, "DAVMATIC")}
                    disabled={isthirteenPLSButtonDisabled}
                    img={man_5}
                    imgWidth={100}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                </div>
              </>
            ) : isTrade ? (
              <>
                {" "}
                <div className="row row-cols-5">
                  <FirstColumn
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                    contractType={"DAVTrade"}
                    // isPdxnButtonDisabled={isPdxnButtonDisabled}
                    // isPfenixButtonDisabled={isPfenixButtonDisabled}
                    mintWithMDXN={mintWithMDXN}
                    mintWithPFENIX={mintWithPFENIX}
                    man_2={man_2}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={2}
                    cost={1250000}
                    unit="PLSX"
                    quantity={2}
                    handler={() => mintWith2PLSX(2, 1250000)}
                    // disabled={isTwoPLSButtonDisabled}
                    img={man_2}
                    imgWidth={50}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={5}
                    cost={2500000}
                    unit="PLSX"
                    quantity={5}
                    handler={() => mintWit5PLSX(5, 2500000)}
                    // disabled={isFivePLSButtonDisabled}
                    img={man_3}
                    imgWidth={60}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={8}
                    cost={4000000}
                    unit="PLSX"
                    quantity={8}
                    handler={() => mintWith8PLSX(8, 4000000)}
                    // disabled={isEightPLSButtonDisabled}
                    img={man_4}
                    imgWidth={80}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    tokens={13}
                    cost={5000000}
                    unit="PLSX"
                    quantity={13}
                    handler={() => mintWith13PLSX(13, 5000000)}
                    // disabled={isthirteenPLSButtonDisabled}
                    img={man_5}
                    imgWidth={100}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                </div>
              </>
            ) : isDEFI ? (
              <>
                <div className="row row-cols-5">
                  <div className="col">
                    <div
                      className={`col border-right ${borderDarkDim} d-flex justify-content-between`}
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
                            <div className="d-flex flex-column mb-0.1 button-group">
                              <div className="d-flex align-items-center">
                                <button
                                  className={`box-4 mx-2 glowing-button ${
                                    theme === "darkTheme"
                                      ? "Theme-btn-block"
                                      : theme === "dimTheme"
                                      ? "dimThemeBtnBg"
                                      : "lightThemeButtonBg"
                                  } ${theme}`}
                                  onClick={tokens[selectedToken].onClick}
                                >
                                  {priceToken} {selectedToken}
                                </button>
                                <select
                                  className={`form-select form-select-sm small-select mx-2 `}
                                  value={selectedToken}
                                  onChange={handleTokenChange}
                                >
                                  {Object.keys(tokens).map((token) => (
                                    <option key={token} value={token}>
                                      {token} - {tokens[token].priceToken}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <img
                                src={man_1}
                                alt="2_man"
                                height={"45px"}
                                style={{
                                  marginBottom: "-55px",
                                  marginTop: "10px",
                                }}
                                width={"45px"}
                                className={`man-margin1  ${
                                  theme === "dimTheme" ? "inverse-filters" : ""
                                } `}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-end pb-4 "
                          style={{ marginTop: "90px", marginLeft: "-45px" }}
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

                  <MintTokenRow
                    hasBorder={true}
                    tokens={2}
                    cost={500000}
                    unit="PLS"
                    quantity={2}
                    handler={() => buyTokens(2, 500000, 2, "DAVDEFI")}
                    // disabled={isTwoPLSButtonDisabled}
                    img={man_2}
                    imgWidth={50}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={5}
                    cost={1000000}
                    unit="PLS"
                    quantity={5}
                    handler={() => buyTokens(5, 1000000, 5, "DAVDEFI")}
                    // disabled={isFivePLSButtonDisabled}
                    img={man_3}
                    imgWidth={60}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={8}
                    cost={1500000}
                    unit="PLS"
                    quantity={8}
                    handler={() => buyTokens(8, 1500000, 8, "DAVDEFI")}
                    // disabled={isEightPLSButtonDisabled}
                    img={man_4}
                    imgWidth={80}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                  <MintTokenRow
                    tokens={13}
                    cost={2000000}
                    unit="PLS"
                    quantity={13}
                    handler={() => buyTokens(13, 2000000, 13, "DAVDEFI")}
                    // disabled={isthirteenPLSButtonDisabled}
                    img={man_5}
                    imgWidth={100}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
