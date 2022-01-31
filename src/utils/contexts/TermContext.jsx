import React, { useState, useContext } from "react";

const TermContext = React.createContext();

const TermContextProvider = ({ children }) => {
  const [term, setTerm] = useState('');
  const value = { term, setTerm };
  return (
    <TermContext.Provider value={value}>{children}</TermContext.Provider>
  );
};

const useTermContext = () => {
  const context = useContext(TermContext);
  if (context === undefined) {
    throw new Error("useTermContext must be used within TermContextProvider");
  }
  return context;
};

export { TermContextProvider, useTermContext };

