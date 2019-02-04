import React, { useState } from "react";
import { Persons, Filter, PersonForm} from './Components';


const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Martti Tienari", number: "040-123456" },
    { name: "Arto Järvinen", number: "040-123456" },
    { name: "Lea Kutvonen", number: "040-123456" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");

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
