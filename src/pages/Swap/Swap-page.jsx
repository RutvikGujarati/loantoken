import React, { useContext } from "react";
import "../../Utils/Theme.css";
import { themeContext } from "../../App";
import Searchbar from "../../Components/SearchBar/Searchbar";

import SwapComps from "./SwapComps";
import TrackingPage from "../../Components/Tracker/TrackingPage";
import DavSwap from "./DavSwap";

export default function SwapPage() {
  const { theme } = useContext(themeContext);

  return (
    <div
      className={`${theme} index-main ${
        (theme === "lightTheme" && "lightThemeBack") ||
        (theme === "darkTheme" && "darkThemeTrackingBg") ||
        (theme === "dimTheme" && "dimTheme-index-class")
      }`}
      style={{ minHeight: "100vh" }}
    >
      <Searchbar />
	  <TrackingPage />
	  <div style={{marginTop:"-5vh"}}>
	  <DavSwap />
	  </div>
      {/* <SwapComps /> */}
    </div>
  );
}
