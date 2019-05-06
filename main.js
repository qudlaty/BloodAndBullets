/* eslint-env es6 */
import rocket from './rocket';
// WSAD movemant

const gameWrapper = document.querySelector("#content-container"),
	  rocketWrapper = document.getElementById("rocket-wrapper");


window.addEventListener('keydown', e => {

	let offsets = rocketWrapper.getBoundingClientRect();

		if(e.keyCode === 68 ) {
			let xPos = offsets.left;
			rocketWrapper.style.left = xPos+ 20 + 'px';
		}
		else if(e.keyCode === 83) {
			let yPos = offsets.top;
			rocketWrapper.style.top = yPos + 20 + 'px';
		}
		else if(e.keyCode === 87 && offsets.top-20 >= 0) {
			let yPos = offsets.top;
			rocketWrapper.style.top = yPos - 20 + 'px';
		}
		else if(e.keyCode === 65 && offsets.left-20 >= 0) {
			let xPos = offsets.left;
			rocketWrapper.style.left = xPos - 20 + 'px';
		}
});

console.log(rocket.name);
/*
// click and move code ->
gameWrapper.addEventListener("click", e => {

	let xPosition = e.clientX - gameWrapper.getBoundingClientRect().left - (rocketWrapper.clientWidth / 2);

	let yPosition = e.clientY - gameWrapper.getBoundingClientRect().top - (rocketWrapper.clientHeight / 2);
	// in case of a wide border, the boarder-width needs to be considered in the formula above
	rocketWrapper.style.left = xPosition + "px";
	rocketWrapper.style.top = yPosition + "px";
});
*/
