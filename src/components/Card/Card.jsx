import React from "react";
import classnames from 'classnames';
import './Card.scss';

export const Card = ({ main, weather, dt_txt }) => {
  return (
    <div className={classnames("element", {
        "cold-weather":  Math.round(main.temp - 273.15) <= -10,
        "cool-weather":  Math.round(main.temp - 273.15) === 10,
        "hot-weather":  Math.round(main.temp - 273.15) >= 30
      })}>
      <div className="element--time">
        <span>{+(dt_txt.split(' ')[1].split(':')[0])}</span>
      </div>
      <div>
        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
      </div>
      <div className="element--temp">
        <span>{Math.round(main.temp - 273.15)}</span>
      </div>

    </div>
  )
}