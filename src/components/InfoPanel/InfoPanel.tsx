import React, { ReactNode, useState } from "react";
import "./InfoPanel.scss";
import { Item } from "services";
import { HudPanel } from "components/HudPanel";

interface InfoPanelProps {
  className?: string;
  title?: string;
  item: Item;
  onClose?: () => void;
}
/** A panel that slides in from the right */
export function InfoPanel({ title, className, item, onClose }: InfoPanelProps) {
  const baseClassName = `info-panel`;
  const finalClassName = `
    ${baseClassName} 
    ${className || ""}
  `;

  return (
    <div className={finalClassName}>
      <div className="info-panel__title" title={title}>
        {title} {title && item?.name && "-"} {item?.name}
      </div>
      <button className="info-panel__close-button" onClick={onClose}>
        X
      </button>
      <div className={"info-panel__content"}>
        {item?.description && (
          <HudPanel title="Description">
            <>{item?.description}</>
          </HudPanel>
        )}
        {item?.manufacturer && (
          <HudPanel title="Manufacturer">
            <>{item?.manufacturer}</>
          </HudPanel>
        )}
        {item?.previousOwners && (
          <HudPanel title="Previous owners">
            <ul>{item?.previousOwners.map(item => <li key={item}>{item}</li>)}</ul>
          </HudPanel>
        )}
        {item && (
          <HudPanel title="Stats">
            <ul>
              {Object.entries(item)
                .filter(entry => typeof entry[1] === "number")
                .sort((entryA, entryB) => entryA[0].localeCompare(entryB[0]))
                .map(entry => (
                  <li key={entry[0]}>{entry[0] + ": " + entry[1]}</li>
                ))}
            </ul>
          </HudPanel>
        )}
      </div>
    </div>
  );
}
