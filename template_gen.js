const mapJS = require("./js_mapper").mapJS;
const js2ast = require("./utils").js2ast;


/**
 * TODO: Missing implementation
 * @param {Object} ast 
 * @returns 
 */
function remove_unused(ast) {
	return ast;
}


/**
 * Add a test before each assert or console.log to see if input is safe (i.e. 
 * not symbolic)
 * @param {Object} ast_prog - AST representation of js code
 * @param {int} i - Number of the guarded eval/console.log
 */
function generate_template(ast_prog) {
	/* Mapping function (assume normalized program, i.e. eval/console.log only
	have an argument, module.exports only has variable/function names) */
	var i = 0; /* Counter to generate variable names */
	function f(ast) {
		switch (ast.type) {
			case "ExpressionStatement":
				/* eval(<var>) */
				if (ast.expression.type === "CallExpression" && ast.expression.callee.name === "eval" && ast.expression.arguments[0].name) {
					let tmplt = `{var _instr_x${++i} = !is_symbiolic(${ast.expression.arguments[0].name});\nAssert(_instr_x${i});\neval(${ast.expression.arguments[0].name});};`;
					return js2ast(tmplt);
				} 
				/* console.log(<var>) */
				if (ast.expression.type === "CallExpression" && ast.expression.callee.type === "MemberExpression" && ast.expression.callee.object.name === "console" && ast.expression.callee.property.name === "log" && ast.expression.arguments[0].name) {
					let tmplt = `{var _instr_x${++i} = !is_symbiolic(${ast.expression.arguments[0].name});\nAssert(_instr_x${i});\nconsole.log(${ast.expression.arguments[0].name});};`
					return js2ast(tmplt);
				}
				/* module.exports = {} */
				if(ast.expression.type === "AssignmentExpression" && ast.expression.left.type === "MemberExpression" && ast.expression.left.object.name === "module" && ast.expression.left.property.name === "exports") {
					return { type: "EmptyStatement" };
				}
				return null;
			case "VariableDeclaration":
				/* let <var> = eval(<var>) */				
				if (ast.declarations[0].type === "VariableDeclarator" && ast.declarations[0].init.type === "CallExpression" && ast.declarations[0].init.callee.name === "eval" && ast.declarations[0].init.arguments[0].name) {
					let tmplt = `{var _instr_x${++i} = !is_symbolic(${ast.declarations[0].init.arguments[0].name});\nAssert(_instr_x${i});\nvar ${ast.declarations[0].id.name} = eval(${ast.declarations[0].init.arguments[0].name})};`
					return js2ast(tmplt);
				}
				/* let <var> = console.log(<var>) */
				if(ast.declarations[0].type === "VariableDeclarator" && ast.declarations[0].init.type === "CallExpression" && ast.declarations[0].init.callee.type === "MemberExpression" && ast.declarations[0].init.callee.object.name === "console" && ast.declarations[0].init.callee.property.name == "log" && ast.declarations[0].init.arguments[0].name) {
					let tmplt = `{var _instr_x${++i} = !is_symbolic(${ast.declarations[0].init.arguments[0].name});\nAssert(_instr_x${i});\nvar ${ast.declarations[0].id.name} = eval(${ast.declarations[0].init.arguments[0].name})};`;
					return js2ast(tmplt);
				}
				return null;
			default: 
				return null;
		}
	};
	return mapJS(f, ast_prog);
}


module.exports = { remove_unused, generate_template }