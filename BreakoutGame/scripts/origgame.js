var SHOW_TEST_DATA = false;

var myGamePiece;
var myGameBall;
var myObstacles = [];
var myScore;
var myScoreValue = 0;
var gameOn = false;
var WIDTH = 480; 	// small 480, medium 720
var HEIGHT = 270;	// small 270, medium 480

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
		this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.context = this.canvas.getContext("2d");
        $("#gameBoard").append(this.canvas);
		
        this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20); // 20ms = 50fps
		
		// set up event listeners ON THE WINDOW (not an object)
		// these are for the dialog
		window.addEventListener('mousedown', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
        window.addEventListener('mouseup', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })
        window.addEventListener('touchstart', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
        window.addEventListener('touchend', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })
		// these are for the game
		window.addEventListener('mousemove', function (e) { // follows mouse movement
			myGameArea.x = e.pageX; // only horizontal, get x only
		})
		window.addEventListener('touchmove', function (e) { // follows touch movement
			myGameArea.x = e.pageX; // only horizontal, get x only
		})
		window.addEventListener('keydown', function (e) { // keyboard moves key down moves, key up stops movement
			myGameArea.key = e.keyCode;
		})
		window.addEventListener('keyup', function (e) {
			myGameArea.key = false;
		})
	},
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

$(function init() {
    myGameArea.start();
	gameOn = false;
	msgDialog = new dialog("Start Game", ["click start to begin"], "Start");
	
	//startGame();
})

function startGame() {
	myScoreValue = 0;	
	myObstacles.length = 0;
	myGameArea.frameNo = 0;
	
	myScore = new component("30px", "Consolas", "black", 280, 40, 0, "text");
	var myGamePieceWidth = WIDTH * .125;
    myGamePiece = new component(myGamePieceWidth, 10, "red", ((WIDTH / 2) - (myGamePieceWidth / 2)), (HEIGHT - 20), 0, "brick");
	
	myGameBall = new component(10, 10, "blue", 150, 235, 0, "ball");
	myGameBall.speedX = -1;	// + = right; - = left
	myGameBall.speedY = -1;	// + = down; - = up
	
/*	myObstacles.push(myGamePiece);
	myObstacles.push(new component(WIDTH, 1, "black", 0, 0, 100, "brick")); // top
	myObstacles.push(new component(1, HEIGHT, "black", 0, 0, 50, "brick"));	// left 
	myObstacles.push(new component(1, HEIGHT, "black", WIDTH, 0, 25, "brick")); // right
*/
	var brickWidth = WIDTH / 11; // 1/2 brick border around them all;
	var brickHeight = 20;	//HEIGHT / 
	var brickOffset = brickWidth / 2;
	
	for (var row = 0; row < 3; row++) {
		for (var col = 0; col < 10; col++) {
			myObstacles[row][col] = {
				state : 1,
				brick : new component(brickWidth -2, brickHeight - 2, "green", brickOffset + (brickWidth * col), brickHeight * (row + 1), 0 , "brick")
			};
		};
	}
		
	if (SHOW_TEST_DATA) {
		showTestData_GamePiece = new component("15px", "Ariel", "black", 360, 180, 0, "text");		
		showTestData_GameBall = new component("15px", "Ariel", "black", 360, 200, 0, "text");
	}
}

