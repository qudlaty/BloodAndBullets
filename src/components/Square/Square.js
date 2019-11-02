import React from 'react';
import "./Square.scss";

class Square extends React.PureComponent {
  /*
    We use PureComponent, so it compares new props with previous props,
    and only re-renders when props changed.
   */
  counter = 0
  render() {

    // console.log("Rendering Square");
    let className = "square";
    let localId = `Sq${this.props.squareId}`;

    if(this.props.active) {
      className += " active";
    }
    if(this.props.value){
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
        `breathing ${randomTime} alternate infinite` : 'none';

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
      }else if(y < 0) {
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

        let distanceToTargetX = 35*(targetCoords.x-this.props.position.x);
        let distanceToTargetY = 35*(targetCoords.y-this.props.position.y);
        let actualDistance = Math.sqrt(Math.pow(distanceToTargetX, 2) + Math.pow(distanceToTargetY, 2));
        actualDistance = actualDistance -16 + 16 * this.counter++;
        if (this.counter == 5) {
          this.counter = 0;
        }
        //console.log(actualDistance);

        if(this.props.weaponType === 'Lazer') {

          let className=`projectile${localId}_beam`;
          let projectile= "";
          let angle = calcNewAangle(distanceToTargetX, distanceToTargetY);
          customStyle = `
            @keyframes pulsing${localId} {
              0%  {opacity: 0.1;}
              100%  {opacity: 1;}
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
              animation: pulsing${localId} 0.1s linear infinite;
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
        <div className="content" style={{
          animation: animationBreathing
        }}>{this.props.value}</div>
        <style>
            {customStyle}
        </style>
        {projectiles}
      </button>
    );
  }
}

export default Square;
