import React from "react";
import { useSideBarContext } from "../../utils/contexts/SideBarContext";
import "./SideBar.styles.css";

function SideBar({ children }) {
  const { sidebar, setSidebar } = useSideBarContext();

  const options = [
    { text: "Notes", link: "/home", icon: "/icons/bulb.png" },
    { text: "Archive", link: "/archive", icon: "/icons/archive.png" },
  ];

  function closeNav() {
    setSidebar({ ...sidebar, open: false });
  }

  return (
    <>
      <div id="mySidenav" className={`sidenav ${sidebar.open && "open"}`}>
        {options.map((option) => {
          return (
            <div key={option.text}>
            <a href={option.link} onClick={closeNav}>
              <img className="sidebar-icon" alt={option.text} src={option.icon} />
              <label className="icon-text">{sidebar.open? option.text : ''}</label>
            </a>
            <br/>
            </div>
            
          );
        })}
      </div>
      {children}
    </>
  );
}

export default SideBar;
