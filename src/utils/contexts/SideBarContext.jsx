import React, { useState, useContext } from "react";

const SideBarContext = React.createContext();

const SideBarContextProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState({open: false, option: 'home'});
  const value = { sidebar, setSidebar };
  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
};

const useSideBarContext = () => {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error("useSideBarContext must be used within SideBarContextProvider");
  }
  return context;
};

export { SideBarContextProvider, useSideBarContext };