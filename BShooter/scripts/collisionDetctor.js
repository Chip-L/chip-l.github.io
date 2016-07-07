/* this is from the book "Build an HTML5 Game" */
"use strict";

var BubbleShoot = window.BubbleShoot || {};

BubbleShoot.CollisionDetector = (function($) {
	var CollisionDetector = {
		findIntersection: function(curBubble, board, angle) {
			// get the situation....
			var rows = board.getRows();
			var collision = null; 
			//< will store the bubble that has been collided with
			
			// starting position on the screen
			var pos = curBubble.getSprite().position();
			var start = {
				left: pos.left + BubbleShoot.ui.BUBBLE_DIMS/2,
				top: pos.top + BubbleShoot.ui.BUBBLE_DIMS/2
			};
			
			// determine how much a bubble moves 
			var dx = Math.sin(angle);
			var dy = -Math.cos(angle);
			
			// loop through the board looking for intersections. Find the one that has the least distance.
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				
				for (var j = 0; j < row.length; j++) {
					var bubble = row[j];
					
					if (bubble) {
						var coords = bubble.getCoords(); // the bubble's center
						var distToBubble = {
							x: start.left - coords.left,
							y: start.top - coords.top
						};
						// how close the curBubble's movment will be to the canidates bubble's center
						var t = dx * distToBubble.x + dy * distToBubble.y; 
						
						//screen coords where intersecion will occur
						var ex = -t * dx + start.left;
						var ey = -t * dy + start.top;
						// find the closest point on the fired bubble's center line to the center of the bubble (e)
						var distEC = Math.sqrt(Math.pow(ex - coords.left, 2) + Math.pow(ey - coords.top, 2));
						
						// if less than double the candidate bubble's radius then collision else miss (note the true value is .88 - but this requires a high precsion to get through gaps.)
						if (distEC < BubbleShoot.ui.BUBBLE_DIMS * .75) {
							// find the center of the struck bubble and the closes point on the fired bubble's path
							var dt = Math.sqrt(Math.pow(BubbleShoot.ui.BUBBLE_DIMS, 2) - Math.pow(distEC, 2));
							
							// since the vector can cross the bubble border 2 times, find both points of intersecion
							var offset1 = {
								x: (t - dt) * dx,
								y: -(t - dt) * dy
							};
							var offset2 = {
								x: (t + dt) * dx,
								y: -(t + dt) * dy
							};
							
							// find the distance to each point							
							var distToCollision1 = Math.sqrt(Math.pow(offset1.x, 2) + Math.pow(offset1.y, 2));
							var distToCollision2 = Math.sqrt(Math.pow(offset2.x, 2) + Math.pow(offset2.y, 2));
							
							// find where the bubble needs to stop by adding the starting coords back in 
							if (distToCollision1 < distToCollision2) {
								var distToCollision = distToCollision1;
								var dest = {
									x: offset1.x + start.left,
									y: offset1.y + start.top
								};
							} else {
								var distToCollision = distToCollision2;
								var dest = {
									x: -offset2.x + start.left,
									y: offset2.y + start.top
								};
							}
							
							// check to see if new collision is closer
							if (!collision || collision.distToCollision > distToCollision) {
								collision = {
									bubble: bubble,
									distToCollision: distToCollision,
									coords: dest
								};
							};
						};
					};
				};
			};				
			return collision;
		}
	};
	return CollisionDetector;
})(jQuery);