import React, { useState, useEffect } from "react";
import personManager from "./Communication";
import { Persons, Filter, PersonForm } from "./Components";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [goodMessage, setGoodMessage] = useState(null);

  useEffect(() => {
    personManager.getAll().then(response => {
      setPersons(response);
    });
  }, []);

  const handleNameChange = event => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    event.preventDefault();
    setNewFilter(event.target.value);
  };

  const addName = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    };
    var foundId;
    if (
      persons.some(({ name, id }) => {
        foundId = id;
        return name.toUpperCase() === newName.toUpperCase();
      })
    ) {
      if (
        window.confirm(
          `${newName} on jo luettelossa, korvataanko vanha numero uudella?`
        )
      ) {
        personManager.update(foundId, nameObject).then(response => {
          personManager.getAll().then(response => {
            setPersons([].concat(response));
          });
        });

        setGoodMessage(
          `Puhelinnumero vaihdettu onnistuneesti`
        );
        setTimeout(() => {
          setGoodMessage(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      }
    } else {
      personManager.create(nameObject).then(response => {
        setPersons(persons.concat(response));

        setGoodMessage(
          `Lisättiin ${nameObject.name}`
        );
        setTimeout(() => {
          setGoodMessage(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      });
    }
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Notification message={goodMessage} type="good" />

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

      <Persons filter={filter} persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
