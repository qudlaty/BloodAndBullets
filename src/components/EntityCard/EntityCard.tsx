import React from "react";
import { LinearDisplay, InventoryList, EmojiMapper } from "components";
import { Entity, Item, InventoryItem, EntitiesService, RangedWeapon } from "services";
import * as Helpers from "helpers";
import "./EntityCard.scss";
import { InfoPanelSwitchButton } from "components/InfoPanelSwitchButton";

interface EntityCardProps {
  entity: Entity;
  shorterDisplay?: boolean;
  onInventoryClick?(entity: Entity, itemName: string);
  onEntityClick?(entityName: string);
  processInterface?: () => void;
}
interface EntityCardState {
  isInventoryOpen: boolean;
}

export class EntityCard extends React.Component<EntityCardProps, EntityCardState> {
  constructor(props) {
    super(props);
    this.state = {
      isInventoryOpen: false,
    };
  }

  handleInventoryItemClick = (itemName: string): void => {
    this.props.onInventoryClick(this.props.entity, itemName);
  };

  handleInventoryButtonClick = () => {
    this.setState(prevState => {
      return { isInventoryOpen: !prevState.isInventoryOpen };
    });
  };

  onDrop = (itemName: string) => {
    //TODO: Take this outside of the component, duuuh.
    const { entity } = this.props;
    if (entity.equipment.hands && entity.equipment.hands.name === itemName) {
      entity.unEquipFromHands();
      entity.isShooting = false;
    }
    const item: InventoryItem = entity.takeFromInventory(itemName);
    if (item instanceof Item) {
      console.log("Dropping Item");
      entity.square.addItem(item);
    } else if (item instanceof Entity) {
      console.log("Dropping Entity");
      EntitiesService.addEntity(item);
      entity.square.entity = item;
      entity.square.entities.push(item);
      item.position = { ...entity.position };
    }

    this.props.processInterface();
  };

  onReload = (weapon: RangedWeapon) => {
    const { entity } = this.props;
    EntitiesService.reloadWeapon(entity, weapon);
    this.props.processInterface();
  };

  get distanceToTarget(): number {
    const { entity } = this.props;
    if (!entity.targetPosition) return null;
    return Number(
      Helpers.calculateDistance(
        entity.targetPosition.x - entity.position.x,
        entity.targetPosition.y - entity.position.y
      ).toFixed(2)
    );
  }

  render() {
    const { entity } = this.props;
    if (!entity) return null;
    // FIXME: Below should be separated into several sub-components
    // Each sub-component should receive flat data (position, hp, ...)
    const baseClassName = "entity-card";
    let finalClassName = baseClassName;
    if (entity.active) {
      finalClassName += ` ${baseClassName}--active`;
    }

    if (entity.isFriendly) {
      finalClassName += ` ${baseClassName}--friendly`;
    }

    if (entity.isDead) {
      finalClassName += ` ${baseClassName}--dead`;
    }

    const inHands = entity.equipment && entity.equipment.hands;
    const inHandsArray = inHands && [inHands];
    let bleedingText;
    let bleedingReductionText;
    if (entity.bleedingReductionPerTurn) {
      bleedingReductionText = (
        <span className="bleeding-info__reduction">
          (-{entity.bleedingReductionPerTurn}
          <small className="bleeding-info__reduction__unit">/Turn</small>)
        </span>
      );
    }
    if (entity.bleeding) {
      bleedingText = (
        <span className="bleeding-info">
          Bleeding: {entity.bleeding} {bleedingReductionText}
        </span>
      );
    }

    return (
      <div className={finalClassName}>
        <div>
          <div className="entity-card__portrait">
            <EmojiMapper emoji={entity.icon} />
          </div>
        </div>
        <strong title="Name">
          {entity.isDead && "Dead "}
          {entity.name}
        </strong>
        <br />
        <small className="entity-data__rank">{entity?.rank}</small>
        <InfoPanelSwitchButton item={entity as Item}></InfoPanelSwitchButton>
        <div className="entity-data__status-displays">
          <LinearDisplay className="full" label="AP" current={entity.actionPoints} max={entity.maxActionPoints} />
          <LinearDisplay className="full" label="HP" current={entity.hp} max={entity.maxHp} />
          {bleedingText}
        </div>
        <div className="equipment-panel">
          <InventoryList
            label=""
            title="In hands"
            interactButtonText="Unequip →"
            onInteract={this.state.isInventoryOpen && this.handleInventoryItemClick}
            onReload={this.props.entity.isAlive && this.onReload}
            onDrop={this.props.entity.isDead && this.onDrop}
            inventory={inHandsArray}
            shorterDisplay={this.props.shorterDisplay}
            processInterface={() => this.props.processInterface()}
          />
        </div>

        {this.state.isInventoryOpen && (
          <div className="inventory-panel">
            <InventoryList
              label="Inventory"
              title="In backpack"
              interactButtonText=" ← Equip"
              onInteract={this.handleInventoryItemClick}
              onDrop={this.onDrop}
              onClose={this.handleInventoryButtonClick}
              inventory={entity.inventory}
              processInterface={() => this.props.processInterface()}
            />
          </div>
        )}
        <button className="inventory-item__button inventory-button" onClick={() => this.handleInventoryButtonClick()}>
          INVENTORY ({entity.inventory?.length || 0})
        </button>

        {entity.isDead && (
          <button
            className="inventory-item__button pick-up-button"
            onClick={() => this.props.onEntityClick(entity.name)}
          >
            Pick up the body
          </button>
        )}
      </div>
    );
  }
}
