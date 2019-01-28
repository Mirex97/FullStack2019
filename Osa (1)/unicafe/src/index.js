import React, { useState } from "react";
import ReactDOM from "react-dom";

const Feedback = props => {
  return <h1>anna palautetta</h1>;
};

const Statistics = props => {
  return <h1>statistiikka</h1>;
};

const Results = props => {
  return (
    <div>
      <p>
        {props.name} {props.result}
      </p>
    </div>
  );
};

const App = () => {
  const buttonGood = () => {setGood(good + 1)};
  const buttonNeutral = () => {setNeutral(neutral + 1)};
  const buttonBad = () => {setBad(bad + 1)};

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  return (
    <div>
      <Feedback />
      <button onClick={buttonGood}>hyvä</button>
      <button onClick={buttonNeutral}>neutraali</button>
      <button onClick={buttonBad}>neutraali</button>
      <Statistics />
      <Results name="hyvä" result={good} />
      <Results name="neutraali" result={neutral} />
      <Results name="huono" result={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
