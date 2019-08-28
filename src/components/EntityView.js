import React from 'react';
import './EntityView.css';

export default function EntityView(props) {
  return (
    <div
      className="entity"
    >
      <strong>{props.entity.name}</strong>
      <em> Aged: {props.entity.age} </em><br />
      <progress max="100" value={props.entity.hp}>
      </progress>
    </div>
  );
}
