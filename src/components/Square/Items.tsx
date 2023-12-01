import React from "react";
import { Entity, Item } from "services";

interface ItemsProps {
  items: Item[];
  itemsNumber: number; // here to trigger update when list length changes
}
// FIXME: I have a strange feeling this doesn't update when contents of items list change but not the number of elements
/**
 * @description
 * Displays icons of items on the square, as well as little number in the corner.
 * @param itemsNumber - number of items on the square
 * @param items - array of items on the square
 */
class Items extends React.PureComponent<ItemsProps> {
  itemsIcons = [];

  render() {
    const { items, itemsNumber } = this.props;

    if (!items) return null;

    items.forEach((item) => {
      const entity = item as Entity;
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
