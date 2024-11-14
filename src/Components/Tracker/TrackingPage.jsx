import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Tracker/TrackingPage.css";
import "../../Utils/Theme.css";
import man_2 from "../../Assets/2-man.png";

import pls from "../../Assets/LogoTransparent.png";

import pdxn from "../../Assets/Token List Icon/dxn.webp";
import pfenix from "../../Assets/Token List Icon/pfenix.svg";
import wpls from "../../Assets/Token List Icon/wpls.png";

import hex from "../../Assets/Token List Icon/hex.png";
import texan from "../../Assets/Token List Icon/texan.png";
import loan from "../../Assets/Token List Icon/loan.png";
import watt from "../../Assets/Token List Icon/watt.png";
import rex from "../../Assets/Token List Icon/rex.png";
import ptgc from "../../Assets/Token List Icon/ptgc.png";

import toni from "../../Assets/Token List Icon/toni.png";
import inch from "../../Assets/Token List Icon/9inch.png";
import spark from "../../Assets/Token List Icon/spark.png";
import pts from "../../Assets/Token List Icon/pts.png";
import prate from "../../Assets/Token List Icon/prate.png";
import mm from "../../Assets/Token List Icon/9mm.jpeg";

import bnblogo from "../../Assets/bnb.png";
import mumbaiIcon from "../../Assets/Token List Icon/chain-light.svg";
import xen from "../../Assets/XEN.png";
import metamask from "../../Assets/Token List Icon/metamask2.png";

import man_5 from "../../Assets/5-man.png";
import man_1 from "../../Assets/1-man.png";
import man_3 from "../../Assets/3-man.png";
import man_4 from "../../Assets/4-man.png";
import { themeContext } from "../../App";
import { Link, useLocation } from "react-router-dom";
import { functionsContext } from "../../Utils/Functions";
import { DavContext } from "../../context/DavContext";
import {
  DAVDEFI,
  DAVTRADE,
  state_token,
} from "../../Utils/ADDRESSES/Addresses";
import { ethers } from "ethers";
import { Web3WalletContext } from "../../Utils/MetamskConnect";

