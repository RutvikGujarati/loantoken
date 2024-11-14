import React, { createContext, useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudMoon, faGasPump, faMoon, faSun, fas } from '@fortawesome/free-solid-svg-icons'
import MetamskConnect from "./Utils/MetamskConnect";
import Functions from "./Utils/Functions";
import Layout from "./Protected Route/Layout"; // Layout includes the Navbar
import Loader from "./Components/Loader/Loader";
import { LoadingProvider } from "./Components/Loader/LoadingContext";

import { HEX, LOAN, PTGC, REX, TEXAN, WATT } from "./pages/Landing Page/defi-pages/DEFI-TOKENS";
import { BDXN, BFENIX, BNB, BXEN } from "./pages/Landing Page/BNBlendingpages/BNB_TOKENS";
import { NINE_INCH, NINE_MM, PRATE, PTS, SPARK, TONI } from "./pages/Landing Page/DAVRADEPAGES/DAV_TRADE";
import { PDXN, PFENIX, PLST, XEN } from "./pages/Landing Page/pages/PLS_MINT_page_tokens";
import { MATIC, MDXN, MFENIX, MXEN } from "./pages/Landing Page/PolygonLendingPages/POLYGON_TOKENS";
import Index from "./pages/Landing Page/Index";
import LoadingScreen from "./Components/TestCard";
import { DavProvider } from "./context/DavContext";
import { DepositProvider } from "./context/DepositContext";

library.add(fas, faGasPump, faSun, faMoon, faCloudMoon);

export const themeContext = createContext();

const Website = lazy(() => import('./Website/Website'));
const SwapPage = lazy(() => import('./pages/Swap/Swap-page'));

function App() {
	const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'light');
	const lightTheme = themeMode === 'light' && 'lightTheme';
	const darkTheme = themeMode === 'dark' && 'darkTheme';
	const dimTheme = themeMode === 'dim' && 'dimTheme';
	const theme = lightTheme || darkTheme || dimTheme;

	const navigate = useNavigate();
	const navigateToDEX = async () => {
		navigate('/PLS/mint');
	};
	const navigateToDocs = async () => {
		navigate('/');
	};

	// Preloading Website component
	const preloadWebsite = () => {
		const WebsiteModule = import('./Website/Website');
		WebsiteModule.then((module) => module.default);
	};

	useEffect(() => {
		preloadWebsite();
	}, []);

	useEffect(() => { }, [theme, setThemeMode]);

	return (
		<>
			<LoadingProvider>
				<themeContext.Provider value={{
					theme, themeMode, setThemeMode, navigateToDEX, navigateToDocs
				}}>
					<MetamskConnect>
						<Functions>
							<DepositProvider>
								<DavProvider >
									<Suspense fallback={<Loader />}>
										<Routes>
											<Route index element={<Website />} />
											<Route path="/" element={<Layout />}>
												<Route path="PLS/mint" element={<Index />} />
												<Route path="BNB/mint" element={<Index />} />
												<Route path="polygon/mint" element={<Index />} />
												<Route path="TRADE" element={<Index />} />
												<Route path="DEFI" element={<Index />} />
												<Route path="swap" element={<SwapPage />} />

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
												<Route path="screen" element={<LoadingScreen />} />
											</Route>
										</Routes>
									</Suspense>
								</DavProvider>
							</DepositProvider>
						</Functions>
					</MetamskConnect>
				</themeContext.Provider>
			</LoadingProvider>
		</>
	);
}

export default App;
