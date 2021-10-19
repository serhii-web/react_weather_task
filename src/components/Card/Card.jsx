import React from "react";
import classnames from 'classnames';
import './Card.scss';

export const Card = ({ dew_point, weather, dt }) => {
  const currentDate = new Date(dt * 1000)

  return (
    <div className={classnames("element", {
        "cold-weather":  Math.round(dew_point - 273.15) <= -10,
        "cool-weather":  Math.round(dew_point - 273.15) === 10,
        "hot-weather":  Math.round(dew_point - 273.15) >= 30
      })}>
      <div className="element--week-day">
        <span>{currentDate.toLocaleDateString("en-US", { weekday: 'long' })}</span>
      </div>
      <div>
        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
      </div>
      <div className="element--temp">
        <span>{Math.round(dew_point - 273.15)}</span>
      </div>

    </div>
  )
}