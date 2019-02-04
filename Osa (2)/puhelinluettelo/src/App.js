import React, { useState, useEffect } from "react";
import axios from "axios";
import { Persons, Filter, PersonForm } from "./Components";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then(response => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  };
  useEffect(hook, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };

  const addName = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    };
    if (
      persons.some(({ name }) => name.toUpperCase() === newName.toUpperCase())
    ) {
      alert(`${newName} on jo luettelossa`);
    } else {
      setPersons(persons.concat(nameObject));
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>lisää uusi</h3>

      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numerot</h3>

      <Persons filter={filter} persons={persons} />
    </div>
  );
};

export default App;
