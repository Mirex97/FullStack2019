import React, { useState, useEffect } from "react";
import axios from "axios";

const compare = function(a, b) {
  if (a.toUpperCase().startsWith(b.toUpperCase())) {
    return true;
  } else {
    return false;
  }
};

const Weather = props => {
  if (props.data.length != 0) {
    return (
      <div>
        <h3>Weather in {props.country.capital}</h3>
        <b>temperature:</b> {props.data.current.temp_c} Celcius <br />
        <img src={props.data.current.condition.icon} /> <br />
        <b>wind: </b> {props.data.current.wind_kph} kph direction{" "}
        {props.data.current.wind_dir}
      </div>
    );
  } else {
    return <div />;
  }
};

const Country = props => {
  const [data, setData] = useState([]);

  const hook = () => {
    axios
      .get(
        "https://api.apixu.com/v1/current.json?key=649db6ba8ec140ab8df140255190402&q=" +
          props.country.name
      )
      .then(response => {
        setData(response.data);
      });
  };
  useEffect(hook, []);

  return (
    <div>
      <h2>{props.country.name}</h2>
      capital {props.country.capital} <br />
      population {props.country.population}
      <h3>languages</h3>
      <ul>
        {props.country.languages.map((lang, index) => (
          <li key={index}>{lang.name}</li>
        ))}
      </ul>
      <img src={props.country.flag} width="200" height="200" />
      <Weather country={props.country} data={data} />
    </div>
  );
};

const Countries = props => {
  if (props.search === "") {
    return <div />;
  }

  let y = 0;
  var x;
  for (x = 0; x < props.countries.length; x++) {
    if (compare(props.countries[x].name, props.search)) {
      y++;
    }
  }

  if (y > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (y > 1) {
    const result = props.countries.filter(country =>
      compare(country.name, props.search)
    );
    return result.map((country, index) => (
      <div key={index}>
        {country.name}{" "}
        <button onClick={() => props.setNewCountry(country.name)}>show</button>
      </div>
    ));
  }

  const result = props.countries.filter(country =>
    compare(country.name, props.search)
  );
  return result.map((country, index) => (
    <Country key={index} country={country} />
  ));
};

const App = () => {
  const [country, setNewCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const handleCountryChange = event => {
    setNewCountry(event.target.value);
  };

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  };
  useEffect(hook, []);

  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        <div>
          find countries{" "}
          <input value={country} onChange={handleCountryChange} />
        </div>
      </form>
      <Countries
        search={country}
        countries={countries}
        setNewCountry={setNewCountry}
      />
    </div>
  );
};

export default App;
