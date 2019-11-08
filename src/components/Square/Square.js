import React from 'react';
import "./Square.scss";

class Square extends React.Component {
  /*
    We use PureComponent, so it compares new props with previous props,
    and only re-renders when props changed.
   */
  renderCounter = 0

  shouldComponentUpdate(nextProps, nextState) {
    if(JSON.stringify(nextProps) === JSON.stringify(this.props)) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    this.renderCounter++;
    //console.log("Rendering Square", this.renderCounter, this.props);

    let className = "square";
    let localId = `Sq${this.props.squareId}`;

    if(this.props.active) {
      className += " active ";
    }
		if(this.props.isAvailableDestination) {
			className += " is-available-destination "
		}
    if(this.props.icon){
      if(this.props.isBreathing) {
        className += " breathing";
      } else {
        className += " dead";
      }
      if(this.props.isShooting) {
        className += " shooting";
      }
    }

    let randomTime = `${(Math.random()+0.5).toFixed(2)}s`
    let animationBreathing = this.props.isBreathing ?
        `breathing ${randomTime} alternate infinite linear` : 'none';

    let targetCoords = this.props.targetPosition;
    let projectileNumber = 5;
    let projectiles = [];
    let customStyle = "";

    let calcNewAangle = function(x, y){
      let angle;
      if(y >= 0) {
        angle = - Math.atan(
          x/y
        ) * (180/Math.PI);
      } else if(y < 0) {
        angle = (180/Math.PI) *
          (
            Math.atan(
              x/-y
            ) + Math.PI
          )
      }
      return angle;
    }

    if((this.props.targetPosition && this.props.position && this.props.isShooting) &&
      (this.props.targetPosition.x !== this.props.position.x ||
      this.props.targetPosition.y !== this.props.position.y)) {

      if(targetCoords) {

        let distanceToTargetX = 38*(targetCoords.x-this.props.position.x);
        let distanceToTargetY = 38*(targetCoords.y-this.props.position.y);
        let actualDistance = Math.sqrt(Math.pow(distanceToTargetX, 2) + Math.pow(distanceToTargetY, 2));
        if(this.props.weaponType === 'Lazer') {

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
              elongating${localId} 1s linear alternate infinite;
              box-shadow: 0 0 5px 5px white;
              z-index: 10;
            }

            `;

          projectiles.push(<div key={className} className={className}>{projectile}</div>);
        }else {

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
              top: 5px;
              left: 0px;
              width: 100%;
              height: 100%;
              line-height: 34px;
              font-size: 17px;
              animation: shooting${localId} 0.5s linear infinite;
              animation-delay: ${projectileNumber  * 0.5}s;
              color: white;
            }`;
          };
          let projectile = this.props.isShooting ? "*" : "";

          projectileNumber = 5;

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
