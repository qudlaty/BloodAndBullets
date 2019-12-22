import React, { ReactElement } from "react";
import { SquaresService } from "../../services";
import { Entity } from "../../services/EntitiesValues";
import "./EntityPawn.scss";
import ShootingVisualization from "./ShootingVisualization";

interface EntityPawnProps {
  entity: Entity;
}

export default function EntityPawn(props: EntityPawnProps): ReactElement {
  let { entity } = props;
  let square = SquaresService.getSquare(entity.position.x, entity.position.y);

  let squareDistance = 38;
  let className = " entity-pawn ";

  if (square.isLit) className += " is-lit ";
  if (square.isInTwilightZone) {
    className += " is-in-twilight-zone ";
  }

  let randomTime = `${(Math.random() + 0.5).toFixed(2)}s`;
  let animationBreathing = props.entity.isBreathing ? `breathing ${randomTime} alternate infinite linear` : "none";

  return (
    <div
      className="entity-pawn-container"
      key={entity.name}
      style={{
        left: squareDistance / 2 - 4 + squareDistance * entity.position.x,
        top: squareDistance / 2 - 4 + squareDistance * entity.position.y,
      }}
    >
      <div
        className={className}
        style={{
          animation: animationBreathing,
        }}
      >
        {entity.icon}
      </div>
      <ShootingVisualization entity={entity} />
    </div>
  );
}
