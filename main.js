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

  getTraveller() {
    if(TRAVELLERS.length > 0){
      this.traveller = TRAVELLERS.pop();
    }
  }

  goInitPosition(){
    //movimiento horizontal
    var hDesp = this.traveller.cordenadas_inicio.x - this.x;
    var direction = (hDesp > 0) ? 'RIGHT' : 'LEFT';
    for(var i = 0; i < Math.abs(hDesp); i++){
      if(!this.move(direction)){
        break;
      }
    }
    //movimiento vertical
    var vDesp = this.traveller.cordenadas_inicio.y - this.y;
    var direction = (hDesp > 0) ? 'DOWN' : 'UP';
    for(var i = 0; i < Math.abs(vDesp); i++){
      if(!this.move(direction)){
        break;
      }
    }
  }

  goToDestination(){
    //movimiento horizontal
    var hDesp = this.traveller.cordenadas_fin.x - this.x;
    var direction = (hDesp > 0) ? 'RIGHT' : 'LEFT';
    for(var i = 0; i < Math.abs(hDesp); i++){
      if(!this.move(direction)){
        break;
      }
    }
    //movimiento vertical
    var vDesp = this.traveller.cordenadas_fin.y - this.y;
    var direction = (hDesp > 0) ? 'DOWN' : 'UP';
    for(var i = 0; i < Math.abs(vDesp); i++){
      if(!this.move(direction)){
        break;
      }
    }

    if(this.step <= TIME){
      this.hits.push(this.traveller.id);
      this.traveller = null;
    }
  }

  go(){
    while(this.step < TIME){
      this.getTraveller();
      this.goInitPosition();
      this.goToDestination();
      //no ha llegado a destino
      if(this.traveller != null){
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

console.log(CARS)
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

function carsGo(){
  //reparto inicial
  var indexCar = 0;
  console.log(cars)
   cars[0].go()
   console.log(cars[0])
  // while(TRAVELLERS.length > 0){
  //   cars[indexCar].go();
  //   console.log(cars[indexCar].hits);
  //   indexCar++;
  // }

}

function finish() {
	for (var i = 0; i < CARS; i++) {
		var current_car = CARS[i].hit;
		console.log(current_car.stringify());
		fs.appendFile('out.txt',current_car.length+"\n", function (err) {
			if (err) {
				console.log(err)
			}
		});
	}
}
