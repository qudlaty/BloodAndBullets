/* eslint-env es6 */
import rocket from './rocket';
// WSAD movemant

const gameWrapper = document.querySelector("#content-container"),
	  rocketWrapper = document.getElementById("rocket-wrapper");

window.addEventListener('keydown', e => {

	let offsets = rocketWrapper.getBoundingClientRect();
  
  const delta = 1;
		if(e.keyCode === 68 ) { // D - right
			rocket.vel.x = rocket.vel.x + delta;
		}
		else if(e.keyCode === 83) {// S - down
			rocket.vel.y = rocket.vel.y + delta;
		}
		else if(e.keyCode === 87 && offsets.top-delta >= 0) {// W - up
			rocket.vel.y = rocket.vel.y - delta;
		}
		else if(e.keyCode === 65 && offsets.left-delta >= 0) {// A - left
			rocket.vel.x = rocket.vel.x - delta;
		}

		console.log(rocket);
});

function updateView() {
  rocket.updateRocketState();
	updateRocketOnScreen();
	window.requestAnimationFrame(updateView);
}
//setInterval(updateView, 10);
window.requestAnimationFrame(updateView);
console.log(rocket);

function updateRocketOnScreen() {
	rocketWrapper.style.left = rocket.pos.x + 'px';
	rocketWrapper.style.top = rocket.pos.y + 'px';
  rocketWrapper.style.transform = `rotate(${rocket.angle % 360}deg)`;
};