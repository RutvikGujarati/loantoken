import React, { useContext } from 'react'
import '../../../Utils/Theme.css'
import { themeContext } from '../../../App'
import DAV from '../../../Components/Dav/Dav';
import Searchbar from '../../../Components/SearchBar/Searchbar';
import TrackingPage from '../../../Components/Tracker/TrackingPage'
import PLSIncrementPriceTarget from '../../Increment Price Target/PLSincrementTarget'
import PLSRatioPriceTargets from '../../Ratio Price Targets/PLSRatioTargets'

export default function PLS() {
  const { theme } = useContext(themeContext);

  return (
    <div className={`${theme} index-main ${theme === "lightTheme" && "lightThemeBack" || (theme === "darkTheme" && "darkThemeTrackingBg") || (theme === "dimTheme" && "dimTheme-index-class")}`}>
      <Searchbar />
      <TrackingPage />
      <div
        className={`p-0 pb-5 d-flex flex-row justify-content-around flex-wrap  ${(theme === "darkTheme" && " Theme-index-class") || (theme === "dimTheme" && "dimTheme-index-class") || "main-class-section"}`}
        style={{ marginLeft: "0px" }}
      >
        <div className="container-xxl postion-relative d-flex flex-row justify-content-around flex-wrap posRel">
          <div className="col-md-12 col-12 col-lg-6 col-sm-12 mb-sm-4 sec-1">
            <div className="container-fluid p-0">
              <PLSRatioPriceTargets />
            </div>
          </div>
          <div className="col-md-12 col-12 col-lg-6 col-sm-12 mb-sm-4 sec-2">
            <div className="container-fluid p-0">
              <PLSIncrementPriceTarget />
            </div>
          </div>
        </div>
        {/* <CreateVaultGraph/> */}
        <DAV />
      </div>
    </div>
  )
}
