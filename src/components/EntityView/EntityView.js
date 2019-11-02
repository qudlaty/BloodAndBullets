import React from 'react';
import './ProgressBar.scss';
import './EntityView.scss';


class EntityView extends React.Component {
  renderCount = 0

  render() {
    // console.log("Rendering EntityView. #", this.renderCount++);

    /*
      FIXME: Below should be separated into several sub-components
      Each sub-component should receive flat data (position, hp, ...)
     */
    let className = "entity";
    if(this.props.entity.active) {
      className+=" active";
    }

    let { entity } = this.props;
    // let { position, value, age, name, hp, maxHp, isBreathing, active } = entity;
    let { isBreathing } = entity;
    // let { x, y } = position;
    // console.log(this.props)
    // console.log(entity)
    // console.log(isBreathing)
    let lifeSigns = isBreathing ? "ALIVE" : "DEAD";
    return (

      <div className={className}>
        <div className="position" title="Position">
          <span>[{entity.position.x}, {this.props.entity.position.y}]</span>
        </div>
        <div className="portrait">
          {this.props.entity.value}
        </div>
        <strong title="Name">{this.props.entity.name}</strong>
        <em title="Age"> ({this.props.entity.age})</em>
        {` `}{lifeSigns}
        <br />
        <span>HP: {this.props.entity.hp}/{this.props.entity.maxHp}</span>
        <span> Rounds: {this.props.entity.rounds} / {this.props.entity.maxRounds}</span>
        <progress
          title="HP"
          max={this.props.entity.maxHp}
          value={this.props.entity.hp}
          percent={~~(this.props.entity.hp * 100 / this.props.entity.maxHp)}
        >
        </progress>
      </div>
    );
  }
}

export default EntityView;
