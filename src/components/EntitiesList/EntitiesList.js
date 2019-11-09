import React from 'react';
import EntityCard from '../EntityCard';
import './EntitiesList.scss';

export default class ListOfEntities extends React.Component {
  renderCounter = 0
  render() {
    // console.log("Rendering EntitiesList #", this.renderCounter++);
    
    let entitiesFriendly =
    this.props.entities.filter(entity=>entity.isFriendly).map(obj => {
      return (
        <EntityCard onInventoryClick={this.props.onInventoryClick} entity={obj} key={obj.name}/>
      )
    });

    let entitiesUnfriendly =
    this.props.entities.filter(entity=>!entity.isFriendly).map(obj => {
      return (
        <EntityCard entity={obj} key={obj.name}/>
      )
    });

    return (
      <>
        <h4 className="list-of-entities__header">List of Entities:</h4>
        <div className="list-of-entities">
            {entitiesFriendly}
        </div>
        <div className="list-of-entities">
            {entitiesUnfriendly}
        </div>
      </>
    );
  }
}
