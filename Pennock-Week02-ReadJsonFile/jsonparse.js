/**
 * @author John Pennock
 */
 
var fs = require('fs');

var jsonStringFromFile = fs.readFileSync('data.json');
var jsonFromFile = JSON.parse(jsonStringFromFile);

console.log("Reading 'data.json' file");
console.log("root json object is typeof: '" + typeof jsonFromFile + "' <-- should be 'object'");
console.log("It contains '" + jsonStringFromFile + "'");
console.log(" properties:");
for (var prop in jsonFromFile) {
	if (jsonFromFile.hasOwnProperty(prop)) {
		console.log("  " + prop + ": " + jsonFromFile[prop] + " is typeof: " + typeof (jsonFromFile[prop]));
	}
}
