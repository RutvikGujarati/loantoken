import React from "react";
import { Link } from "react-router-dom";
import SystemStateLogo from "../../Assets/High-Resolutions-Svg/Updated/logo.svg";

const ClaimSection = ({
  hasBorder,
  theme,
  borderDarkDim,
  textTheme,
  spanDarkDim,
  onClaim,
  claimDisabled,
  claimAmount,
  autoVaultOnClick,
  autoVaultDisabled,
  autoVaultAmount,
  parityTokensClaimed,
  linkPath,
  linkText,
  locationPath,
  isActive,
}) => (
  <div
    className={`col-md-4  col-lg-3 d-flex flex-column justify-content-center ${
      hasBorder ? `border-right ${borderDarkDim}` : ""
    } d-flex justify-content-between`}
    // style={{ marginTop: "-13px" }}
  >
    <hr className="d-block d-lg-none d-md-none" />
    <div className="d-flex mint-token-container">
      <div className={`margin-right iconContainer ${theme}`}>
        <Link
          className={`margin-right enter ${
            locationPath === linkPath ? "ins active" : ""
          } ${theme === "lightTheme" ? "inverse-filter" : ""}`}
          role="button"
          to={linkPath}
        >
          <div className="hover-container">
            <img src={SystemStateLogo} alt="Logo" width="30" height="30" />
            <span
              className={`hover-text ${
                theme === "lightTheme" ? "inverse-filter" : ""
              } ${theme}`}
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
export default ClaimSection;
