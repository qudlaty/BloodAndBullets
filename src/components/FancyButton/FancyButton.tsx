import React, { ReactNode } from "react";
import "./FancyButton.scss";

interface FancyButtonProps {
  className?: string;
  title?: string;
  children?: ReactNode | ReactNode[];
  width?: string;
  height?: string;
  textColor?: string;
  backgroundColor?: string;
  sideBorderWidthInPixels?: number;
  sideBorderColor?: string;
  sideBorderStyle?: BorderStyle;
}

export enum BorderStyle {
  solid = "solid",
  dashed = "dashed",
  dotted = "dotted",
}
/** A panel that slides in from the right */
export function FancyButton({
  title,
  children,
  className,
  width,
  height,
  textColor,
  backgroundColor,
  sideBorderWidthInPixels,
  sideBorderColor,
  sideBorderStyle = BorderStyle.dashed,
}: FancyButtonProps) {
  const baseClassName = `fancy-button`;
  const finalClassName = `
    ${baseClassName} 
    ${className || ""}
  `;

  const dynamicStyle = {
    width,
    height,
    ...(textColor && { "--text-color": `${textColor}` }),
    ...(backgroundColor && { "--background-color": `${backgroundColor}` }),
    ...(sideBorderWidthInPixels && { "--side-border-width": `${sideBorderWidthInPixels}px` }),
    ...(sideBorderColor && { "--side-border-color": sideBorderColor }),
    ...(sideBorderStyle && { "--side-border-style": sideBorderStyle }),
  };
  return (
    <div className={finalClassName} title={title} style={dynamicStyle}>
      {children || "Primary Activation Taster"}
    </div>
  );
}
