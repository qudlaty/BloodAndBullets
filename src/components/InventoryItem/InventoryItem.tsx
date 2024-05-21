import React, { useState } from "react";
import { EnergyWeapon, Item, RangedWeapon, RechargableEnergyWeapon, WeaponType } from "services";
import { LinearDisplay } from "components/LinearDisplay";
import { InfoPanel } from "components/InfoPanel";
import "./InventoryItem.scss";

interface InventoryItemProps {
  item: Item;
  interactButtonText?: string;
  shorterDisplay?: boolean;
  onDrop?(itemName: string);
  onReload?(weapon: RangedWeapon);
  onInteract?(itemName: string);
  processInterface?();
}

export function InventoryItem(props: InventoryItemProps) {
  const { item } = props;
  const DEFAULT_INTERACT_BUTTON_TEXT = "Interact";
  const componentClassName = "inventory-item";
  let reloadButton;
  let dropButton;
  let interactButton;
  let ammoCounter;
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

  const switchInfoPanelState = () => {
    console.log("info panel", isInfoPanelOpen);
    setIsInfoPanelOpen(previousValue => !previousValue);
  };

  if (props.onDrop) {
    dropButton = (
      <button
        className={`
          ${componentClassName + "__button"}
          ${componentClassName + "__button-drop"}
        `}
        onClick={() => {
          props.onDrop(item.name);
        }}
      >
        Drop ↘
      </button>
    );
  }
  if (props.onInteract) {
    interactButton = (
      <button //
        className={`
          ${componentClassName + "__button"}
          ${componentClassName + "__button-interact"}
        `}
        onClick={() => props.onInteract(item.name)}
      >
        {props.interactButtonText || DEFAULT_INTERACT_BUTTON_TEXT}
      </button>
    );
  }

  if (item instanceof RangedWeapon) {
    const weapon = item as RangedWeapon | RechargableEnergyWeapon;

    if (weapon.reload && props.onReload && !(item instanceof RechargableEnergyWeapon)) {
      // has reload capability
      let buttonClassName = `${componentClassName}__button-reload`;

      if (weapon.charges === 0 || weapon.charges === "empty") {
        buttonClassName += ` ${buttonClassName}--empty`;
      } else if (weapon.charges < weapon.maxCharges) {
        buttonClassName += ` ${buttonClassName}--partial`;
      }

      const finalButtonClassName = `${componentClassName}__button` + ` ` + buttonClassName;

      reloadButton = (
        <button
          className={finalButtonClassName}
          onClick={() => {
            props.onReload && props.onReload(weapon);
            props.processInterface && props.processInterface();
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
    <div key={item.id} className="inventory-item">
      <div key={item.name} className="inventory-item__body">
        <span>{item.name}</span>

        <button
          title="Show info"
          className={`
            ${componentClassName}__button
            ${componentClassName}__button-info
          `}
          onClick={switchInfoPanelState}
        >
          ⓘ
        </button>
        {isInfoPanelOpen && <InfoPanel item={item} onClose={switchInfoPanelState}></InfoPanel>}

        {ammoCounter}
      </div>
      <div className="inventory-item__button-group">
        {reloadButton}
        {dropButton}
        {interactButton}
      </div>
    </div>
  );
}
