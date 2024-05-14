import React, { useState } from "react";
import { EnergyWeapon, Item, RangedWeapon, RechargableEnergyWeapon, WeaponType } from "services";
import { LinearDisplay } from "components/LinearDisplay";
import { InfoPanel } from "components/InfoPanel";

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
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

  const switchInfoPanelState = () => {
    console.log("info panel", isInfoPanelOpen);
    setIsInfoPanelOpen(previousValue => !previousValue);
  };

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
    const weapon = item as RangedWeapon | RechargableEnergyWeapon;

    if (weapon.reload && props.onReload && !(item instanceof RechargableEnergyWeapon)) {
      // has reload capability
      let className = " inventory-list__reload-button ";

      if (weapon.charges === 0 || weapon.charges === "empty") {
        className += " inventory-list__reload-button--empty ";
      } else if (weapon.charges < weapon.maxCharges) {
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
        ` (${weapon.charges})`
      ) : (
        <LinearDisplay
          className="full"
          label={weapon.type == WeaponType.energy ? "Charges" : "Rounds"}
          current={weapon.charges}
          max={weapon.maxCharges}
        />
      );
  }

  return (
    <div key={item.name}>
      {isInfoPanelOpen && <InfoPanel item={item} onClose={switchInfoPanelState}></InfoPanel>}
      <div key={item.name} className="inventory-list__item">
        <span>{item.name}</span>

        <button title="Show info" className="inventory-list__info-button" onClick={switchInfoPanelState}>
          ⓘ
        </button>
        {ammoCounter}
      </div>
      {reloadButton}
      {dropButton}
      {equipButton}
    </div>
  );
}
