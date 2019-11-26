import React from 'react';
import * as Helpers from '../../helpers'
import "./Square.scss";

const DISTANCE_BETWEEN_TILES = 38;

class Square extends React.Component {

  renderCounter = 0

  shouldComponentUpdate = (nextProps) => // only update if props differ
    (JSON.stringify(nextProps) !== JSON.stringify(this.props));

  render() {
    //this.renderCounter++;
    //console.log("Rendering Square", this.renderCounter, this.props);

    let className = "square";
    let localId = `Square${this.props.squareId}`;

    if(this.props.active) {
      className += " active ";
    }
		if(this.props.isAvailableDestination) {
			className += " is-available-destination "
		}
		if(this.props.isChosenDestination) {
			className += " is-chosen-destination "
		}
    if(this.props.icon){
      if(this.props.isBreathing) {
        className += " breathing ";
      }
      if(this.props.isDead) {
        className += " dead ";
      }
      if(this.props.isShooting) {
        className += " shooting ";
      }
    }
    if(this.props.isTargeted) {
      className += " targeted ";
    }

    let randomTime = `${(Math.random()+0.5).toFixed(2)}s`// 0.50 - 1.50s
    let animationBreathing = this.props.isBreathing ?
        `breathing ${randomTime} alternate infinite linear` : 'none';

    let targetCoords = this.props.targetPosition;
    let projectileNumber = 5;
    let projectiles = [];
    let customStyle = "";

    let calcNewAangle = Helpers.calculateAngle;

    if(
      (targetCoords && this.props.position && this.props.isShooting)
      &&
      (
        this.props.targetPosition.x !== this.props.position.x ||
        this.props.targetPosition.y !== this.props.position.y
      )
    ) {

      if(targetCoords) {
        // TODO: Move this into a helper

        let distanceToTargetX =
          DISTANCE_BETWEEN_TILES*(targetCoords.x-this.props.position.x);
        let distanceToTargetY =
          DISTANCE_BETWEEN_TILES*(targetCoords.y-this.props.position.y);

        let actualDistance = Helpers.calculateDistance(
          distanceToTargetX, distanceToTargetY
        );

        if(this.props.weaponType === 'lazer') {
          // TODO: perhaps call to `visualizeShooting(from,to,weaponType)`
          let className=`projectile${localId}_beam`;
          let projectile= "";
          let angle = calcNewAangle(distanceToTargetX, distanceToTargetY);
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
          projectiles.push(<div key={className} className={className}>{projectile}</div>);
        } else {

          customStyle = `
            @keyframes shooting${localId} {
              0%   {transform: scale(1);}
              100% {transform: translate(
                ${36*(targetCoords.x-this.props.position.x)}px,
                ${36*(targetCoords.y-this.props.position.y)}px
              )}
            }
            `;

          while(projectileNumber--) {
            customStyle += `
            .projectile${localId}_${projectileNumber} {
              position: absolute;
              top: -5px;
              left: 0px;
              width: 100%;
              height: 100%;
              line-height: 34px;
              font-size: 30px;
              animation: shooting${localId} 0.5s linear infinite;
              animation-delay: ${projectileNumber - 1 * 0.3}s;
              color: white;
            }`;
          };
          let projectile = this.props.isShooting ? "." : "";

          projectileNumber = 3;

          while(projectileNumber--) {
            let className=`projectile projectile${localId}_${projectileNumber}`
            projectiles.push(<div key={className} className={className}>{projectile}</div>);
          };
        }
      }
    }

    return (
      <button className={className} onClick={() => this.props.onClick(this.props.squareId)}>
        <div className="blood">{this.props.blood}</div>
        <div className="content" style={{
          animation: animationBreathing
        }}>{this.props.icon}</div>
        <style>
            {customStyle}
        </style>
        {projectiles}
      </button>
    );
  }
}

export default Square;
