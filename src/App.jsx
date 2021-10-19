import React, { useEffect, useState } from 'react';
import './App.scss';
import classnames from 'classnames';
import { MainCard } from './components/MainCard'
import { getWeather } from './api/getData'
import { Form } from './components/Form';
import { Cards } from './components/Cards';

function App() {
  const [geo, setGeo] = useState([]);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setGeo([coords.latitude, coords.longitude]);
    });

  }, []);

  useEffect(() => {
    if (geo.length) {
      getWeather(`weather?lat=${geo[0]}&lon=${geo[1]}`)
        .then(res => {
          setWeather(res);
          setError(null);
        })
        .catch(setError);
    }

  }, [geo]);

  useEffect(() => {
    if (geo.length) {
      getWeather(`onecall?lat=${geo[0]}&lon=${geo[1]}&exclude=current,hourly,minutely`)
      .then(res => res.daily)
      .then(setList)
    }
  }, [geo]);

  return (
      <div className="App">
        <div className="header">
          <Form onError={setError} setGeo={setGeo}/>
        </div>
        <div className="error">
          {error && <span className="error--mesage">{error.statusText}</span>}
        </div>
        { weather && <div className={
          classnames(
          "location", {
          "cold-weather": weather && Math.round(weather.main.temp - 273.15) <= -10,
          "cool-weather": weather && Math.round(weather.main.temp - 273.15) === 10,
          "hot-weather": weather && Math.round(weather.main.temp - 273.15) >= 30
        })}>
          <div>
            <section>
              <MainCard weather={weather} />
            </section>
            <section>
              {!!list.length && <Cards list={list.slice(0, -1)}/>}
            </section>

          </div>
        </div>}
      </div>
  );
};

export default App;
