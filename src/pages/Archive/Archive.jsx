import React from "react";
import { useNotesContext } from "../../utils/contexts/NotesContext";
import Note from "../../components/Note";
function Notes() {
  const { notes, saveNotes } = useNotesContext();

  const renderNotes = () => {
    return notes
      .filter((f) => f.archived)
      .map((note) => {
        return <Note key={note.id} note={note} deleteNote={deleteNote} archiveNote={archiveNote} isArchived={true} />;
      });
  };

  function deleteNote(noteId) {
    const newList = notes.filter((f) => f.id !== noteId);
    saveNotes(newList);
  }

  function archiveNote(noteId) {
    const newList = [...notes];
    const archived = newList.find((f) => f.id === noteId);
    archived.archived = false;
    saveNotes(newList);
  }

  return (
    <>
      <div>
        {notes.find((f) => f.archived) ? (
          <div style={{ margin: "5%" }}>{renderNotes()}</div>
        ) : (
          <p>You don't have archived notes.</p>
        )}
      </div>
    </>
  );
}

export default Notes;
