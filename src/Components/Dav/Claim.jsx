import React from "react";
import { Link } from "react-router-dom";
import DefaultLogo from "../../Assets/High-Resolutions-Svg/Updated/logo.svg";
import ClaimLogo from "../../Assets/blue-logo.svg";
import AutoVaultLogo from "../../Assets/red-logo.svg";
import LogoTransparent from "../../Assets/LogoTransparent.png";

import pdxn from "../../Assets/Token List Icon/dxn.webp";
import pfenix from "../../Assets/Token List Icon/pfenix.svg";
import wpls from "../../Assets/Token List Icon/wpls.png";
import hex from "../../Assets/Token List Icon/hex.png";
import texan from "../../Assets/Token List Icon/texan.png";
import loan from "../../Assets/Token List Icon/loan.png";
import watt from "../../Assets/Token List Icon/watt.png";
import rex from "../../Assets/Token List Icon/rex.png";
import toni from "../../Assets/Token List Icon/toni.png";
import inch from "../../Assets/Token List Icon/9inch.png";
import spark from "../../Assets/Token List Icon/spark.png";
import ptgc from "../../Assets/Token List Icon/ptgc.png";
import pts from "../../Assets/Token List Icon/pts.png";
import prate from "../../Assets/Token List Icon/prate.png";
import mm from "../../Assets/Token List Icon/9mm.jpeg";
import bnblogo from "../../Assets/bnb.png";
import mumbaiIcon from "../../Assets/Token List Icon/chain-light.svg";
import xen from "../../Assets/XEN.png";

// Token-Logo Mapping
const tokenLogos = {
  default: DefaultLogo,
  claim: ClaimLogo,
  autoVault: AutoVaultLogo,
  XEN: xen,
  PLS: wpls,
  PDXN: pdxn,
  PFENIX: pfenix,
  HEX: hex,
  TEXAN: texan,
  LOAN: loan,
  WATT: watt,
  REX: rex,
  "9MM": mm,
  TONI: toni,
  "9INCH": inch,
  SPARK: spark,
  PTS: pts,
  PRATE: prate,
  PTGC: ptgc,
  bDXN: pdxn,
  BNB: bnblogo,
  bXEN: xen,
  bFENIX: pfenix,
  MATIC: mumbaiIcon,
  mDXN: pdxn,
  mFENIX: pfenix,
  mXEN: xen,
};

const ClaimSection = ({
  hasBorder,
  theme,
  borderDarkDim,
  textTheme,
  spanDarkDim,
  onClaim,
  claimDisabled,
  claimAmount,
  claimRaw,
  amount,
  autoVaultTarget,
  autoVaultOnClick,
  autoVaultDisabled,
  autoVaultAmount,
  parityTokensClaimed,
  linkPath,
  linkText,
  locationPath,
  isActive,
}) => {
  // Determine which logo to display
  const logoSrc = tokenLogos[linkText] || tokenLogos.default;

  // Apply inverse filter only for specific logos: 'default' and 'xen'
  const shouldApplyInverseFilter =
    (logoSrc === DefaultLogo ||
      logoSrc === xen ||
      logoSrc === pdxn ||
      logoSrc === pfenix) &&
    theme === "lightTheme";

  return (
    <div
      className={`col-md-4 col-lg-3 d-flex flex-column justify-content-center ${
        hasBorder ? `border-right ${borderDarkDim}` : ""
      } d-flex justify-content-between`}
    >
      <hr className="d-block d-lg-none d-md-none" />
      <div className="d-flex mint-token-container">
        <div className={`margin-right iconContainer ${theme}`}>
          <Link
            className={`margin-right enter ${
              locationPath === linkPath ? "ins active" : ""
            } ${shouldApplyInverseFilter ? "inverse-filter" : ""}`}
            role="button"
            to={linkPath}
          >
            <div className="hover-container">
              <img src={logoSrc} className="logo-img" alt={linkText} width="30" height="30" />
              <span
                className={`hover-text ${theme} ${
                  shouldApplyInverseFilter ? "inverse-filter" : ""
                }`}
              >
                {linkText}
              </span>
            </div>
          </Link>
        </div>
        <div
          className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
        >
          <div>
            <div className="d-flex button-group align-items-center">
              <button
                className={`box-4 items mx-2 glowing-button ${
                  theme === "darkTheme"
                    ? "Theme-btn-block"
                    : theme === "dimTheme"
                    ? "dimThemeBorder"
                    : "lightThemeButtonBg"
                } ${theme}`}
                onClick={onClaim}
                disabled={claimDisabled}
                style={{
                  cursor: claimDisabled ? "not-allowed" : "pointer",
                }}
              >
                CLAIM
              </button>
              <span className={`spanValue ${spanDarkDim}`}>{claimAmount}</span>
            </div>
            <div className="d-flex button-group align-items-center">
              <button
                className={`box-4 mx-2 glowing-button ${
                  theme === "darkTheme"
                    ? "Theme-btn-block"
                    : theme === "dimTheme"
                    ? "dimThemeBtnBg"
                    : "lightThemeButtonBg"
                } ${theme}`}
                onClick={autoVaultOnClick}
                disabled={autoVaultDisabled}
                style={{
                  cursor: autoVaultDisabled ? "not-allowed" : "pointer",
                }}
              >
                AUTO-VAULT
              </button>
              <span className={`spanValue ${spanDarkDim}`}>
                {autoVaultAmount}
              </span>
            </div>
            <div className="center-container">
              <span className={`spanCenter ${spanDarkDim}`}>
                {parityTokensClaimed}&nbsp;{linkText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimSection;
