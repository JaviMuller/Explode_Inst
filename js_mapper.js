function mapJS(f, p) {
	if (!p) return p;

	var ret = f(p);
	if (ret !== null) {
		return ret;
	}

	switch (p.type) {
		case 'Program':
			var body = p.body.map((s) => mapJS(f, s));
			return {
				type: p.type,
				body: body,
				sourceType: p.sourceType
			}

		case 'ExpressionStatement':
			var new_expression = mapJS(f, p.expression);
			return {
				type: p.type,
				expression: new_expression
			}

		case 'Literal':
			return {
				type: p.type,
				value: p.value,
				raw: p.raw
			}

		case 'Identifier':
			return {
				type: p.type,
				name: p.name
			}

		case 'AssignmentExpression':
		case 'BinaryExpression':
		case 'LogicalExpression':
			var left = mapJS(f, p.left);
			var right = mapJS(f, p.right);
			return {
				left: left,
				right: right,
				operator: p.operator,
				type: p.type
			}

		case 'MemberExpression':
			var object = mapJS(f, p.object);
			var property = mapJS(f, p.property);
			return {
				object: object,
				property: property,
				computed: p.computed,
				type: p.type
			}

		case 'CallExpression':
		case 'NewExpression':
			var callee = mapJS(f, p.callee);
			var args = p.arguments.map((s) => mapJS(f, s));
			return {
				callee: callee,
				arguments: args,
				type: p.type,
			}

		case 'ObjectExpression':
			var properties = p.properties.map((s) => mapJS(f, s));
			return {
				type: p.type,
				properties: properties
			}

		case 'DebuggerStatement':
		case 'ThisExpression': return { type: p.type }

		case 'UnaryExpression':
			var argument = mapJS(f, p.argument);
			return {
				type: p.type,
				argument: argument,
				prefix: p.prefix,
				operator: p.operator
			}

		case 'BlockStatement':
			var body = p.body.map((s) => mapJS(f, s));
			return {
				type: p.type,
				body: body
			}

		case 'DoWhileStatement':
		case 'WhileStatement':
			var test = mapJS(f, p.test);
			var body = mapJS(f, p.body);
			return {
				type: p.type,
				test: test,
				body: body
			}

		case 'ConditionalExpression':
		case 'IfStatement':
			var test = mapJS(f, p.test);
			var consequent = mapJS(f, p.consequent);
			var alternate = mapJS(f, p.alternate);
			return {
				type: p.type,
				test: test,
				consequent: consequent,
				alternate: alternate
			}

		case 'ThrowStatement':
		case 'ReturnStatement':
			var argument = mapJS(f, p.argument);
			return {
				type: p.type,
				argument: argument
			}

		case 'FunctionDeclaration':
		case 'FunctionExpression':
			var params = p.params.map((s) => mapJS(f, s));
			var body = mapJS(f, p.body);
			return {
				type: p.type,
				id: p.id,
				params: params,
				body: body,
				generator: p.generator,
				expression: p.expression,
				async: p.async

			}

		case 'VariableDeclaration':
			var declarations = p.declarations.map((s) => mapJS(f, s));
			return {
				type: p.type,
				declarations: declarations,
				kind: p.kind
			}

		case 'ArrayExpression':
			var elements = p.elements.map((s) => mapJS(f, s));
			return {
				type: p.type,
				elements: elements
			}

		case 'ContinueStatement':
		case 'BreakStatement':
			return {
				type: p.type,
				label: p.label
			}

		case 'CatchClause':
			var param = mapJS(f, p.param);
			var body = mapJS(f, p.body);
			return {
				type: p.type,
				param: param,
				body: body
			}

		case 'ForStatement':
			var init = mapJS(f, p.init);
			var test = mapJS(f, p.test);
			var update = mapJS(f, p.update);
			var body = mapJS(f, p.body);
			return {
				type: p.type,
				init: init,
				test: test,
				update: update,
				body: body
			}

		case 'ForInStatement':
			var left = mapJS(f, p.left);
			var right = mapJS(f, p.right);
			var body = mapJS(f, p.body);
			return {
				type: p.type,
				left: left,
				right: right,
				body: body,
				each: p.each
			}

		case 'LabeledStatement':
			var body = mapJS(f, p.body);
			return {
				type: p.type,
				label: p.label,
				body: body
			}

		case 'Property':
			var key = mapJS(f, p.key);
			var value = mapJS(f, p.value);
			return {
				type: p.type,
				key: key,
				computed: p.computed,
				value: value,
				kind: p.kind,
				method: p.method,
				shorthand: p.shorthand
			}

		case 'SequenceExpression':
			var expressions = p.expressions.map((s) => mapJS(f, s));
			return {
				type: p.type,
				expressions: expressions
			}

		case 'SwitchStatement':
			var discriminant = mapJS(f, p.discriminant);
			var cases = p.cases.map((s) => mapJS(f, s));
			return {
				type: p.type,
				discriminant: discriminant,
				cases: cases
			}

		case 'SwitchCase':
			var test = mapJS(f, p.test);
			var consequent = mapJS(f, p.consequent);
			return {
				type: p.type,
				test: test,
				consequent: consequent
			}

		case 'TryStatement':
			var block = mapJS(f, p.block);
			var handler = mapJS(f, p.handler);
			var finalizer = mapJS(f, p.finalizer);
			return {
				type: p.type,
				block: block,
				handler: handler,
				finalizer: finalizer
			}

		case 'VariableDeclarator':
			var id = mapJS(f, p.id);
			var init = mapJS(f, p.init);
			return {
				type: p.type,
				id: id,
				init: init
			}

		case 'WithStatement':
			var object = mapJS(f, p.object);
			var body = mapJS(f, p.body);
			return {
				type: p.type,
				object: object,
				body: body
			}

		default: return p
	}
}

