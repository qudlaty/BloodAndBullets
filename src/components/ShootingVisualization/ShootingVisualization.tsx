import * as Helpers from "helpers";
import React, { ReactElement } from "react";
import { Position, WeaponType } from "services";
import "./ShootingVisualization.scss";

export type ShootingVisualizationProps = {
  /** Position of a target square in a grid */
  targetPosition: Position;
  /** Position of a source square in a grid */
  position: Position;
  /** Type of a weapon */
  weaponType: WeaponType;
  /** Unique number of this action - used to ensure each attack has a separate animation */
  actionId: number;
  /** Time to run the visualization animation, in milliseconds. 0 to not run at all, -1 to run infinitely */
  runningTimeInMs?: number;
};
/** Displays a shooting attack visualization */
export function ShootingVisualization({
  targetPosition,
  position,
  weaponType,
  actionId,
  runningTimeInMs = 1000,
}: ShootingVisualizationProps): ReactElement {
  const calcNewAangle = Helpers.calculateAngle;
  const targetCoords = targetPosition;
  let projectileNumber = 5;
  const projectiles = [];
  const localId = `Entity-x${position.x}-y${position.y}-tx${targetCoords.x}-ty${targetCoords.y}-aid${actionId}`;
  const uniqueShootingAnimationId = `shooting-animation-${localId}`;
  let customStyle = "";
  let commonStyles = "";
  const runningTime = runningTimeInMs ?? 1000;

  if (targetCoords && position && (targetPosition.x !== position.x || targetPosition.y !== position.y)) {
    if (targetCoords) {
      const distanceToTargetXInUnits = targetCoords.x - position.x;
      const distanceToTargetYInUnits = targetCoords.y - position.y;

      const actualDistanceInUnits = Helpers.calculateDistance(distanceToTargetXInUnits, distanceToTargetYInUnits);
      const angle = calcNewAangle(distanceToTargetXInUnits, distanceToTargetYInUnits);

      commonStyles = `
      @keyframes fading${uniqueShootingAnimationId} {
        0%  {opacity: 1;}
        90% {opacity: 1;}
        100%  {opacity: 0;}
      }
      ${
        runningTime >= 0
          ? `
          .fading-after-${runningTime}ms-for-${uniqueShootingAnimationId} {
              animation: fading${uniqueShootingAnimationId} ${runningTime}ms linear normal forwards 1;
          }`
          : ``
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
              ${36 * (targetCoords.x - position.x)}px,
              ${36 * (targetCoords.y - position.y)}px
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
        const projectile = "|";

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
  const finalClassName = `shooting-visualization fading-after-${runningTime}ms-for-${uniqueShootingAnimationId}`;
  return (
    <div className={finalClassName}>
      <style>{customStyle + commonStyles}</style>
      {projectiles}
    </div>
  );
}
