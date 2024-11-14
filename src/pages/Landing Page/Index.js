import React, { useContext } from "react";
import Searchbar from "../../Components/SearchBar/Searchbar";
import "./Style.css";
import { themeContext } from "../../App";
import "../../Utils/Theme.css";
import TrackingPage from "../../Components/Tracker/TrackingPage";
import DAV from "../../Components/Dav/Dav";
import MainDav from "../../Components/Dav/MainDav";

export default function Index() {
	const { theme } = useContext(themeContext);

	return (
		<div
			className={`${(theme === "lightTheme" && "light-bg-for-theme") ||
				(theme === "dimTheme" && "dimTheme-index-class") ||
				(theme === "darkTheme" && "Theme-index-class")
				}`}
			style={{ minHeight: "100vh" }}
		>
			<Searchbar />
			<TrackingPage />
			<div
				className={`p-0 pb-5 d-flex flex-row justify-content-around flex-wrap main-class-section`}
			>
				<div >
					<MainDav />
				</div>
			</div>
		</div>
	);
}
