
// var colorMatrix = new Array();
var players = new Array();
var gameInProgress = false;
var setupCompleted = false;
var colorsArray = ["red", "blue", "green", "yellow", "purple", "cyan"];
var playingWorms = {};
var currentWorm;

// var wormRed;
// var wormBlue;
// var wormGreen;
// var wormYellow;
// var wormPurple;
// var wormCyan;

/**
 * Starting the Game when page is Ready
 */
window.onload = function() {
	updateVolumeInput()
	checkGameSet();
}

function checkGameSet() {
	if(setupCompleted) { 
		message = "Start Game!";
		fetchSettings();
	}
	else message = "Please setup the game!"

	$("#start_game_button").prop("disabled", !setupCompleted);
	$("#start_game_button").text(message);
}

function fetchSettings() {
	var game_id = $("#game_id").text();

	$.ajax({
		url: "/settings/fetch",
		data: {"game_id": game_id},
		type: "POST",
		success: function (data) {
			explainHowToMove(data);
			setArrays(data);
		}
	});
}

function explainHowToMove(data) {
	$("#how_to_move_tbody").empty();

	colorsArray.forEach(function(color) {
		if(data[color + "_play"]) {
			$("#how_to_move_tbody").append(
			"<tr>" +
				"<td class='capitalize'>" + color + "</td>" +
				"<td>" + data[color + "_left"] + "</td>" +
				"<td>" + data[color + "_right"] + "</td>" +
			"</tr>"
		)};
	});
}

function setArrays(data) {
	// Who is playing
	players[0] = data["red_play"];
	players[1] = data["blue_play"];
	players[2] = data["green_play"];
	players[3] = data["yellow_play"];
	players[4] = data["purple_play"];
	players[5] = data["cyan_play"];
	
	// Which are they colors
	colors[0] = "red"; 
	colors[1] = "blue"; 
	colors[2] = "green";
	colors[3] = "yellow";
	colors[4] = "purple";
	colors[5] = "cyan";

	// Set Playing Worms
	playingWorms = {
		'red'	: data["red_play"],
		'blue'	: data["blue_play"],
		'green'	: data["green_play"],
		'yellow': data["yellow_play"],
		'purple': data["purple_play"],
		'cyan'	: data["cyan_play"],
	};

	// Set Worms Array and Keys
	for(var i = 0; i < worms.length; i++) {
		if(players[i]) {
			var worm = new Worm(colors[i]);
			worm["left"] = data[colors[i] + "_left"];
			worm["right"] = data[colors[i] + "_right"];
			
			worm["leftKeyCode"] = keyMapping[data[colors[i] + "_left"]];
			worm["rightKeyCode"] = keyMapping[data[colors[i] + "_right"]];
			
			worms[i] = worm;
		}
	}

}


function startGameNow() {
	if(gameInProgress) {
		$("#start_game_button").prop("disabled", true);
		$("#start_game_button").text("Game Started!");
	} else {
		gameInProgress = true;
		startGame();
		addToLog("New Game Started!")
	}
}

function startGame() {
	context = loadCanvasContext();
	marker = loadMarkerCanvas();

	if(context && marker) {
		isNewRound = false;
		speed = startingSpeed;
		isNewRound = true;

		start();
		setRound();
		doSpeeding();

		$("#rounds").text("1");
		$("#speed").text("Current Speed: " + speed);

		changeInterval(speed);
	} else {
		alert("Cannot Load Canvas");
	}
}

// Starting the contexts, set speeding and start Worms
function start() {
	setContextProperties();
	setMarkerProperties();

	context.fillRect(0, 0, xMax, yMax);
	marker.fillRect(xMax, 0, xMax+100, yMax);
	
	drawMarkers();
	startWorms();
}

