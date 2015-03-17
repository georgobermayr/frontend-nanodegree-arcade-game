// Enemies our player must avoid
var Enemy = function(startX, startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = startX;
    this.y = startY;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.



    this.x = this.x + this.speed * dt;
    if (this.x >= 500) {
        this.x = 0;
    };

    this.xSpan = this.x + 171;
    if (this.x <= player.x && this.xSpan >= player.x && this.y == player.y) {
        console.log("collision");
    };

    // console.log(this.xSpan >= player.x);
    // console.log(this.x <= player.x);
    // console.log("this.xSpan: "+this.xSpan+"this.x: "+this.x+" player.x: "+player.x);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(startX, startY) {
    this.sprite = 'images/char-boy.png';

    this.startX = startX;
    this.startY = startY;

    this.x = startX;
    this.y = startY;
}

Player.prototype.update = function() {
    if (this.x >= 500) {
        this.x = 0;
    }else if (this.x < 0) {
        this.x = 400;
    }else if (this.y <= 5) {
        this.reset();
    };

};

Player.prototype.reset = function() {
    this.x = this.startX;
    this.y = this.startY;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    switch(input) {
        case "left":
            this.x = this.x - 100;
            break;
        case "right":
            this.x = this.x + 100;
            break;
        case "up":
            this.y = this.y - 90;
            break;
        case "down":
            this.y = this.y + 90;
            break;
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(0, 230, 100)];
//var allEnemies = [new Enemy(0, 50, 300), new Enemy(0, 140, 200), new Enemy(0, 230, 100)];
var player = new Player(200, 410);

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
