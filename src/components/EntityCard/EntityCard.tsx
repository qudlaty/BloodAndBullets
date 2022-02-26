import React from "react";
import { LinearDisplay, InventoryList } from "components";
import { Entity, Item } from "services";

import "./EntityCard.scss";

interface EntityCardProps {
  entity: Entity;
  onInventoryClick?(entity: Entity, itemName: string);
  onEntityClick?(entityName: string);
  processInterface?: Function;
}

export class EntityCard extends React.Component<EntityCardProps> {
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

  onReload = (itemName: string) => {
    let { entity } = this.props;
    if (entity.equipment.hands && entity.equipment.hands.name === itemName) {
      entity.isShooting = false;
    }
    this.props.processInterface();
  };

  render() {
    let { entity } = this.props;
    if (!entity) return null;
    // FIXME: Below should be separated into several sub-components
    // Each sub-component should receive flat data (position, hp, ...)

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
      <div
        className={className}
      >
        <button
          className="inventory-list__drop-button"
          onClick={() => this.props.onEntityClick(entity.name)}
        >
          Pick up
        </button>
        <div>
          <div className="entity-card__position" title="Position">
            <span>
              {" "}
              {entity.position.x} {entity.position.y}{" "}
            </span>
          </div>

          <LinearDisplay label="AP" current={entity.actionPoints} max={entity.maxActionPoints} />

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
          onReload={this.onReload}
          inventory={inHandsArray}
          processInterface={() => this.props.processInterface()}
        />
        <InventoryList
          label="Inventory"
          title="In backpack"
          onClick={this.handleInventoryClick}
          onDrop={this.onDrop}
          onReload={this.onReload}
          inventory={entity.inventory}
          processInterface={() => this.props.processInterface()}
        />
      </div>
    );
  }
}
