import React, {
  // useCallback,
  useContext,
  // useRef,
  useEffect,
  useState,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Utils/Theme.css";
import { functionsContext } from "../../Utils/Functions";
import { ethers } from "ethers";
import { themeContext } from "../../App";
import { useLocation } from "react-router-dom";

const DavMinted = () => {
  const location = useLocation();

  const isXEN = location.pathname === "/XEN";
  const isPDXN = location.pathname === "/PDXN";
  const isPFENIX = location.pathname === "/PFENIX";
  const isPLS = location.pathname === "/PLS";
  const isHEX = location.pathname === "/HEX";
  const isTEXAN = location.pathname === "/TEXAN";
  const isWATT = location.pathname === "/WATT";
  const isREX = location.pathname === "/REX";
  const isLoan = location.pathname === "/LOAN";
  const isPTGC = location.pathname === "/PTGC";
  const isBNB = location.pathname === "/BNB";
  const isMatic = location.pathname === "/MATIC";
  const ismXEN = location.pathname === "/mXEN";
  const ismDXN = location.pathname === "/mDXN";
  const ismFENIX = location.pathname === "/mFENIX";
  const { totalSupply } = useContext(functionsContext);

  const [balance, setbalance] = useState("0");

  const { theme } = useContext(themeContext);
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");

  const getbalance = async () => {
    if (isXEN || isPDXN || isPFENIX || isPLS) {
      const balanceContract = await totalSupply("DAV");
      const parsedprice = ethers.utils.formatEther(balanceContract);
      console.log("balance of contract", balanceContract);
      setbalance(parsedprice);
    } else if (
      isHEX ||
      isLoan ||
      isTEXAN ||
      isPTGC ||
      isREX ||
      isWATT ||
      isREX
    ) {
      const balanceContract = await totalSupply("DAVDEFI");
      const parsedprice = ethers.utils.formatEther(balanceContract);
      console.log("balance of contract", balanceContract);
      setbalance(parsedprice);
    } else if (isBNB) {
      const balanceContract = await totalSupply("BNBDAV");
      const parsedprice = ethers.utils.formatEther(balanceContract);
      console.log("balance of contract", balanceContract);
      setbalance(parsedprice);
    }else if (isMatic || ismXEN || ismDXN || ismFENIX) {
      const balanceContract = await totalSupply("DAVMATIC");
      const parsedprice = ethers.utils.formatEther(balanceContract);
      console.log("balance of contract", balanceContract);
      setbalance(parsedprice);
    }
  };

  useEffect(() => {
    getbalance();
  });

  return (
    <>
      <div style={{ marginTop: "-13px" }}>
        <hr className="thin-line" />
      </div>
      <div className="d-flex pt-1">
        <div className="">
          <i className={`iconSize fa-solid fa-comments-dollar ${theme}`}></i>
        </div>
        <div
          className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme} `}
          style={{ marginLeft: "15px" }}
        >
          <div>
            <div className={``}>
              <div className={`  `} style={{ fontSize: "13px" }}>
                {" "}
                DAV MINTED SUPPLY
              </div>{" "}
            </div>
            <div className={`varSize ${spanDarkDim}`}>
              <span
                className={`spanText  ${
                  theme === "dimTheme" ? "color-span1" : "color-span2"
                } `}
                style={{ fontSize: "14px" }}
              >
                {" "}
                <>{balance}</>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DavMinted;
