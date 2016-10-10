"use strict";

var BreakOut = window.BreakOut || {};

/* called upon load */
$(document).ready(function() {
	var game = new BreakOut.Game();
	game.myGameArea.start();
});
function startGame() {
	myGameArea.start();
//	myPaddle = new component(140, 10, "red", 170, 250);
}

BreakOut.Game =(function($) {
	
	var Game = function() {
		var that = this;
		this.paddle = new BreakOut.Component(140, 10, "red", 170, 250);
		this.ball;
		this.obstacles = [];
		this.context;
		
		//create the Canvas for the game to display in. This sets up event listeners and refresh intervals for the game.
		this.myGameArea = new BreakOut.Board();

		this.updateGameArea = function() {
			this.myGameArea.clear();
			
			// Set paddle movement
			this.paddle.speedX = 0;
			this.paddle.speedY = 0;
			if (this.myGameArea.x) {
				this.paddle.x = this.myGameArea.x;
			}
			if (this.myGameArea.key && (this.myGameArea.key === 37 || this.myGameArea.key === 65)) {	//left (arrow or "a")
				this.paddle.speedX = -1; 
			}
			if (this.myGameArea.key && (this.myGameArea.key === 39 || this.myGameArea.key === 68)) {	//right (arrow or "d")
				this.paddle.speedX = 1; 
			}
			
			this.paddle.newPos();
			this.paddle.update();
		}
	};
	
	return Game;
})(jQuery)