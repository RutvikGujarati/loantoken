// Import statements
import React, { useContext } from 'react'
import '../../../Utils/Theme.css'
import { themeContext } from '../../../App'
import RatioPriceTargets from '../../Ratio Price Targets/RatioPriceTargets';
import IncrementPriceTarget from '../../Increment Price Target/IncrementPriceTarget';
import Searchbar from '../../../Components/SearchBar/Searchbar';

const GeneralizedComponent = ({ title }) => {
  const { theme } = useContext(themeContext);

  return (
    <div className={`${theme} index-main ${(theme === "lightTheme" && "lightThemeBack") || (theme === "darkTheme" && "darkThemeTrackingBg") || (theme === "dimTheme" && "dimTheme-index-class")}`}
    
    style={{ minHeight: "100vh" }}>
      <Searchbar />
      <div
        className={`p-0 pb-5 d-flex flex-row justify-content-around flex-wrap ${(theme === "darkTheme" && "Theme-index-class") || (theme === "dimTheme" && "dimTheme-index-class") || "main-class-section"}`}
      >
        <div className="container-xxl postion-relative d-flex flex-row justify-content-around flex-wrap posRel">
          <div className="col-md-12 col-12 col-lg-6 col-sm-12 mb-sm-4 sec-1" >
            <div className="container-fluid p-0" >
              <RatioPriceTargets />
            </div>
          </div>
          <div className="col-md-12 col-12 col-lg-6 col-sm-12 mb-sm-4 sec-2">
            <div className="container-fluid p-0">
              <IncrementPriceTarget />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralizedComponent;
