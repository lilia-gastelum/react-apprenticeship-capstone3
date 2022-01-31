import React, { useState } from "react";
import { USER_INFO } from "../../utils/constants";
import { useSideBarContext } from "../../utils/contexts/SideBarContext";
import { useTermContext } from "../../utils/contexts/TermContext";
import { storage } from "../../utils/storage";
import "./Header.styles.css";
import UserWidget from "./UserWidget";

function Header() {
  const [widgetOpen, setWindgetOpen] = useState(false);
  const { setTerm } = useTermContext();
  const { sidebar, setSidebar } = useSideBarContext();
  const user = storage.get(USER_INFO);
  const {avatarUrl} = user;

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      setTerm(event.target.value);
    }
  };

  function toggleMenu() {
    setSidebar({ ...sidebar, open: !sidebar.open });
  }

  function toggleWidget() {
    setWindgetOpen(!widgetOpen);
  }

  return (
    <div className="header">
      <img
        className="menu"
        alt="menu"
        src="/icons/menu.png"
        onClick={toggleMenu}
      />
      <label className="location">Notes</label>
      <input
        className="search"
        placeholder="Search..."
        onKeyDown={handleKeyPressed}
      />
      {widgetOpen && <UserWidget widgetOpen={widgetOpen} />}
      <img
        onClick={toggleWidget}
        className="avatar"
        alt="avatar"
        src={avatarUrl}
      />
      {/* <img className="settings" alt="settings" src="/icons/settings.png" /> */}
    </div>
  );
}

export default Header;
