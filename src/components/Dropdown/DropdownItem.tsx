import "./DropdownItem.css";

export const DropdownItem = (props : any) => {
  return (
      <a
        className="menu-item"
        href={props.href}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </a>
  );
};
