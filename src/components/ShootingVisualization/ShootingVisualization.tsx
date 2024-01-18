import * as Helpers from "helpers";
import React, { ReactElement } from "react";
import { WeaponType } from "services";

export function ShootingVisualization(props): ReactElement {
  const { entity } = props;

  const calcNewAangle = Helpers.calculateAngle;
  const targetCoords = entity.targetPosition;
  let projectileNumber = 5;
  const projectiles = [];
  const localId = `Entity${entity.icon}`;
  const uniqueShootingAnimationId = `shooting-animation-${localId}-ap-${entity.actionPoints}`;
  let customStyle = "";
  let commonStyles = "";

  if (
    targetCoords &&
    entity.position &&
    entity.hasWeapon &&
    entity.isShooting &&
    (entity.targetPosition.x !== entity.position.x || entity.targetPosition.y !== entity.position.y)
  ) {
    if (targetCoords) {
      const distanceToTargetXInUnits = targetCoords.x - entity.position.x;
      const distanceToTargetYInUnits = targetCoords.y - entity.position.y;

      const actualDistanceInUnits = Helpers.calculateDistance(distanceToTargetXInUnits, distanceToTargetYInUnits);
      const weaponType = entity && entity.equipment && entity.equipment.hands && entity.equipment.hands.type;
      const angle = calcNewAangle(distanceToTargetXInUnits, distanceToTargetYInUnits);
      commonStyles = `
      @keyframes fading${uniqueShootingAnimationId} {
        0%  {opacity: 1;}
        95% {opacity: 1;}
        100%  {opacity: 0;}
      }

      .fading-after-1s-for-${uniqueShootingAnimationId} {
        animation: fading${uniqueShootingAnimationId} 1s linear normal forwards 1;
      }
      `;

      if (weaponType === WeaponType.energy) {
        // TODO: perhaps call to `visualizeShooting(from,to,weaponType)`
        const className = `projectile${localId}_beam`;
        const projectile = "";
        const distanceWhereBeamBegins = 20; //in pixels
        //actualDistance = actualDistance - distanceWhereBeamBegins;
        // do above within template
        customStyle = `
          @keyframes pulsing${localId} {
            0%  {opacity: 0.1;}
            100%  {opacity: 1;}
          }

          @keyframes elongating${localId} {
            0%  { width: calc(${actualDistanceInUnits}em + ${actualDistanceInUnits} * 4px - 20px); }
            100%  {width: calc(${actualDistanceInUnits}em + ${actualDistanceInUnits} * 4px - 20px); }
          }

          @keyframes swiping${localId} {
            0%  {transform: rotate(${angle + 90 - 1}deg) translateX(${distanceWhereBeamBegins}px);}
            50%  {transform: rotate(${angle + 90 + 1}deg) translateX(${distanceWhereBeamBegins}px);}
            100%  {transform: rotate(${angle + 90 - 1}deg) translateX(${distanceWhereBeamBegins}px);}
          }

          .${className} {
            width: ${actualDistanceInUnits}em;
            height: 3px;
            border-radius: 5px;
            background: #F00;
            position: absolute;
            top: 0.5em;
            left: 0.5em;
            transform: rotate(${angle + 90}deg);/* overriden by swiping keyframes */
            transform-origin: left 0px;
            animation: pulsing${localId} 0.1s ease infinite,
            elongating${localId} 0.7s ease alternate infinite,
            swiping${localId} 1s ease alternate infinite;
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
        const projectile = entity.isShooting ? "|" : "";

        projectileNumber = 3;

        while (projectileNumber--) {
          const className = `projectile projectile${localId}_${projectileNumber}`;
          projectiles.push(
            <div key={className} className={className}>
              {projectile}
            </div>
          );
        }
      }
    }
  }
  const finalClassName = `shooting-visualization fading-after-1s-for-${uniqueShootingAnimationId}`;
  return (
    <div className={finalClassName}>
      <style>{customStyle + commonStyles}</style>
      {projectiles}
    </div>
  );
}
