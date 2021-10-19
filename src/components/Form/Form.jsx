import React, { useState, useEffect, useCallback } from 'react';
import { CitysList } from '../CitysList';
import { getCitys } from '../../api/getData';
import './Form.scss';

const debounce = (f) => {
  let timer;

  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(f, 1000, value);
  };
};

export const Form = ({ setGeo, onError }) => {
  const [inputValue, setInputValue] = useState('');
  const [cityName, setCityName] = useState('');
  const [citys, setCitys] = useState([]);

  const apliedQuery = useCallback(debounce(setCityName), []);

  const handleChange = (value) => {
    if (!inputValue.trim() && citys.length) {
      setCitys([]);
    }

    setInputValue(value);
    apliedQuery(value);
  }

  useEffect(() => {
    if (!cityName) return;

    getCitys(cityName)
    .then(res => setCitys(res.features));
    
  }, [cityName]);

  const addCoords = (coord) => {
    const geo = coord.geometry.coordinates.reverse();
    setGeo(geo);
    setInputValue('');
    setCityName('');
    setCitys([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(citys.length) {
      addCoords(citys[0]);
    };
  };

  return (
    <div className="form">
      <form  onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Find city"
            aria-label="Find city"
            aria-describedby="button-addon2"
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
            disabled={!inputValue}
          >
            Button
          </button>
        </div>
        {(!!citys.length && !!inputValue) && <CitysList citys={citys} onAdd={addCoords}/>}
      </form>
    </div>
  )
};
