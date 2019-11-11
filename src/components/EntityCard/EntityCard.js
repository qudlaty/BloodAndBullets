import React from 'react';
import LinearDisplay from './LinearDisplay';
import InventoryList from './InventoryList';
import './EntityCard.scss';

class EntityCard extends React.Component {
  renderCount = 0
  handleInventoryClick = (itemName) => {
    this.props.onInventoryClick(this.props.entity, itemName);
  }

  render() {
    // console.log("Rendering EntityView. #", this.renderCount++);
    let { entity } = this.props;
    /*
      FIXME: Below should be separated into several sub-components
      Each sub-component should receive flat data (position, hp, ...)
     */
    let className = " entity ";
    if(entity.active) {
      className+=" active ";
    }

    let { isBreathing, isFriendly } = entity;
    let fof = isFriendly ? ' friendly ' : ' unfriendly ';
    let lifeSigns = isBreathing ? " ALIVE " : " DEAD ";
    className += fof;
    className += lifeSigns;
    let inHands = entity.equipment && entity.equipment.hands && entity.equipment.hands.name || entity.equipment && entity.equipment.hands;
    let equipped = inHands && (
      <>
        <span>inHands: </span>
        <div className="inventory-list__item">
          {inHands}
        </div>
      </>
    );

    return (

      <div className={className}>
        <div>
          <div className="position" title="Position">
            <span> {entity.position.x} {entity.position.y} </span>
          </div>

          <div className="portrait">
            {entity.icon}
          </div>
        </div>
        <strong title="Name">{entity.name}</strong>
        <br />
        {` `}{lifeSigns}
        <br />

        <div style={{
          clear: "both",
          display: "inline-block",
          textAlign: "right",
        }}>
          <LinearDisplay label="HP" current={entity.hp} max={entity.maxHp} /><br/>
          <LinearDisplay label="Rounds" current={entity.rounds} max={entity.maxRounds} />
        </div>
        <div>
          <div className="inventory-list__container">
            {equipped}
          </div>

        </div>
        <InventoryList label="Inventory" title="Inny niż dupa" onClick={this.handleInventoryClick} inventory={entity.inventory} />

      </div>
    );
  }
}

export default EntityCard;
