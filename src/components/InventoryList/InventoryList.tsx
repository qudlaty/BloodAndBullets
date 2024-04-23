import React, { useState } from "react";
import "./InventoryList.scss";
import { Item, RangedWeapon } from "services";
import { InventoryItem } from "components/InventoryItem";

interface InventoryListProps {
  className?: string;
  label: string;
  title: string;
  interactButtonText: string;
  onClick(itemName: string);
  onDrop(itemName: string);
  onReload?(weapon: RangedWeapon);
  inventory: Item[]; //
  processInterface: () => void;
}

export function InventoryList(props: InventoryListProps) {
  const baseClassName = `inventory-list`;

  const isExpandedInitialState = true;
  const [isExpanded, setIsExpanded] = useState(isExpandedInitialState);
  if (!props.inventory) {
    return null;
  }

  const finalClassName = `
    ${baseClassName} ${baseClassName}${isExpanded ? "--expanded" : "--collapsed"} ${props.className || ""}
  `;

  const inventoryItems = props.inventory.map(item => (
    <InventoryItem
      key={`i${item.name}`}
      item={item}
      interactButtonText={props.interactButtonText}
      onClick={props.onClick}
      onDrop={props.onDrop}
      onReload={props.onReload}
      processInterface={props.processInterface}
    />
  ));

  const handleLabelClick = () => setIsExpanded(isExpanded => !isExpanded);

  return (
    <div className={finalClassName}>
      {props.label && <div className="inventory-list__label">{props.label}</div>}
      <div className="inventory-list__items" title={props.title}>
        {inventoryItems}
        {props.inventory.length == 0 ? "is empty" : null}
      </div>
    </div>
  );
}
