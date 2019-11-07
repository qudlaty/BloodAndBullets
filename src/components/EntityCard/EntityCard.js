import React from 'react';
import LinearDisplay from './LinearDisplay';

import './EntityCard.scss';

class EntityCard extends React.Component {
  renderCount = 0

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

      </div>
    );
  }
}

export default EntityCard;
