import "./navbar.css";

export const Navbar = (props : any) => {

	const {default: logo} = require("../../svg/logo.svg") as {default: string};

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
