/* this is from the book "Build an HTML5 Game" */
"use strict";

var BubbleShoot = window.BubbleShoot || {};

BubbleShoot.Bubble = (function($) {
	// create enum of states
	BubbleShoot.BubbleState = {
		CURRENT: 1,
		ON_BOARD: 2,
		FIRING: 3,
		POPPING: 4,
		FALLING: 5,
		POPPED: 6,
		FIRED: 7,
		FALLEN: 8
	};
	
	var Bubble = function(row, col, type, sprite) {
		var that = this;
		var state;
		//< stores the state
		var stateStart = Date.now();
		//< time state entered
		
		this.setState = function(stateIn) {
			state = stateIn;
			stateStart = Date.now();
		};
		this.getState = function() { return state; };
		this.getTimeInState = function() {
			return Date.now() - stateStart;
		};
		
		this.getType = function() { return type; };
		this.getSprite = function() { return sprite; };
		this.getCol = function() { return col; };
		this.setCol = function(colIn) { col = colIn; };
		this.getRow = function() { return row; };
		this.setRow = function(rowIn) { row = rowIn; };
		this.getCoords = function() {
			var coords = {
				left: that.getCol() * BubbleShoot.ui.BUBBLE_DIMS/2 + BubbleShoot.ui.BUBBLE_DIMS/2,
				top: that.getRow() * BubbleShoot.ui.ROW_HEIGHT + BubbleShoot.ui.BUBBLE_DIMS/2
			};
			return coords;
		};
		
		this.animatePop = function() {
			// find the image's row
			var top = type * that.getSprite().height();
			// add some visual differntiation by randomly rotating the image as it pops
			this.getSprite().css(Modernizr.prefixed("transform"), "rotate(" + (Math.random() * 360) + "deg)");
			
			// display the next images in sequence
			setTimeout(function() {
				that.getSprite().css("background-position", "-50px -" + top + "px");
			}, 125);
			setTimeout(function() {
				that.getSprite().css("background-position", "-100px -" + top + "px");
			}, 150);
			setTimeout(function() {
				that.getSprite().css("background-position", "-150px -" + top + "px");
			}, 175);
			
			// remove the sprite altogether
			setTimeout(function() {
				that.getSprite().remove();
			}, 200);
		}
	};
	
	Bubble.create = function(rowNum, colNum, type) {
		if (type === undefined) {
			type = Math.floor(Math.random() * 4);
		};
		
		//set up the bubble element (DOM else Canvas)
		if (!BubbleShoot.Renderer) {
			var sprite = $(document.createElement("div"));
			sprite.addClass("bubble");
			sprite.addClass("bubble_" + type);
		} else {
			var sprite = new BubbleShoot.Sprite();
		}
		
		//wrap with the Bubble object

		sprite.addClass("bubble");
		sprite.addClass("bubble_" + type);
		var bubble = new Bubble(rowNum, colNum, type, sprite);
		
		return bubble;
	}
	
	return Bubble;
})(jQuery);