import React from "react";
import './ColorOptions.styles.css';
function NewNote({ changeColor }) {

  const colorOptions = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "darkblue",
    "purple",
    "pink",
    "brown",
    "gray",
  ];

  return (
    <div className="colors">
      {colorOptions.map((color) => {
        return (
          <div
            className={`color-option ${color}`}
            onClick={() => changeColor(color)}
          ></div>
        );
      })}
    </div>
  );
}

export default NewNote;
