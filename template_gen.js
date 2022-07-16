const map_reduceJS = require("./js_mapper").map_reduceJS;
const ast2js = require("./utils").ast2js;


/**
 * TODO: Interface specification pending
 * @param {Object} ast 
 * @param {Object} optim 
 */
function remove_unused(ast, optim) { }

/**
 * Add a test before each assert or console.log to see if input is safe (i.e. 
 * not symbolic)
 * @param {Object} ast_prog
 */
function eval_console_safeguard(ast_prog) {
	/* Mapping function (assume normalized program, i.e. eval/console.log only
	have an argument) */
	function eval_console_args_loc(ast) {
		switch (ast.type) {
			case "ExpressionStatement":
				if (ast.expression.type === "CallExpression" && ast.expression.callee.name === "assert") {
					return js2ast;
				} else if (ast.expression.type === "CallExpression" && ast.expression.callee.object.name === "console" && expression.callee.property.name === "log") {
					return {
						type: "console.log",
						arg: ast.expression.arguments[0].name,
						loc: ast.loc.start.line
					};
				}
			default: return null;
		}
	};
	return
}


module.exports = { remove_unused, assert_console_safeguard }