function changeAngle(direction, currentWorm) {
	if(direction == "left")	{
		if((currentWorm.angle-angleStepSize) <= 0)
			currentWorm.angle = angleMax + (currentWorm.angle);
			currentWorm.angle-=angleStepSize; 
	}
	else if(direction == "right") {
		if((currentWorm.angle + angleStepSize) >= angleMax)
			currentWorm.angle = 0-(angleMax-currentWorm.angle);
			currentWorm.angle+=angleStepSize;
	}
	return currentWorm;
}

// Worm Object Definition
class Worm {
	constructor(color) {
		this.color = color;
		this.x;
		this.y;
		this.previousX = new Array(histotyDotsSaved);
		this.previousY = new Array(histotyDotsSaved);
		this.previousHole = new Array(histotyDotsSaved);
		this.angle;
		this.alive = true;
		this.playing = false;
		this.score = 0;
		this.length = 0;
		this.lastHoleStarted = 0;
		this.left;
		this.right;
		this.leftKeyCode;
		this.rightKeyCode;
	}
}

// Start each individual Worm
function startWorms() {
	for(var i = 0; i < colors.length; i++) if(players[i]) startWorm(colors[i]);
	drawScore();
}

// Start a worm each round
function startWorm(color) {
	// TODO: Limit the place and border proximity to avoid fast death
	// Getting Random Postitions and Angle
	i = getWormIndexByColor(color);

	if(!isNewRound) worms[i].score = 0;
		
	worms[i].x = Math.floor(Math.random()*xMax);
	worms[i].y = Math.floor(Math.random()*yMax);
	worms[i].angle = Math.floor(Math.random()*angleMax);
	worms[i].color = color;
	worms[i].alive = true;
	worms[i].playing = true;
	worms[i].length = 0;
	
	drawWorm(worms[i]);
}

// This function gets the worm who is winning with it size
function getLongestWorm() {
	longestWormSize = 0;
	longestWorm = "";
	
	for(var i = 0; i < worms.length; i++) {
		if(players[i]) {
			//alert(i+" "+worms[i].length+" "+longestWormSize);
			if(worms[i].length >= longestWormSize)
			{
				longestWorm = worms[i];
				longestWormSize = worms[i].length;
				//alert(worms[i].length);
			}
		}
	}
}

// Set Time interval (must not exists any more when render will be implemented)
function changeInterval(speed) {
	fps = speed + basicFPSValue;
	clearInterval(interval);
	interval = setInterval(moveWorms, intervalMiliSeconds/fps);
}

// This function do the real speeding
function doSpeeding() {
	playSound("speeding");
	speed += speedingIncrementSpeed;
	changeInterval(speed);
	addMessage("Current Speed: " + (speed), "speed");
}

// This function evaluates and if random numbers matchs speeds
function speeding() {
	random_1 = Math.floor(Math.random()*(speedingChance+speed));
	random_2 = (speedingChance+speed) - Math.floor(Math.random()*(speedingChance+speed));
	if(random_1 == random_2) doSpeeding();
}

// This function move each worm and is called in the time interval
function moveWorms() {
	if(onPause) return;
	
	speeding();
	modifyWormsAngle();
	
	for(var i = 0; i < colors.length; i++) {
		if(players[i] && worms[i].alive)
			moveWorm(worms[i]);
	}
} 

// Add the score to all non dead worms
function addScore() {
	for(var i = 0; i < worms.length; i++) {
		if(players[i] && worms[i].alive) worms[i].score++;
	}
}

// Determines wich worms are alive
function getWormsAlive() {
	wormsAlive = 0;
	for(var i = 0; i < worms.length; i++) {
		if(players[i] && worms[i].alive) wormsAlive++;
	}
}

// Get the highest Score and the Winning Worm
function getMaxScore() {
	maxScore = 0;
	for(var i = 0; i < worms.length; i++) {
		if(players[i] && worms[i].score > maxScore) {
			maxScore = worms[i].score;
			winningWorm = i;
		}
	}
}

