import React from "react";
import personManager from "./Communication";

const deletePerson = (a, setPersons) => {
  if (window.confirm(`Poistetaanko ${a.name}`)) {
    personManager.remove(a.id).then(
      personManager.getAll().then(response => {
        setPersons([].concat(response));
      })
    );
  }
};

const Person = props => {
  if (props.filter === "") {
    return (
      <div>
        {props.person.name} {props.person.number}{" "}
        <button onClick={() => deletePerson(props.person, props.setPersons)}>
          poista
        </button>
      </div>
    );
  }

  if (props.person.name.toUpperCase().startsWith(props.filter.toUpperCase())) {
    return (
      <div>
        {props.person.name} {props.person.number} <button>poista</button>
      </div>
    );
  } else {
    return <div />;
  }
};

const Persons = props => {
  return props.persons.map((person, index) => (
    <Person
      filter={props.filter}
      key={index}
      person={person}
      setPersons={props.setPersons}
    />
  ));
};

const PersonForm = props => {
  return (
    <form onSubmit={props.addName}>
      <div>
        nimi: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        numero:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
};

const Filter = props => {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <div>
        rajaa näytettäviä:{" "}
        <input value={props.filter} onChange={props.handleFilterChange} />
      </div>
    </form>
  );
};
export { Persons, Filter, PersonForm };
