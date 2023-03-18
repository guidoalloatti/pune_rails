var settings_saved = {}

function labelClicked(color, caller) {
	var play = $("#" + color + "_play");
	var label = $("#" + color + "_label");
	var left = $("#" + color + "_left");
	var right = $("#" + color + "_right");
	
	if(caller == 'label') play.prop('checked', !play.is(':checked'));
	
	if(play.is(':checked')) { 
		label.css('color', 'white');
		label.css('background', color);
		left.show("fade");
		right.show("fade");
	} else {
		label.css('color', 'black');
		label.css('background', 'transparent');
		left.hide("fade");
		right.hide("fade");
	}
} 

window.onload = function() {
	disableKeys();
	fetchSettings();
	
   /**
	* Clicking on Input Functionality
	*/
	$("#red_label").click(function()	{	labelClicked("red", "label");	});	
	$("#blue_label").click(function()	{	labelClicked("blue", "label");	});
	$("#green_label").click(function()	{	labelClicked("green", "label");	});
	$("#purple_label").click(function()	{	labelClicked("purple", "label");});
	$("#cyan_label").click(function()	{	labelClicked("cyan", "label");	});	
	$("#yellow_label").click(function()	{	labelClicked("yellow", "label");});
	
   /**
	* Clicking on Checkbox Functionality
	*/
	$("#red_play").click(function() 	{	labelClicked("red", "check");	});	
	$("#blue_play").click(function() 	{	labelClicked("blue", "check");	});
	$("#green_play").click(function() 	{	labelClicked("green", "check");	});
	$("#purple_play").click(function() 	{	labelClicked("purple", "check");});
	$("#cyan_play").click(function() 	{	labelClicked("cyan", "check");	});
	$("#yellow_play").click(function() 	{	labelClicked("yellow", "check");});	
	
	/** 
	* The Keys Can Be Only One Char
	*/
	$("#red_left").keypress(function(e)		{	setMoveKey("red", "left", event.keyCode, event.charCode); 		});
	$("#red_right").keypress(function(e)	{	setMoveKey("red", "right", event.keyCode, event.charCode); 		});
	$("#blue_left").keypress(function(e)	{	setMoveKey("blue", "left", event.keyCode, event.charCode); 		});
	$("#blue_right").keypress(function(e)	{	setMoveKey("blue", "right", event.keyCode, event.charCode); 	});
	$("#green_left").keypress(function(e)	{	setMoveKey("green", "left", event.keyCode, event.charCode); 	});
	$("#green_right").keypress(function(e)	{	setMoveKey("green", "right", event.keyCode, event.charCode); 	});
	$("#purple_left").keypress(function(e)	{	setMoveKey("purple", "left", event.keyCode, event.charCode); 	});
	$("#purple_right").keypress(function(e)	{	setMoveKey("purple", "right", event.keyCode, event.charCode); 	});
	$("#cyan_left").keypress(function(e)	{	setMoveKey("cyan", "left", event.keyCode, event.charCode); 		});
	$("#cyan_right").keypress(function(e)	{	setMoveKey("cyan", "right", event.keyCode, event.charCode); 	});
	$("#yellow_left").keypress(function(e)	{	setMoveKey("yellow", "left", event.keyCode, event.charCode); 	});
	$("#yellow_right").keypress(function(e)	{	setMoveKey("yellow", "right", event.keyCode, event.charCode); 	});	
};

function setMoveKey(color, direction, keyCode, charCode) {
	/*
	$("input:hidden").each(function(i) {
		this.id = this.id + "_" + i;
		alert(this.id+"\n"+this.val()+"\n"+this.text());
    });
	*/
	
	if(keyCode != 9) {
		$("#"+color+"_"+direction).val("");
		$("#"+color+"_"+direction+"_value").val(keyCode);
	}
	//alert("Character: "+$("#"+color+"_"+direction).val()+"\nNumber: "+$("#"+color+"_"+direction+"_value").val());
}

function disableKeys() {
	$("#red_left").hide();
	$("#red_right").hide();
	$("#blue_left").hide();
	$("#blue_right").hide();
	$("#green_left").hide();
	$("#green_right").hide();
	$("#purple_left").hide();
	$("#purple_right").hide();
	$("#cyan_left").hide();
	$("#cyan_right").hide();
	$("#yellow_left").hide();
	$("#yellow_right").hide();
}

function settings() {
	if(!onPause) pause();

	var game_id = $("#game_id").text();
	
	var options = "status=0, ";
	options += "toolbar=0, ";
	options += "location=0, ";
	options += "menubar=0, ";
	options += "directories=0, ";
	options += "resizable=0, ";
	options += "scrollbars=0, ";
	options += "height=920, ";
	options += "width=640";

    addToLog("Game Settings Launched!")
    addToLog(".");

    var settings = window.open("settings?game_id=" + game_id , "Settings Window", options);
    
    var settingsTimer = 0;
    var popupTick = setInterval(function() {
        if (settings.closed) {
            clearInterval(popupTick);
            addToLog("Game Settings Closed!");
            setupCompleted = true;
            checkGameSet();
        } else {
            settingsTimer += 1;
            replaceLastLogLine("Game Settings opened for: " + settingsTimer + " seconds.");
            setupCompleted = false;
            checkGameSet();
      }
    }, 1000);
    return false;

}