function dialog(headerText, bodyText, btnText) {
	this.headerText = headerText;
	this.bodyText = bodyText;
	this.btnText = btnText;
	var bodyTextLines = bodyText.length;
	
	//set properties for the background
	var backgroundWidth = WIDTH / 3;
    var backgroundHeight = 2 * HEIGHT / 3;
	var backgroundColor = "blue";
	var backgroundX = WIDTH / 3;
	var backgroundY = (HEIGHT / 3) / 2;
	
	// set properties for the text (no word wrap!)
	// Note: because the text is centered, the "x" will be the center of the text, "y" will be the line that the text is written on (think of a line in notebook - "y" will hang below the line)
	var border = 10;
	var textWidth = backgroundWidth - (2 * border);
	var textHeight = (backgroundHeight - (2 * border)) / 3;
	var headerX = backgroundX + (backgroundWidth / 2); 
	var headerY = backgroundY + border + (textHeight / 2) + (30 / 2); 
	var bodyX = backgroundX + (backgroundWidth / 2);
	var bodyY = backgroundY + border + textHeight + 15;
	
	// set properties for the button
	var btnColor = "red"
	var btnWidth = (backgroundWidth - (2 * border)) * 2/3;
	var btnHeight = (30 * 1.5) + 10; // this fontsize * 1.5 (actual text area) + a 5 px border on top and bottom
	var btnX = backgroundX + ((backgroundWidth / 2) - (btnWidth / 2)); // centers the button in the area
	var btnY = backgroundY + backgroundHeight - border - (textHeight / 2) - (btnHeight / 2); // works from bottom up to center the button in the last 1/3 of the dialog
	
	// set properties for btn text
	var btnTextColor = "white";
	var btnTextX = btnX + (btnWidth / 2);
	var btnTextY = btnY + 5 + 30; // buffer + text height
	
	this.update = function() {
		// draw the background 
		ctx = myGameArea.context;
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);
		
		// draw the header text
		ctx.fillStyle = "White"
		ctx.font = "30px Consolas";
		ctx.textAlign = "center";
		ctx.fillText(this.headerText, headerX, headerY);
		
		//draw the body text
		for (var i = 0; i < bodyText.length; i++) {
			ctx.font = "15px Consolas";
			ctx.fillText(this.bodyText[i], bodyX, bodyY + (15 * i));
		}
		
		//draw the button
		ctx.fillStyle = btnColor;
		ctx.fillRect(btnX, btnY, btnWidth, btnHeight);
		
		// draw the btn text
		ctx.fillStyle = "White"
		ctx.font = "30px Consolas";
		ctx.textAlign = "center";
		ctx.fillText(this.btnText, btnTextX, btnTextY);
	};
	this.clicked = function() {
        var myleft = btnX;
        var myright = btnX + btnWidth;
        var mytop = btnY;
        var mybottom = btnY + btnHeight;
        var clicked = true;
        if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
            clicked = false;
        }
        return clicked;
    }

}

function everyInterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
/*
component needs to extend to brick and ball. Bricks are square and are obstacles that the ball crashes in to - this is both the brick and the paddle. The ball should also be round or else a graphic. Ball extension can have the crashWith function, the others don't need it. Everything will need the height, width, and speed variables - it is tempting to move speed to the ball only, but I think this would be a mistake because of the paddle - both could be extended, but then it is still duplication of code... The ball will have to bounce off the obstacles, walls and ceiling, but not the floor. the ball should bounce at varying speeds(?) and angles (look up the physics/math - will the ball and/or the obstacles need elasticity?)

I'm not sure if frameNo and everyInterval are needed.
*/
function component(width, height, color, x, y, scoreValue, type) {
	this.type = type;
	this.scoreValue = scoreValue; // this is returned when a brick is hit and has a value (walls and paddle will be 0)
	this.color = color;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = this.color;
		if (this.type === "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillText(this.text, this.x, this.y);
		} else if (this.type === "brick") {
			ctx.fillRect(this.x, this.y, this.width, this.height);
		} else {
			var radius = this.width/2; // this assumes perfect circle coordinates were entered
			ctx.beginPath();
			ctx.arc(this.x + radius, this.y + radius, radius, 0, 2 * Math.PI, false);
			ctx.closePath();
			ctx.fill();
		}
	};
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY; 
    };
    this.crashWith = function(otherobj) {
		// this objects sides
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myTop = this.y;
        var myBottom = this.y + (this.height);
		
		// other object's sides
        var otherLeft = otherobj.x;
        var otherRight = otherobj.x + (otherobj.width);
        var otherTop = otherobj.y;
        var otherBottom = otherobj.y + (otherobj.height);
		
		// determine crash return the side hit
        var crash = "miss";
		if ((myBottom < otherTop) ||
            (myTop > otherBottom) ||
            (myRight < otherLeft) ||
            (myLeft > otherRight)) {
           crash = "miss";
        } else if (myBottom === otherTop) {
			crash = "bottom";
		} else if (myTop === otherBottom) {
			crash = "top";
		} else if (myRight === otherLeft) {
			crash = "right";
		} else if (myLeft === otherRight) {
           crash = "left";
        }
        return crash;
    };
}

