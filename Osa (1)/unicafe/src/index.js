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
      {props.name} {props.result} <br />
    </div>
  );
};

const Sum = function(values) {
  const sum = values.good + values.neutral + values.bad;
  return sum;
};

const Average = function(values) {
  const average = values.good - values.bad;
  const summa = Sum(values);
  let x = average / summa;
  if (isNaN(x)) {
    x = 0;
  }
  return x;
};

const Positives = function(values) {
  let x = (values.good / Sum(values)) * 100;
  if (isNaN(x)) {
    x = 0;
  }
  return x;
};

const Details = props => {
  return (
    <div>
      yhteensä {Sum(props.feedback)} <br />
      keskiarvo {Average(props.feedback)} <br />
      positiivisia {Positives(props.feedback)} % <br />
    </div>
  );
};

const App = () => {
  const buttonGood = () => {
    const newFeedback = {
      ...feedback,
      good: feedback.good + 1
    };
    setFeedback(newFeedback);
  };
  const buttonNeutral = () => {
    const newFeedback = {
      ...feedback,
      neutral: feedback.neutral + 1
    };
    setFeedback(newFeedback);
  };
  const buttonBad = () => {
    const newFeedback = {
      ...feedback,
      bad: feedback.bad + 1
    };
    setFeedback(newFeedback);
  };

  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  return (
    <div>
      <Feedback />
      <button onClick={buttonGood}>hyvä</button>
      <button onClick={buttonNeutral}>neutraali</button>
      <button onClick={buttonBad}>neutraali</button>
      <Statistics />
      <Results name="hyvä" result={feedback.good} />
      <Results name="neutraali" result={feedback.neutral} />
      <Results name="huono" result={feedback.bad} />
      <Details feedback={feedback} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
