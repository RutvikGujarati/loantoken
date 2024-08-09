import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BNB_MAINNET_ID = "0x38"; // BNB Mainnet chainId
const PLS_MAINNET_ID = "0x89"; // PulseChain Mainnet chainId (example chainId, replace with the actual one)

const NetworkSwitcher = () => {
  const location = useLocation();

  const switchNetwork = async (networkId) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networkId }],
        });
      } catch (switchError) {
        if (switchError.code === 4001) {
          console.log("User denied network switch. Will alert in 15 seconds.");
          setTimeout(() => {
            alert("Please switch to the correct network to continue.");
            window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: networkId }],
            });
          }, 15000);
        } else if (switchError.code === 4902) {
          console.log("Network not found in MetaMask. Add it manually.");
          // Optional: Add network logic here if needed
        } else {
          console.error("Failed to switch network", switchError);
        }
      }
    } else {
      console.log("MetaMask is not installed.");
    }
  };

  useEffect(() => {
    if (location.pathname.includes("/bnb/mint")) {
      switchNetwork(BNB_MAINNET_ID);
    } else if (location.pathname.includes("/PLS/mint")) {
      switchNetwork(PLS_MAINNET_ID);
    }
  }, [location]);

  return null;
};

export default NetworkSwitcher;
