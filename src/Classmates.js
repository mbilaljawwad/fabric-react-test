import React from "react";
import Classmate from "./Classmate";

const Classmates = ({ classmates = [], updateClassmate }) => {
  return (
    <section className="classmates">
      <h2>Classmates ({classmates.length})</h2>
      {classmates.map((classmate) => (
        <Classmate
          key={classmate.id}
          classmate={classmate}
          updateClassmate={updateClassmate}
        />
      ))}
    </section>
  );
};

export default Classmates;
