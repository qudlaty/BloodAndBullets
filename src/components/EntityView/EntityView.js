import React from 'react';
import './ProgressBar.scss';
import './EntityView.scss';


class EntityView extends React.Component {
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
        <div className="position" title="Position">
          <span>[{entity.position.x}, {entity.position.y}]</span>
        </div>
        <div className="portrait">
          {entity.icon}
        </div>
        <strong title="Name">{entity.name}</strong>
        <em title="Age"> ({entity.age})</em>
        {` `}{lifeSigns}
        <br />
        <span>HP: {entity.hp}/{entity.maxHp}</span>
        <span> Rounds: {entity.rounds} / {entity.maxRounds}</span>
        <progress
          title="HP"
          max={entity.maxHp}
          value={entity.hp}
          percent={~~(entity.hp * 100 / entity.maxHp)}
        >
        </progress>
      </div>
    );
  }
}

export default EntityView;
