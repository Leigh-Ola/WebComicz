const fs = require("fs");

function add_err_to_log(source, err="Unspecified Error"){
	console.log("Error");
	let str = `>> ERROR 
	source = ${source};
	date = ${(new Date()).toString()};
	body = ${err};\n\n`
	fs.appendFile("./server/log.txt", str, () => {});
}

module.exports = add_err_to_log;