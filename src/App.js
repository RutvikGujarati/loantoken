import React, { createContext, useEffect, useState, Suspense } from "react";
import Layout from "./Protected Route/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Landing Page/Index";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudMoon, faGasPump, faMoon, faSun, fas } from '@fortawesome/free-solid-svg-icons'
import MetamskConnect from "./Utils/MetamskConnect";
import Website from "./Website/Website";
import Functions from "./Utils/Functions";

import { HEX, LOAN, PTGC, REX, TEXAN, WATT } from "./pages/Landing Page/defi-pages/DEFI-TOKENS";

import { BDXN, BFENIX, BNB, BXEN } from "./pages/Landing Page/BNBlendingpages/BNB_TOKENS";
import { NINE_INCH, NINE_MM, PRATE, PTS, SPARK, TONI } from "./pages/Landing Page/DAVRADEPAGES/DAV_TRADE";

import { PDXN, PFENIX, PLST, XEN } from "./pages/Landing Page/pages/PLS_MINT_page_tokens";
import { MATIC, MDXN, MFENIX, MXEN } from "./pages/Landing Page/PolygonLendingPages/POLYGON_TOKENS";
import Loader from "./Components/Loader/Loader";
import { LoadingProvider } from "./Components/Loader/LoadingContext";
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
      <LoadingProvider>

        <themeContext.Provider value={
          {
            theme, themeMode, setThemeMode, navigateToDEX, navigateToDocs
          }
        }>
          <MetamskConnect >
            <Functions>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<Website />} />
                  <Route path="/" element={<Layout />}>

                    <Route path="PLS/mint" element={<Index />} />
                    <Route path="BNB/mint" element={<Index />} />
                    <Route path="polygon/mint" element={<Index />} />
                    <Route path="TRADE" element={<Index />} />
                    <Route path="DEFI" element={<Index />} />

                    <Route path="PLS" element={<PLST />} />
                    <Route path="XEN" element={<XEN />} />
                    <Route path="PDXN" element={<PDXN />} />
                    <Route path="PFENIX" element={<PFENIX />} />
                    <Route path="loader" element={<Loader />} />

                    <Route path="REX" element={<REX />} />
                    <Route path="HEX" element={<HEX />} />
                    <Route path="LOAN" element={<LOAN />} />
                    <Route path="PTGC" element={<PTGC />} />
                    <Route path="WATT" element={<WATT />} />
                    <Route path="TEXAN" element={<TEXAN />} />


                    <Route path="BNB" element={<BNB />} />
                    <Route path="bXEN" element={<BXEN />} />
                    <Route path="bFENIX" element={<BFENIX />} />
                    <Route path="bDXN" element={<BDXN />} />

                    <Route path="MATIC" element={<MATIC />} />
                    <Route path="mXEN" element={<MXEN />} />
                    <Route path="mDXN" element={<MDXN />} />
                    <Route path="mFENIX" element={<MFENIX />} />


                    <Route path="NineMM" element={<NINE_MM />} />
                    <Route path="PRATE" element={<PRATE />} />
                    <Route path="PTS" element={<PTS />} />
                    <Route path="SPARK" element={<SPARK />} />
                    <Route path="TONI" element={<TONI />} />
                    <Route path="Nine_Inch" element={<NINE_INCH />} />

                  </Route>

                </Routes>
              </Suspense>

            </Functions>
          </MetamskConnect>
        </themeContext.Provider>
      </LoadingProvider>
    </>
  );
}

export default App;
