import React, { ReactNode, useState } from "react";
import "./SlideInPanel.scss";

interface SlideInPanelProps {
  className?: string;
  title?: string;
  children: ReactNode | ReactNode[];
  initiallyOpen: boolean;
}

export function SlideInPanel({ title, children, className, initiallyOpen }: SlideInPanelProps) {
  const [isShownValueForCurrentRender, setIsShownValueForNextRender] = useState(initiallyOpen);
  const baseClassName = `slide-in-panel`;
  const finalClassName = `
    ${baseClassName} 
    ${baseClassName}${isShownValueForCurrentRender ? "--shown" : "--hidden"} 
    ${className || ""}
  `;
  const handleTabClick = () => {
    setIsShownValueForNextRender(previousValue => !previousValue);
  };

  return (
    <div className={finalClassName}>
      <div className="slide-in-panel__tab" onClick={handleTabClick} title={title}>
        {title}
      </div>
      <div className={"slide-in-panel__content"}>{children}</div>
    </div>
  );
}

enum ContainerEdgeSide {
  left = "left",
  right = "right",
  top = "top",
  bottom = "bottom",
}
