import React from "react";
import logo from '../../svg/logo.svg';
import "./navbar.css";

const Navbar = (props) => {
	return (
		<nav className="navbar">
			<ul className="navbar-logo">
				<a className="NavBar-logo-link">
					<img src={logo} className="NavBar-logo" alt="logo" />
					<h3 className="NavBar-title">Human DevOps</h3>
				</a>
			</ul>
			<ul className="navbar-nav">{props.children}</ul>
		</nav>
	);
};

export default Navbar;
