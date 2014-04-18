// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects

var hero = {
	speed: 206 // movement in pixels per second
};

var monster = {};
var monstersCaught = 0;
var level; 


// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// get a random number
function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}


var timer = 0;
var lives = 3;  

// Add game mechanic time vs monsters caught 

setInterval(function(){

	console.log("checking...")
	
	if (timer <= monstersCaught){ // did you catch a monster in interval?

		console.log("you're ok")
		++timer; 
	} 

	else {

		console.log("you need to be faster")
		timer = 0;
		monstersCaught = 0; 
		--lives;
		console.log(lives);  

		}

		}, 2000 // 2 second 

); // end of interval 




// Update game objects
var update = function (modifier) {

	level = monstersCaught; 

	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}


	// is hero near edge of canvas?

	if (hero.x >= canvas.width - 44){ hero.x = 44;}

	else if (hero.x <= 44){ hero.x = canvas.width - 44}

	else if (hero.y <= 44){ hero.y = canvas.height - 44}

	else if (hero.y >= canvas.height - 44){ hero.y = 44}

	//
	if (lives <= 0){

	console.log("game over");

	}


}; // end update 

// Draw everything

var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
		
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
		
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "18px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);

	//
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "18px Helvetica";
	ctx.textAlign = "right";
	ctx.textBaseline = "top";
	ctx.fillText("Timer " + timer, 482, 32);

};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible
