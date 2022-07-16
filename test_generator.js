/**
 * Receives a function parameter object and returns the ast corresponding to the
 * declaration of that parameter as a symbolic variable of the specified type
 * @param {{name: string; type: string|undefined;}} param 
 * @returns 
 */
function generate_symb_assignment(param) {
	var tmplt;
	switch (param.type) {
		case undefined:
			//var param_name = symb(param_name);
			tmplt = `var ${param.name} = symb(${param.name});\n`
			return tmplt

		case "number":
			// var param_name = symb_number(param_name); 
			tmplt = `var ${param.name} = symb_number(${param.name});\n`;
			return tmplt;

		case "string":
			// var param_name = symb_string(param_name); 
			tmplt = `var ${param.name} = symb_string(${param.name});\n`;
			return tmplt;

		case "bool":
			// var param_name = symb_bool(param_name);
			tmplt = `var ${param.name} = symb_bool(${param.name});\n`;
			return tmplt;

		case "concrete":
			if (param.value)
				// var param_name = <value>;
				tmplt = `var ${param.name} = ${param.value};\n`;
			else
				//var param_name;
				tmplt = `var ${param.name};\n`
			return tmplt;

		default: throw new Error("Unsupported: generate_symb_assignment")
	}
}

/**
 * Generates a symbolic test from a template by attributing values (symbolic or 
 * concrete) to the function arguments
 * @param {{name: string; type: string|undefined;} []} types 
 * @param {string} prog_tp - AST symbolic test template
 */
function generate_test(types, prog_tp) {
	/** Step 1 - Generate symbolic assignments for parameters */
	var params = types.params;
	var symb_assignments = params.map(generate_symb_assignment);

	/** Step 2 - Add variable assignments */
	return symb_assignments.join() + prog_tp;
}

module.exports = {generate_test};