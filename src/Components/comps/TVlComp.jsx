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

const TVLComp = () => {
  const {
    getPrice,

    BalanceOfXenTokenContract,
  } = useContext(functionsContext);

  const [balance, setbalance] = useState("0");

  const { theme } = useContext(themeContext);
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");

  const getbalance = async () => {
    const balanceContract = await BalanceOfXenTokenContract();
    const price = await getPrice();

    const parsedprice = ethers.utils.formatEther(price);
    console.log("balance of contract", balanceContract);
    setbalance((balanceContract * parsedprice).toFixed(4));
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
                $ TVL ( LIQUIDITY )
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
                <>$ {balance}</>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TVLComp;
