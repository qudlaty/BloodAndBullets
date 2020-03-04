import React from "react";
import "./InventoryList.scss";
import { Item, Entity, RangedWeapon } from "../../services/EntitiesValues";
import InventoryItem from "./InventoryItem";

interface InventoryListProps {
  className?: string;
  label: string;
  title: string;
  onClick(itemName: string);
  onDrop(itemName: string);
  inventory: Item[]; //
  processInterface: Function;
}

export default function InventoryList(props: InventoryListProps) {
  const className = `inventory-list ${props.className || ""}`;

  if (!props.inventory) {
    return null;
  }
  let reloadButton;
  let dropButton;

  const inventoryItems = props.inventory.map((item) => (
    <InventoryItem
      item={item}
      onClick={props.onClick}
      onDrop={props.onDrop}
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
