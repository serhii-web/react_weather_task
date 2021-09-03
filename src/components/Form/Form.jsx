import React, { useState, useEffect } from 'react';
import { getWeather } from '../../api/getWether';
import './Form.scss';

export const Form = ({ onAdd, onError }) => {
  const [city, setCity] = useState('london');
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    getWeather(`weather?q=${city}&appid=348d3054b4f5732453d1ab4bd9d80eca`)
      .then(res => {
        onError(null)
        onAdd(res)
      })
      .catch(onError)
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(inputValue.trim().length) {
      setCity(inputValue)
      setInputValue('')
    }
  }

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
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Button
          </button>
        </div>
      </form>
    </div>

  )
  
}