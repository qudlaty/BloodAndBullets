import React from 'react';
import './EntityView.css';

export default function EntityView(props) {
  return (
    <div className="entity">
      <div className="position" title="Position">
        <span>[{props.entity.position.x}, {props.entity.position.y}]</span>
      </div>

      <strong title="Name">{props.entity.name}</strong>
      <em title="Age"> ({props.entity.age})</em><br />
      <span>HP: {props.entity.hp}/{props.entity.maxHp}</span>
      <progress
        title="HP"
        max={props.entity.maxHp}
        value={props.entity.hp}
        percent={~~(props.entity.hp * 100 / props.entity.maxHp)}
      >
      </progress>
    </div>
  );
}
