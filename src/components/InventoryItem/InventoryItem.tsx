import React from "react";
import { Item, RangedWeapon } from "services";
import { LinearDisplay } from "components/LinearDisplay";

interface InventoryItemProps {
  item: Item;
  interactButtonText: string;
  shorterDisplay?: boolean;
  onDrop?(itemName: string);
  onReload?(weapon: RangedWeapon);
  onInteract?(itemName: string);
  processInterface: () => void;
}

export function InventoryItem(props: InventoryItemProps) {
  const { item } = props;
  let reloadButton;
  let dropButton;
  let equipButton;
  let ammoCounter;

  if (props.onDrop) {
    dropButton = (
      <button
        className="inventory-list__drop-button"
        onClick={() => {
          props.onDrop(item.name);
        }}
      >
        Drop ↘
      </button>
    );
  }
  if (props.onInteract) {
    equipButton = (
      <button //
        className="inventory-list__equip-button"
        onClick={() => props.onInteract(item.name)}
      >
        {props.interactButtonText}
      </button>
    );
  }

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
          Reload ({weapon.reloadCostInAP}AP)
        </button>
      );
    } else {
      reloadButton = null;
    }

    ammoCounter =
      weapon.reload && props.shorterDisplay ? (
        ` (${weapon.rounds})`
      ) : (
        <LinearDisplay className="full" label="Rounds" current={weapon.rounds} max={weapon.maxRounds} />
      );
  }

  return (
    <div key={item.name}>
      <div key={item.name} className="inventory-list__item">
        <span>{item.name}</span>
        {ammoCounter}
      </div>
      {reloadButton}
      {dropButton}
      {equipButton}
    </div>
  );
}
