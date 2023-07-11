import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./Root.css";
import SlideBar from "./SlideBar";

function Root() {
  return (
    <div className="Root">
      <NavBar />
      <div className="Root-belowNavBar">
        <SlideBar />
        <div className="Root-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default Root;
