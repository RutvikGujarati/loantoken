// DavContext.js
import React, { createContext, useState } from "react";

export const DavContext = createContext();

export const DavProvider = ({ children }) => {
  const [selectedDav, setSelectedDav] = useState("DAVPLS");

  return (
    <DavContext.Provider value={{ selectedDav, setSelectedDav }}>
      {children}
    </DavContext.Provider>
  );
};