function endGame() {
	//myGameArea.stop();
	gameOn = false;
	
	msgDialog.headerText = "Game Over";
	msgDialog.bodyText[0] = "your score was:"
	msgDialog.bodyText[1] = myScoreValue;
	msgDialog.bodyText[2] = ""
	msgDialog.bodyText[3] = "Click start to play again"
			
	return;
}

function getShotAngle() {
	var ballCenterX = myGameBall.x + (myGameBall.width / 2);
	var ballCenterY = myGameBall.y + (myGameBall.width / 2);
	
	var deltaX = myGameArea.x - ballCenterX;
	var deltaY = myGameArea.y - ballCenterY;
	
	var angle = Math.atan(deltaX / deltaY);
	if (myGameArea.y > ballCenterY) { // no firing downwards
		angle += Math.PI;
	}
	return angle;
}



function updateGameArea() {
	var x, y, sideHit;
	
	if(gameOn) {
		// out of bounds
		if ((myGameBall.y + myGameBall.height) > myGameArea.canvas.height) {
			endGame();
		}
		
		myGameArea.clear();
		myGameArea.frameNo++;
		
		// set ball movement
		for (var i = 0; i < myObstacles.length; i++) {
			sideHit = myGameBall.crashWith(myObstacles[i]);
			if (sideHit != "miss") {
				// reset direction/speed here
				if ((sideHit === "left") || (sideHit === "right")) {
					myGameBall.speedX = myGameBall.speedX * -1;
				}
				
				if ((sideHit === "top") || (sideHit === "bottom")) {
					myGameBall.speedY = myGameBall.speedY * -1;
				}
				myScoreValue += myObstacles[i].scoreValue;
			}
		}
		myGameBall.newPos();
		
		// Set paddle movement
		myGamePiece.speedX = 0;
		myGamePiece.speedY = 0;
		if (myGameArea.x) {
			if(myGameArea.x > WIDTH - myGamePiece.width) {
				myGamePiece.x = WIDTH - myGamePiece.width;
			} else {
				myGamePiece.x = myGameArea.x;
			}
		}
		if (myGameArea.key && (myGameArea.key === 37 || myGameArea.key === 65)) {	//left (arrow or "a")
			myGamePiece.speedX = -1; 
		}
		if (myGameArea.key && (myGameArea.key === 39 || myGameArea.key === 68)) {	//right (arrow or "d")
			myGamePiece.speedX = 1; 
		}
		myGamePiece.newPos();
		
		// Show the Score
		myScore.text = "SCORE: " + myScoreValue;
		
		myObstacles.length;
		myScore.update();
		myGameBall.update();
		myGamePiece.update();
		
		if (SHOW_TEST_DATA) {
			showTestData_GamePiece.text = "x: " + myGamePiece.x + "\ty: " + myGamePiece.y + "\n" +
								"speedX:" + myGamePiece.speedX + "\tspeedY: " + myGamePiece.speedY;
			showTestData_GameBall.text = "x: " + myGameBall.x + "\ty: " + myGameBall.y + "\n" +
								"speedX:" + myGameBall.speedX + "\tspeedY: " + myGameBall.speedY;
			showTestData_GamePiece.update();
			showTestData_GameBall.update();
		}
	} else {
		if (myGameArea.x && myGameArea.y) {
			if (msgDialog.clicked) {
				gameOn = true;
				myGameArea.clear();
				startGame();
			}			
		}
		
		msgDialog.update();
	}
}


/* 
launch - change the ball to sit on the paddle at the start and move with the paddle (if speed = 0, follow paddle movement (x only)). then when the user clicks, launch the ball as normal. (future - have cursor change to a crosshair and control the direction and speed of the first bounce?)

Bounce - get a more sophisticated bounce. Use the normal and friction (friction on the paddle and should vary across the paddle's width)

Bricks - do double array of bricks
Special bricks with blasters, wider paddle, smaller paddle, solid ball, etc.
*/