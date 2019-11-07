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
    let className = "entity";
    if(entity.active) {
      className+=" active";
    }

    let { isBreathing } = entity;
    let lifeSigns = isBreathing ? "ALIVE" : "DEAD";
    return (

      <div className={className}>
        <div>
          <div className="portrait">
            {entity.icon}
          </div>
          <div className="position" title="Position">
            <span>[{entity.position.x}, {entity.position.y}]</span>
          </div>

        </div>
        <strong title="Name">{entity.name}</strong>
        <em title="Age"> ({entity.age})</em>
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
