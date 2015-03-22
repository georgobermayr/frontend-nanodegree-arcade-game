// Enemies our player must avoid
var Enemy = function(startY) {
    "use strict";
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Speed and x starting coordinate are calculated randomly
    // to ensure that the game is different each time
    // Y coordinate is picked from the new enemy call.
    this.x = Math.random() * (500 - 0) + 0;
    this.y = startY;
    this.speed = Math.random() * (500 - 100) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Move the enemy forward by adding the speed parameter to
    // current x coordinate and multipling it whit the dt parameter.
    this.x = this.x + this.speed * dt;

    // Check if enemy is of-canvas on the right side, if so
    // reset to position zero on left side to make it move
    // from left to right again.
    if (this.x >= 500) {
        this.x = 0;
    }

    // Declare a span parameter in x dimension. This is used to
    // caluculate collisions with the player based on the content
    // of the sprite. The 98 px are based on the actucal content of
    // the enemy sprite without transparent pixels.
    this.xSpan = this.x + 98;

    // Check if the enemy collides with the player. This happens when:
    // a) The span (right end) of the enemy is at or above (greater or equal)
    //    the real start of the player AND
    // b) The end of the enemy sprite (in moving direction) is has not
    //    passed the end of the player (smaller or equal) AND
    // c) Enemy and player are in the same row (Y coordinate).
    // If all three conditions are fullfiled the player is reseted
    // to starting position and has to start the game again.
    if (this.xSpan >= player.xRealStart && this.x <= player.xSpan && this.y == player.y) {
        player.reset();

        // Get the current counter value as a number
        // Subtract 300 points to the counter for colliding with an enemy.
        this.currentCounter = Number(document.getElementById('counter').innerHTML);
        document.getElementById('counter').innerHTML = this.currentCounter - 300;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(startX, startY) {
    "use strict";
    // The image/sprite for the player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    // Declare separate start variables to handle reseting the player.
    this.startX = startX;
    this.startY = startY;

    // Set the inital start coordiantes.
    this.x = startX;
    this.y = startY;
};

Player.prototype.update = function() {
    "use strict";
    // Declare a RealStart variable to define the real beginning of
    // the player without transparent pixels in the sprite. This is
    // used for better collision handling.
    this.xRealStart = this.x + 35;

    // Declare a span parameter in x dimension. This is used to
    // caluculate collisions with the enemy based on the content
    // of the sprite. The 18 and 55 px are based on the actucal content
    // of the player sprite without transparent pixels.
    this.xSpan = this.x + 18 + 55;

    // Checks if player is of-canvas on the right hand side.
    // If so, reset to zero to let it wander from one end ot another.
    if (this.x >= 500) {
        this.x = 0;

    // Checks if player is of-canvas on the left hand side.
    // If so, reset to 400 to let it wander from one end ot another.
    }else if (this.x < 0) {
        this.x = 400;

    // Checks if player is of-canvas on the bottom.
    // If so, reset to initial y position.
    }else if (this.y >= 500 ) {
        this.y = this.startY;

    // Checks if player has reached its goal. If so, reset to
    // inital starting position to let the game start again.
    }else if (this.y <= 5) {
        this.reset();

        // Get the current counter value as a number
        // Add 500 new points to the counter for reaching the goal.
        this.currentCounter = Number(document.getElementById('counter').innerHTML);
        document.getElementById('counter').innerHTML = this.currentCounter + 500;
    }
};

Player.prototype.reset = function() {
    "use strict";
    // Handles reset to initial starting position.
    // Used for collisions and if player reached its goal.
    this.x = this.startX;
    this.y = this.startY;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    "use strict";
    // Declare the horizontal and vertical movement deltas
    // to let the player move in relation to the grid.
    this.horizontalDelta = 100;
    this.verticalDelta = 90;

    // Checks for the input provided by the player and lets
    // the sprite move in the appropriate direction.
    switch(input) {
        case 'left':
            this.x = this.x - this.horizontalDelta;
            break;
        case 'right':
            this.x = this.x + this.horizontalDelta;
            break;
        case 'up':
            this.y = this.y - this.verticalDelta;
            break;
        case 'down':
            this.y = this.y + this.verticalDelta;
            break;
    }
};

// Gems our player can collect
var Gem = function(startY) {
    "use strict";
    // The image/sprite for our gem, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/Gem Orange.png';

    // x  coordinate is calculated randomly
    // to ensure that the game is different each time
    // Y coordinate is picked from the new gem call.
    this.x = Math.random() * (500 - 0) + 0;
    this.y = startY;
};

// Update the gems position, required method for game
// Parameter: dt, a time delta between ticks
Gem.prototype.update = function(dt) {
    "use strict";
    // Declare a span parameter in x dimension. This is used to
    // caluculate collectings of the player based on the content
    // of the sprite. The 98 px are based on the actucal content of
    // the gem sprite without transparent pixels.
    this.xSpan = this.x + 98;

    // Check if the gem is collected by the playre. This happens when:
    // a) The span (right end) of the gem is at or above (greater or equal)
    //    the real start of the player AND
    // b) The end of the gem sprite (in moving direction) is has not
    //    passed the end of the player (smaller or equal) AND
    // c) Gem and player are in the same row (Y coordinate).
    // If all three conditions are fullfiled the gem is removed from
    // the canvas and a point is collected.
    if (this.xSpan >= player.xRealStart && this.x <= player.xSpan && this.y == player.y) {
        this.reset();

        // Get the current counter value as a number
        // Add 100 new points to the counter for collecting the gem.
        this.currentCounter = Number(document.getElementById('counter').innerHTML);
        document.getElementById('counter').innerHTML = this.currentCounter + 100;
    }
};

// Draw the gem on the screen, required method for game
Gem.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.reset = function() {
    "use strict";
    // Handles removing of the gem from the canvas.
    // Used for collections.
    this.x = -100;
    this.y = -100;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Only the y coordinate is predefined, x coordinate and speed
// are created randomly in the object itself. There are allways
// two enemys in the last row and one in the first two.
var allEnemies = [
    new Enemy(50),
    new Enemy(50),
    new Enemy(140),
    new Enemy(230)
];

// Now the player
var player = new Player(200, 410);

// And the Gems, one in each row.
var allGems = [
    new Gem(50),
    new Gem(140),
    new Gem(230)
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
