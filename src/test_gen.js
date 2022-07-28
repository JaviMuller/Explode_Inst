/**
 * Library to generate a specific symbolic test from a test template and a 
 * config file
 */


/**
 * Require
 */
const var_gen = require("../utils/variable_name_gen");
const { js2ast, ast2js } = require("../utils/js_ast_generation/ast_utils");
const map_reduceJS = require("../utils/js_ast_manipulation/js_map_reduce");
const mapJS = require("../utils/js_ast_manipulation/js_mapper");

/**
 * Auxiliary functions
 */

/**
 * This function receives a program and a list of sink types and returns the 
 * list of variables which have been used in the normalization instead of the 
 * ones that are member expressions 
 * @param {Object} ast 
 * Esprima AST representation of a JavaScript program
 * @param {String[]} sink_types
 * Array of types of sinks
 * @returns
 * 
 */
function get_member_exp_sink_vars(ast, sinks) {
	function f(p) {
		try {
			switch (p.type) {
				// var <var> = <obj>.<prop> => <var>
				case "VariableDeclarator":
					if(p.init.type === "MemberExpression" && sinks.some((e) => e === ast2js(p.init.callee))) {
						return [p.id.name];
					} else {
						return [];
					}
				default:
					return [];
			}
		} catch (e) {
			console.log("get_mem_exp_sink_vars: parameter is not an AST.");
		}
	}
	return map_reduceJS(f, (d, ac) => d.concat(ac), ast, []);
}

let fresh_symb_var = var_gen.fresh_symb_var_gen();
let fresh_obj_var = var_gen.fresh_obj_var_gen();
let fresh_symb_num_var = var_gen.fresh_symb_num_var_gen();
let fresh_symb_str_var = var_gen.fresh_symb_str_var_gen();
let fresh_symb_bool_var = var_gen.fresh_symb_bool_var_gen();
let fresh_concrete_var = var_gen.fresh_concrete_var_gen();
let fresh_test_var = var_gen.fresh_test_var_gen();



/**
 * Main functions
 */
/**
 * TODO
 * @param {*} prog 
 * @param {*} optim 
 * @returns 
 */
function remove_unused(prog, optim) {
	return;
}

/**
 * Remove module.exports and add a test before each vulnerable sink to see if 
 * input is safe (i.e. not symbolic)
 * @param {Object} config
 * Configuration file specifying sink types, source function and argument types
 * @param {Object} ast_prog
 * Esprima AST representation of JavaScript code
 */
 function module_exp_rm_sink_safeguard(ast_prog, config) {
	/* Replace member expression sinks with the corresponding variables */
	var sinks = config.sink_types.concat(get_member_exp_sink_vars(ast_prog, config.sink_types));
	sinks = sinks.filter((e) => !(e.includes("."))); 

	/* Mapping function  */
	function f(ast) {
		switch (ast.type) {
			case "VariableDeclarator":
				/* let <var> = <sink>(<var>) */
				if (ast.init.type === "CallExpression" && sinks.some((e) => e === ast.init.callee.name)) {
					var test_var = fresh_test_var();
					const arg_check = ast.init.arguments.map((e) => "const " + test_var + " = !is_symbolic(" + e + ");\n" +
						"Assert(" + test_var + ");\n");
					return js2ast("{\n" + arg_check + ast2js(ast) + "};");
				}
				return null;
			case "ExpressionStatement":
				/* module.exports = {} */
				if(ast.expression.type === "AssignmentExpression" && ast.expression.left.type === "MemberExpression" && ast.expression.left.object.name === "module" && ast.expression.left.property.name === "exports") {
					return { type: "EmptyStatement" };
				}
				return null;
			default: 
				return null;
		}
	};
	return mapJS(f, ast_prog);
}



/**
 * Receives a function parameter object and returns the string corresponding to 
 * the declaration of that parameter as a symbolic variable of the specified 
 * type (in case of concrete, declares to the value)
 * @param {Object} var_info
 * Information about a variable
 * @returns {string}
 * Variable assignment
 */
function generate_symb_assignment(var_info) {
	switch (var_info.type) {
		case "symbolic":
			//var var_name = symb(var_name);
			var name = fresh_symb_var();
			var tmplt = `var ${name} = symb(${name});\n`;
			return {name: name, tmplt: tmplt};

		case "object":
			// var var_name = {};
			// var_name.prop = var;
			var name = fresh_obj_var();
			var tmplt = `var ${name} = {};\n`;
			var properties_assignment = var_info.properties.map(generate_symb_assignment);
			tmplt = tmplt.concat(
				/* Templates of properties */
				properties_assignment.map((p) => p.tmplt),
				/* Assignments of properties to created vars */
				properties_assignment.map((p, index) => `${name}.${var_info.properties[index].name} = ${p.name};\n`));
			return {name: name, tmplt: tmplt};

		case "number":
			// var param_name = symb_number(param_name);
			var name = fresh_symb_num_var();
			var tmplt = `var ${name} = symb_number(${name});\n`;
			return {name: name, tmplt: tmplt};

		case "string":
			// var param_name = symb_string(param_name);
			var name = fresh_symb_str_var();
			var tmplt = `var ${name} = symb_string(${name});\n`;
			return {name:name, tmplt: tmplt};

		case "bool":
			// var param_name = symb_bool(param_name);
			var name = fresh_symb_bool_var();
			var tmplt = `var ${var_info.name} = symb_bool(${var_info.name});\n`;
			return {name: name, tmplt: tmplt};

		case "concrete":
			var name = fresh_concrete_var();
			var tmplt;
			if (var_info.value) {
				// var param_name = <value>;
				tmplt = `var ${var_info.name} = ${var_info.value};\n`;
			} else {// same as symbolic
				//var param_name;
				tmplt = `var ${var_info.name};\n`
			}
			return {name: name, tmplt: tmplt };

		default: throw new Error("Unsupported: generate_symb_assignment")
	}
}

/**
 * Generates a symbolic test from a normalized source file and a config. Removes
 * the module.exports, adds a safeguard for each sink, declares the used
 * variables and calls the function with the variables
 * @param {Object} config 
 * @param {Object} prog
 * Esprima AST program
 * @returns
 * A symbolic test in JavaScript string format
 */
function generate_test(prog, config) {
	/* Remove module.exports and check if sink type is symbolic */
	var parsed_prog = module_exp_rm_sink_safeguard(prog, config);

	var symbolic_assignments = config.vars.map(generate_symb_assignment);
	/* Get function parameter names */
	var param_names = symbolic_assignments.map(e => e.name);
	/* Get assignment strings of symbolic variables and objects */
	var assignment_templates = symbolic_assignments.map(e => e.tmplt);
	/* Parse the function call with the parameter names */
	var func_call = `${config.function}(${param_names.toString()});\n`
	/** Assignments + Program + Function Call */
	return assignment_templates.join() + ast2js(parsed_prog) + '\n' + func_call;
}

module.exports = { remove_unused, generate_test };