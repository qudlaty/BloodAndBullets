import React from "react";
import { Item, RangedWeapon } from "services";
import { LinearDisplay } from "components/LinearDisplay";

interface InventoryItemProps {
  item: Item;
  interactButtonText: string;
  onDrop(itemName: string);
  onReload?(weapon: RangedWeapon);
  onClick(itemName: string);
  processInterface: () => void;
}

export function InventoryItem(props: InventoryItemProps) {
  const { item } = props;
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
  const equipButton = (
    <button //
      className="inventory-list__equip-button"
      onClick={() => props.onClick(item.name)}
    >
      {props.interactButtonText}
    </button>
  );

  if (item instanceof RangedWeapon) {
    const weapon = item as RangedWeapon;

    if (weapon.reload && props.onReload) {
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
            props.onReload && props.onReload(weapon);
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
      <LinearDisplay className="full" label="Rounds" current={weapon.rounds} max={weapon.maxRounds} />
    ) : null;
  }

  return (
    <div key={item.name}>
      <div key={item.name} className="inventory-list__item">
        <span>{item.name}</span>
        <div>{ammoCounter}</div>
      </div>
      {reloadButton}
      {dropButton}
      {equipButton}
    </div>
  );
}
