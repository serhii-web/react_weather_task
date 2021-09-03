import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card } from '../Card';
import './Cards.scss';
 
export const Cards = ({ list }) => (
  <ul className="list">
    {list.map(el => (
      <li
        key={uuidv4()}
        className="list--item"
      >
        <Card {...el}/>
      </li>
    ))}
  </ul>
)
