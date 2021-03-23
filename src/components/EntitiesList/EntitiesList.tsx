import React from "react";
import EntityCard from "../EntityCard";
import "./EntitiesList.scss";
import { Entity } from "../../services/EntitiesService";

interface ListOfEntitiesProps {
  entities: Entity[];
  onInventoryClick: any;
  processInterface: Function;
}

export default class ListOfEntities extends React.Component<ListOfEntitiesProps> {
  render() {
    let entitiesFriendly = this.props.entities
      .filter((entity) => entity.isFriendly)
      .map((obj) => {
        return (
          <EntityCard
            key={obj.name}
            entity={obj}
            onInventoryClick={this.props.onInventoryClick}
            processInterface={() => this.props.processInterface()}
          />
        );
      });

    let entitiesUnfriendly = this.props.entities
      .filter((entity) => !entity.isFriendly)
      .map((obj) => {
        return <EntityCard key={obj.name} entity={obj} processInterface={() => this.props.processInterface()} />;
      });

    return (
      <>
        <h4 className="entities-list__header">List of Entities:</h4>
        <h5>Friendly:</h5>
        <div className="entities-list">{entitiesFriendly}</div>
        <br/>
        <h5>Unfriendly:</h5>
        <div className="entities-list">{entitiesUnfriendly}</div>
      </>
    );
  }
}
