/**
 * @author Pablo Molina <http://pablomolina.me>
 * @date 2012-07-18
 */

/** Object Pelota */
var Pelota = function () {
	this.can = can;
	this.ctx = ctx;
	this.size = 20;
	this.gravity = 9.81;
	this.velocity = [7.5, 0];
	this.bounciness = 0.9;
	this.friction = 1.01;
	this.pos = [100, 0];
	this.color = "#F9F7EB";
	this.stop = false;

	this.stopTimes = 0;
	this.stopLimit = 10;
	this.id = ++this.constructor.prototype.ID;

	var me = this;
	this.init = function () {
		me.fall();
		me.draw();
		if (!me.stop)
			window.requestAnimFrame(me.init);
	};
};

/** Number of instances for this class */
Pelota.prototype.ID = 0;

/** Draw the ball on the canvas */
Pelota.prototype.draw = function () {
	if (this.id === 1) {
		this.ctx.clearRect(0, 0, this.can.width, this.can.height);
	}
	this.ctx.beginPath();
	this.ctx.fillStyle = this.color;
	this.ctx.strokeStyle = "#F9F7EB";
	this.ctx.moveTo(this.pos[0] + this.size, this.pos[1]);
	this.ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2, true);
	this.ctx.fill();
	this.ctx.stroke();
	this.ctx.closePath();
};

/** Calculates the ball's position */
Pelota.prototype.fall = function () {
	if (parseInt(this.velocity[1]) === 0 &&
		  parseInt(this.velocity[0]) === 0) {
		this.stopTimes += 1;
	} else {
		this.stopTimes = 0;
	}

	if (this.stopTimes < this.stopLimit) {
		this.velocity[1] += this.gravity / 10;
		this.pos[0] += this.velocity[0];
		this.pos[1] += this.velocity[1];

		if (this.pos[1] > this.can.height - this.size) {
			this.pos[1] = this.can.height - this.size;
			this.velocity[1] = this.velocity[1] * (-1) * this.bounciness;
			this.velocity[0] /= this.friction;
		}

		if (this.pos[0] <= 0 + this.size) {
			this.pos[0] = this.size;
			this.velocity[0] *= (-1);
		} else if (this.pos[0] >= this.can.width - this.size) {
			this.pos[0] = this.can.width - this.size;
			this.velocity[0] *= (-1);
		}
	}
};

/** Updates the ball's position */
Pelota.prototype.update = function () {
  var height = document.getElementById('container').offsetHeight - 21;
  if (parseInt(this.velocity) === -0 || parseInt(this.velocity) === 0) {
    if (this.pos[1] != height) {
      this.pos[1] = height;
    }
  }
};

/** Stops the animation */
Pelota.prototype.finish = function () {
	this.stop = true;
};

/****************************************************************
 * Dirty code for making it work *******************************/

/* Simple fix from Paul Irish */
window.requestAnimFrame = (function(){
   return  window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame   ||
   window.mozRequestAnimationFrame      ||
   window.oRequestAnimationFrame        ||
   window.msRequestAnimationFrame       ||
   function( callback ){
     window.setTimeout(callback, 1000 / 60);
   };
})();

var can = document.getElementById("canvas"),
		ctx = can.getContext("2d"),
		p = [],
		num = 0;

// Get canvas and set size to window size
var height = document.getElementById('container').offsetHeight;
can.width = window.innerWidth - 21;
can.height = height - 21;

/** Add a new ball object */
function addBall (e) {
  p[num] = new Pelota();

	if (e) {
		p[num].pos = [e.clientX, e.clientY];
	}

	// p[num].color = "rgb(" + parseInt(Math.random() * 255) + ", "
	// 	+ parseInt(Math.random() * 255) + ", " + parseInt(Math.random() * 255) + ")";
  p[num].color = "#F9F7EB";
	p[num].velocity = [
		Math.random() * 20 - 10,
		Math.random() * 5 - 2.5
	];
	p[num].bounciness = Math.random() * 0.1 + 0.9;
	p[num].friction = Math.random() * 0.05 + 1;
	p[num].init();
	num++;
}

// // Creates a starting ball and add a
// // canvas event to create on pressing it
// addBall();
// can.onclick = addBall;

/** Move all balls */
function shake () {
	for (var i = 0; i < num; i++) {
		p[i].velocity = [
			Math.random() * 40 - 20,
			Math.random() * 5 - 20
		];
	}
}

/** Delete all balls and clear the canvas */
function clearAll () {
	for (var i = 0; i < num; i++) {
		p[i].finish();
		delete p[i];
	}
	Pelota.prototype.ID = 0;
	num = 0;
	setTimeout(function () {
		ctx.clearRect(0, 0, can.width, can.height);
	}, 100);
}

function replaceAll () {
	for (var i = 0; i < num; i++) {
		p[i].update();
	}
}
