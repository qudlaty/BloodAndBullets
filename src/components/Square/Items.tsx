import React from "react";
import { Item } from "../../services/EntitiesValues";

interface ItemsProps {
  items: Item[];
}

class Items extends React.Component<ItemsProps> {
  render() {
    let { items } = this.props;
    let itemsNumber: number = null;

    if (items && items.length) {
      itemsNumber = this.props.items.length;
    }

    return <div className="square__items">{itemsNumber}</div>;
  }
}

export default Items;
