import React, { useContext, useState } from "react";
import { functionsContext } from "../../Utils/Functions";
import { themeContext } from "../../App";

// Main component
const MintContainer = ({ contractType }) => {
  const { theme } = useContext(themeContext);

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
  const [selectedToken, setSelectedToken] = useState("PDXN");

  // Define the tokens and associated functions
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
    MDXN: { MATICDAVPriceToken: "2,000", onClick: () => mintWithMDXN(1, 2000) },
    MFENIX: {
      MATICDAVPriceToken: "4,000,000",
      onClick: () => mintWithPFENIX(1, 4000000),
    },
  };

  const TradeTokens = {
    "9INCH": {
      TradePriceToken: "4,000,000",
      onClick: () => mintWith9INCH(1, 4000000),
    },
    PTS: { TradePriceToken: "500", onClick: () => mintWithPTS(1, 500) },
    SPARK: { TradePriceToken: "1,500", onClick: () => mintWithSPARK(1, 1500) },
    PRATE: {
      TradePriceToken: "10,000,000",
      onClick: () => mintWithPRATE(1, 10000000),
    },
    TONI: { TradePriceToken: "21,000", onClick: () => mintWithTONI(1, 21000) },
  };

  const [selectedPriceToken, setSelectedPriceToken] = useState(
    DAVTokens["PDXN"].DAVPriceToken
  );

  // Determine the current tokens and handlers based on contractType
  const tokens =
    contractType === "DAV"
      ? DAVTokens
      : contractType === "BNBDAV"
      ? BNBDAVTokens
      : contractType === "DAVTrade"
      ? TradeTokens
      : MATICDAVTokens;

  const handleTokenChange = (event) => {
    const token = event.target.value;
    setSelectedToken(token);
    setSelectedPriceToken(
      tokens[token].DAVPriceToken ||
        tokens[token].BNBDAVPriceToken ||
        tokens[token].MATICDAVPriceToken ||
        tokens[token].TradePriceToken
    );
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div
          className={`info-item info-columns box swap1 mt-4 ${
            (theme === "darkTheme" && "Theme-btn-block") ||
            (theme === "dimTheme" && "dimThemeBorder") ||
            (theme === "lightTheme" && theme + "translite")
          }`}
          style={{ marginTop: "-1vh", marginLeft: "10vh" }}
        >
          <p className="text-center">SELECT DAV </p>
        </div>
        <div
          className={`info-item info-columns box swap2 mt-4 mb-4 ${
            (theme === "darkTheme" && "Theme-btn-block") ||
            (theme === "dimTheme" && "dimThemeBorder") ||
            (theme === "lightTheme" && theme + "translite")
          }`}
          style={{ marginTop: "-1vh", marginLeft: "10vh" }}
        >
          <p className="text-center">DAVPLS</p>
          <select
            className="form-select"
            value={selectedToken}
            onChange={handleTokenChange}
          >
            {Object.keys(tokens).map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
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
          <p className="text-center">SELECT NUMBER OF DAV TOKEN</p>
        </div>
        <div
          className={`info-item info-columns box swap2 mt-4 mb-4 ${
            (theme === "darkTheme" && "Theme-btn-block") ||
            (theme === "dimTheme" && "dimThemeBorder") ||
            (theme === "lightTheme" && theme + "translite")
          }`}
          style={{ marginTop: "-1vh", marginLeft: "10vh" }}
        >
          <p className="text-center">MINT {selectedToken} TOKEN</p>
          <div className="text-center">{selectedPriceToken}</div>
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
          <p className="text-center">MINT TOKENS</p>
        </div>
        <div
          className={`info-item info-columns box swap2 mb-4 glowing-button ${
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
          <button
            className="btn btn-primary mt-3"
            onClick={tokens[selectedToken]}
          >
            Mint {selectedToken}
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default MintContainer;
