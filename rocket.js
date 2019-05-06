var rocket = {
  name: "Rocket One",
  pos: {
    x: 100,
    y: 100
  },
  vel: {
    x: 0,
    y: 0
  },
  angle: 0,
  
  calcNewPos: function(){
    let friction = 0.99;
    this.pos.x = this.pos.x + this.vel.x;
    this.pos.y = this.pos.y + this.vel.y;
    this.vel.x = this.vel.x * friction;
    this.vel.y = this.vel.y * friction;
  },
  
  calcNewAangle: function(){
      if(this.vel.y >= 0) {
        this.angle = - Math.atan(
          this.vel.x/this.vel.y
        ) * (180/Math.PI); 1     
      }else if(this.vel.y < 0) {
        this.angle = (180/Math.PI) * 
          (
            Math.atan(
              this.vel.x/-this.vel.y
            ) + Math.PI
          )
      }
  },
  
  updateRocketState: function(){
    this.calcNewAangle();
    this.calcNewPos();
  }
}

export default rocket;
