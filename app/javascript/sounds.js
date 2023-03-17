/*
* Sound Functions
*/

var soundOn = true;

function soundSwitcher() {
	var sound = "Sound Off";
	soundOn = !soundOn;
	if(soundOn) sound = "Sound On"

	$("#sound_label").text(sound);
	$("#log").text($("#log").text()+"\nSound Toggled: " + sound);
}

function playSound(action) {
	if(soundOn) {
		var sound = document.getElementById("sound_" + action);
		var src = '/sounds/' + action + '.mp3';
		sound.src = src;
		sound.muted = false; 
		sound.play();
		
		var td = document.getElementById(action);
		if(['red', 'blue', 'green', 'purple', 'cyan', 'yellow'].includes(action)) {
			td.style.color = action;
			td.style.backgroundColor = "white"; //invertHex(getHexColor(action));
		} else {
			td.style.color = "orange";
			td.style.backgroundColor = "white";
		}

		setTimeout(function() {
			if(['red', 'blue', 'green', 'purple', 'cyan', 'yellow'].includes(action)) {
				td.style.color = "black";
				td.style.backgroundColor = action;
			} else {
				td.style.color = "black";
				td.style.backgroundColor = "white";
			}
		}, 2000);
	}
}

function invertHex(hex) {
	return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
}

function getHexColor(colorStr) {
    var a = document.createElement('div');
    a.style.color = colorStr;
    var colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
    document.body.removeChild(a);
    return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
}