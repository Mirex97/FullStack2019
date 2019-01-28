import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Content = props => {
  return (
    <div>
      <Part content={props.contents[0]} />
      <Part content={props.contents[1]} />
      <Part content={props.contents[2]} />
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
  return <p>yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää</p>;
};

const App = () => {
  const course = "Half Stack -sovelluskehitys";
  const parts = [
    {
      name: "Reactin perusteet",
      exercises: 10
    },
    {
      name: "Tiedonvälitys propseilla",
      exercises: 7
    },
    {
      name: "Komponenttien tila",
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course} />
      <Content contents={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
