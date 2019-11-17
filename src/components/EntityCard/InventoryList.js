import React from 'react';
import './InventoryList.scss';
export default function InventoryList(props) {

let className = `inventory-list ${props.className || ''}`

if(!props.inventory) {return null}
let reloadButton;
let inventoryItems = props.inventory.map(item => {
  if(item.reload) {
    reloadButton = <button onClick={item.reload}>Reload</button>
  }
  return (
    <div>
      <div onClick={() => props.onClick(item.name || item)} key={item.name} className="inventory-list__item">
        <span>{item.name || item}</span>
      </div>
      {reloadButton}
    </div>
  )
});

  return (
    <div className={className}>
      <div className="inventory-list__label">{props.label}:&nbsp;</div>
      <div className="inventory-list__container"
        title={props.title}
      >
       {inventoryItems}
      </div>
    </div>
  );
}
