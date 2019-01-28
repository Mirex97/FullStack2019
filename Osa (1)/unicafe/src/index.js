import React, { useState } from "react";
import ReactDOM from "react-dom";

const Feedback = props => {
  return <h1>anna palautetta</h1>;
};

const Statistics = props => {
  if (
    props.feedback.good === 0 &&
    props.feedback.neutral === 0 &&
    props.feedback.bad === 0
  ) {
    return (
      <div>
        <h1>statistiikka</h1>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    );
  }
  return (
    <div>
      <h1>statistiikka</h1>
      <Statistic name="hyvä" stat={props.feedback.good} />
      <Statistic name="neutraali" stat={props.feedback.neutral} />
      <Statistic name="huono" stat={props.feedback.bad} />
      <Statistic name="yhteensä" stat={Sum(props.feedback)} />
      <Statistic name="keskiarvo" stat={Average(props.feedback)} />
      <Statistic name="positiivisia" stat={Positives(props.feedback)} />
    </div>
  );
};

const Statistic = props => {
  return (
    <div>
      {props.name} {props.stat} <br />
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
  x = x + " %";
  return x;
};

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const setGood = () => {
    const newFeedback = {
      ...feedback,
      good: feedback.good + 1
    };
    setFeedback(newFeedback);
  };
  const setNeutral = () => {
    const newFeedback = {
      ...feedback,
      neutral: feedback.neutral + 1
    };
    setFeedback(newFeedback);
  };
  const setBad = () => {
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
      <Button handleClick={() => setGood()} text="hyvä" />
      <Button handleClick={() => setNeutral()} text="neutraali" />
      <Button handleClick={() => setBad()} text="huono" />
      <Statistics feedback={feedback} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
