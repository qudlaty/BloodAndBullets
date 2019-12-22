import React, { ReactElement } from "react";
import { SquaresService } from "../../services";
import { Entity } from "../../services/EntitiesValues";

interface EntityPawnProps {
  entity: Entity;
}

export default function EntityPawn(props: EntityPawnProps): ReactElement {
  let { entity } = props;
  let square = SquaresService.getSquare(entity.position.x, entity.position.y);

  let squareDistance = 38;
  let className = " entity-piece ";

  if (square.isLit) className += " is-lit ";
  if (square.isInTwilightZone) {
    className += " is-in-twilight-zone ";
  }
  return (
    <div
      key={entity.name}
      className={className}
      style={{
        left: squareDistance / 2 - 4 + squareDistance * entity.position.x,
        top: squareDistance / 2 - 4 + squareDistance * entity.position.y,
        position: "absolute",
        fontSize: "1.5em",
        transition: "all 0.5s",
      }}
    >
      {entity.icon}
    </div>
  );
}
