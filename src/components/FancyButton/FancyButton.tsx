import React, { ReactNode, useState } from "react";
import "./FancyButton.scss";

interface FancyButtonProps {
  className?: string;
  title?: string;
  children?: ReactNode | ReactNode[];
}
/** A panel that slides in from the right */
export function FancyButton({ title, children, className }: FancyButtonProps) {
  const baseClassName = `fancy-button`;
  const finalClassName = `
    ${baseClassName} 
    ${baseClassName + `-outer`}
    ${className || ""}
  `;

  return (
    <div className={finalClassName} title={title}>
      <div className={`${baseClassName + `-inner`}`}>{children || "Primary Activation Taster"}</div>
    </div>
  );
}
