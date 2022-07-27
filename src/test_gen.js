/**
 * Library to generate a specific symbolic test from a test template and a 
 * config file
 */

const { MemberExpression, Identifier } = require("esprima-next");
const { constants } = require("fs");
const { js2ast } = require("../utils/js_ast_generation/ast_utils");
const map_reduceJS = require("../utils/js_ast_manipulation/js_map_reduce");

/**
 * Require
 */
const ast2js = require("../utils/js_ast_generation/ast_utils").ast2js


/**
 * Auxiliary functions
 */

/**
 * This function receives a member expression and extracts its corresponding 
 * string
 * @param {} ast 
 * @returns 
 */

function fold_mem_expr(ast) {
	function f(ast) {
		try {
			switch(ast.type) {
				case MemberExpression:
					return ast2js(ast);
				default:
					return "";
			}
		} catch (e) {
			console.log("fold_mem_expr: parameter is not an AST.");
		}
	}
	return map_reduceJS(f, (d, ac) => d.concat(ac), ast, "");
}

function get_mem_exp_sink_vars(ast) {
	function f(p) {
		try {
			switch (p.type) {
				case "VariableDeclarator":
					if(p.declarations[0].init.type === "MemberExpression" && sinks.some((e) => e === fold_mem_expr(p.declarations[0].init))) {
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
	return map_reduceJS(f, (d, ac) => d.push(ac), ast, []);
}


/**
 * Add a test before each vulnerable sink to see if input is safe (i.e. not 
 * symbolic)
 * @param {Object} config - Configuration file specifying sink types, source
 * function and argument types
 * @param {Object} ast_prog - AST representation of js code
 */
 function sink_safeguard(config, ast_prog) {
	var i = 0; /* Counter to generate variable names */
	/* Step 1: add to sinks the vars corresponding to member expression sinks */
	var sinks = config.sink_types.concat(get_mem_exp_sink_vars(ast_prog));
	sinks = sinks.filter((e) => !(e.includes("."))); /* Remove member expressions */

	/* Mapping function  */
	function f(ast) {
		switch (ast.type) {
			case "VariableDeclarator":
				/* let <var> = <sink>(<var>) */				
				if (ast.init.type === "CallExpression" && sinks.some((e) === ast.init.callee.name)) {
					const arg_check = ast.init.arguments.map((e) => "const " + constants.inst_vars_prefix + (++i) + " = !is_symbolic(" + e + ");\n" +
						"Assert(" + constants.inst_vars_prefix + i + ");\n");
					return js2ast("{\n" + arg_check + ast2js(ast) + "};");
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
 * Information about the variable
 * @returns {string} - variable assignment
 */
function generate_symb_assignment(var_info) {
	var tmplt;
	switch (var_info.type) {
		case undefined:
			//var var_name = symb(var_name);
			tmplt = `var ${var_info.name} = symb(${var_info.name});\n`;
			return tmplt;

		case "object":
			// It assumes properties of the object have been declared as separated variables with the same name previously
			// var var_name = {};
			// var_name.prop = prop;
			tmplt = (`var ${var_info.name} = {};\n`).concat(var_info.props.map(p => `${var_info.name}.${p} = ${p};\n`));
			return tmplt;

		case "number":
			// var param_name = symb_number(param_name); 
			tmplt = `var ${var_info.name} = symb_number(${var_info.name});\n`;
			return tmplt;

		case "string":
			// var param_name = symb_string(param_name); 
			tmplt = `var ${var_info.name} = symb_string(${var_info.name});\n`;
			return tmplt;

		case "bool":
			// var param_name = symb_bool(param_name);
			tmplt = `var ${var_info.name} = symb_bool(${var_info.name});\n`;
			return tmplt;

		case "concrete":
			if (param.value)
				// var param_name = <value>;
				tmplt = `var ${var_info.name} = ${var_info.value};\n`;
			else // same as symbolic
				//var param_name;
				tmplt = `var ${var_info.name};\n`
			return tmplt;

		default: throw new Error("Unsupported: generate_symb_assignment")
	}
}

/**
 * Generates a symbolic test from a template by attributing values (symbolic or 
 * concrete) to the function arguments
 * @param {{name: string; type: string|undefined;} []} types 
 * @param {Object} prog_tp - AST symbolic test template
 */
function generate_test(types, prog_tp) {
	/** Step 1 - Generate symbolic assignments for parameters */
	var params = types.params;
	var params_names = params.map((s) => s.var);
	var symb_assignments = params.map(generate_symb_assignment);
	var func_call = `${types.function}(${params_names.toString()});\n`
	/** Step 2 - Add variable assignments */
	return symb_assignments.join() + ast2js(prog_tp) + '\n' + func_call;
}

module.exports = { generate_test };