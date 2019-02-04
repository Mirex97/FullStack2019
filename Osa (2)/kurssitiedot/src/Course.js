import React from "react";

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Content = props => {
  return (
    <div>
      {props.contents.map((cont, index) => (
        <Part key={index} content={cont} />
      ))}
    </div>
  );
};

const Part = props => {
  return (
    <p>
      {props.content.name} {props.content.exercises}
    </p>
  );
};

const Total = props => {
  const total = props.parts
    .map(part => part.exercises)
    .reduce((s, p) => {
      return s + p;
    });
  return <p>yhteensä {total} tehtävää</p>;
};

const Course = props => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content contents={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export default Course;
