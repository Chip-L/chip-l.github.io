"use strict";

var BreakOut = window.BreakOut || {};

BreakOut.Board = (function($) {
	
	var Board = function() {
		var that = this;
		this.x;
		this.y;
		this.key;
		this.canvas = document.createElement("canvas"),
		this.start = function() {
			// create and add the canvas
			this.canvas.width=480;
			this.canvas.height = 270;
			this.canvas.style.cursor = "none"; // hide the cursor
			that.context = this.canvas.getContext("2d");
			$("#gameboard").add(this.canvas);
			
			// set up the refresh intervals
			//this.interval = setInterval(that.updateGameArea(), 20); // 20ms = 50fps
			
			// set up event listeners ON THE WINDOW (not an object)
			window.addEventListener('mousemove', function (e) { // follows mouse movement
				this.x = e.pageX; // only horizontal, get x only
			})
			window.addEventListener('touchmove', function (e) { // follows touch movement
				this.x = e.pageX; // only horizontal, get x only
			})
			window.addEventListener('keydown', function (e) { // keyboard moves key down moves, key up stops movement
				this.key = e.keyCode;
			})
			window.addEventListener('keyup', function (e) {
				this.key = false;
			})
		};
		this.clear = function() {
			that.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
	
	return Board;
})(jQuery)
