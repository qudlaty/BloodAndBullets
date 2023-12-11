import React from "react";
import "./LinearDisplay.scss";

interface LinearDisplayProps {
  className?: string;
  current: number;
  max: number;
  title?: string;
  label?: string;
}

export function LinearDisplay(props: LinearDisplayProps) {
  let className = `linear-display ${props.className || ""}`;
  let percentage = ~~((props.current * 100) / props.max);
  const overload = percentage > 100;
  const negative = percentage < 0;
  if (overload) {
    percentage = 100;
    className += " linear-display--overloaded";
  }
  if (negative) {
    percentage = 0;
  }
  const progressStyle = {
    width: `${percentage}%`,
  };
  const title = props.title || `${props.current}/${props.max}`;

  let amount = props.current;

  let divider = 1;
  if (props.max >= 40 && props.max < 100) {
    divider = 5;
  } else if (props.max >= 100) {
    divider = 10;
  }

  amount = amount / divider;

  const gridSize = 100 / amount;

  let color = `rgba(200,200,200,0.4)`;
  color = `black`;
  const progressGridStyle = {
    backgroundSize: `${gridSize}% 100%`,
    backgroundImage: `
      linear-gradient(to left, ${color} 1px, transparent 1px)
    `,
  };

  Object.assign(progressStyle, progressGridStyle);

  return (
    <div className={className}>
      <div className="linear-display__label">
        {props.label}
        {props.label ? ":" : ""}&nbsp;
      </div>
      <div className="linear-display__bar-container" title={title}>
        <div className="linear-display__bar-progress" style={progressStyle}>
          <span className="linear-display__bar-progress-text">
            {props.current}
            {overload ? "/" + props.max : ""}&nbsp;
          </span>
        </div>
      </div>
      <div>&nbsp;</div>
    </div>
  );
}
