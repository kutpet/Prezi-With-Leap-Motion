
// autoplay mode flag
var autoplay = false;

// prezi player object
var player;

var previousStep = 0;

function initPlayer() { 


	var leftArrow = document.getElementById('leftArrow');

	leftArrow.style.cursor = 'pointer';
	leftArrow.onclick = function() {
    	player.previousStep();
	};

	var rightArrow = document.getElementById('rightArrow');
	rightArrow.style.cursor = 'pointer';
	rightArrow.onclick = function() {
    	player.nextStep();
	};

	// get prezi ID from url parameter
	var preziId = getUrlVars()["preziId"];
	if(!preziId) 
	{
		// fall back to my prezumé if not provided
		//preziId = "qndjiqry_zwp";

		// free fall
		 preziId = "7txrmkstwsze"
	}

	// initialize the player object
	player = new PreziPlayer('prezi-player', {
		// prezi ID
		preziId: preziId,
		explorable: true,
		controls: false,
		width: "100%",
		height: 600,
		debug: false
	});

	printMessage("Prezi is loading...");

	// if content is ready, get and display the title of the prezi and number of steps
	player.on(PreziPlayer.EVENT_STATUS, function(event) {
		if (event.value == PreziPlayer.STATUS_READY) {

			printMessage("Connecting to Leap Motion...");
			// start leap controller once the prezi is loaded
			startLeapController();
		}

		// TODO: content ready event sometimes not fired...
	});

	
	player.on(PreziPlayer.EVENT_CURRENT_STEP, function(event) {
		// update step counter
		printMessage(event.value+" of "+player.getStepCount());
	});

	player.on(PreziPlayer.EVENT_IS_MOVING, function(event) {
		// animate the right arrow when prezi is moving between steps
		var arrowId = previousStep < player.getCurrentStep()?"rightArrow":"leftArrow";
		toggleArrow(document.getElementById(arrowId));
	});
};

function startLeapController() { 

	var leapController = new Leap.Controller();

	leapController.on('connect', function() {

		printMessage("Swipe left/right to navigate in the Prezi.");
  	
	  	Leap.loop({enableGestures: true}, function(frame) {
			if (frame.gestures.length == 0)
				return;
			
			frame.gestures.forEach (function(gesture)
			{
				// screenTap gesture - toggle autoplay 
				/*if (gesture.type == "screenTap") 
				{
					autoplay = !autoplay;
					document.getElementById('t-autoPlay').innerHTML = "Auto play: " + (autoplay ? "on":"off");
					console.log("toggle autoplay")
					player.pause(10);
					return
				}*/

				// swipe gesture - if not in autoplay mode then load next or previous page
				if (gesture.type == "swipe" && !autoplay && gesture.state=="start") 
				{
					var direction = gesture.direction[0];
					
					// TODO: opt this value
					if (Math.abs(direction) < 0.2) {
						return;
					}

					previousStep = player.getCurrentStep();

					if (direction > 0) {
						console.log("Navigate back.");
						player.previousStep();
					} else {
						console.log("Navigate forward.");
						player.nextStep();
					}
				}

			});
		});
	});

	leapController.on('deviceConnected', function() {
 		console.log("Leap controller has been connected.");
 		printMessage("Leap controller has been connected.");
	});

	leapController.on('deviceDisconnected', function() {
  		console.log("Leap controller has been disconnected.");
  		 printMessage("Leap controller has been disconnected.");
	});

	// start connection to Leap Motion
	leapController.connect();
};

// helper function to toggle class of an arrow
function toggleArrow(arrow) 
{
	arrow.className = arrow.className==="active"?"":"active";

};

// helper to print out message below the prezi
function printMessage(message) 
{
	document.getElementById('message').innerHTML = message;
};

// helper to get URL parameters
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}