function saveSettings() {
	settings_saved = {
		worms: {
			red: { play: $("#red_play").is(':checked'), left: $("#red_left").val(), right: $("#red_right").val() },
			blue: { play: $("#blue_play").is(':checked'), left: $("#blue_left").val(), right: $("#blue_right").val() },
			green: { play: $("#green_play").is(':checked'), left: $("#green_left").val(), right: $("#green_right").val() },
			yellow: { play: $("#yellow_play").is(':checked'), left: $("#yellow_left").val(), right: $("#yellow_right").val() },
			purple: { play: $("#purple_play").is(':checked'), left: $("#purple_left").val(), right: $("#purple_right").val() },
			cyan: { play: $("#cyan_play").is(':checked'), left: $("#cyan_left").val(), right: $("#cyan_right").val() },
		},
		hole_points: $("#hole_points_button").text(),
		speed: $("#speed_button").text(),
		gap_size: $("#gap_size_button").text(),
		gap_spacing: $("#gap_spacing_button").text(),
		game_id: getSearchParams("game_id"),
	}

	console.log(settings);

	$.ajax({
		url: "/settings/save",
		data: {"settings": settings_saved},
		type: "POST",
		success: function (data) {
			if($("#close_on_save").is(':checked')) window.close()
		}
	});
}

function fetchSettings() {
	var game_id = getSearchParams("game_id");

	$.ajax({
		url: "/settings/fetch",
		data: {"game_id": game_id},
		type: "POST",
		success: function (data) {
			populateSettings(data);
		}
	});
}

function populateSettings(data) {
	if(window.location.href.indexOf("settings") > -1) {
		['red', 'blue', 'green', 'purple', 'yellow', 'cyan'].forEach(color => {
			if(data[color + "_play"]) { labelClicked(color, "label") }
			if(data[color + "_left"]) { $("#" + color + "_left").val(data[color + "_left"]) }
			if(data[color + "_right"]) { $("#" + color + "_right").val(data[color + "_right"]) }
		});
		
		toggleHolePoints(data['hole_points']);
		toggleSpeed(data['speed']);
		toggleGapSize(data['gap_size']);
		toggleGapSpacing(data['gap_spacing']);
	}
}

function toggleHolePoints(value = null) {
	var max_options = 1;
	var hole_points = ["NONE", "ONE"];
	
	if(value != null) {
		if(value == "none") {
			var current_hole_points = 0
		} else if(value == "one") {
			var current_hole_points = 1
		}
	} else {
		var current_hole_points = $("#hole_points_button").val();
		if(current_hole_points == max_options) current_hole_points = 0;
		else current_hole_points = parseInt(current_hole_points) + 1;
	}

	$("#hole_points_button").val(current_hole_points);
	$("#hole_points_button").text(hole_points[current_hole_points]);
}

function toggleSpeed(value = null) {
	var max_options = 2;
	var speeds = ["SLOW", "NORMAL", "FRANTIC"];

	if(value != null) {
		if(value == "slow") {
			var current_speed = 0;
		} else if(value == "normal") {
			var current_speed = 1;
		} else if(value == "frantic") {
			var current_speed = 2;
		}
	} else {	
		var current_speed = $("#speed_button").val();
		if(current_speed == max_options) current_speed = 0;
		else current_speed = parseInt(current_speed) + 1;
	}

	$("#speed_button").val(current_speed);
	$("#speed_button").text(speeds[current_speed]);
}

function toggleGapSize(value = null) {
	var max_options = 2;
	var gap_sizes = ["SMALL", "NORMAL", "LARGE"];
	
	if(value != null) {
		if(value == "small") {
			var current_gap_size = 0;
		} else if(value == "normal") {
			var current_gap_size = 1;
		} else if(value == "large") {
			var current_gap_size = 2;
		}
	} else {		
		var current_gap_size = $("#gap_size_button").val();
		if(current_gap_size == max_options) current_gap_size = 0;
		else current_gap_size = parseInt(current_gap_size) + 1;
	}

	$("#gap_size_button").val(current_gap_size);
	$("#gap_size_button").text(gap_sizes[current_gap_size]);
}

function toggleGapSpacing(value = null) {
	var max_options = 2;
	var gap_spacings = ["SMALL", "NORMAL", "FAR APART"];
	
	if(value != null) {
		if(value == "small") {
			var current_gap_spacing = 0;
		} else if(value == "normal") {
			var current_gap_spacing = 1;
		} else if(value == "far apart") {
			var current_gap_spacing = 2;
		}
	} else {		
		var current_gap_spacing = $("#gap_spacing_button").val();
		if(current_gap_spacing == max_options) current_gap_spacing = 0;
		else current_gap_spacing = parseInt(current_gap_spacing) + 1;
	}

	$("#gap_spacing_button").val(current_gap_spacing);
	$("#gap_spacing_button").text(gap_spacings[current_gap_spacing]);
}

function getSearchParams(k){
	var p={};
	location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
	return k?p[k]:p;
};

function replaceLastLogLine(text) {   
    var log = $('#log');
    var value_list = $("#log").val().split("\n");
    value_list.pop();
    value_list.push(text);
    log.text(value_list.join("\n"));
}

function addToLog(text) {
    $("#log").text($("#log").text() +  "\n" + text);
}