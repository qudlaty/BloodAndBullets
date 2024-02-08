import React from "react";
import { EntityCard } from "components";
import { Entity } from "services";

import "./EntitiesList.scss";

interface ListOfEntitiesProps {
  entities: Entity[];
  onInventoryClick: any;
  processInterface: () => void;
}

export default class ListOfEntities extends React.Component<ListOfEntitiesProps> {
  render() {
    const entitiesFriendly = this.props.entities
      .filter(entity => entity.isFriendly)
      .map(obj => {
        return (
          <EntityCard
            key={obj.name}
            entity={obj}
            onInventoryClick={this.props.onInventoryClick}
            processInterface={() => this.props.processInterface()}
          />
        );
      });

    const entitiesUnfriendly = this.props.entities
      .filter(entity => !entity.isFriendly)
      .map(obj => {
        return <EntityCard key={obj.name} entity={obj} processInterface={() => this.props.processInterface()} />;
      });

    return (
      <>
        <h4 className="entities-list__header">List of Entities:</h4>
        <div className="entities-list">{entitiesFriendly}</div>
        <div className="entities-list">{entitiesUnfriendly}</div>
      </>
    );
  }
}
