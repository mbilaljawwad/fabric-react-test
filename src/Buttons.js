import React from "react";

const Buttons = () => {
  return (
    <div className="buttons">
      <button data-testid="undo-button">Undo</button>
      <button data-testid="redo-button">Redo</button>
    </div>
  );
};

export default Buttons;
