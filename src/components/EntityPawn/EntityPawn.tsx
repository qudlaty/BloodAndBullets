import React from "react";
import { SquaresService, Entity, Weapon } from "services";
import { HpBar, ShootingVisualization, EmojiMapper } from "components";
import * as Helpers from "helpers";
import "./EntityPawn.scss";
import { action } from "@storybook/addon-actions/*";

interface EntityPawnProps {
  entity: Entity;
}

export class EntityPawn extends React.Component<EntityPawnProps> {
  randomTime = `${(Math.random() + 0.5).toFixed(2)}s`;

  render() {
    const { entity } = this.props;
    const square = SquaresService.getSquareFromPosition(entity.position.x, entity.position.y);

    const classNameBase = "entity-pawn__icon";
    let className = `${classNameBase}`;
    let classessFromFlags = Helpers.turnFlagsIntoClasses(entity, classNameBase);
    classessFromFlags += Helpers.turnFlagsIntoClasses(square, classNameBase);
    className += ` ${classessFromFlags} `;
    const fof = entity.isFriendly ? "friendly" : "hostile";
    const color = entity.isFriendly ? "green" : "red";
    const zIndex = entity.isShooting ? 5 : 1;
    const animationBreathing = entity.isBreathing ? `breathing ${this.randomTime} alternate infinite linear` : "none";

    const boardPadding = 10;
    const squareMargin = 2;

    const customPropsObject = { weaponType: (entity.equipment?.hands as Weapon)?.type, actionId: entity.attackNumber };

    return (
      <div
        className={`entity-pawn ${entity.isDead ? "entity-pawn--dead" : ""}`}
        key={entity.name}
        style={{
          left: `calc(${boardPadding + 3}px + ${entity.position.x * squareMargin * 2}px + ${entity.position.x}em)`,
          top: `calc(${boardPadding + 3}px + ${entity.position.y * squareMargin * 2}px + ${entity.position.y}em)`,
          zIndex: zIndex,
        }}
      >
        <div className={`entity-pawn__health-display ` + fof}>
          <HpBar current={entity.hp} max={entity.maxHp} color={color} />
        </div>

        <div
          className={className}
          style={{
            animation: animationBreathing,
          }}
        >
          <EmojiMapper emoji={entity.icon} />
        </div>
        {entity.isShooting && <ShootingVisualization {...entity} {...customPropsObject} />}
      </div>
    );
  }
}
