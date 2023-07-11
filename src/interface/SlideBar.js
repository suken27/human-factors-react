import construction from "../svg/construction.svg";
import graph from "../svg/graph.svg";
import user from "../svg/user.svg";
import "./SlideBar.css";

function SlideBar() {
  return (
    <div className="SlideBar">
      <a href="/graph" className="SlideBar-button">
        <img src={graph} className="SlideBar-button-icon" alt="Human factors graph" />
		<div className="SlideBar-button-text">
			Graph
		</div>
      </a>
      <a href="/team" className="SlideBar-button">
        <img src={user} className="SlideBar-button-icon" alt="Team management" />
		<div className="SlideBar-button-text">
			Team
		</div>
      </a>
      <a href="/login" className="SlideBar-button">
        <img
          src={construction}
          className="SlideBar-button-icon"
          alt="Login page"
        />
		<div className="SlideBar-button-text">
			Login
		</div>
      </a>
    </div>
  );
}

export default SlideBar;
