import React, { createContext, useEffect, useState } from "react";
import Layout from "./Protected Route/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Landing Page/Index";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudMoon, faGasPump, faMoon, faSun, fas } from '@fortawesome/free-solid-svg-icons'
import MetamskConnect from "./Utils/MetamskConnect";
import Website from "./Website/Website";
import XEN from "./pages/Landing Page/XEN";
import Functions from "./Utils/Functions";
import PLS from "./pages/Landing Page/PLS";
import PDXN from "./pages/Landing Page/PDXN";
import PFENIX from "./pages/Landing Page/PFENIX";
import PLST from "./pages/Landing Page/PLST";
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
    navigate('/mint')
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
                <Route path="mint" element={<Index />} />
                <Route path="PLS" element={<PLST />} />
                <Route path="XEN" element={<XEN />} />
                <Route path="PDXN" element={<PDXN />} />
                <Route path="PFENIX" element={<PFENIX />} />
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
