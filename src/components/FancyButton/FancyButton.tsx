import React, { ReactNode } from "react";
import "./FancyButton.scss";

interface FancyButtonProps {
  className?: string;
  title?: string;
  children?: ReactNode | ReactNode[];
  width?: string;
  height?: string;

  textColor?: string;
  textColorHover?: string;
  textColorActive?: string;

  backgroundColor?: string;
  backgroundColorHover?: string;
  backgroundColorActive?: string;

  shadowColor?: string;
  shadowColorHover?: string;
  shadowColorActive?: string;

  sideBorderColor?: string;
  sideBorderColorHover?: string;
  sideBorderColorActive?: string;

  sideBorderWidthInPixels?: number;
  sideBorderStyle?: BorderStyle;
}

// eslint-disable-next-line react-refresh/only-export-components
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
  textColorHover,
  textColorActive,

  backgroundColor,
  backgroundColorHover,
  backgroundColorActive,

  sideBorderColor,
  sideBorderColorHover,
  sideBorderColorActive,

  shadowColor,
  shadowColorHover,
  shadowColorActive,

  sideBorderStyle = BorderStyle.dashed,
  sideBorderWidthInPixels,
}: FancyButtonProps) {
  const baseClassName = `fancy-button`;
  const finalClassName = `
    ${baseClassName} 
    ${className || ""}
  `;

  const cssVariableToPropMap = {
    "--text-color": textColor,
    "--text-color--hover": textColorHover,
    "--text-color--active": textColorActive,

    "--background-color": backgroundColor,
    "--background-color--hover": backgroundColorHover,
    "--background-color--active": backgroundColorActive,

    "--shadow-color": shadowColor,
    "--shadow-color--hover": shadowColorHover,
    "--shadow-color--active": shadowColorActive,

    "--side-border-color": sideBorderColor,
    "--side-border-color--hover": sideBorderColorHover,
    "--side-border-color--active": sideBorderColorActive,

    "--side-border-style": sideBorderStyle,
    ...(sideBorderWidthInPixels && { "--side-border-width": `${sideBorderWidthInPixels}px` }),
  };

  const dynamicStyle = {
    width,
    height,
    ...cssVariableToPropMap,
  };

  return (
    <div className={finalClassName} title={title} style={dynamicStyle}>
      {children || "Primary Activation Taster"}
    </div>
  );
}
