import React from "react";
import './CitysList.scss'

export const CitysList = ({ citys, onAdd }) => (
  <ul className="citys">
    {citys.map(city => {
      return <li
        className="citys--item"
        key={city.id}
        onClick={() => onAdd(city)}
      >
        <span className="citys--name">{city.place_name}</span>
      </li>
    })}
  </ul>
)