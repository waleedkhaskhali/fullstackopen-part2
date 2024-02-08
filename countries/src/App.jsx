import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [weatherData, setWeatherData] = useState([]);

  const API_key = "6d4448b63488971f72f5f90dacc2d396";

  const [filteredCountriesArray, setFilteredCountriesArray] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setAllCountries(response.data);
      });
  }, []);

  useEffect(() => {
    const filteredItems = allCountries.filter((name) => {
      return name.name.common
        .toLowerCase()
        .includes(countrySearch.toLowerCase());
    });
    if (countrySearch === "") {
      setFilteredCountriesArray([]);
    }
    setFilteredCountriesArray(filteredItems);
    console.log(
      "filtered countries array",
      filteredCountriesArray[0]?.latlng[0]
    );
    console.log("filtereditems", filteredItems);
  }, [countrySearch]);

  useEffect(() => {
    if (filteredCountriesArray.length === 1) {
      setLat(filteredCountriesArray[0].latlng[0]);
      setLon(filteredCountriesArray[0].latlng[1]);
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
      )
      .then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      });
    console.log(filteredCountriesArray[0]?.latlng[0]);
  }, [filteredCountriesArray]);

  return (
    <div>
      <h3>Find Countries</h3>
      <input onChange={(e) => setCountrySearch(e.target.value)}></input>
      <div>
        {countrySearch === "" ? (
          allCountries.map((country, id) => (
            <div key={id}>
              <h3>{country.name.common}</h3>
            </div>
          ))
        ) : filteredCountriesArray.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : filteredCountriesArray.length < 10 &&
          filteredCountriesArray.length > 1 ? (
          filteredCountriesArray.map((country, id) => (
            <div key={id}>
              <h1>{country.name.common}</h1>
              <button>show</button>
            </div>
          ))
        ) : filteredCountriesArray.length === 1 ? (
          filteredCountriesArray.map((country, id) => (
            <div key={id}>
              <h1>{country.name.common}</h1>
              <h3>{country.capital}</h3>
              <h3>{country.area}</h3>
              <img src={country.flags.png} />
              <h1>Weather in {country.capital}</h1>
              <h3>temperature {weatherData.main.temp}</h3>
              <h3>wind {weatherData.wind.speed} m/s</h3>
            </div>
          ))
        ) : (
          <div>No results to display</div>
        )}
      </div>
    </div>
  );
};

export default App;
