import React, { useState } from "react";
import { useNotesContext } from "../../utils/contexts/NotesContext";
import ColorOptions from "../ColorOptions";
import "./Modal.styles.css";
function Modal(props) {
  const { note, closeEditing } = props;
  const { notes, saveNotes } = useNotesContext();
  const [values, setValues] = useState(note);
  const [openMenu, setOpenMenu] = useState(false);


  const { title, text, color } = values;

  const editNote = () =>{
    const newList = [...notes];
    const edited = newList.find((f) => f.id === note.id);
    edited.title = values.title;
    edited.text = values.text;
    edited.color = values.color;
    saveNotes(newList);
    console.log(newList);
    closeEditing();
  };

  const changeColor = (color) => {
    if (color === values.color) setValues({ ...values, color: "default" });
    else setValues({ ...values, color: color });
    setOpenMenu(false);
  };


  return (
    <>
      <div className="modal-window">
        <div className={color}>
        <input
            className="note-input"
            placeholder="Title"
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
          <br />
          <textarea
            className="note-input"
            value={text}
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
            <label className="button" onClick={()=>{console.log('from modal'); closeEditing()}}>
              Cancel
            </label>
            <label className="button" onClick={editNote}>
              Save
            </label>
          </div>
          {openMenu && (
            <ColorOptions
            changeColor={changeColor}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;
