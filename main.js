/* Dependencias */
var fs = require('fs');

var read = require("./readFile.js");

class Car {
	constructor(x, y) {
		this.x = (x) ? x : 0;
		this.y = (y) ? y : 0;
		this.step = 0;
		this.traveller = null;
		this.hits = [];
	}

//MAX_X, MAX_Y
	move(direction) {
		if (this.step == TIME) {
			return false;
		} else {
			
			if (direction == 'UP') {
				this.y = this.y - 1;
			} else if (direction == 'DOWN') {
				this.y = this.y + 1;
			} else if (direction == 'RIGHT') {
				this.x = this.x + 1;
			} else if (direction == 'LEFT') {
				this.x = this.x - 1;
			}
			
			this.step = this.step + 1;
			
			return true;
		}
	}
	
	getTraveller() {
		if (TRAVELLERS.length > 0) {
			var index = selectViajero(this);
			if (index != -1) {
				this.traveller = TRAVELLERS.splice(index, 1)[0];
			}
		}
	}
	
	goInitPosition() {
		//movimiento horizontal
		var hDesp = this.traveller.cordenadas_inicio.x - this.x;
		var direction = (hDesp > 0) ? 'RIGHT' : 'LEFT';
		
		
		for (var i = 0; i < Math.abs(hDesp); i++) {
			if (!this.move(direction)) {
				break;
			}
		}
		
		//movimiento vertical
		var vDesp = this.traveller.cordenadas_inicio.y - this.y;
		var direction = (vDesp > 0) ? 'DOWN' : 'UP';
		for (var i = 0; i < Math.abs(vDesp); i++) {
			if (!this.move(direction)) {
				break;
			}
		}
	}
	
	goToDestination() {
		//movimiento horizontal
		var hDesp = this.traveller.cordenadas_fin.x - this.x;
		var direction = (hDesp > 0) ? 'RIGHT' : 'LEFT';
		for (var i = 0; i < Math.abs(hDesp); i++) {
			if (!this.move(direction)) {
				break;
			}
		}
		//movimiento vertical
		var vDesp = this.traveller.cordenadas_fin.y - this.y;
		var direction = (hDesp > 0) ? 'DOWN' : 'UP';
		for (var i = 0; i < Math.abs(vDesp); i++) {
			if (!this.move(direction)) {
				break;
			}
		}
		
		if (this.step <= TIME) {
			this.hits.push(this.traveller.id);
			this.traveller = null;
		}
	}
	
	go() {
		while (this.step < TIME) {
			this.getTraveller();
			if (!this.traveller) break;
			this.goInitPosition();
			this.goToDestination();
			//no ha llegado a destino
			if (this.traveller != null) {
				TRAVELLERS.push(this.traveller);
				this.traveller = null;
			}
		}
	}
	
	
}

const args = process.argv;

var program_name = args[0]; //value will be "node"
var script_path = args[1]; //value will be "main"
var file_name = args[2];

var data = read.readFile(file_name);

var TRAVELLERS = data[0];
var MAX_X = data[1];
var MAX_Y = data[2];
var CARS = data[3];
var RIDES = data[4];
var BONUS = data[5];
var TIME = data[6];


if (!file_name) throw new Error('Fichero de entrada no definido');


var cars = [];


initCars();
carsGo();

function initCars() {
	//contruyendo coches
	for (var i = 0; i < CARS; i++) {
		cars.push(new Car());
	}
	
}

function carsGo() {
	//reparto inicial
	var indexCar = 0;
	
	while (indexCar < CARS) {
		cars[indexCar].go();
		console.log(cars[indexCar].hits);
		indexCar++;
	}
	
	finish();
	
}

function finish() {
	for (var i = 0; i < CARS; i++) {
		var current_car = cars[i].hits;
		var exit = "";
		for (var j = 0; j < current_car.length; j++) {
			exit += " " + current_car[j];
		}
		
		fs.appendFile('out.txt', current_car.length + " " + exit + " " + "\n", function (err) {
			if (err) {
				console.log(err)
			}
		});
	}
}

function distManhatan(x1, y1, x2, y2) {
	var val = Math.abs(x1 - x2) + Math.abs(y1 - y2);
	return val;
}

function selectViajero(car) {
	var maxValue = -1;
	var maxI = -1;
	for (var i = 0; i < TRAVELLERS.length; i++) {
		var value = magicFunction(car, TRAVELLERS[i].cordenadas_inicio, TRAVELLERS[i].cordenadas_fin, TRAVELLERS[i].tiempo_inicio, TRAVELLERS[i].tiempo_fin);
		if (!value <= 0 && value > maxValue) {
			maxValue = value;
			maxI = i;
		}
	}
	
	return maxI;
}

function magicFunction(posIni, posViajero, dest, tmax, tini, tactual) {
	var cosa1 = distManhatan(posIni.x, posIni.y, posViajero.x, posViajero.y);
	var cosa2 = distManhatan(posViajero.x, posViajero.y, dest.x, dest.y);
	var estimTemp = cosa1 + cosa2 + tactual;
	if (estimTemp > tmax) {
		return -10000000000000;
	}
	else {
		var bonusPoints = 0;
		if ((cosa1 + tactual) <= tini) {
			bonusPoints = BONUS - (tini - (cosa1 + tactual));
		}
		return ((cosa2 + bonusPoints) - cosa1);
	}
}
