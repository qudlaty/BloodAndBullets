import React from "react";
// services
import { SquaresService, EntitiesService, MessageService } from "services";
import { Entity, Square, Position } from "services";
// components
import { EntityCard, InventoryList } from "components";
// others
import { structures } from "resources";
import * as Helpers from "helpers";
import "./Game.scss";

interface TargetedSquareInfoProps {
  className: string;
  squareNumber: number;
  squares: Square[];
  selected: Entity;
  targeted: Square;
  onInventoryClick(entity: Entity, itemName: string): void;
  processInterface: () => void;
}
interface TargetedSquareInfoState {
  isInventoryOpen: boolean;
}

// TODO: Refactor, does it really need all this logic.
export default class TargetedSquareInfo extends React.Component<TargetedSquareInfoProps, TargetedSquareInfoState> {
  boxSerialNumber: number = 0;

  constructor(props) {
    super(props);
    this.state = {
      isInventoryOpen: false,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.squareNumber !== this.props.squareNumber) {
      this.setState({ isInventoryOpen: false });
    }
  }
  handleInventoryButtonClick = () => {
    this.setState(prevState => {
      return { isInventoryOpen: !prevState.isInventoryOpen };
    });
  };

  onItemClick = (itemName: string): void => {
    const { selected, targeted, squareNumber } = this.props;
    const targetedSquarePosition = SquaresService.getSquarePositionFromIndex(squareNumber);
    if (
      selected &&
      targeted &&
      selected.position.x === targetedSquarePosition.x &&
      selected.position.y === targetedSquarePosition.y
    ) {
      let item = targeted.takeFromInventory(itemName);
      if (!item) {
        // We aren't picking up an item, we are picking up an Entity.

        item = targeted.entities.find(entity => entity.name === itemName);

        const square = SquaresService.getSquareFromPosition(targetedSquarePosition.x, targetedSquarePosition.y);
        //square.entity = null;
        EntitiesService.removeEntityFromListOfEntities(square.entities, item as Entity);
        EntitiesService.removeEntity(item as Entity); // TODO: Take this out of the component
      }
      selected.addToInventory(item);
      if (!selected.equipment.hands) {
        selected.equipInHands(item.name);
      }
    } else {
      MessageService.send(`${selected.name} can't pickup ${itemName}. They need to be on the same square to do that.`);
    }
    this.props.processInterface();
  };

  onMoveClick(selected: Entity, targetedSquarePosition: Position): void {
    const targetedSquare: Square = SquaresService.getSquareFromPosition(
      targetedSquarePosition.x,
      targetedSquarePosition.y
    );
    selected.setMoveDestinationPosition(targetedSquarePosition);
    targetedSquare.isChosenDestination = true;
    this.props.processInterface();
  }

  onAttackClick(selected: Entity, targetedSquarePosition: Position): void {
    selected.attackPosition(targetedSquarePosition);
    this.props.processInterface();
  }

  onAddStructureClick(targetedSquarePosition: Position, structureType: string): void {
    const box = Object.assign({}, structures[structureType]);
    const targetPosition = Object.assign({}, targetedSquarePosition);
    box.position = targetPosition;
    box.name += this.boxSerialNumber++;
    const square = SquaresService.getSquareFromPosition(targetedSquarePosition.x, targetedSquarePosition.y);

    const newStructure = new Entity(box);

    // TODO: FIXME: Stop forcing types, make a new list for scenery items.
    //square.entity = newStructure;
    square.entities.push(newStructure);
    EntitiesService.entities.push(newStructure);

    //square.addToInventory(newStructure as Item);

    this.props.processInterface();
  }

  render() {
    const { targeted, selected, squareNumber } = this.props;

    if (!targeted) {
      return null;
    }

    const targetedSquarePosition = SquaresService.getSquarePositionFromIndex(squareNumber);

    const entityInfo = [];
    let distanceInfo;
    let positionInfo;
    let bloodInfo;
    const availableActions = [];
    let items;

    const editorButtons = (
      <div>
        <button onClick={() => this.onAddStructureClick(targetedSquarePosition, "box")} className="button">
          Add box
        </button>
        <button onClick={() => this.onAddStructureClick(targetedSquarePosition, "redBarrel")} className="button">
          Add barrel
        </button>
      </div>
    );

    if (targeted.entities && targeted.entities.length) {
      targeted.entities.forEach(i => {
        if (selected !== i) {
          entityInfo.push(
            <EntityCard
              key={i.name}
              onEntityClick={this.onItemClick}
              onInventoryClick={this.props.onInventoryClick}
              entity={i}
              processInterface={() => this.props.processInterface()}
            />
          );
        }
      });
    }

    if (targeted.items && targeted.items.length) {
      items = (
        <>
          {this.state.isInventoryOpen && (
            <div className="inventory-panel">
              <InventoryList
                label="Items on the floor"
                title="On the floor"
                interactButtonText="↖ Pick up"
                onInteract={this.onItemClick}
                onDrop={null}
                onReload={null}
                inventory={targeted.items}
                processInterface={() => this.props.processInterface()}
              />
            </div>
          )}
          <button
            className="inventory-list__drop-button inventory-button"
            onClick={() => this.handleInventoryButtonClick()}
          >
            Show items on the floor ({targeted.items.length})
          </button>
        </>
      );
    }

    if (selected) {
      const distanceToSelected = Helpers.calculateDistance(
        targetedSquarePosition.x - selected.position.x,
        targetedSquarePosition.y - selected.position.y
      );

      distanceInfo = <li>Distance to selected: {distanceToSelected.toFixed(2)}</li>;

      if (distanceToSelected !== 0) {
        if (targeted.isAvailableDestination) {
          availableActions[0] = (
            <button key="move" onClick={() => this.onMoveClick(selected, targetedSquarePosition)} className="button">
              Move
            </button>
          );
        }
        if (targeted.entity) {
          availableActions[1] = (
            <button
              key="attack"
              onClick={() => this.onAttackClick(selected, targetedSquarePosition)}
              className="button"
            >
              Attack
            </button>
          );
        }
      }
    }

    if (targetedSquarePosition) {
      positionInfo = (
        <li>
          Position: [ {targetedSquarePosition.x}, {targetedSquarePosition.y} ]{" "}
        </li>
      );
    }

    if (targeted.blood) {
      bloodInfo = <li>Blood amount: {targeted.blood}</li>;
    }

    const square = SquaresService.getSquareFromPosition(targetedSquarePosition.x, targetedSquarePosition.y);

    return (
      <div className={this.props.className}>
        <strong className="targeted__label">Target square Info</strong>

        <code>
          {square.icon} {square.name}
        </code>
        {square.description && <p className="square-description">{square.description}</p>}

        <div>{entityInfo}</div>
        <div>{availableActions}</div>
        {items}

        {/*
          {positionInfo} 
          {square.squareType}
          {distanceInfo}
          {bloodInfo}
          {editorButtons} */}
      </div>
    );
  }
}