export default function TrackingPage() {
  const { theme } = useContext(themeContext);
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");
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
  const isSwap = location.pathname == "/swap";
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
    holdTokens,
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

  const { accountAddress } = useContext(Web3WalletContext);

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

  const [isthirteenPLSButtonDisabled, setThirteenPLSButtonDisabled] =
    useState(false);

  const tooltip =
    (theme === "dimTheme" && "dim-tooltip") ||
    (theme === "darkTheme" && "dark-tooltip");

  const tokensToAdd = {
    DAVDEFI: { address: DAVDEFI, symbol: "DAVDEFI" },
    DAVTRADE: { address: DAVTRADE, symbol: "DAVTRADE" },

    DAVPLS: { address: state_token, symbol: "DAVPLS" },
  };

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
          className={`col border-right b-height ${borderDarkDim} d-flex justify-content-between`}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [isHovered, setIsHovered] = useState(false);

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
            hasBorder ? `border-right b-height  ${borderDarkDim}` : ""
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
          </div>
        </div>
      </div>
    );
  };

  const MintWithOptions = () => {
    const { selectedDav, setSelectedDav } = useContext(DavContext);
    const [selectedToken, setSelectedToken] = useState("PDXN - MINT 1 DAV TOKEN");
    const [selectedPrice, setSelectedPrice] = useState("450 PDXN");

    const addTokenToWallet = async () => {
      const token = tokensToAdd[selectedDav];

      if (window.ethereum) {
        try {
          console.log("Adding Token:", token);
          await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: token.address,
                symbol: token.symbol,
                decimals: token.decimals,
              },
            },
          });
        } catch (error) {
          console.error("Error adding token to wallet");
        }
      } else {
        console.error("MetaMask is not installed");
      }
    };

    const DAVTokens = {
      DAVPLS: [
        {
          label: "PDXN - MINT 1 DAV TOKEN",
          price: "450 PDXN",
          onClick: () => mintWithPDXN(1, 450),
        },
        {
          label: "PFENIX - MINT 1 DAV TOKEN",
          price: "5,000,000 PFENIX",
          onClick: () => mintWithPFENIX(1, 5000000),
        },
        {
          label: "MINT 2 DAV TOKEN",
          price: "500,000 PLS",
          onClick: () => buyTokens(2, 500000, 2, "DAVPLS"),
        },
        {
          label: "MINT 5 DAV TOKEN",
          price: "1,000,000 PLS",
          onClick: () => buyTokens(5, 1000000, 5, "DAVPLS"),
        },
        {
          label: "MINT 8 DAV TOKEN",
          price: "1,500,000 PLS",
          onClick: () => buyTokens(8, 1500000, 8, "DAVPLS"),
        },
        {
          label: "MINT 13 DAV TOKEN",
          price: "2,000,000 PLS",
          onClick: () => buyTokens(13, 2000000, 13, "DAVPLS"),
        },
      ],
      DAVTRADE: [
        {
          label: "SPARK - MINT 1 DAV TOKEN",
          price: "1,500 SPARK",
          onClick: () => mintWithSPARK(1, 1500),
        },
        {
          label: "PTS - MINT 5 DAV TOKEN",
          price: "500 PTS",
          onClick: () => mintWithPTS(1, 500),
        },
        {
          label: "9INCH - MINT 1 DAV TOKEN",
          price: "4,000,000 9INCH",
          onClick: () => mintWith9INCH(1, 4000000),
        },
        {
          label: "PRATE - MINT 1 DAV TOKEN",
          price: "10,000,000 PRATE",
          onClick: () => mintWithPRATE(1, 10000000),
        },
        {
          label: "TONI - MINT 1 DAV TOKEN",
          price: "21,000 TONI",
          onClick: () => mintWithTONI(1, 21000),
        },
        {
          label: "MINT 2 DAV TOKEN",
          price: "1,250,000 PLSX",
          onClick: () => mintWith2PLSX(2, 1250000),
        },
        {
          label: "MINT 5 DAV TOKEN",
          price: "2,500,000 PLSX",
          onClick: () => mintWit5PLSX(5, 2500000),
        },
        {
          label: "MINT 8 DAV TOKEN",
          price: "4,000,000 PLSX",
          onClick: () => mintWith8PLSX(8, 4000000),
        },
        {
          label: "MINT 13 DAV TOKEN",
          price: "5,000,000 PLSX",
          onClick: () => mintWith13PLSX(13, 5000000),
        },
      ],
      DAVDEFI: [
        {
          label: "HEX - MINT 1 DAV TOKEN",
          price: "5,000 HEX",
          onClick: () => mintWithHEX(1, 5000),
        },
        {
          label: "TEXAN - MINT 1 DAV TOKEN",
          price: "15,000,000 TEXAN",
          onClick: () => mintWithTEXAN(1, 15000000),
        },
        {
          label: "REX - MINT 1 DAV TOKEN",
          price: "50,000,000 REX",
          onClick: () => mintWithREX(1, 50000000),
        },
        {
          label: "LOAN - MINT 1 DAV TOKEN",
          price: "12,000,000 LOAN",
          onClick: () => mintWithLOAN(1, 120000000),
        },
        {
          label: "PTGC - MINT 1 DAV TOKEN",
          price: "1,000,000 PTGC",
          onClick: () => mintWithPTGC(1, 10000000),
        },
        {
          label: "WATT - MINT 1 DAV TOKEN",
          price: "30,000 WATT",
          onClick: () => mintWithWATT(1, 30000),
        },
        {
          label: "MINT 2 DAV TOKEN",
          price: "500,000 PLS",
          onClick: () => buyTokens(2, 500000, 2, "DAVDEFI"),
        },
        {
          label: "MINT 5 DAV TOKEN",
          price: "1,000,000 PLS",
          onClick: () => buyTokens(5, 1000000, 5, "DAVDEFI"),
        },
        {
          label: "MINT 8 DAV TOKEN",
          price: "1,500,000 PLS",
          onClick: () => buyTokens(8, 1500000, 8, "DAVDEFI"),
        },
        {
          label: "MINT 13 DAV TOKEN",
          price: "2,000,000 PLS",
          onClick: () => buyTokens(13, 2000000, 13, "DAVDEFI"),
        },
      ],
    };

    const handleDavTypeChange = (event) => {
      setSelectedDav(event.target.value);
      setSelectedToken(DAVTokens[event.target.value][0].label);
      setSelectedPrice(DAVTokens[event.target.value][0].price);
    };

    const handleTokenChange = (event) => {
      const selectedOption = DAVTokens[selectedDav].find(
        (option) => option.label === event.target.value
      );
      setSelectedToken(selectedOption.label);
      setSelectedPrice(selectedOption.price);
    };
    const [holdDavPLS, setHoldDavPLS] = useState("0");

    const [holdDavDEFI, setHoldDavDEFI] = useState("0");
    const [holdDavTRADE, setHoldDavTRADE] = useState("0");

    const Holdings =
      selectedDav === "DAVPLS"
        ? holdDavPLS
        : selectedDav === "DAVDEFI"
        ? holdDavDEFI
        : holdDavTRADE;
    const HoldTokensOfUser = async (contractType, setState) => {
      try {
        if (!accountAddress) {
          throw new Error("Account address is undefined");
        }
        console.log("hold account", accountAddress);

        const holdToken = await holdTokens(accountAddress, contractType);
        const formattedPrice = ethers.utils.formatEther(holdToken || "0");
        console.log(`Hold tokens for ${contractType}:`, formattedPrice);
        setState(formattedPrice);
      } catch (error) {
        console.error(error);
      }
    };

    // Call each function separately
    useEffect(() => {
      const fetchHoldAmounts = async () => {
        await HoldTokensOfUser("DAVPLS", setHoldDavPLS);
        console.log("davpls tokens", HoldTokensOfUser);
        await HoldTokensOfUser("DAVDEFI", setHoldDavDEFI);
        await HoldTokensOfUser("DAVTRADE", setHoldDavTRADE);
      };

      fetchHoldAmounts();
    }, []);

    const images = {
      DAVPLS: [
        { src: wpls, alt: "PLS Token", width: 30, height: 30, inverse: false },
        { src: xen, alt: "XEN Token", width: 30, height: 30, inverse: true },
        { src: pdxn, alt: "PDXN Token", width: 30, height: 30, inverse: true },
        {
          src: pfenix,
          alt: "PFENIX Token",
          width: 30,
          height: 30,
          inverse: true,
        },
      ],
      DAVDEFI: [
        {
          src: hex,
          alt: "DEFI Image 1",
          width: 30,
          height: 30,
          inverse: false,
        },
        {
          src: texan,
          alt: "DEFI Image 2",
          width: 30,
          height: 30,
          inverse: false,
        },
        {
          src: rex,
          alt: "DEFI Image 3",
          width: 30,
          height: 30,
          inverse: false,
        },
        {
          src: loan,
          alt: "DEFI Image 4",
          width: 30,
          height: 30,
          inverse: false,
        },
        {
          src: ptgc,
          alt: "DEFI Image 5",
          width: 30,
          height: 30,
          inverse: false,
        },
        {
          src: watt,
          alt: "DEFI Image 6",
          width: 30,
          height: 30,
          inverse: false,
        },
      ],
      DAVTRADE: [
        {
          src: prate,
          alt: "TRADE Image 1",
          width: 30,
          height: 30,
          inverse: false,
        },
        {
          src: toni,
          alt: "TRADE Image 2",
          width: 30,
          height: 30,
          inverse: false,
        },
        {
          src: inch,
          alt: "TRADE Image 3",
          width: 30,
          height: 30,
          inverse: false,
        },
        {
          src: spark,
          alt: "TRADE Image 4",
          width: 30,
          height: 30,
          inverse: false,
        },
        {
          src: pts,
          alt: "TRADE Image 5",
          width: 30,
          height: 30,
          inverse: false,
        },
        {
          src: mm,
          alt: "TRADE Image 6",
          width: 30,
          height: 30,
          inverse: false,
        },
      ],
    };

    const addresses = {
      DAVPLS: state_token,
      DAVDEFI: DAVDEFI,
      DAVTRADE: DAVTRADE,
    };
    return (
      <div className="row">
        {/* First Column */}
        <div className="col-md-4">
          <div
            className={` ${spanDarkDim} mt-4`}
            style={{ marginTop: "1vh", fontSize: "12px", marginRight: "30px" }}
          >
            <p className="text-center">SELECT DAV </p>
          </div>
          <div
            className={`info-item info-columns box  mt-4 mb-4 ${
              (theme === "darkTheme" && "Theme-btn-block") ||
              (theme === "dimTheme" && "dimThemeBorder") ||
              (theme === "lightTheme" && theme + "translite")
            }`}
            style={{
              marginTop: "-1vh",
              marginLeft: "5vh",
              maxHeight: "5.5vh",
            }}
          >
			<img
              src={metamask}
              alt="MetaMask Logo"
              onClick={() => addTokenToWallet()}
              className="metamask-logo hoverable-image custom-icon-size"
              style={{ marginRight: "15px" }}
              width={25}
              height={25}
            />
            <p className="text-center" style={{ marginLeft: "10px" }}>
              {selectedDav} - {Holdings}
            </p>
            
            <a
              href={`https://scan.mypinata.cloud/ipfs/bafybeih3olry3is4e4lzm7rus5l3h6zrphcal5a7ayfkhzm5oivjro2cp4/#/address/${addresses[selectedDav]}`}
              className="color-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-external-link-alt custom-icon-size"></i>
            </a>
            <select
              className="form-select form-select-sm small-select mx-2 mb-2"
              onChange={handleDavTypeChange}
              value={selectedDav}
            >
              <option value="DAVPLS">DAVPLS</option>
              <option value="DAVDEFI">DAVDEFI</option>
              <option value="DAVTRADE">DAVTRADE</option>
            </select>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className={` ${spanDarkDim} mt-4`}
            style={{ marginTop: "1vh", fontSize: "12px" }}
          >
            <p className="text-center">SELECT NUMBER OF DAV TOKEN</p>
          </div>
          <div
            className={`info-item info-columns box swap2 mt-4 mb-4 ${
              (theme === "darkTheme" && "Theme-btn-block") ||
              (theme === "dimTheme" && "dimThemeBorder") ||
              (theme === "lightTheme" && theme + "translite")
            }`}
            style={{
              marginTop: "-1vh",
              marginLeft: "8vh",
              maxHeight: "5.5vh",
            }}
          >
            <p className="text-center">{selectedToken}</p>
            <select
              className="form-select form-select-sm small-select mx-2 mb-2"
              onChange={handleTokenChange}
              value={selectedToken}
            >
              {DAVTokens[selectedDav].map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>{" "}
          </div>
        </div>
        <div className="col-md-4">
          <div
            className={` ${spanDarkDim} mt-4`}
            style={{
              marginTop: "1vh",
              marginLeft: "10vh",
              fontSize: "12px",
            }}
          >
            <p className="text-center " style={{ marginRight: "20px" }}>
              MINT TOKENS
            </p>
          </div>
          <div
            className={`info-item info-columns box swap2 mt-4 mb-4 glowing-button ${
              (theme === "darkTheme" && "Theme-btn-block") ||
              (theme === "dimTheme" && "dimThemeBorder") ||
              (theme === "lightTheme" && theme + "translite")
            }`}
            onClick={() => {
              const selectedOption = DAVTokens[selectedDav].find(
                (option) => option.label === selectedToken
              );
              if (selectedOption && selectedOption.onClick) {
                selectedOption.onClick();
              } else {
                console.warn(
                  "selectedOption or onClick function is undefined."
                );
              }
            }}
            style={{
              marginTop: "-1vh",
              marginLeft: "10vh",
              cursor: "pointer",
            }}
          >
            <p className="text-center">{selectedPrice}</p>
          </div>
        </div>
        <div className="row">
          <div
            className="col-4 d-flex justify-content-center align-items-center"
            style={{ marginLeft: "-2vh", gap: "10px" }}
          >
            {images[selectedDav].map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt={img.alt}
                className={`logo-img ${
                  theme === "lightTheme" && img.inverse ? "inverse-filter" : ""
                }`}
                style={{
                  width: `${img.width}px`,
                  height: `${img.height}px`,
                  objectFit: "cover",
                }}
              />
            ))}
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
            className={`main-section ${
              !isSwap ? "m-height" : ""
            } ${shadow} me-auto card d-flex flex-wrap py-3 px-3 ${
              (theme === "darkTheme" && "Theme-block-container") ||
              (theme === "dimTheme" && "dimThemeBg")
            }`}
            style={isSwap ? { top: "-28vh" } : { top: "-29vh" }}
          >
            {isHome ? (
              <>
                <MintWithOptions />
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
                  />
                  <MintTokenRow
                    hasBorder={true}
                    tokens={2}
                    cost={1250000}
                    unit="PLSX"
                    quantity={2}
                    handler={() => mintWith2PLSX(2, 1250000)}
                    // disabled={isTwoPLSButtonDisabled}
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
                      className={`col border-right b-height  ${borderDarkDim} d-flex justify-content-between`}
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
                            </div>
                          </div>
                        </div>
                        {/* <div
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
                        </div> */}
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
                    imgWidth={100}
                    borderDarkDim={borderDarkDim}
                    theme={theme}
                    textTheme={textTheme}
                    textTitle={textTitle}
                    tooltip={tooltip}
                  />
                </div>
              </>
            ) : isSwap ? (
              <>
                <div className="row">
                  {/* First Column */}
                  <div className="col-md-4">
                    <div
                      className={`info-item info-columns box swap1 mt-4 ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBorder") ||
                        (theme === "lightTheme" && theme + "translite")
                      }`}
                      style={{ marginTop: "-1vh", marginLeft: "10vh" }}
                    >
                      <p className="text-center">STATE TOKEN SUPPLY - 0.00</p>
                    </div>
                    <div
                      className={`info-item info-columns box swap2 mt-4 mb-4 ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBorder") ||
                        (theme === "lightTheme" && theme + "translite")
                      }`}
                      style={{ marginTop: "-1vh", marginLeft: "10vh" }}
                    >
                      <p className="text-center">
                        STATE TOKEN BURN - 0000 / 0.00%
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className={`info-item info-columns box swap2 mt-4 mb-4 ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBorder") ||
                        (theme === "lightTheme" && theme + "translite")
                      }`}
                      style={{ marginTop: "-1vh", marginLeft: "10vh" }}
                    >
                      <p className="text-center">STATE TOKE PRICE: $0.000</p>
                    </div>
                    <div
                      className={`info-item info-columns box swap2 mt-4 mb-4 ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBorder") ||
                        (theme === "lightTheme" && theme + "translite")
                      }`}
                      style={{ marginTop: "-1vh", marginLeft: "10vh" }}
                    >
                      <p className="text-center ">
                        <a
                          href="https://scan.mypinata.cloud/ipfs/bafybeih3olry3is4e4lzm7rus5l3h6zrphcal5a7ayfkhzm5oivjro2cp4/#/address/0x6987b2ac4CCf7f48e5B0eF4C2F499F49f81f37b3"
                          className="text-center"
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: isHovered ? "blue" : "inherit",
                            textDecoration: isHovered ? "underline" : "none",
                            transition: "color 0.3s ease",
                          }}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          0x6987b2ac4CCf7f...499F49f81f37b3
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div
                      className={`info-item info-columns box swap2 mt-4 mb-4 glowing-button  ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBorder") ||
                        (theme === "lightTheme" && theme + "translite")
                      }`}
                      style={{
                        marginTop: "-1vh",
                        marginLeft: "10vh",
                        cursor: "pointer",
                      }}
                    >
                      <p className="text-center">DAV MINT BONUS: 0.00</p>
                    </div>
                    <div
                      className={`info-item info-columns box swap2 mt-4 mb-4  glowing-button ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBorder") ||
                        (theme === "lightTheme" && theme + "translite")
                      }`}
                      style={{
                        marginTop: "-1vh",
                        marginLeft: "10vh",
                        cursor: "pointer",
                      }}
                    >
                      <p className="text-center">DAV MINT ANNUAL BONUS: 0.00</p>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
