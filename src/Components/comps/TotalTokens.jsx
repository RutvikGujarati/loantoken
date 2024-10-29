import React, { useContext, useState, useEffect } from "react";
import { functionsContext } from "../../Utils/Functions";
import { themeContext } from "../../App";
import { useLocation } from "react-router-dom";

const TotalTokens = () => {
  const { theme } = useContext(themeContext);
  const {
    BalanceOfXenTokenContract,
    BalanceOfPLSContract,
    BalanceOfMATICContract,
    BalanceOfbnbContract,
  } = useContext(functionsContext);
  const [balancePSD, setBalancePSD] = useState("0");
  const [balancePDXN, setBalancePDXN] = useState("0");
  const [balancePFENIX, setBalancePFENIX] = useState("0");
  const [balanceHEX, setBalanceHEX] = useState("0");

  const [balanceREX, setBalanceREX] = useState("0");
  const [balanceTEXAN, setBalanceTEXAN] = useState("0");
  const [balanceWATT, setBalanceWATT] = useState("0");
  const [balanceLOAN, setBalanceLOAN] = useState("0");
  const [balancePTGC, setBalancePTGC] = useState("0");
  const [balancePLS, setBalancePLS] = useState("0");
  const [balanceXEN, setBalanceXEN] = useState("0");
  const [balanceDXN, setBalanceDXN] = useState("0");
  const [balanceFENIX, setBalanceFENIX] = useState("0");
  const [balanceMatic, setBalanceMatic] = useState("0");

  const [balanceBXEN, setBalanceBXEN] = useState("0");
  const [balanceBDXN, setBalanceBDXN] = useState("0");
  const [balanceBFENIX, setBalanceBFENIX] = useState("0");
  const [balanceBNB, setBalanceBNB] = useState("0");

  const [balanceNINE_MM, setBalanceNINE_MM] = useState("0");
  const [balanceNINE_INCH, setBalanceNINE_INCH] = useState("0");
  const [balanceTONI, setBalanceTONI] = useState("0");
  const [balanceSPARK, setBalanceSPARK] = useState("0");
  const [balancePST, setBalancePST] = useState("0");
  const [balancePRATE, setBalancePRATE] = useState("0");
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");

  const getBalances = async () => {
    const pathname = location.pathname;

    if (pathname === "/XEN" || pathname === "/PDXN" || pathname === "/PFENIX") {
      const balanceContractPSD = await BalanceOfXenTokenContract("PSD");
      setBalancePSD((Math.floor(balanceContractPSD) || 0).toLocaleString());

      if (pathname === "/PDXN") {
        const balanceContractPDXN = await BalanceOfXenTokenContract("PDXN");
        setBalancePDXN((Math.floor(balanceContractPDXN) || 0).toLocaleString());
      }

      if (pathname === "/PFENIX") {
        const balanceContractPFENIX = await BalanceOfXenTokenContract("PFENIX");
        setBalancePFENIX(
          (Math.floor(balanceContractPFENIX) || 0).toLocaleString()
        );
      }
    }
    // Fetch PLS balance
    if (pathname === "/PLS") {
      const balanceContractPLS = await BalanceOfPLSContract();
      setBalancePLS((Math.floor(balanceContractPLS) || 0).toLocaleString());
    }

    // Fetch MATIC balance
    if (pathname === "/MATIC") {
      const balanceContractMatic = await BalanceOfMATICContract();
      setBalanceMatic((Math.floor(balanceContractMatic) || 0).toLocaleString());
    }

    // Fetch BNB balance
    if (pathname === "/BNB") {
      const balanceContractBNB = await BalanceOfbnbContract();
      setBalanceBNB((Math.floor(balanceContractBNB) || 0).toLocaleString());
    }

    const balanceContractHEX = await BalanceOfXenTokenContract("HEX");
    setBalanceHEX((Math.floor(balanceContractHEX) || 0).toLocaleString());

    const balanceContractTEXAN = await BalanceOfXenTokenContract("TEXAN");
    setBalanceTEXAN((Math.floor(balanceContractTEXAN) || 0).toLocaleString());

    const balanceContractREX = await BalanceOfXenTokenContract("REX");
    setBalanceREX((Math.floor(balanceContractREX) || 0).toLocaleString());

    const balanceContractWATT = await BalanceOfXenTokenContract("WATT");
    setBalanceWATT((Math.floor(balanceContractWATT) || 0).toLocaleString());

    const balanceContractLOAN = await BalanceOfXenTokenContract("LOAN_M");
    setBalanceLOAN((Math.floor(balanceContractLOAN) || 0).toLocaleString());

    const balanceContractXEN = await BalanceOfXenTokenContract("mxen");
    setBalanceXEN((Math.floor(balanceContractXEN) || 0).toLocaleString());

    const balanceContractDXN = await BalanceOfXenTokenContract("mdxn");
    setBalanceDXN((Math.floor(balanceContractDXN) || 0).toLocaleString());

    const balanceContractFENIX = await BalanceOfXenTokenContract("mfenix");
    setBalanceFENIX((Math.floor(balanceContractFENIX) || 0).toLocaleString());

    const balanceContractBXEN = await BalanceOfXenTokenContract("BXEN");
    setBalanceBXEN((Math.floor(balanceContractBXEN) || 0).toLocaleString());

    const balanceContractBDXN = await BalanceOfXenTokenContract("BDXN");
    setBalanceBDXN((Math.floor(balanceContractBDXN) || 0).toLocaleString());

    const balanceContractBFENIX = await BalanceOfXenTokenContract("BFENIX");
    setBalanceBFENIX((Math.floor(balanceContractBFENIX) || 0).toLocaleString());

    const balanceContractPTGC = await BalanceOfXenTokenContract("PTGC");
    setBalancePTGC((Math.floor(balanceContractPTGC) || 0).toLocaleString());

    const balanceContractNINE_MM = await BalanceOfXenTokenContract("9MM");
    setBalanceNINE_MM(
      (Math.floor(balanceContractNINE_MM) || 0).toLocaleString()
    );

    const balanceContractNINE_INCH = await BalanceOfXenTokenContract("9INCH");
    setBalanceNINE_INCH(
      (Math.floor(balanceContractNINE_INCH) || 0).toLocaleString()
    );

    const balanceContractTONI = await BalanceOfXenTokenContract("TONI");
    setBalanceTONI((Math.floor(balanceContractTONI) || 0).toLocaleString());

    const balanceContractSPARK = await BalanceOfXenTokenContract("SPARK");
    setBalanceSPARK((Math.floor(balanceContractSPARK) || 0).toLocaleString());

    const balanceContractPST = await BalanceOfXenTokenContract("PTS");
    setBalancePST((Math.floor(balanceContractPST) || 0).toLocaleString());

    const balanceContractPRATE = await BalanceOfXenTokenContract("PRAT");
    setBalancePRATE((Math.floor(balanceContractPRATE) || 0).toLocaleString());
  };

  useEffect(() => {
    getBalances();
  }, []);

  const location = useLocation();
  const isXEN = location.pathname === "/XEN";
  const ismatic = location.pathname === "/MATIC";
  const ismXEN = location.pathname === "/mXEN";
  const ismDXN = location.pathname === "/mDXN";
  const ismFENIX = location.pathname === "/mFENIX";
  const isPDXN = location.pathname === "/PDXN";
  const isPFENIX = location.pathname === "/PFENIX";
  const isPLS = location.pathname === "/PLS";
  const isHEX = location.pathname === "/HEX";
  const isTEXAN = location.pathname === "/TEXAN";
  const isWATT = location.pathname === "/WATT";
  const isREX = location.pathname === "/REX";
  const isLoan = location.pathname === "/LOAN";
  const isPTGC = location.pathname === "/PTGC";

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

  return (
    <>
      <div style={{ marginTop: "-5px" }}>
        <div className="hrp">
          <hr className="thin-line " />
        </div>
        <div className="d-flex pt-1">
          <div className="">
            <i className={`iconSize fa-regular fa-money-bill-1 ${theme}`}></i>
          </div>
          <div>
            <div
              className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
            >
              <div className={` `}>
                <div className={` `} style={{ marginLeft: "20px" }}>
                  Contract Balance
                </div>
              </div>
            </div>
            <div
              className={`varSize ${spanDarkDim}`}
              style={{ marginLeft: "20px" }}
            >
              <span
                className={`spanText  `}
                style={{ fontSize: "14px", color: "rgba(27, 138, 236, 0.89)" }}
              >
                {isXEN && balancePSD}
                {isNINE_MM && balanceNINE_MM}
                {isNINE_INCH && balanceNINE_INCH}
                {isTONI && balanceTONI}
                {isSPARK && balanceSPARK}
                {isPRATE && balancePRATE}
                {isPST && balancePST}
                {ismatic && balanceMatic}
                {ismXEN && balanceXEN}
                {ismFENIX && balanceFENIX}
                {ismDXN && balanceDXN}
                {isBNB && balanceBNB}
                {isBXEN && balanceBXEN}
                {BDXN && balanceBDXN}
                {BFENIX && balanceBFENIX}
                {isHEX && balanceHEX}
                {isREX && balanceREX}
                {isTEXAN && balanceTEXAN}
                {isWATT && balanceWATT}
                {isPTGC && balancePTGC}
                {isLoan && balanceLOAN}
                {isPDXN && balancePDXN}
                {isPFENIX && balancePFENIX}
                {isPLS && balancePLS}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalTokens;
