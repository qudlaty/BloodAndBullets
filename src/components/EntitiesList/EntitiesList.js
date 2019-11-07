import React from 'react';
import EntityView from '../EntityView';
import './EntitiesList.scss';

export default class ListOfEntities extends React.Component {
  renderCounter = 0
  render() {
    // console.log("Rendering EntitiesList #", this.renderCounter++);
    var entities = this.props.entities.map(obj => {
      return (
        <EntityView entity={obj} key={obj.name}/>
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
