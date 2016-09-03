/* this is from the book "Build an HTML5 Game" */
"use strict";

var BubbleShoot = window.BubbleShoot || {};

BubbleShoot.Game = (function($) {
	var Game = function() {
		var curBubble;  	// bubble waiting to be fired
		var nxtBubble;		// next bubble to fire
		var board;			// the board
		var numBubbles;		// how many bubbles there are to be fired
		var bubbles = [];	// bubbles waiting to be popped
		var MAX_BUBBLES = 70;
		var POINTS_PER_BUBBLE = 50;
		var MAX_ROWS = 11;
		var CUR_TOP = 470;
		var CUR_LEFT = 410;
		var level = 0;
		var score = 0;
		var highScore = 0;
		var requestAnimationID;
		var soundOn = true;
		
		this.init = function() {
			if (BubbleShoot.Renderer) {
				BubbleShoot.Renderer.init(function() {
					$(".btn_start_game").click("click", startGame);
				});
			} else {
				$(".btn_start_game").click("click", startGame);
			};
			if (window.localStorage && localStorage.getItem("high_score")) {
				highScore = parseInt(localStorage.getItem("high_score"));
			};
			if (window.localStorage && localStorage.getItem("sound_on")) {
				soundOn = parseInt(localStorage.getItem("sound_on"));
			};
			BubbleShoot.ui.drawHighScore(highScore);
			BubbleShoot.ui.drawSound(soundOn);
			$(".btn_sound").click("click", soundClick);
		};
		
		// turn the sound on or off
		var soundClick = function() {
			soundOn = !soundOn;
			BubbleShoot.ui.drawSound(soundOn)
			localStorage.setItem("sound_on", soundOn); // remember preference
		};
		
		// when user clicks "start" from the dialog
		var startGame = function() {
			$(".btn_start_game").unbind("click");
			numBubbles = MAX_BUBBLES - (level * 5);
			BubbleShoot.ui.hideDialog();
			
			board = new BubbleShoot.Board();
			bubbles = board.getBubbles();
			
			nxtBubble = getNextBubble();
			switchToCurBubble();
			nxtBubble = getNextBubble();
			
			if (BubbleShoot.Renderer) {
				if (!requestAnimationID) {
					requestAnimationID = requestAnimationFrame(renderFrame);
				};
			} else {
				BubbleShoot.ui.drawBoard(board);
			};
			
			$("#game").bind("click", clickGameScreen);
			BubbleShoot.ui.drawScore(score);
			BubbleShoot.ui.drawLevel(level);
		};
		
		//
		var switchToCurBubble = function() {
			curBubble = nxtBubble;
			curBubble.getSprite().addClass("cur_bubble");
			curBubble.getSprite().removeClass("next_bubble");
			
			var top = CUR_TOP;
			var left = ($("#board").width() - BubbleShoot.ui.BUBBLE_DIMS)/2;
			curBubble.getSprite().css({
				top: top,
				left: left
			});
		};
		
		// set up the next bubble to be fired
		var getNextBubble = function() {
			var bubble = BubbleShoot.Bubble.create();
			
			bubbles.push(bubble);
			bubble.setState(BubbleShoot.BubbleState.CURRENT);
			bubble.getSprite().addClass("next_bubble");
			
			var top = CUR_TOP + 10;
			var left = (($("#board").width() - BubbleShoot.ui.BUBBLE_DIMS)/2) + BubbleShoot.ui.BUBBLE_DIMS + 30;
			bubble.getSprite().css({
				top: top,
				left: left
			});
			
			$("#board").append(bubble.getSprite());
						
			return bubble;
		};
		
		var clickGameScreen = function(e) {
			// find the angle that the bubble will be shot ata
			var angle = BubbleShoot.ui.getBubbleAngle(curBubble.getSprite(), e);
			var duration = 750;
			var distance = 1000;
			var collision = BubbleShoot.CollisionDetector.findIntersection(curBubble, board, angle);
			
			numBubbles--; // decrement numBubbles on fire
			
			if (collision) { // check for a collision and deal with it
				var coords = collision.coords;
				duration = Math.round(duration * collision.distToCollision / distance);
				board.addBubble(curBubble, coords);
				var group = board.getGroup(curBubble, {});
				if (group.list.length >= 3) {
					popBubbles(group.list, duration);
					var topRow = board.getRows()[0];
					var topRowBubbles = [];
					for (var i = 0; i < topRow.length; i++) {
						if (topRow[i]) {
							topRowBubbles.push(topRow[i]);
						};
					};
					if (topRowBubbles.length <= 5) {
						popBubbles(topRowBubbles, duration);
						group.list.concat(topRowBubbles);
					};
					var orphans = board.findOrphans();
					var delay = duration + 200 + 30 * group.list.length;
					dropBubbles(orphans, delay);
					// calculate and display the score
					var popped = [].concat(group.list, orphans);
					var points = popped.length * POINTS_PER_BUBBLE;
					score += points;
					setTimeout(function() {
						BubbleShoot.ui.drawScore(score);
					}, delay);
				};
			} else {
				var distX = Math.sin(angle) * distance;
				var distY = Math.cos(angle) * distance;
				var bubbleCoords = BubbleShoot.ui.getBubbleCoords(curBubble.getSprite());
				var coords = {
					x: bubbleCoords.left + distX,
					y: bubbleCoords.top - distY
				};
			};
			
			BubbleShoot.ui.fireBubble(curBubble, coords, duration); // animate firing the bubble
			
			// check end game
			if (board.getRows().length > MAX_ROWS) {
				endGame(false);
			} else if (numBubbles === 0) {
				endGame(false);
			} else if (board.isEmpty()) {
				endGame(true);
			} else {
				switchToCurBubble();
				if (numBubbles > 1) {
					nxtBubble = getNextBubble();
				};
			};
		};
		
		var popBubbles = function(bubbles, delay) {
			$.each(bubbles, function() {
				var bubble = this;
				
				setTimeout(function() {
					bubble.setState(BubbleShoot.BubbleState.POPPING);
					bubble.animatePop();
					setTimeout(function() {
						bubble.setState(BubbleShoot.BubbleState.POPPED);
					}, 200);
					if (soundOn) { 
						BubbleShoot.Sounds.play("sounds/pop.mp3", Math.random() * .5 + .5);
					};
					
				}, delay);
				board.popBubbleAt(this.getRow(), this.getCol());
				setTimeout(function() {
					bubble.getSprite().remove();
				}, delay + 200);
				delay += 60;
			});
		};
		
		var dropBubbles = function(bubbles, delay) {
			$.each(bubbles, function() {
				var bubble = this;
				
				board.popBubbleAt(bubble.getRow(), bubble.getCol());
				setTimeout(function() {
					bubble.setState(BubbleShoot.BubbleState.FALLING);
					bubble.getSprite().kaboom({
						callback: function() {
							bubble.getSprite().remove();
							bubble.setState(BubbleShoot.BubbleState.FALLEN);
						}
					});
				}, delay);
			});
		};
		
		var renderFrame = function() {
			$.each(bubbles, function() {
				if (this.getSprite().updateFrame) {
					this.getSprite().updateFrame();
				};
			});
			BubbleShoot.Renderer.render(bubbles);
			requestAnimationID = requestAnimationFrame(renderFrame);
			BubbleShoot.ui.drawBubblesRemaining(numBubbles);		// update the number of bubbles left to fire
		};
		
		var endGame = function(hasWon) {
			if (score > highScore) {
				highScore = score;
				$("#new_high_score").show();
				BubbleShoot.ui.drawHighScore(highScore);
				if (window.localStorage) {
					localStorage.setItem("high_score", highScore);
				};
			} else {
				$("#new_high_score").hide();
			};
			
			BubbleShoot.ui.endGame(hasWon, score);
			if (hasWon) {
				level++;
			} else {
				score = 0;
				level = 0;
			};
			
			$(".btn_start_game").click("click", startGame);
			$("#board .bubble").remove();
		};
		
	};
	
	window.requestAnimationFrame = Modernizr.prefixed("requestAnimationFrame", window) || function(callback) {
		window.setTimeout(function() {
			callback();
		}, 40);
	};
	return Game;
})(jQuery);  //jQuery is being fed to the Immediately Invoked Function Expression as a variable

/* called upon load */
$(document).ready(function() {
		var game = new BubbleShoot.Game();
		game.init();
});
