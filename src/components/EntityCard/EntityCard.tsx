import React from "react";
import LinearDisplay from "./LinearDisplay";
import InventoryList from "./InventoryList";
import "./EntityCard.scss";
import { Entity, Item } from "../../services/EntitiesValues";

interface EntityCardProps {
  entity: Entity;
  onInventoryClick?(entity: Entity, itemName: string);
  processInterface?: Function;
}

class EntityCard extends React.Component<EntityCardProps> {
  renderCount = 0;
  handleInventoryClick = (itemName: string): void => {
    this.props.onInventoryClick(this.props.entity, itemName);
  };

  onDrop = (itemName: string) => {
    let { entity } = this.props;
    if (entity.equipment.hands && entity.equipment.hands.name === itemName) {
      entity.unEquipFromHands();
      entity.isShooting = false;
    }
    let item: Item = entity.takeFromInventory(itemName);
    entity.square.addItem(item);
    this.props.processInterface();
  };

  render() {
    let { entity } = this.props;
    if (!entity) return null;
    /*
      FIXME: Below should be separated into several sub-components
      Each sub-component should receive flat data (position, hp, ...)
     */

    let className = "entity-card";
    if (entity.active) {
      className += " entity-card--active";
    }

    if (entity.isFriendly) {
      className += " entity-card--friendly";
    }

    if (entity.isDead) {
      className += " entity-card--dead";
    }

    let inHands = entity.equipment && entity.equipment.hands;
    let inHandsArray = inHands && [inHands];

    return (
      <div className={className}>
        <div>
          <div className="entity-card__position" title="Position">
            <span>
              {" "}
              {entity.position.x} {entity.position.y}{" "}
            </span>
          </div>

          <div className="entity-card__portrait">{entity.icon}</div>
        </div>
        <strong title="Name">{entity.name}</strong>
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
