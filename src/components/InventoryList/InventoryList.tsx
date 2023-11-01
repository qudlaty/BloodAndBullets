import React from "react";
import "./InventoryList.scss";
import { Item, RangedWeapon } from "services";
import { InventoryItem } from "components/InventoryItem";

interface InventoryListProps {
  className?: string;
  label: string;
  title: string;
  onClick(itemName: string);
  onDrop(itemName: string);
  onReload(weapon: RangedWeapon);
  inventory: Item[]; //
  processInterface: Function;
}

export function InventoryList(props: InventoryListProps) {
  const className = `inventory-list ${props.className || ""}`;

  if (!props.inventory) {
    return null;
  }

  const inventoryItems = props.inventory.map((item) => (
    <InventoryItem
      key={`i${item.name}`}
      item={item}
      onClick={props.onClick}
      onDrop={props.onDrop}
      onReload={props.onReload}
      processInterface={props.processInterface}
    />
  ));

  return (
    <div className={className}>
      <div className="inventory-list__label">
        {props.label}
        :&nbsp;
      </div>
      <div className="inventory-list__items" title={props.title}>
        {inventoryItems}
      </div>
    </div>
  );
}
