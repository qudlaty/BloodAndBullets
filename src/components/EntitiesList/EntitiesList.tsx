import React from "react";
import EntityCard from "../EntityCard";
import "./EntitiesList.scss";
import { Entity } from "../../services/EntitiesValues";

interface ListOfEntitiesProps {
  entities: Entity[];
  onInventoryClick: any;
  processInterface: Function;
}

export default class ListOfEntities extends React.Component<ListOfEntitiesProps> {
  renderCounter = 0;
  render() {
    // console.log("Rendering EntitiesList #", this.renderCounter++);

    let entitiesFriendly = this.props.entities
      .filter((entity) => entity.isFriendly)
      .map((obj) => {
        return (
          <EntityCard
            onInventoryClick={this.props.onInventoryClick}
            entity={obj}
            key={obj.name}
            processInterface={() => this.props.processInterface()}
          />
        );
      });

    let entitiesUnfriendly = this.props.entities
      .filter((entity) => !entity.isFriendly)
      .map((obj) => {
        return <EntityCard entity={obj} key={obj.name} processInterface={() => this.props.processInterface()} />;
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
