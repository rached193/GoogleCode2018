/* Dependencias */


var read = require("./readFile.js");

class Car {
	constructor(x, y) {
		this.x = (x) ? x : 0;
		this.y = (y) ? y : 0;
		this.step = 0;
	}

//MAX_X, MAX_Y
	move(direction) {
		if (this.step == TIME) {
			return false;
		} else {
			
			if (direction = 'UP') {
				this.y = this.y - 1;
			} else if (direction = 'DOWN') {
				this.y = this.y + 1;
			} else if (direction = 'RIGHT') {
				this.x = this.x + 1;
			} else if (direction = 'LEFT') {
				this.x = this.x - 1;
			}
			
			this.step = this.step + 1;
			
			return true;
		}
	}
}

const args = process.argv;

var program_name = args[0]; //value will be "node"
var script_path = args[1]; //value will be "main"
var file_name = args[2];

var data = read.readFile(file_name);

var VIAJEROS = data[0];
var MAX_X = data[1];
var MAX_Y = data[2];
var CARS = data[3];
var RIDES = data[4];
var BONUS = data[5];
var TIME = data[6];

console.log(CARS)
if (!file_name) throw new Error('Fichero de entrada no definido');


var cars = [];


// initCars();


function initCars() {
	for (var i = 0; i < CARS; i++) {
		cars.push(new Car());
	}
}
