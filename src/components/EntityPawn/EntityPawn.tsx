import React from "react";
import { SquaresService } from "../../services";
import { Entity } from "../../services/EntitiesService";
import { HpBar } from "../HpBar";
import { ShootingVisualization } from "../ShootingVisualization";
import * as Helpers from "../../helpers";
import "./EntityPawn.scss";

interface EntityPawnProps {
  entity: Entity;
}

export default class EntityPawn extends React.Component<EntityPawnProps> {
  randomTime = `${(Math.random() + 0.5).toFixed(2)}s`;

  render() {
    let { entity } = this.props;
    let square = SquaresService.getSquare(entity.position.x, entity.position.y);
    const squareDistance = 52;

    let classNameBase = "entity-pawn__icon";
    let className = `${classNameBase}`;
    let classessFromFlags = Helpers.turnFlagsIntoClasses(entity, classNameBase);
    classessFromFlags += Helpers.turnFlagsIntoClasses(square, classNameBase);
    className += ` ${classessFromFlags} `;
    let fof = entity.isFriendly ? 'friendly' : 'hostile';
    let color = entity.isFriendly ? 'green' : 'red';
    let zIndex = entity.isShooting ? 5 : 1;
    let animationBreathing = entity.isBreathing ? `breathing ${this.randomTime} alternate infinite linear` : "none";

    let boardPadding = 10;
    let squareMargin = 2;
    return (
      <div
        className="entity-pawn"
        key={entity.name}
        style={{
          left: `calc(${boardPadding + 3}px + ${entity.position.x * squareMargin * 2}px + ${entity.position.x}em)`,
          top: `calc(${boardPadding + 3}px + ${entity.position.y * squareMargin * 2}px + ${entity.position.y}em)`,
          zIndex: zIndex,
        }}
      >
        <div
          className={`entity-pawn__health-display ` + fof}
        >

          <HpBar
            current={entity.hp}
            max={entity.maxHp}
            color={color}
          />
        </div>

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
}
