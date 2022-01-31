import React, { useState, useContext } from "react";
import { NOTES_LIST } from "../constants";
import { storage } from "../storage";

const NotesContext = React.createContext();

const NotesContextProvider = ({ children }) => {
  const savedNotes = storage.get(NOTES_LIST);
  const [notes, setNotes] = useState(savedNotes ? savedNotes : []);

  const saveNotes = (notesList) =>{
    storage.set(NOTES_LIST, notesList);
    setNotes(notesList);
  }
  const value = { notes, saveNotes };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotesContext must be used within NotesContextProvider");
  }
  return context;
};

export { NotesContextProvider, useNotesContext };
