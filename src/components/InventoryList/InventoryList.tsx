import React, { useState } from "react";
import "./InventoryList.scss";
import { Item, RangedWeapon } from "services";
import { InventoryItem } from "components/InventoryItem";

interface InventoryListProps {
  className?: string;
  label: string;
  title: string;
  interactButtonText: string;
  onInteract?(itemName: string);
  onDrop?(itemName: string);
  onReload?(weapon: RangedWeapon);
  onClose?();
  inventory?: Item[]; //
  shorterDisplay?: boolean;
  processInterface: () => void;
}

export function InventoryList(props: InventoryListProps) {
  const baseClassName = `inventory-list`;

  const isExpandedInitialState = true;
  const [isExpanded, setIsExpanded] = useState(isExpandedInitialState);

  const finalClassName = `
    ${baseClassName} ${baseClassName}${isExpanded ? "--expanded" : "--collapsed"} ${props.className || ""}
  `;

  const inventoryItems = props.inventory?.map(item => (
    <InventoryItem
      key={`i${item.name}`}
      item={item}
      interactButtonText={props.interactButtonText}
      shorterDisplay={props.shorterDisplay}
      onInteract={props.onInteract}
      onDrop={props.onDrop}
      onReload={props.onReload}
      processInterface={props.processInterface}
    />
  ));

  const componentClassName = "inventory-list";

  return (
    <div className={finalClassName}>
      {props.label && <div className={`${componentClassName}__label`}>{props.label}</div>}
      {props.onClose && (
        <button
          onClick={props.onClose}
          className={`
            ${componentClassName}__button
            ${componentClassName}__button-close
          `}
        >
          X
        </button>
      )}
      <div className={`${componentClassName}__items`} title={props.title}>
        {inventoryItems}
        {props.inventory?.length > 0 ? null : props.label && <span className="is-empty">is empty</span>}
      </div>
    </div>
  );
}
