import React, { ReactElement } from "react";
// services
import { Entity } from "../../services";
// components
import EntityCard from "../EntityCard/EntityCard";
// others
import GameStyles from "./Game.module.scss";

interface SelectedEntityInfoProperties {
  selected: Entity;
  onInventoryClick(entity: Entity, itemName: string): void;
  handleDeselectAllEntities: () => void;
  processInterface: Function;
}

// TODO: Change this into HOC, as it doesn't really need half of it's props for itself
export default class SelectedEntityInfo extends React.Component<SelectedEntityInfoProperties> {
  render(): ReactElement {
    if (!this.props.selected) {
      return null;
    }

    return (
      <div className={GameStyles.selected}>
        <strong className={GameStyles.selected__label}>Selected entity </strong>
        <div>
          <EntityCard
            onInventoryClick={this.props.onInventoryClick}
            entity={this.props.selected}
            processInterface={() => this.props.processInterface()}
          />
        </div>
        <button onClick={this.props.handleDeselectAllEntities} className={GameStyles.button}>
          {" "}
          Deselect
        </button>
      </div>
    );
  }
}
