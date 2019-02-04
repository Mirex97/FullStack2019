import React from "react";

const Person = props => {
  if (props.filter === "") {
    return (
      <div>
        {props.person.name} {props.person.number}
      </div>
    );
  }

  if (props.person.name.toUpperCase().startsWith(props.filter.toUpperCase())) {
    return (
      <div>
        {props.person.name} {props.person.number}
      </div>
    );
  } else {
    return <div />;
  }
};

const Persons = props => {
  return props.persons.map((person, index) => (
    <Person filter={props.filter} key={index} person={person} />
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
export { Persons, Filter, PersonForm};
