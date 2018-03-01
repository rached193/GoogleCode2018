/* Depenecias */
var fs = require("fs");
const args = process.argv;

var program_name = args[0]; //value will be "node"
var script_path = args[1]; //value will be "main"
var file_name = args[2];

if (!file_name) throw new Error('Fichero de entrada no definido');

readFile(file_name);

function readFile(name) {
	var data = fs.readFileSync('example.in');
	console.log("Synchronous read: " + data.toString());
}

