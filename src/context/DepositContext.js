// DepositContext.js
import React, { createContext, useState, useContext } from "react";

// Create context
const DepositContext = createContext();

// Context provider component
export const DepositProvider = ({ children }) => {
  const [depositAmount, setDepositAmount] = useState("");

  return (
    <DepositContext.Provider value={{ depositAmount, setDepositAmount }}>
      {children}
    </DepositContext.Provider>
  );
};

// Custom hook to use the deposit context
export const useDepositContext = () => {
  return useContext(DepositContext);
};
