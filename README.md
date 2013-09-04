Use your Prezi with Leap Motion controller
==========================================

If you own a Leap Motion controller with this piece of code you can navigate through your Prezi with left/right swipe gestures.

You can switch to any prezi you want by changing the preziId url parameter to the desired prezi's id.

[Check out the demo here!](http://rawgithub.com/kutpet/PreziWithLeapMotion/master/index.html?preziId=7txrmkstwsze).

If you have a url of a prezi then the characterset after the prezi.com/ and before the title of the presentation is the id. 

For example in the url http://prezi.com/7txrmkstwsze/free-fall-template/ the id is 7txrmkstwsze.

This is not a full featured client, but a prototype (proof of concept) developed just for fun.


Credits
========

The client uses [prezi-player javascript API](http://prezi.github.io/prezi-player/lib/PreziPlayer/) for loading and controlling prezi and [leap.js](http://js.leapmotion.com/) to connect to Leap Motion controller. 

Credits
========
Code is MIT licensed, see LICENSE.txt.


