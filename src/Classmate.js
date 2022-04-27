import React from "react";

const Classmate = ({ classmate, updateClassmate }) => {
  console.log("Classmate", classmate);
  return (
    <article className="classmate" data-testid="classmate">
      <h3>{classmate.name}</h3>
      <div className="classmate-controls">
        <label className="classmate-friend">
          <input
            type="checkbox"
            checked={classmate.friend}
            onChange={(e) => {
              updateClassmate(classmate.id, e.target.checked);
            }}
          />{" "}
          friend
        </label>
      </div>
    </article>
  );
};

export default Classmate;
