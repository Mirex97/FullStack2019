import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Content = props => {
  return (
    <div>
      <Part content={props.contents[0]}/>
      <Part content={props.contents[1]}/>
      <Part content={props.contents[2]}/>
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
  return <p>yhteensä {props.sum} tehtävää</p>;
};

const App = () => {
  const course = "Half Stack -sovelluskehitys";
  const part1 = {
    name: "Reactin perusteet",
    exercises: 10
  };
  const part2 = {
    name: "Tiedonvälitys propseilla",
    exercises: 7
  };
  const part3 = {
    name: "Komponenttien tila",
    exercises: 14
  };

  return (
    <div>
      <Header course={course} />
      <Content
        contents={[part1, part2, part3]}
      />
      <Total sum={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
