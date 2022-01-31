import React, { useEffect, useState } from "react";
import { useNotesContext } from "../../utils/contexts/NotesContext";
import Note from "../../components/Note";
import NewNote from "./NewNote";
import "./Notes.styles.css";
import { useTermContext } from "../../utils/contexts/TermContext";
function Notes() {
  const { notes, saveNotes } = useNotesContext();
  const { term } = useTermContext();
  const [shownNotes, setShownNotes] = useState([]);

  useEffect(() => {
    let filtered = [];
    if (term.trim() === "") filtered = notes.filter((f) => !f.archived);
    else
      filtered = notes.filter(
        (f) => !f.archived && (f.title.includes(term) || f.text.includes(term))
      );
    setShownNotes(filtered);
  }, [term, notes, setShownNotes]);

  const addNote = (note) => {
    const newList = [...notes, { id: notes.length + 1, ...note }];
    saveNotes(newList);
  };

  const renderNotes = () => {
    if (term.trim() === "")
      return shownNotes.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            archiveNote={archiveNote}
          />
        );
      });
    else
      return shownNotes.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            archiveNote={archiveNote}
          />
        );
      });
  };

  function deleteNote(noteId) {
    const newList = notes.filter((f) => f.id !== noteId);
    saveNotes(newList);
  }

  function archiveNote(noteId) {
    const newList = [...notes];
    const archived = newList.find((f) => f.id === noteId);
    archived.archived = true;
    saveNotes(newList);
  }

  return (
    <>
      <div>
        <NewNote addNote={addNote} />
        {shownNotes.length === 0 &&
          (term.trim() !== "" ? (
            <p>There are no match results. Try another search.</p>
          ) : (
            <p>
              There are no notes; please create a new one using the creation
              note input.
            </p>
          ))}
        <div className={"notes"}>{renderNotes()}</div>
      </div>
    </>
  );
}

export default Notes;
