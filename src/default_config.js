/**
 * CLI program to generate the default config file for a given JavaScript
 * program in order to generate a symbolic test
 */


/**
 * Require
 */
const yargs = require("yargs");
const fs = require("fs");
const utils = require("../utils/js_ast_generation/ast_utils");
const map_reduceJS = require("../utils/js_ast_manipulation/js_map_reduce");


/**
 * CLI
 */
const argv = yargs
	.option("input", { alias: "i", description: "JS input file", type: "string" })
	.option("output", {
		alias: "o",
		description: "JSON output file",
		type: "string",
	})
	.demandOption("input")
	.usage("Usage: $0 -i [filepath]")
	.help()
	.alias("help", "h").argv;


/*********************     Step 1 - parse the program     *********************/
let prog;
try {
	prog = utils.js2ast(fs.readFileSync(argv.input, "utf-8"));
}
catch(err) {
	console.log(err);
}

/****************** Step 2 - find function name and arguments *****************/
/**
 * Assume:
 * 	const name = function (<args>) {};
 * 	{ ... }
 * 	module.exports = name) 
*/

/**
 * Filtering function to receive the name of the function exported in 
 * module.exports
 * @param {Object} ast
 * Esprima AST Object 
 * @returns "" or the name of the function if the AST corresponds to the block
 * module.exports = <function>
 */
function exp_funct_name(ast) {
	switch(ast.type) {
		case "ExpressionStatement":
			if(ast.expression.type === "AssignmentExpression" && ast.expression.left.type === "MemberExpression" && ast.expression.left.object.name === "module" && ast.expression.left.property.name === "exports") {
				return ast.expression.right.name;
			} else {
				return "";
			}
		default:
			return "";
	}
};
var name = map_reduceJS(exp_funct_name, (d, ac) => d.concat(ac), prog, "");

/**
 * Filtering function to extract from the program source code the source
 * function block
 * @param {Object} ast 
 * Esprima AST Object
 * @returns an empty list or the init of the function declaration if it is the
 * source function
 */
var find_func = function(ast) {
	switch(ast.type){
		case "VariableDeclarator":
			if(ast.id.name === name && ast.init.type === "FunctionExpression") {
				return [ast.init];
			} else {
				return [];
			}
		default:
			return [];
	}
};
var f = map_reduceJS(find_func, (d, ac) => d.concat(ac), prog, [])[0];

/**
 * Return arguments as JSON strings
 */
var args = f.params.map((s) => `{ \"var\": \"${s.name}\" }`);
args = args.join(',\n\t\t');


/*************************       Step 3 - output       ************************/

var config = `{\n\t\"function\": \"${name}\",\n\t\"params\": [\n\t\t${args}\n\t]\n}`;

if (argv.output) {
	fs.writeFile(argv.output, config, err => {
		if (err) {
			console.error(err);
			return;
		}
	})
} else {
	console.log(config)
}