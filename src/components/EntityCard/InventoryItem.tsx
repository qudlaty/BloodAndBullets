import React from "react";
import { RangedWeapon, Item } from "../../services/EntitiesValues";
import LinearDisplay from "./LinearDisplay";

interface InventoryItemProps {
  item: Item;
  onDrop(itemName: string);
  onClick(itemName: string);
  processInterface: Function;
}

export default function InventoryItem(props: InventoryItemProps) {
  let { item } = props;
  let reloadButton;
  let dropButton;
  let ammoCounter;

  if (props.onDrop) {
    dropButton = (
      <button
        className="inventory-list__drop-button"
        onClick={() => {
          props.onDrop(item.name);
        }}
      >
        Drop
      </button>
    );
  }

  if (item instanceof RangedWeapon) {
    let weapon = item as RangedWeapon;

    if (weapon.reload) {
      // has reload capability
      let className = " inventory-list__reload-button ";

      if (weapon.rounds === 0 || weapon.rounds === "empty") {
        className += " inventory-list__reload-button--empty ";
      } else if (weapon.rounds < weapon.maxRounds) {
        className += " inventory-list__reload-button--partial ";
      }
      reloadButton = (
        <button
          className={className}
          onClick={() => {
            weapon.reload();
            props.processInterface();
          }}
        >
          Reload
        </button>
      );
    } else {
      reloadButton = null;
    }

    ammoCounter = weapon.reload ? (
      <LinearDisplay label="Rounds" current={weapon.rounds} max={weapon.maxRounds} />
    ) : null;
  }

  return (
    <div key={item.name}>
      <div onClick={() => props.onClick(item.name)} key={item.name} className="inventory-list__item">
        <span>{item.name}</span>
        <div>{ammoCounter}</div>
      </div>
      {reloadButton}
      {dropButton}
    </div>
  );
}
