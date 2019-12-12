import React from 'react';
import LinearDisplay from './LinearDisplay';
import InventoryList from './InventoryList';
import './EntityCard.scss';

class EntityCard extends React.Component {
  renderCount = 0
  handleInventoryClick = (itemName) => {
    this.props.onInventoryClick(this.props.entity, itemName);
  }

  renderAmmo = (inHands)=> {
    if(inHands) {
     return <LinearDisplay label="Rounds" current={inHands.rounds} max={inHands.maxRounds} />
    }
  }

  render() {
    // console.log("Rendering EntityView. #", this.renderCount++);
    let { entity } = this.props;
    if(!entity) return null;
    /*
      FIXME: Below should be separated into several sub-components
      Each sub-component should receive flat data (position, hp, ...)
     */
    let className = " entity ";
    if(entity.active) {
      className+=" active ";
    }

    let { isDead, isFriendly } = entity;
    let fof = isFriendly ? ' friendly ' : ' unfriendly ';
    let lifeSigns = isDead ? " DEAD " : " ALIVE ";
    className += fof;
    className += lifeSigns;
    let inHands = entity.equipment && entity.equipment.hands;
    let inHandsArray = (inHands && [inHands]) || [];


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
          {this.renderAmmo(inHands)}
        </div>
        <InventoryList label="Equipped" title="In hands" onClick={this.handleInventoryClick} inventory={inHandsArray} />
        <InventoryList label="Inventory" title="In backpack" onClick={this.handleInventoryClick} inventory={entity.inventory} />

      </div>
    );
  }
}

export default EntityCard;
