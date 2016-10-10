"use strict";

//var BreakOut = window.BreakOut || {};

var Component = {
	create : function(width, height, color, x, y) {
		var self = Object.create(this);
		self.width = width;
		self.height = height;
		self.x = x;
		self.y = y;
		self.color = color;
		return self;
	}
};

var ballComponent {


	this.speedX = 0;
	this.speedY = 0;

	this.update = function () {
		var ctx = BreakOut.Game.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);	// actually draws the rectangle on the canvas
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
};

