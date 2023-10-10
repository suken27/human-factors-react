import React from "react";
import "./DropdownItem.css";

const DropdownItem = (props) => {
  return (
    <>
      <a
        className="menu-item"
        href={props.href}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </a>
    </>
  );
};

export default DropdownItem;
