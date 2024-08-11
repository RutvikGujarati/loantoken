import React, { createContext, useEffect, useState } from "react";
import Layout from "./Protected Route/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Landing Page/Index";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudMoon, faGasPump, faMoon, faSun, fas } from '@fortawesome/free-solid-svg-icons'
import MetamskConnect from "./Utils/MetamskConnect";
import Website from "./Website/Website";
import XEN from "./pages/Landing Page/pages/XEN";
import Functions from "./Utils/Functions";
import PLS from "./pages/Landing Page/pages/PLS";
import PDXN from "./pages/Landing Page/pages/PDXN";
import PFENIX from "./pages/Landing Page/pages/PFENIX";
import PLST from "./pages/Landing Page/pages/PLST";
import DEFI from "./pages/Landing Page/pages/DEFI";
import HEX from "./pages/Landing Page/defi-pages/Generalized";
import REX from "./pages/Landing Page/defi-pages/rex";
import LOAN from "./pages/Landing Page/defi-pages/LOAN";
import PTGC from "./pages/Landing Page/defi-pages/PTGC";
import WATT from "./pages/Landing Page/defi-pages/WATT";
import TEXAN from "./pages/Landing Page/defi-pages/TEXAN";
import BNB from "./pages/Landing Page/BNBlendingpages/BNB";
import BXEN from "./pages/Landing Page/BNBlendingpages/BXEN";
import BFENIX from "./pages/Landing Page/BNBlendingpages/BFENIX";
import BDXN from "./pages/Landing Page/BNBlendingpages/BDXN";
import MATIC from "./pages/Landing Page/PolygonLendingPages/MATIC";
import MXEN from "./pages/Landing Page/PolygonLendingPages/mXEN";
import MDXN from "./pages/Landing Page/PolygonLendingPages/mDXN";
import MFENIX from "./pages/Landing Page/PolygonLendingPages/mFENIX";
library.add(fas, faGasPump, faSun, faMoon, faCloudMoon)

library.add(fas, faGasPump, faSun, faMoon, faCloudMoon)

export const themeContext = createContext();

function App() {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'light');
  const lightTheme = themeMode === 'light' && 'lightTheme'
  const darkTheme = themeMode === 'dark' && 'darkTheme'
  const dimTheme = themeMode === 'dim' && 'dimTheme'
  const theme = lightTheme || darkTheme || dimTheme


  const navigate = useNavigate();
  const navigateToDEX = async () => {
    navigate('/PLS/mint')
  }
  const navigateToDocs = async () => {
    navigate('/')
  }

  useEffect(() => {

  }, [theme, setThemeMode])
  return (
    <>
      <themeContext.Provider value={
        {
          theme, themeMode, setThemeMode, navigateToDEX, navigateToDocs
        }
      }>
        <MetamskConnect >
          <Functions>
            {/* <TVlValueContext> */}

            <Routes>
              <Route path="/" element={<Website />} />
              <Route path="/" element={<Layout />}>
                <Route path="PLS/mint" element={<Index />} />
                <Route path="BNB/mint" element={<Index />} />
                <Route path="polygon/mint" element={<Index />} />
                <Route path="PLS" element={<PLST />} />
                <Route path="XEN" element={<XEN />} />

                <Route path="REX" element={<REX/>} />
                <Route path="HEX" element={<HEX/>} />
                <Route path="LOAN" element={<LOAN/>} />
                <Route path="PTGC" element={<PTGC/>} />
                <Route path="WATT" element={<WATT/>} />
                <Route path="TEXAN" element={<TEXAN/>} />

                <Route path="PDXN" element={<PDXN />} />
                <Route path="PFENIX" element={<PFENIX />} />
                <Route path="DEFI" element={<DEFI />} />

                <Route path="BNB" element={<BNB />} />
                <Route path="bXEN" element={<BXEN />} />
                <Route path="bFENIX" element={<BFENIX />} />
                <Route path="bDXN" element={<BDXN />} />

                <Route path="MATIC" element={<MATIC />} />
                <Route path="mXEN" element={<MXEN />} />
                <Route path="mDXN" element={<MDXN />} />
                <Route path="mFENIX" element={<MFENIX />} />
                {/* <Route path="ipt&rptTanzHistory" element={<TablePage />} /> */}
                {/* <Route index path="ipt&rptHistory" element={<MixedIptAndRpt />} />
                  <Route path="statetokenTransaction" element={<StateTokenTarget />} /> */}
              </Route>

            </Routes>
            {/* </TVlValueContext> */}
          </Functions>
        </MetamskConnect>
      </themeContext.Provider>
    </>
  );
}

export default App;
