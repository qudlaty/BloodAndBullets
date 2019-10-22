import React from 'react';
import './EntityView.css';

class EntityView extends React.Component {
  renderCount = 0

  render() {
    console.log("Rendering EntityView. #", this.renderCount++);

    /*
      FIXME: Below should be separated into several sub-components
      Each sub-component should receive flat data (position, hp, ...)
     */
    return (
      <div className="entity">
        <div className="position" title="Position">
          <span>[{this.props.entity.position.x}, {this.props.entity.position.y}]</span>
        </div>
        <div className="portrait">
          {this.props.entity.value}
        </div>
        <strong title="Name">{this.props.entity.name}</strong>
        <em title="Age"> ({this.props.entity.age})</em><br />
        <span>HP: {this.props.entity.hp}/{this.props.entity.maxHp}</span>
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
