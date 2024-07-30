import React, {
  createContext,
  // useCallback,
  useContext,
  // useRef,
  useEffect,
  useState,
} from "react";
import { functionsContext } from "../../Utils/Functions";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { themeContext } from "../../App";
import { useLocation } from "react-router-dom";

const Autovault = () => {
  const { fetchTotalAV } = useContext(functionsContext);
  const { theme } = useContext(themeContext);
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");

  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");
  const [autoVaultAmounts, setAutoVaultAmount] = useState("0");
  const [PDXNautoVaultAmounts, setPDXNAutoVaultAmount] = useState("0");
  const location = useLocation();
  const isXEN = location.pathname == "/XEN";
  const isPDXN = location.pathname == "/PDXN";
  const { userConnected } = useContext(Web3WalletContext);

  const fetchAutoVaultAmounts = async (address) => {
    try {
      let autoVaultAmount = await fetchTotalAV();

      console.log("AutoVaults from tracking:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      setAutoVaultAmount(autoVaultAmountNumber.toFixed(2));
      console.log("from component", autoVaultAmounts);
    } catch (error) {
      console.error("fetchAutoVaultAmounts error:", error);
      setAutoVaultAmount("0");
    }
  };
  const fetchPDXNAutoVaultAmounts = async (usePSD = false) => {
    try {
      let autoVaultAmount = await fetchTotalAV(usePSD);

      console.log("AutoVaults from tracking:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      setPDXNAutoVaultAmount(autoVaultAmountNumber.toFixed(2));
      console.log("from component", autoVaultAmounts);
    } catch (error) {
      console.error("fetchAutoVaultAmounts error:", error);
      setPDXNAutoVaultAmount("0");
    }
  };

  useEffect(() => {
    if (userConnected) {
      fetchAutoVaultAmounts();
      fetchPDXNAutoVaultAmounts(false);
    }
  });
  return (
    <div style={{ marginTop: "-7px" }}>
      <div className="hrp">
        <hr className="thin-line" />
      </div>
      <div className="d-flex pt-1">
        <div className="">
          <i
            className={`iconSize fa-solid fa-arrow-up-right-dots ${theme}`}
          ></i>{" "}
        </div>
        <div>
          <div
            className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme} `}
          >
            <div className={`  `}>
              <div
                className={` `}
                style={{ marginLeft: "20px", fontSize: "12px" }}
              >
                {" "}
                TOKENS IN AUTO-VAULTS
              </div>{" "}
            </div>
          </div>
          <div
            className={`varSize ${spanDarkDim}`}
            style={{ marginLeft: "20px" }}
          >
            <span
              className={`spanText ${
                theme === "dimTheme" ? "color-span1" : "color-span2"
              } `}
              style={{ fontSize: "14px" }}
            >
              {" "}
              {isPDXN ? PDXNautoVaultAmounts : autoVaultAmounts}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autovault;
