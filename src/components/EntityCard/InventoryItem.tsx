import React from "react";
import { RangedWeapon } from "../../services/EntitiesValues";
import LinearDisplay from "./LinearDisplay";

interface InventoryItemProps {
  item: RangedWeapon;
  onDrop(itemName: string);
  onClick(itemName: string);
  processInterface: Function;
}

export default function InventoryItem(props: InventoryItemProps) {
  let { item } = props;
  let reloadButton;
  let dropButton;

  if (item.reload) {
    // has reload capability
    let className = " inventory-list__reload-button ";

    if (item.rounds === 0 || item.rounds === "empty") {
      className += " inventory-list__reload-button--empty ";
    } else if (item.rounds < item.maxRounds) {
      className += " inventory-list__reload-button--partial ";
    }
    reloadButton = (
      <button
        className={className}
        onClick={() => {
          item.reload();
          props.processInterface();
        }}
      >
        Reload
      </button>
    );
  } else {
    reloadButton = null;
  }
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

  let renderAmmo = item.reload ? <LinearDisplay label="Rounds" current={item.rounds} max={item.maxRounds} /> : null;

  return (
    <div key={item.name}>
      <div onClick={() => props.onClick(item.name)} key={item.name} className="inventory-list__item">
        <span>{item.name}</span>
        <div>{renderAmmo}</div>
      </div>
      {reloadButton}
      {dropButton}
    </div>
  );
}
