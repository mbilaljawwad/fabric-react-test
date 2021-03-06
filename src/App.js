import React, { useState, useEffect } from "react";
import Classmates from "./Classmates";
import NewClassmate from "./NewClassmate";
import Buttons from "./Buttons";
import { initialClassmates } from "./initialData";
import { v4 as uuidv4 } from "uuid";

const findIndex = (arr, id) => {
  let index = -1;
  for (let i = 0; i <= arr.length - 1; i++) {
    const _classmate = arr[i];
    if (_classmate.id === id) {
      index = i;
      break;
    }
  }
  return index;
};

const App = () => {
  const [classmates, setClassmates] = useState(initialClassmates);

  const addClassmate = (name) => {
    const classmate = {
      id: uuidv4(),
      name,
      friend: false,
    };
    const newClassmates = [classmate, ...classmates];
    setClassmates(newClassmates);
  };

  const updateClassmate = (classmateId, checked) => {
    setClassmates((prevClassmates) => {
      const index = findIndex(prevClassmates, classmateId);
      prevClassmates[index].friend = checked;
      return [...prevClassmates];
    });
  };

  return (
    <div className="app" data-testid="app">
      <NewClassmate addClassmate={addClassmate} />
      <Buttons />
      <Classmates classmates={classmates} updateClassmate={updateClassmate} />
    </div>
  );
};

export default App;
