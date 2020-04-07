import React from "react";
import { Item, Entity } from "../../services/EntitiesValues";

interface ItemsProps {
  items: Item[];
  itemsNumber: number; // here to trigger update when list length changes
}

class Items extends React.PureComponent<ItemsProps> {
  itemsIcons = [];

  render() {
    let { items, itemsNumber } = this.props;

    if (!items) return null;

    items.forEach((item) => {
      let entity = item as Entity;
      if (entity.icon) {
        this.itemsIcons.push(<div className="square__item-icon">{entity.icon}</div>);
      }
    });

    return (
      <div className="square__items">
        <div className="square__items-icons">{this.itemsIcons}</div>
        <div className="square__items-number">{itemsNumber}</div>
      </div>
    );
  }
}

export default Items;
