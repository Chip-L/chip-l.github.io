/* this is from the book "Build an HTML5 Game" */
"use strict";

var BubbleShoot = window.BubbleShoot || {};

BubbleShoot.Board = (function($) {
	var NUM_ROWS = 9;
	var NUM_COLS = 32;
	
	var Board = function() {
		var that = this;
		var rows = createLayout();
		
		this.getRows = function() { return rows; };
		
		this.addBubble = function(bubble, coords) {
			var rowNum = Math.floor(coords.y / BubbleShoot.ui.ROW_HEIGHT);
			var colNum = coords.x / BubbleShoot.ui.BUBBLE_DIMS * 2;
			
			if (rowNum % 2 === 1) {
				colNum -= 1;
			};
			colNum = Math.round(colNum / 2) * 2;
			if (rowNum % 2 === 0) {
				colNum -= 1;
			};
			if (!rows[rowNum]) {
				rows[rowNum] = [];
			};
			rows[rowNum][colNum] = bubble;
			bubble.setRow(rowNum);
			bubble.setCol(colNum);
		};
		
		this.getBubbleAt = function(rowNum, colNum) {
			if (!this.getRows()[rowNum]) {
				return null;
			};
			return this.getRows()[rowNum][colNum];
		};
		
		this.getBubblesAround = function(curRow, curCol) {
			var bubbles = [];
			
			for (var rowNum = curRow - 1; rowNum <= curRow + 1; rowNum++) {
				for (var colNum = curCol - 2; colNum <= curCol + 2; colNum++) {
					var bubbleAt = that.getBubbleAt(rowNum, colNum);
					if (bubbleAt && !(colNum == curCol && rowNum == curRow)) {
						bubbles.push(bubbleAt);
					};
				};
			};
			return bubbles;
		};
		
		/* returns adjacent bubbles. If allowDifferentColor is true, then
			this will help to find the orphans. If it is false, it will only 
			return bubbles that match colors. */
		this.getGroup = function(bubble, found, allowDifferentColor) {
			var curRow = bubble.getRow();
			var curCol = bubble.getCol();
			
			// is bubble already found?
			if (!found[curRow]) {
				found[curRow] = {};
			};
			if (!found.list) {
				found.list = [];
			};
			if (found[curRow][curCol]) {
				return found;
			}
			
			found[curRow][curCol] = bubble;
			found.list.push(bubble);
			
			var surrounding = that.getBubblesAround(curRow, curCol);
			for (var i = 0; i < surrounding.length; i++) {
				var bubbleAt = surrounding[i];
				// check the color match
				if (bubbleAt.getType() == bubble.getType() || allowDifferentColor) {
					found = that.getGroup(bubbleAt, found, allowDifferentColor);
				};
			};
			
			return found;
		};
		
		this.popBubbleAt = function(rowNum, colNum) {
			var row = rows[rowNum];
			
			delete row[colNum];
		};
		
		this.findOrphans = function() {
			var connected = [];	// 2-dim to mark location of connected bubbles (T/F)
			var groups = [];	// contains all of the groups found (1 group if all connected)
			var rows = that.getRows();
			
			for (var i = 0; i < rows.length; i++) {
				connected[i] = [];
			};
			
			// look for bubbles in the top row and then start creating groups
			for (var i = 0; i < rows[0].length; i++) {
				var bubble = that.getBubbleAt(0, i);
				if (bubble && !connected[0][i]) {
					var group = that.getGroup(bubble, {}, true);
					$.each(group.list, function() {
						connected[this.getRow()][this.getCol()] = true;
					});
				};
			};
			
			// create a list of bubbles not in a group
			var orphaned = [];
			for (var i = 0; i < rows.length; i++) {
				for (var j = 0; j < rows[i].length; j++) {
					var bubble = that.getBubbleAt(i, j);
					if (bubble && !connected[i][j]) {
						orphaned.push(bubble);
					};
				};
			};
			
			return orphaned;
		};
		
		this.getBubbles = function() {
			var bubbles = [];
			var rows = this.getRows();
			
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				for (var j = 0; j < row.length; j++) {
					var bubble = row[j];
					if (bubble) {
						bubbles.push(bubble);
					};
				};
			};
			
			return bubbles;
		};
		
		this.isEmpty = function() {
			return (this.getBubbles().length === 0);
		};
		
		return this;
	};
	
	var createLayout = function() {
		var rows = [];
		
		for (var i = 0; i < NUM_ROWS; i++) {
			var row = [];
			var startCol = i%2 == 0 ? 1 : 0;
			for (var j = startCol; j < NUM_COLS; j += 2) {
				var bubble = BubbleShoot.Bubble.create(i, j);
				bubble.setState(BubbleShoot.BubbleState.ON_BOARD);
				if (BubbleShoot.Renderer) {
					var left = j * BubbleShoot.ui.BUBBLE_DIMS/2;
					var top = i * BubbleShoot.ui.ROW_HEIGHT;
					bubble.getSprite().setPosition({
						left: left,
						top: top
					});
				};				
				row[j] = bubble;
			};
			rows.push(row);
		};
		
		return rows;
	};
	
	return Board;
})(jQuery);