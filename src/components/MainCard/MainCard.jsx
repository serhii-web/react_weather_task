import React from 'react';
import './MainCard.scss';

export const MainCard = React.memo(({ weather }) => {
  return (
    <div className="weather">
      <section className="weather--container">
        <div>
          <img className="icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
        </div>
        <div className="weather--container__about">
          <span className="weather--container__name">{weather.name}</span>
            <div className="temp">
              <span className="temp__degre">{Math.round(weather.main.temp - 273.15)}</span>
              <span className="temp__celsius">C</span>
            </div>
        </div>
      </section>
    </div>
  )
})