import React from 'react';
import "./Square.scss";

class Square extends React.PureComponent {
  /*
    We use PureComponent, so it compares new props with previous props,
    and only re-renders when props changed.
   */
  render() {
    // console.log("Rendering Square");
    let className = "square";
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

    if(targetCoords) {
      customStyle = `
        @keyframes shooting {
          0%   {transform: scale(1);}
          100% {transform: translate(
            ${35*(targetCoords.x)}px,
            ${36*(targetCoords.y-1)}px
          )}
        }

        `;

      while(projectileNumber--) {
        customStyle += `
        .projectile${projectileNumber} {
          position: absolute;
          top: 16px;
          left: 16px;
          animation: shooting 0.5s linear infinite;
          animation-delay: ${projectileNumber  * 0.5}s;
          color: white;
        }`;
      };
      let projectile = this.props.isShooting ? "*" : "";

      projectileNumber = 5;

      while(projectileNumber--) {
        let className=`projectile projectile${projectileNumber}`
        projectiles.push(<div key={className} className={className}>{projectile}</div>);
      };
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
