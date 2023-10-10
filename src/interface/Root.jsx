import { Outlet } from "react-router-dom";
import DropdownMenu from "../components/Dropdown/DropdownMenu";
import NavItem from "../components/Navbar/NavItem";
import NavBar from "../components/Navbar/Navbar";
import user from "../svg/user.svg";
import "./Root.css";
import SlideBar from "./SlideBar";

function Root() {
	return (
		<div className="Root">
			<NavBar>
				<NavItem icon={user}>
					<DropdownMenu />
				</NavItem>
			</NavBar>
			<div className="Root-belowNavBar">
				<SlideBar />
				<div className="Root-content">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Root;
