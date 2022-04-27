import React, { useState } from "react";

const NewClassmate = ({ addClassmate }) => {
  const [name, setName] = useState("");
  return (
    <div className="new-classmate">
      <input
        data-testid="name-input"
        className="new-classmate-input"
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          if (name) {
            addClassmate(name);
            setName("");
          }
        }}
      >
        Add
      </button>
    </div>
  );
};

export default NewClassmate;
