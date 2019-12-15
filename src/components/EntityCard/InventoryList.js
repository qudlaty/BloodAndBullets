import React from 'react';
import './InventoryList.scss';
export default function InventoryList(props) {

  let className = `inventory-list ${props.className || ''}`

  if(!props.inventory) {return null}
  let reloadButton, dropButton;
  let inventoryItems = props.inventory.map(item => {
    if(item.reload) {// has reload capability
      let className = " inventory-list__reload-button ";

      if(item.rounds === 0 || item.rounds === 'empty') {
        className += " inventory-list__reload-button--empty "
      } else if (item.rounds < item.maxRounds) {
        className += " inventory-list__reload-button--partial "
      }
      reloadButton =
        <button
          className={className}
          onClick={() => {
            item.reload();
            props.onClick(item.name);// this only to trigger the render
          }}
        >Reload</button>
    } else {
      reloadButton = null;
    }
    dropButton =
    <button
      className={`inventory-list__drop-button`}
      onClick={() => {
        props.onDrop(item.name);
      }}
    >Drop</button>

    return (
      <div key={item.name}>
        <div onClick={() => props.onClick(item.name)} key={item.name} className="inventory-list__item">
          <span>{item.name}</span>
        </div>
        {reloadButton}
        {dropButton}
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
