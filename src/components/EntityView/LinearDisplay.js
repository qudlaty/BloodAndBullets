import React from 'react';
import './LinearDisplay.scss';
export default function LinearDisplay(props) {
  let className=`linear-display ${props.className || ''}`
  let percentage = ~~(props.current * 100 / props.max);
  let progressStyle = {
    width: `${percentage}%`,
  }
  let title = props.title || `${props.current}/${props.max}`;
  return (
    <div className={className}>
      <div className="linear-display__label">{props.label}:&nbsp;</div>
      <div className="linear-display__bar-container"
        title={title}
      >
        <div className="linear-display__bar-progress" style={progressStyle}>
          <span className="linear-display__bar-progress-text">{props.current}&nbsp;</span>
        </div>
      </div>
      <div>&nbsp;</div>
    </div>
  );
}
