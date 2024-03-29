import React, { useState } from "react";
import "./navItem.css";

const NavItem = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a className="icon-button" onClick={() => setOpen(!open)}>
        <img className="icon-button-image" src={props.icon}/>
      </a>
      {open && props.children}
    </li>
  );
};

export default NavItem;