// Get the score needed to win the match
function getScoreToWin() {
	scoreToWin = -10;
	for(var i = 0; i < worms.length; i++){
		if(players[i]) scoreToWin+=10;
	}
}

// Calculates if the worm crush with other worm, also play yabass if passed through a hole
function isWormHit(currentWorm) {
	radians = currentWorm.angle*(Math.PI/180);
	sin = Math.sin(radians*sizeMultiplier);
	cos = Math.cos(radians*sizeMultiplier);

	x = currentWorm.x+(cos*(Math.PI*2));
	y = currentWorm.y+(sin*(Math.PI*2));

	imageArray = context.getImageData(x, y, 1, 1);
	var redValue = imageArray.data[0];
	var greenValue = imageArray.data[1];
	var blueValue = imageArray.data[2];
	// var alphaValue = imageArray.data[3];
	
	if(redValue != 0 || greenValue != 0 || blueValue != 0) {
		//showPixelInfo(currentWorm, imageArray);
		if(redValue == 1 && greenValue == 1 && blueValue == 1) playSound("yabass");
		else return true;
	}
			
	return false;
}

// Stablish the current round
function setRound() {
	currentRound++;
	addMessage("Current Round: " + currentRound, "rounds");
}

// Huge function, move a worm, evaluate if the worm has crushed 
function moveWorm(currentWorm) {
	wormHasCrush = isWormHit(currentWorm);
		
	if(currentWorm.x+wormSize > xMax || 
	   currentWorm.x-wormSize < 0 || 
	   currentWorm.y+wormSize > yMax || 
	   currentWorm.y-wormSize < 0 || 
	   wormHasCrush)
		  wormCrushes(currentWorm);
	else
		  wormIsAlive(currentWorm);
}	

// The worm has not crush and can move
function wormIsAlive(currentWorm) {
	radians = currentWorm.angle*(Math.PI/180);
	sin = Math.sin(radians*sizeMultiplier);
	cos = Math.cos(radians*sizeMultiplier);
	storePreviuosCoordinates(currentWorm);
	currentWorm.y += sin;
	currentWorm.x += cos;
	drawWorm(currentWorm);	
}
	
// The worm is dead, so we need to kill her	
function wormCrushes(currentWorm) {
	playSound("die");
	
	//speed = startingSpeed;
	//changeInterval(speed);
	
	currentWorm.alive = false;
	addScore();
	getWormsAlive();	
	
	if(wormsAlive < 2)
		lastWormCrushes(currentWorm);

	drawMarkers();
	drawScore();
	
	getLongestWorm();
	message = "Longest Worm: "+longestWorm.color;
	addMessage(message, "longest");
	message = "Size: "+longestWormSize;  
	addMessage(message, "longest_size");
}
			
// The last worm is dead, needs to start a new round and maybe a new match
function lastWormCrushes(currentWorm) {
	clearKeys();
	getMaxScore();
	getScoreToWin();
	setRound();

	if(maxScore >= scoreToWin)
		matchOver(currentWorm);
	else
		roundOver(currentWorm);
}

// This function is called when the match is over				
function matchOver(currentWorm) {
	playSound("win");
	currentRound = 0;
	isNewRound = false;
	alert("Winner!\nThe Winner Worm with "+maxScore+" points is....\nThe Glorious "+colors[winningWorm]+" Worm!!");
	startGame();
}

// This function is called when the round is over
function roundOver(currentWorm) {
	yMarker = 0;
	if(winningWorm == 0) 
		playSound("red");
	else if(winningWorm == 1) 
		playSound("blue");
	else if(winningWorm == 2) 
		playSound("green");
	else if(winningWorm == 3) 
		playSound("yellow");
	else if(winningWorm == 4) 
		playSound("purple");
	else if(winningWorm == 5) 
		playSound("cyan");
	start();
}

