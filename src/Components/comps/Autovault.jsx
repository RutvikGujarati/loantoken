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
  const [HEXautoVaultAmounts, setHEXAutoVaultAmount] = useState("0");
  const [REXautoVaultAmounts, setREXAutoVaultAmount] = useState("0");
  const [TEXANautoVaultAmounts, setTEXANAutoVaultAmount] = useState("0");
  const [PTGCautoVaultAmounts, setPTGCAutoVaultAmount] = useState("0");
  const [WATTautoVaultAmounts, setWATTAutoVaultAmount] = useState("0");
  const [LOANautoVaultAmounts, setLOANAutoVaultAmount] = useState("0");
  const [PFENIXautoVaultAmounts, setPFENIXAutoVaultAmount] = useState("0");
  const [PLSautoVaultAmounts, setPLSAutoVaultAmount] = useState("0");
  const [MaticautoVaultAmounts, setMaticAutoVaultAmount] = useState("0");
  const [MXENautoVaultAmounts, setMXENAutoVaultAmount] = useState("0");
  const [MDXNautoVaultAmounts, setMDXNAutoVaultAmount] = useState("0");
  const [MFENIXautoVaultAmounts, setMFENIXAutoVaultAmount] = useState("0");

  const [bnbautoVaultAmounts, setbnbAutoVaultAmount] = useState("0");
  const [BXENautoVaultAmounts, setBXENAutoVaultAmount] = useState("0");
  const [BDXNautoVaultAmounts, setBDXNAutoVaultAmount] = useState("0");
  const [BFENIXautoVaultAmounts, setBFENIXAutoVaultAmount] = useState("0");

  const [NINE_MMautoVaultAmounts, setNINE_MMAutoVaultAmount] = useState("0");
  const [NINE_inchautoVaultAmounts, setNINE_inchAutoVaultAmount] =
    useState("0");
  const [TONIautoVaultAmounts, setTONIAutoVaultAmount] = useState("0");
  const [SPARKautoVaultAmounts, setSPARKAutoVaultAmount] = useState("0");
  const [PRATEautoVaultAmounts, setPRATEAutoVaultAmount] = useState("0");
  const [PSTautoVaultAmounts, setPSTAutoVaultAmount] = useState("0");

  const location = useLocation();
  const isXEN = location.pathname == "/XEN";
  const isMatic = location.pathname == "/MATIC";
  const ismXEN = location.pathname == "/mXEN";
  const ismDXN = location.pathname == "/mDXN";
  const ismFENIX = location.pathname == "/mFENIX";
  const isPDXN = location.pathname == "/PDXN";
  const isPFENIX = location.pathname == "/PFENIX";
  const isHEX = location.pathname == "/HEX";
  const isTEXAN = location.pathname == "/TEXAN";
  const isWATT = location.pathname == "/WATT";
  const isREX = location.pathname == "/REX";
  const isLoan = location.pathname == "/LOAN";
  const isPTGC = location.pathname == "/PTGC";

  const isNINE_MM = location.pathname === "/NineMM";
  const isNINE_INCH = location.pathname === "/Nine_Inch";
  const isPRATE = location.pathname === "/PRATE";
  const isTONI = location.pathname === "/TONI";
  const isPST = location.pathname === "/PTS";
  const isSPARK = location.pathname === "/SPARK";

  const isBNB = location.pathname === "/BNB";
  const isBXEN = location.pathname === "/bXEN";
  const BDXN = location.pathname === "/bDXN";
  const BFENIX = location.pathname === "/bFENIX";
  const { userConnected } = useContext(Web3WalletContext);

  const fetchAutoVaultAmounts = async (contractType, setAutoVaultAmount) => {
    try {
      let autoVaultAmount = await fetchTotalAV(contractType);

      console.log(`AutoVaults from ${contractType}:`, autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      if (typeof setAutoVaultAmount === "function") {
        setAutoVaultAmount(
          autoVaultAmountNumber.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
      } else {
        throw new Error("setAutoVaultAmount is not a function");
      }
      console.log("from component", autoVaultAmountNumber.toFixed(2));
    } catch (error) {
      console.error(`fetchAutoVaultAmounts for ${contractType} error:`, error);
      if (typeof setAutoVaultAmount === "function") {
        setAutoVaultAmount("0");
      }
    }
  };

  // Usage examples
  const fetchPSDAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("PSD", setAutoVaultAmount);
  };

  const fetchPDXNAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("PDXN", setPDXNAutoVaultAmount);
  };
  const fetchHEXAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("HEX", setHEXAutoVaultAmount);
  };
  const fetchTEXANAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("TEXAN", setTEXANAutoVaultAmount);
  };
  const fetchREXAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("REX", setREXAutoVaultAmount);
  };
  const fetchPTGCAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("PTGC", setPTGCAutoVaultAmount);
  };
  const fetchWATTAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("WATT", setWATTAutoVaultAmount);
  };
  const fetchLOANAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("LOAN_M", setLOANAutoVaultAmount);
  };

  const fetchPFENIXAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("PFENIX", setPFENIXAutoVaultAmount);
  };

  const fetchPLSAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("PLS", setPLSAutoVaultAmount);
  };
  const fetchMATICAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("matic", setMaticAutoVaultAmount);
  };
  const fetchmXENAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("mxen", setMXENAutoVaultAmount);
  };
  const fetchmDXNAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("mdxn", setMDXNAutoVaultAmount);
  };
  const fetchmFENIXAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("mfenix", setMFENIXAutoVaultAmount);
  };

  const fetchBNBAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("BNB", setbnbAutoVaultAmount);
  };
  const fetchBXENAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("BXEN", setBXENAutoVaultAmount);
  };
  const fetchBDXNAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("BDXN", setBDXNAutoVaultAmount);
  };
  const fetchBFENIXAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("BFENIX", setBFENIXAutoVaultAmount);
  };

  const fetcNINE_MMAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("9MM", setNINE_MMAutoVaultAmount);
  };
  const fetchNINE_INCHAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("9INCH", setNINE_inchAutoVaultAmount);
  };
  const fetchTONIAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("TONI", setTONIAutoVaultAmount);
  };
  const fetchPSTAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("PTS", setPSTAutoVaultAmount);
  };
  const fetchSPARKAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("SPARK", setSPARKAutoVaultAmount);
  };
  const fetchPRATEAutoVaultAmounts = async () => {
    await fetchAutoVaultAmounts("PRAT", setPRATEAutoVaultAmount);
  };

  useEffect(() => {
    if (userConnected) {
      fetchAutoVaultAmounts();
      fetchPDXNAutoVaultAmounts();
      fetchPSDAutoVaultAmounts();
      fetchREXAutoVaultAmounts();
      fetchPTGCAutoVaultAmounts();
      fetchWATTAutoVaultAmounts();
      fetchLOANAutoVaultAmounts();
      fetchTEXANAutoVaultAmounts();
      fetchMATICAutoVaultAmounts();
      fetchmXENAutoVaultAmounts();
      fetchmDXNAutoVaultAmounts();
      fetchmFENIXAutoVaultAmounts();
      fetchHEXAutoVaultAmounts();
      fetchPLSAutoVaultAmounts();
      fetchPFENIXAutoVaultAmounts();

      fetcNINE_MMAutoVaultAmounts();
      fetchNINE_INCHAutoVaultAmounts();
      fetchPSTAutoVaultAmounts();
      fetchPRATEAutoVaultAmounts();
      fetchSPARKAutoVaultAmounts();
      fetchTONIAutoVaultAmounts();

      fetchBNBAutoVaultAmounts();
      fetchBXENAutoVaultAmounts();
      fetchBFENIXAutoVaultAmounts();
      fetchBDXNAutoVaultAmounts();
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
              {isXEN
                ? autoVaultAmounts
                : isPDXN
                ? PDXNautoVaultAmounts
                : isPFENIX
                ? PFENIXautoVaultAmounts
                : isHEX
                ? HEXautoVaultAmounts
                : isREX
                ? REXautoVaultAmounts
                : isLoan
                ? LOANautoVaultAmounts
                : isMatic
                ? MaticautoVaultAmounts
                : ismXEN
                ? MXENautoVaultAmounts
                : isBNB
                ? bnbautoVaultAmounts
                : isBXEN
                ? BXENautoVaultAmounts
                : BDXN
                ? BDXNautoVaultAmounts
                : BFENIX
                ? BFENIXautoVaultAmounts
                : isPST
                ? PSTautoVaultAmounts
                : isNINE_INCH
                ? NINE_inchautoVaultAmounts
                : isNINE_MM
                ? NINE_MMautoVaultAmounts
                : isPRATE
                ? PRATEautoVaultAmounts
                : isTONI
                ? TONIautoVaultAmounts
                : isSPARK
                ? SPARKautoVaultAmounts
                : ismDXN
                ? MDXNautoVaultAmounts
                : ismFENIX
                ? MFENIXautoVaultAmounts
                : isPTGC
                ? PTGCautoVaultAmounts
                : isTEXAN
                ? TEXANautoVaultAmounts
                : isWATT
                ? WATTautoVaultAmounts
                : PLSautoVaultAmounts}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autovault;
