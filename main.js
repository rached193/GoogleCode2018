/* Depenecias */


var fs = require("fs");

class Car {
  constructor(x, y) {
		this.x = (x) ? x : 0;
    this.y = (y) ? y : 0;
  }
//MAX_X, MAX_Y
  move(direction) {
		if(direction = 'UP'){
			this.y = this.y - 1;
		} else if(direction = 'DOWN'){
			this.y = this.y + 1;
		} else if(direction = 'RIGHT'){
			this.x = this.x + 1;
		} else if(direction = 'LEFT'){
			this.x = this.x - 1;
		}
  }
}
const args = process.argv;

var program_name = args[0]; //value will be "node"
var script_path = args[1]; //value will be "main"
var file_name = args[2];

if (!file_name) throw new Error('Fichero de entrada no definido');

var problem_data = readFile(file_name);
var solution = solve(problem_data);

var cars=[];






writeFile(solution);
initCars();

function readFile(name) {
	if (!fs.existsSync(name)) throw new Error('Ruta de fichero incorrecta');

	var info = [];

	var data = fs.readFileSync(name, 'utf8');
	var data_lines = data.split("\n");

	for (var i = 1; i < data_lines.length; i++) {
		var data_aux = data_lines[i].split("");
		if (data_aux.length > 0) info[i - 1] = data_aux;
	}
	console.log(info);
	return info;
}

function writeFile(name) {

}

function solve(problem_data) {

}


function initCars(){
	for(var i=0;i<CARS;i++){
		cars.push(new Car());
	}
}
