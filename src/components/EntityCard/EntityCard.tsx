import React from "react";
import LinearDisplay from "./LinearDisplay";
import InventoryList from "./InventoryList";
import "./EntityCard.scss";
import SquaresService from "../../services/SquaresService";
import { Entity, RangedWeapon, Item } from "../../services/EntitiesValues";

interface EntityCardProps {
  entity: Entity;
  key?: string;
  onInventoryClick(entity: Entity, itemName: string);
  processInterface: Function;
}

class EntityCard extends React.Component<EntityCardProps> {
  renderCount = 0;
  handleInventoryClick = (itemName: string): void => {
    this.props.onInventoryClick(this.props.entity, itemName);
  };

  renderAmmo = (inHands: RangedWeapon) => {
    if (inHands) {
      return <LinearDisplay label="Rounds" current={inHands.rounds} max={inHands.maxRounds} />;
    }
  };

  onDrop = (itemName: string) => {
    let { entity } = this.props;
    entity.unEquipFromHands();
    let item: Item = entity.takeFromInventory(itemName);
    entity.square.addItem(item);
    this.props.onInventoryClick(this.props.entity, ""); // just to rerender
  };

  render() {
    // console.log("Rendering EntityView. #", this.renderCount++);
    let { entity } = this.props;
    if (!entity) return null;
    /*
      FIXME: Below should be separated into several sub-components
      Each sub-component should receive flat data (position, hp, ...)
     */
    let className = " entity ";
    if (entity.active) {
      className += " active ";
    }

    let { isDead } = entity;
    let lifeSigns = isDead ? " DEAD " : " ALIVE ";
    className += lifeSigns;
    let inHands = entity.equipment && entity.equipment.hands;
    let inHandsArray = (inHands && [inHands]) || [];

    return (
      <div className={className}>
        <div>
          <div className="position" title="Position">
            <span>
              {" "}
              {entity.position.x} {entity.position.y}{" "}
            </span>
          </div>

          <div className="portrait">{entity.icon}</div>
        </div>
        <strong title="Name">{entity.name}</strong>
        <br />
        {` `}
        {lifeSigns}
        <br />

        <div
          style={{
            clear: "both",
            display: "inline-block",
            textAlign: "right",
          }}
        >
          <LinearDisplay label="HP" current={entity.hp} max={entity.maxHp} />
          <br />
          {this.renderAmmo(inHands)}
        </div>
        <InventoryList
          label="Equipped"
          title="In hands"
          onClick={this.handleInventoryClick}
          onDrop={this.onDrop}
          inventory={inHandsArray}
          processInterface={() => this.props.processInterface()}
        />
        <InventoryList
          label="Inventory"
          title="In backpack"
          onClick={this.handleInventoryClick}
          onDrop={this.onDrop}
          inventory={entity.inventory}
          processInterface={() => this.props.processInterface()}
        />
      </div>
    );
  }
}

export default EntityCard;
