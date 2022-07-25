/**
 * CLI Program that takes as an input a normalized javascript file, and a config
 * file and returns the instrumented symbolic test to be executed with
 * a symboilic javascript code executor.
 */


/**
 * Requires
 */
const yargs = require("yargs");
const fs = require("fs");
const utils = require("../utils/js_ast_generation/ast_utils");
const generate_test = require("./test_gen").generate_test
const template_gen = require("./template_gen")

/**
 * Command line interface
 */
const argv = yargs
	.option("input", { alias: "i", description: "JS input file", type: "string" })
	.option("config", { alias: "c", description: "JSON specification of sinks, source function and variable types", type: "string" })
	.option("optim", { alias: "opt", description: "JSON specification of computation path", type: "string" })
	.option("output", {
		alias: "o",
		description: "ECMA-SL output file",
		type: "string",
	})
	.demandOption("input")
	.demandOption("config")
	.usage("Usage: $0 -i [filepath]")
	.help()
	.alias("help", "h").argv;


/**************     Step 1 - parse the program and the types     **************/

try {
	var data = fs.readFileSync(argv.input, "utf-8");
	var ast = utils.js2ast(data);
	data = fs.readFileSync(argv.types, "utf-8");
	var types = JSON.parse(data);
	var optim;
	if (argv.optim) {
		data = fs.readFileSync(argv.optim, "utf-8");
		optim = JSON.parse(data);
	}
} catch (ex) {
	console.log(ex.toString())
}

/**************     Step 2 - generate symbolic test template     **************/

/* TODO (Optimization) -> Remove all pieces of code not executed in the assert/
 * console.log computation path
*/
if (argv.optim) {
	ast = template_gen.remove_unused(ast, optim);
}
// let ast = template_gen.remove_module_exports(ast);
let test_template = template_gen.generate_template(ast);


/******************      Step 3 - Generate specific test      *****************/

let test = generate_test(types, test_template);


/************************        Step 4 - output        ***********************/
if (argv.output) {
	fs.writeFile(argv.output, test, err => {
		if (err) {
			console.error(err);
			return;
		}
	})
} else {
	console.log(test)
}