// This function stores the previuos coordinates of ther worms
function storePreviuosCoordinates(currentWorm) {
	if(!currentWorm) return; 
	if(!currentWorm.previousX) return;
	if(!currentWorm.previousY) return;

	for(var i = histotyDotsSaved; i > 0; i--) {
		currentWorm.previousX[i] = currentWorm.previousX[i-1]; 
		currentWorm.previousY[i] = currentWorm.previousY[i-1];
	}
	currentWorm.previousX[0] = currentWorm.x;
	currentWorm.previousY[0] = currentWorm.y;
}

// Stablish if the worm should a hole
function isHole(currentWorm) {
	var module = currentWorm.length%(holeSize+spaceBetweenHoles);
	if(module <= holeSize) return true;
	return false;
}

// Gets the worm index by the color
function getWormIndexByColor(color) {
	switch(color) {
		case "red":
			return 0;
			break;
		case "blue":
			return 1;
			break;
		case "green":
			return 2;
			break;
		case "yellow":
			return 3;
			break;
		case "purple":
			return 4;
			break;
		case "cyan":
			return 5;
			break;
		default:
			return 100;
			break;
	}
}

// This function adds a message to different textareas
function addMessage(message, id) {
	$("#" + id).val(message);
}

// This function shows the current worm info
function showWormInfo(currentWorm) {
	alert(	"color: "+currentWorm.color+
			"\nx: "+currentWorm.x+
			"\ny: "+currentWorm.y+
			"\nangle: "+currentWorm.angle+
			"\nalive: "+currentWorm.alive+
			"\nplaying: "+currentWorm.playing+
			"\nscore: "+currentWorm.score+
			"\nlength: "+currentWorm.length);		
}  

// This function shows the information related with the selected picture
function showPixelInfo(currentWorm, imageArray) {
	alert(	"current.x: "+currentWorm.x+
			"\ncurrent.y: "+currentWorm.y+
			"\nnext.x: "+x+
			"\nnext.y: "+y+
			"\nred: "+imageArray.data[0]+
			"\ngreen: "+imageArray.data[1]+
			"\nblue: "+imageArray.data[2]+
			"\nalpha: "+imageArray.data[3]+
			"\nlength: "+currentWorm.length);
} 

// Render Screen: This function draws all
function renderScreen() {
	// draw canvas
	for(var i = 0; i < worms.length; i++) {
		if(players[i] && worms[i].score > maxScore) {
			renderWorm(worms[i]);
			//maxScore = worms[i].score;
		}
	}
}

// Render Worm: This function render one specific worm
function renderWorm(currentWorm) {
	context.fillStyle = currentWorm.color;
	
	for(var i = 0; i < currentWorm.lenght; i++) {
		if(currentWorm.previousHole[i]) {
			//setColor...
			context.fillStyle = "rgb(2, 2, 2)";
		}
		
		context.beginPath();
		context.arc(currentWorm.previousX[i], currentWorm.previousY[i], wormSize, 0, Math.PI*2, true);
		//context.stroke();
		context.fill();
		context.closePath();
		
		/*
			context.beginPath();
			context.fillStyle = "rgb(0, 0, 0)";
			context.arc(currentWorm.previousX[8], currentWorm.previousY[8], wormSize+1, 0, Math.PI*2, true);
			context.fill();
			context.closePath();
		
			context.beginPath();
			//context.fillStyle = "rgb(220, 80, 100)";
			context.fillStyle = "rgb(2, 2, 2)";
			context.arc(currentWorm.previousX[11], currentWorm.previousY[11], 2, 0, Math.PI*2, true);
			context.fill();
			context.closePath();
		}
		*/
	}
	
	//currentWorm.length++;
}

//Pause Function 
function pause(setCheckbox = false) {
	onPause = !onPause;

	playSound("pause");
	var pauseText = "Game is Running";
	
	if(onPause) pauseText = "Game is Paused";

	$("#pause_label").text(pauseText);
	addToLog(pauseText);

	if(setCheckbox) $('#flexCheckCheckedPause').prop('checked', onPause);
}