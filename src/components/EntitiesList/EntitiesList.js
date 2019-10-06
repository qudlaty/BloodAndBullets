import React from 'react';
import EntityView from '../EntityView';
import './EntitiesList.css';

export default class ListOfEntities extends React.PureComponent {
  renderCounter = 0
  render() {
    console.log("Rendering EntitiesList #", this.renderCounter++);
    var entities = this.props.entities.map(obj => {
      return (
        <EntityView entity={obj} key={obj.name}/>
      )
    });
    return (
      <div className="listOfEntities">
        List of Entities: {entities}
      </div>
    );
  }
}
