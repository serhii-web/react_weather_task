import React, { useEffect, useState } from 'react';
import './App.scss';
import classnames from 'classnames';
import { MainCard } from './components/MainCard'
import { getWeather } from './api/getWether'
import { Form } from './components/Form';
import { Cards } from './components/Cards';


//С=К - 273.15 переведення в цельсії з кельвінів 

function App() {
  const [geo, setGeo] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [list, setList] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((coords) => {
      setGeo(coords)
    })

  }, [])

  useEffect(() => {
    if (geo) {
      getWeather(`weather?lat=${geo.coords.latitude}&lon=${geo.coords.longitude}`)
        .then(res => {
          setWeather(res)
          setError(null)
        })
        .catch(setError);
    }

  }, [geo]);

  useEffect(() => {
    if (weather) {
      getWeather(`forecast?q=${weather.name}`)
      .then(res => res.list)
      .then(setList)
    }
  }, [weather]);

  return (
    <div className="App">
      <div className="header">
        {}
        <Form onAdd={setWeather} onError={setError}/>
      </div>
      <div className="error">
        {error && <span className="error--mesage">{error.statusText}</span>}
      </div>
      <div className={classnames("location", {
        "cold-weather": weather && Math.round(weather.main.temp - 273.15) <= -10,
        "cool-weather": weather && Math.round(weather.main.temp - 273.15) === 10,
        "hot-weather": weather && Math.round(weather.main.temp - 273.15) >= 30
      })}>
        {weather && <div>
          <section>
            <MainCard weather={weather} />
          </section>
          <section>
            <Cards list={list.slice(0, 5)}/>
          </section>

        </div>}
      </div>
    </div>
  );
};

export default App;
