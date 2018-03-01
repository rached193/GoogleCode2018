/* Depenecias */
var fs = require("fs");
const args = process.argv;

var program_name = args[0]; //value will be "node"
var script_path = args[1]; //value will be "main"
var file_name = args[2];

if (!file_name) throw new Error('Fichero de entrada no definido');

readFile(file_name);

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

