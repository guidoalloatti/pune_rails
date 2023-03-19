var wormsKeys = {
	red: {left: '', right: ''},
	blue: {left: '', right: ''},
	green: {left: '', right: ''},
	yellow: {left: '', right: ''},
	purple: {left: '', right: ''},
	cyan: {left: '', right: ''},
}

var keyMapping = {
	// `: 192,
	0: 48, 
	1: 49, 
	2: 50, 
	3: 51, 
	4: 52, 
	5: 53, 
	6: 54, 
	7: 55, 
	8: 56, 
	9: 57,
	// -: 189,
	// =: 187, 
	q: 81,
	w: 87,

	a: 65,
	s: 83,

	z: 90,
	x: 88,
}

// e =
// r = 
// t = 
// y =
// u = 
// i = 
// o = 
// p = 
// [ =
// ] = 

// a = 65
// s = 83
// d = 
// f = 
// g =
// h =
// i = 
// j =
// ; =
// ' =

// z = 90
// x = 88
// c = 
// v =
// b =
// n = 
// m =
// , =
// . =
// / =

function clearKeys() {
	keysBeenPressed = new Array(512);
}	


document.onkeyup = function(event) {
	if(event == null) keyCode = window.event.keyCode; 
	else keyCode = event.keyCode; 
	
	keysBeenPressed[keyCode] = false;
}

document.onkeydown = function(event) {  
	if(event == null) keyCode = window.event.keyCode; 
	else keyCode = event.keyCode; 
	
	/* Set and unset pause */
	if(keyCode == 32) pause(true);
		
	keysBeenPressed[keyCode] = true;
}

function modifyWormsAngle() {
	/* Red Worm Moving */
	if(players[0]) {
		if(keysBeenPressed[wormsKeys['red']['left']]) worms[0] = changeAngle("right", worms[0]);
		if(keysBeenPressed[wormsKeys['red']['right']]) worms[0] = changeAngle("left", worms[0]);	
	}
	
	/* Blue Worm Moving */
	if(players[1]) {
		if(keysBeenPressed[wormsKeys['blue']['left']]) worms[1] = changeAngle("right", worms[1]);
		if(keysBeenPressed[wormsKeys['blue']['right']]) worms[1] = changeAngle("left", worms[1]);
	}
	
	/* Green Worm Moving */
	if(players[2]) {
		if(keysBeenPressed[86]) worms[2] = changeAngle("right", worms[2]);
		if(keysBeenPressed[66]) worms[2] = changeAngle("left", worms[2]);
	}
	
	/* Yellow Worm Moving */
	if(players[3]) {
		if(keysBeenPressed[39]) worms[3] = changeAngle("right", worms[5]);
		if(keysBeenPressed[40]) worms[3] = changeAngle("left", worms[5]);
	}

	/* Purple Worm Moving */
	if(players[4]) {
		if(keysBeenPressed[54]) worms[4] = changeAngle("right", worms[3]);
		if(keysBeenPressed[55]) worms[4] = changeAngle("left", worms[3]);
	}
		
	/* Cyan Worm Moving */
	if(players[5]) {
		if(keysBeenPressed[222]) worms[5] = changeAngle("right", worms[4]);
		if(keysBeenPressed[187]) worms[5] = changeAngle("left", worms[4]);
	}
}