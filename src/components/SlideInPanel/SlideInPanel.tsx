import React, { ReactNode, useState } from "react";
import "./SlideInPanel.scss";

interface SlideInPanelProps {
  className?: string;
  title?: string;
  children: ReactNode | ReactNode[];
  initiallyOpen: boolean;
}

export function SlideInPanel({ title, children, className, initiallyOpen }: SlideInPanelProps) {
  const initialState = initiallyOpen;
  const [isShown, setIsShown] = useState(initialState);
  const baseClassName = `slide-in-panel`;
  const finalClassName = `
    ${baseClassName} ${baseClassName}${isShown ? "--shown" : "--hidden"} ${className || ""}
  `;
  const handleTabClick = () => setIsShown(isShown => !isShown);

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
