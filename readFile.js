var exports = module.exports = {};

var fs = require("fs");
exports.readFile = function (name) {
	if (!fs.existsSync(name)) throw new Error('Ruta de fichero incorrecta');
	
	var info = [];
	
	var data = fs.readFileSync(name, 'utf8');
	var data_lines = data.split("\n");
	
	
	var problem_params = data_lines[0].split(" ");
	
	var MAX_X = problem_params[0];
	var MAX_Y = problem_params[1];
	var CARS = problem_params[2];
	var RIDES = problem_params[3];
	var BONUS = problem_params[4];
	var TIME = problem_params[5];
	
	
	for (var i = 1; i < data_lines.length; i++) {
		var data_aux = data_lines[i].split(" ");
		if (data_aux.length > 1) {
			var obj = {
				cordenadas_inicio: {
					x: data_aux[0],
					y: data_aux[1]
				},
				cordenadas_fin: {
					x: data_aux[2],
					y: data_aux[3]
				},
				tiempo_inicio: data_aux[4],
				tiempo_fin: data_aux[5]
			};
			
			info.push(obj);
		}
	}
	
	console.log(info);
	return [info, MAX_X, MAX_Y, CARS, RIDES, BONUS, TIME];
	
}