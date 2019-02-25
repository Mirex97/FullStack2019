import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Increment = function(table, x) {
  const copy = [...table];
  copy[x] += 1;
  return copy;
};

const MostVotes = props => {
  let x = 0;
  var i;
  for (i = 0; i < props.anecdotes.length; i++) {
    if (props.votes[i] > props.votes[x]) {
      x = i;
    }
  }
  return (
    <div>
      {props.anecdotes[x]} <br />
      has {props.votes[x]} votes
    </div>
  );
};

const App = props => {
  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState(
    Array.apply(null, new Array(props.anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]} <br />
      has {points[selected]} votes <br />
      <Button
        handleClick={() => setPoints(Increment(points, selected))}
        text="vote"
      />
      <Button
        handleClick={() =>
          setSelected(Math.floor(Math.random() * props.anecdotes.length))
        }
        text="next anecdote"
      />
      <h1>Anecdote with most votes</h1>
      <MostVotes anecdotes={props.anecdotes} votes={points} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
