
// autoplay mode flag
var autoplay = false;

// prezi player object
var player;

var initController = function() { 

	// initialize the player object
	player = new PreziPlayer('prezi-player', {
		// prezi ID
		preziId: "qndjiqry_zwp",
		explorable: true,
		controls: true,
		width: 800,
		height: 600,
		debug: false
	});

	// if content is ready, get and display the title of the prezi and number of steps
	player.on(PreziPlayer.EVENT_STATUS, function(event) {
		if (event.value == PreziPlayer.STATUS_CONTENT_READY) {
			document.getElementById('t-step-count').innerHTML = player.getStepCount();
			startLeapController();
		}
	});

	// display the current step
	player.on(PreziPlayer.EVENT_CURRENT_STEP, function(event) {
		document.getElementById('t-current-step').innerHTML = event.value;
	});
};

var startLeapController = function() { 

	var leapController = new Leap.Controller();

	leapController.on('connect', function() {
  	
	  	Leap.loop({enableGestures: true}, function(frame) {
			if (frame.gestures.length == 0)
				return;
			
			frame.gestures.forEach (function(gesture)
			{
				// screenTap gesture - toggle autoplay 
				if (gesture.type == "screenTap") 
				{
					autoplay = !autoplay;
					document.getElementById('t-autoPlay').innerHTML = "Auto play: " + (autoplay ? "on":"off");
					console.log("toggle autoplay")
					player.pause(10);
					return
				}

				// swipe gesture - if not in autoplay mode then load next or previous page
				if (gesture.type == "swipe" && !autoplay && gesture.state == "start") 
				{		
					var direction = gesture.direction[0];
					
					// TODO: opt this value
					if (Math.abs(direction) < 0.2) {
						return;
					}

					if (direction > 0) {
						console.log("back");
						player.previousStep();
					} else {
						console.log("forward");
						player.nextStep();
					}
				}

			});
		});
	});

	leapController.on('deviceConnected', function() {
 		console.log("A Leap device has been connected.");
	});

	leapController.on('deviceDisconnected', function() {
  		console.log("A Leap device has been disconnected.");
	});

	leapController.connect();
};


