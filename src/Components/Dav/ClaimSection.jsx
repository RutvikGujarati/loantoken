import { Link, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { themeContext } from "../../App";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useDepositContext } from "../../context/DepositContext";

const ClaimSectionComp = ({
  linkPath,
  image,
  TokenName,
  AutoVaultClick,
  claimRewards,
  claimButtonMap,
  autoVaultButtonMap,
  AutoVaultAMountMap,
  ClaimAmountMap,
  DepositFunction,
  depositAmount,
  setDepositAmount,
  inverse,
  ClaimedAmountMap,
}) => {
  const location = useLocation();
  const { theme } = useContext(themeContext);
  const { accountAddress } = useContext(Web3WalletContext);
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");

  const [DepositAddress, setDepositAddress] = useState(false);
  const currentAddress =
    "0x14093F94E3D9E59D1519A9ca6aA207f88005918c".toLowerCase();

  useEffect(() => {
    const checkIsDepositer = () => {
      try {
        if (currentAddress === accountAddress) {
          setDepositAddress(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkIsDepositer();
  }, [accountAddress, DepositAddress]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {TokenName}
    </Tooltip>
  );

  const handleDepositClick = async (e) => {
    // Call the passed DepositFunction with the depositAmount
    await DepositFunction(e);
  };

  return (
    <div className="row align-items-center mb-2">
      <div className="col d-flex align-items-center mx-3">
        <div
          className="rounded-circle mx-3"
          style={{ display: "inline-block" }}
        >
          <OverlayTrigger
            placement="top"
            delay={{ show: 0, hide: 200 }}
            overlay={renderTooltip}
          >
            <Link
              className={`hover-container ${
                location.pathname === linkPath ? "ins active" : ""
              }`}
              role="button"
              to={linkPath}
              style={{
                display: "inline-block",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                width: "30px",
                height: "30px",
                marginLeft: "95px",
              }}
            >
              <img
                src={image}
                alt="Token"
                className={`logo-img ${
                  theme === "lightTheme" && inverse ? "inverse-filter" : ""
                }`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Link>
          </OverlayTrigger>
        </div>
      </div>

      <div className="col text-center">
        <button
          className={`box-4 mx-2 glowing-button ${
            theme === "darkTheme"
              ? "Theme-btn-block"
              : theme === "dimTheme"
              ? "dimThemeBtnBg"
              : "lightThemeButtonBg"
          } ${theme}`}
          onClick={AutoVaultClick}
          disabled={autoVaultButtonMap}
          style={{
            cursor: autoVaultButtonMap ? "not-allowed" : "pointer",
          }}
        >
          AUTO-VAULT
        </button>
        <span className={`${spanDarkDim}`}>{AutoVaultAMountMap || "0.00"}</span>
      </div>
      <div className="col text-center">
        <button
          className={`box-4 items mx-2 glowing-button ${
            theme === "darkTheme"
              ? "Theme-btn-block"
              : theme === "dimTheme"
              ? "dimThemeBorder"
              : "lightThemeButtonBg"
          } ${theme}`}
          onClick={claimRewards}
          disabled={claimButtonMap}
          style={{
            cursor: claimButtonMap ? "not-allowed" : "pointer",
          }}
        >
          CLAIM
        </button>
        <span className={`${spanDarkDim}`}>{ClaimAmountMap || "0.0"}</span>
      </div>
      <div className="col text-center">
        <span className={`${spanDarkDim}`}>{ClaimedAmountMap || "0.00"}</span>
      </div>
      {DepositAddress && (
        <div className="col text-center d-flex align-items-center justify-content-center">
          <input
            type="text"
            className="form-control form-control-sm me-2"
            placeholder="Enter amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)} // Set the depositAmount when input changes
            style={{ maxWidth: "100px" }}
          />
          <button
            className={`box-4 items mx-2 glowing-button ${
              theme === "darkTheme"
                ? "Theme-btn-block"
                : theme === "dimTheme"
                ? "dimThemeBorder"
                : "lightThemeButtonBg"
            } ${theme}`}
            onClick={handleDepositClick} // Use handleDepositClick for button
          >
            DEPOSIT
          </button>
        </div>
      )}
    </div>
  );
};

export default ClaimSectionComp;
