/* Depenecias */
var fs = require("fs");
const args = process.argv;

var program_name = args[0]; //value will be "node"
var script_path = args[1]; //value will be "main"
var file_name = args[2];

if (!file_name) throw new Error('Fichero de entrada no definido');

var problem_data = readFile(file_name);
var solution = solve(problem_data);
writeFile(solution);


function readFile(name) {
	if (!fs.existsSync(name)) throw new Error('Ruta de fichero incorrecta');
	
	var info = [];
	
	var data = fs.readFileSync(name, 'utf8');
	var data_lines = data.split("\n");
	
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
	return info;
}

function writeFile(name) {

}

function solve(problem_data) {

}

