import React from 'react';
import "./Square.css";
export default function Square(props) {
  console.log("Rendering Square");
  return (
    <button 
      className="square" 
      onClick={() => props.onClick(props.squareId)}
    >
      {props.value}
    </button>
  );
}
