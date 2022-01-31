import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./Note.styles.css";

function Note({ note, deleteNote, archiveNote }) {
  const [editing, setEditing] = useState(false);
  const { title, text, color, id } = note;

  const closeEditing = () => setEditing(!editing);
  return (
    <>
    <div className={`note ${color}`} onClick={closeEditing}>
      <h4>{title}</h4>
      <p>{text}</p>
      <div className="buttons">
        <div className="tooltip">
          <img
            className="icon"
            onClick={() => archiveNote(id)}
            alt="archive"
            src="/icons/archive-black.png"
          />
          <span className="tooltiptext">Archive</span>
        </div>
        <div className="tooltip">
          <img
            className="icon"
            alt="trash"
            src="/icons/trash.png"
            onClick={() => deleteNote(id)}
          />
          <span className="tooltiptext">Delete note</span>
        </div>
      </div>
      
    </div>
    {editing && (
      <Modal note={note} closeEditing={closeEditing} editing={editing} />
    )}
    </>
  );
}

export default Note;
