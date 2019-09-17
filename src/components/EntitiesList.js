import React from 'react';
import EntityView from './EntityView.js';

export default class ListOfEntities extends React.Component {
  render() {
    var entities = this.props.entities.map(obj => {
      return (
        <EntityView entity={obj} key={obj.name}/>
      )
    });
    return (
      <div className="listOfEntities">
        List of Entities will be here: {entities}
      </div>
    );
  }
}
