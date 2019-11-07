import React from 'react';
import EntityCard from '../EntityCard';
import './EntitiesList.scss';

export default class ListOfEntities extends React.Component {
  renderCounter = 0
  render() {
    // console.log("Rendering EntitiesList #", this.renderCounter++);
    var entities = this.props.entities.map(obj => {
      return (
        <EntityCard entity={obj} key={obj.name}/>
      )
    });
    return (
      <>
        <h4 className="list-of-entities__header">List of Entities:</h4>
        <div className="list-of-entities">
            {entities}
        </div>
      </>
    );
  }
}
