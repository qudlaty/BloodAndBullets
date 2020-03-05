import * as Helpers from "../../helpers";
import React, { ReactElement } from "react";

export default function ShootingVisualization(props): ReactElement {
  const DISTANCE_BETWEEN_TILES = 38;
  let { entity } = props;

  let calcNewAangle = Helpers.calculateAngle;
  let targetCoords = entity.targetPosition;
  let projectileNumber = 5;
  let projectiles = [];
  let localId = `Entity${entity.icon}`;
  let customStyle = "";

  if (
    targetCoords &&
    entity.position &&
    entity.hasWeapon &&
    entity.isShooting &&
    (entity.targetPosition.x !== entity.position.x || entity.targetPosition.y !== entity.position.y)
  ) {
    if (targetCoords) {
      let distanceToTargetX = DISTANCE_BETWEEN_TILES * (targetCoords.x - entity.position.x);
      let distanceToTargetY = DISTANCE_BETWEEN_TILES * (targetCoords.y - entity.position.y);

      let actualDistance = Helpers.calculateDistance(distanceToTargetX, distanceToTargetY);
      let weaponType = entity && entity.equipment && entity.equipment.hands && entity.equipment.hands.type;
      let angle = calcNewAangle(distanceToTargetX, distanceToTargetY);

      if (weaponType === "lazer") {
        // TODO: perhaps call to `visualizeShooting(from,to,weaponType)`
        let className = `projectile${localId}_beam`;
        let projectile = "";

        customStyle = `
          @keyframes pulsing${localId} {
            0%  {opacity: 0.1;}
            100%  {opacity: 1;}
          }

          @keyframes elongating${localId} {
            0%  {width: ${actualDistance - 20};}
            100%  {width: ${actualDistance + 20};}
          }

          @keyframes swiping${localId} {
            0%  {transform: rotate(${angle + 90 + -1}deg);}
            50%  {transform: rotate(${angle + 90 + 1}deg);}
            100%  {transform: rotate(${angle + 90 - 1}deg);}
          }

          .${className} {
            width: ${actualDistance}px;
            height: 3px;
            border-radius: 5px;
            background: #F00;
            position: absolute;
            top: 16px;
            left: 16px;

            transform: rotate(${angle + 90}deg);
            transform-origin: left 0px;
            animation: pulsing${localId} 0.1s linear infinite,
            elongating${localId} 1s linear alternate infinite,
            swiping${localId} 1s linear alternate infinite;
            box-shadow: 0 0 5px 5px white;
            z-index: 10;
          }
          `;
        projectiles.push(
          <div key={className} className={className}>
            {projectile}
          </div>
        );
      } else {
        customStyle = `
          @keyframes shooting${localId} {
            0%   {transform: translate(0,0) rotate(${angle}deg) scaleY(0.3)}
            100% {transform: translate(
              ${36 * (targetCoords.x - entity.position.x)}px,
              ${36 * (targetCoords.y - entity.position.y)}px
            ) rotate(${angle}deg) scaleY(2)}
          }
          `;

        while (projectileNumber--) {
          customStyle += `
          .projectile${localId}_${projectileNumber} {
            transform: rotate(${angle}deg);
            animation: shooting${localId} 0.8s linear infinite;
            animation-delay: ${projectileNumber - 1 * 0.3}s;
          }`;
        }
        let projectile = entity.isShooting ? "|" : "";

        projectileNumber = 3;

        while (projectileNumber--) {
          let className = `projectile projectile${localId}_${projectileNumber}`;
          projectiles.push(
            <div key={className} className={className}>
              {projectile}
            </div>
          );
        }
      }
    }
  }
  return (
    <div className="shooting-visualization">
      <style>{customStyle}</style>
      {projectiles}
    </div>
  );
}