/**
 * 
 * @param {function} f - (p) => mapping function (applied to each AST element)
 * @param {function} _f - (ac) || (ac, a) => reducing function (applied to each
 * element with subelements to merge accumulators)
 * @param {Object} a - Initial value of accumulator (Applied to each element
 * with subelements!!!)
 * @param {Object} p - AST program to map_reduce
 * @returns 
 */
function map_reduceJS(f, _f, p, a) {
	if (!p) return a;

	switch (p.type) {
		case 'Program':
			/** Return the accumulator of each of the elements in body */
			var body = p.body.map((s) => map_reduceJS(f, _f, s, a));
			return ([f(p)].concat(body)).reduce(_f, a);

		case 'ExpressionStatement':
			var new_expression = map_reduceJS(f, _f, p.expression, a);
			return ([f(p)].concat(new_expression)).reduce(_f, a);

		case 'Literal':
			return [f(p)].reduce(_f, a);

		case 'Identifier':
			return [f(p)].reduce(_f, a);

		case 'AssignmentExpression':
		case 'BinaryExpression':
		case 'LogicalExpression':
			var left = map_reduceJS(f, _f, p.left, a);
			var right = map_reduceJS(f, _f, p.right, a);
			return ([f(p)].concat(left, right)).reduce(_f, a);

		case 'MemberExpression':
			var object = map_reduceJS(f, _f, p.object, a);
			var property = map_reduceJS(f, _f, p.property, a);
			return ([f(p)].concat(object, property)).reduce(_f, a);

		case 'CallExpression':
		case 'NewExpression':
			var callee = map_reduceJS(f, _f, p.callee, a);
			var args = p.arguments.map((s) => map_reduceJS(f, _f, s, a));
			return ([f(p)].concat(callee, args)).reduce(_f, a);

		case 'ObjectExpression':
			var properties = p.properties.map((s) => map_reduceJS(f, _f, s, a));
			return ([f(p)].concat(properties)).reduce(_f, a);

		case 'DebuggerStatement':
		case 'ThisExpression': return f(p);

		case 'UnaryExpression':
			var argument = map_reduceJS(f, _f, p.argument, a);
			return ([f(p)].concat(argument)).reduce(_f, a);

		case 'BlockStatement':
			var body = p.body.map((s) => map_reduceJS(f, _f, s, a));
			return ([f(p)].concat(body)).reduce(_f, a);

		case 'DoWhileStatement':
		case 'WhileStatement':
			var test = map_reduceJS(f, _f, p.test, a);
			var body = map_reduceJS(f, _f, p.body, a);
			return ([f(p)].concat(body)).reduce(_f, a);

		case 'ConditionalExpression':
		case 'IfStatement':
			var test = map_reduceJS(f, _f, p.test, a);
			var consequent = map_reduceJS(f, _f, p.consequent, a);
			var alternate = map_reduceJS(f, _f, p.alternate, a);
			return ([f(p)].concat(test, consequent, alternate)).reduce(_f, a);

		case 'ThrowStatement':
		case 'ReturnStatement':
			var argument = map_reduceJS(f, _f, p.argument, a);
			return ([f(p)].concat(argument)).reduce(_f, a);

		case 'FunctionDeclaration':
		case 'FunctionExpression':
			var params = p.params.map((s) => map_reduceJS(f, _f, s, a));
			var body = map_reduceJS(f, _f, p.body, a);
			return ([f(p)].concat(params, body)).reduce(_f, a);

		case 'VariableDeclaration':
			var declarations = p.declarations.map((s) => map_reduceJS(f, _f, s, a));
			return ([f(p)].concat(declarations)).reduce(_f, a);

		case 'ArrayExpression':
			var elements = p.elements.map((s) => map_reduceJS(f, _f, s, a));
			return ([f(p)].concat(elements)).reduce(_f, a)

		case 'ContinueStatement':
		case 'BreakStatement':
			return [f(p)].reduce(_f, a);

		case 'CatchClause':
			var param = map_reduceJS(f, _f, p.param, a);
			var body = map_reduceJS(f, _f, p.body, a);
			return ([f(p)].concat(param, body)).reduce(_f, a);

		case 'ForStatement':
			var init = map_reduceJS(f, _f, p.init, a);
			var test = map_reduceJS(f, _f, p.test, a);
			var update = map_reduceJS(f, _f, p.update, a);
			var body = map_reduceJS(f, _f, p.body, a);
			return ([f(p)].concat(init, test, update, body)).reduce(_f, a);

		case 'ForInStatement':
			var left = map_reduceJS(f, _f, p.left, a);
			var right = map_reduceJS(f, _f, p.right, a);
			var body = map_reduceJS(f, _f, p.body, a);
			return ([f(p)].concat(left, right, body)).reduce(_f, a);

		case 'LabeledStatement':
			var body = map_reduceJS(f, _f, p.body, a);
			return ([f(p)].concat(body)).reduce(_f, a);

		case 'Property':
			var key = map_reduceJS(f, _f, p.key, a);
			var value = map_reduceJS(f, _f, p.value, a);
			return ([f(p)].concat(key, value)).reduce(_f, a);

		case 'SequenceExpression':
			var expressions = p.expressions.map((s) => map_reduceJS(f, _f, s, a));
			return ([f(p)].concat(expressions)).reduce(_f, a);

		case 'SwitchStatement':
			var discriminant = map_reduceJS(f, _f, p.discriminant);
			var cases = p.cases.map((s) => map_reduceJS(f, _f, s, a));
			return ([f(p)].concat(discriminant, cases)).reduce(_f, a);

		case 'SwitchCase':
			var test = map_reduceJS(f, _f, p.test, a);
			var consequent = map_reduceJS(f, _f, p.consequent, a);
			return ([f(p)].concat(test, consequent)).reduce(_f, a);

		case 'TryStatement':
			var block = map_reduceJS(f, _f, p.block, a);
			var handler = map_reduceJS(f, _f, p.handler, a);
			var finalizer = map_reduceJS(f, _f, p.finalizer, a);
			return ([f(p)].concat(block, handler, finalizer)).reduce(_f, a);

		case 'VariableDeclarator':
			var id = map_reduceJS(f, _f, p.id, a);
			var init = map_reduceJS(f, _f, p.init, a);
			return ([f(p)].concat(id, init)).reduce(_f, a);

		case 'WithStatement':
			var object = map_reduceJS(f, _f, p.object, a);
			var body = map_reduceJS(f, _f, p.body, a);
			return ([f(p)].concat(object, body)).reduce(_f, a);

		default: return [f(p)].reduce(_f, a);
	}
}

module.exports = { mapJS, map_reduceJS }