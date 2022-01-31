import React, { useState } from "react";
import ColorOptions from "../../components/ColorOptions";

function NewNote({ addNote }) {
  const [takingNote, setTakingNote] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [values, setValues] = useState({
    title: "",
    text: "",
    color: "default",
    archived: false,
  });

  const closeNote = () => {
    setTakingNote(false);
  };

  const saveNote = (isArchived) => {
    addNote({...values, archived: isArchived});
    setTakingNote(false);
    setValues({
      title: "",
      text: "",
      color: "default",
      archived: false,
    });
  };

  const changeColor = (color) => {
    if (color === values.color) setValues({ ...values, color: "default" });
    else setValues({ ...values, color: color });
    setOpenMenu(false);
  };

  return (
    <div style={{ margin: "auto" }}>
      {takingNote ? (
        <div className={`note-form ${values.color}`}>
          <input
            className="note-input"
            placeholder="Title"
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
          <br />
          <textarea
            className="note-input"
            placeholder="Take a note..."
            onChange={(e) => setValues({ ...values, text: e.target.value })}
          />
          <div className="buttons-add">
            <div className="tooltip-add">
              <img
                className="icon-add"
                alt="background"
                src="/icons/color-selector.png"
                onClick={() => setOpenMenu(!openMenu)}
              />
              <span className="tooltiptext-add">Background options</span>
            </div>
            <div className="tooltip-add">
              <img
                className="icon-add"
                alt="archive"
                src="/icons/archive-black.png"
                onClick={() => saveNote(true)}
              />
              <span className="tooltiptext-add">Archive</span>
            </div>
            <label className="button" onClick={closeNote}>
              Cancel
            </label>
            <label className="button" onClick={() => saveNote(false)}>
              Save
            </label>
          </div>
          {openMenu && (
            <ColorOptions
            changeColor={changeColor}
            />
          )}
          
        </div>
      ) : (
        <div className="note-form" onClick={() => setTakingNote(true)}>
          Take a note...
        </div>
      )}
    </div>
  );
}

export default NewNote;
