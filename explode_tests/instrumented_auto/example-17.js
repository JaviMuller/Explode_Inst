var instr_symb_0 = symb(instr_symb_0);
var instr_symb_1 = symb(instr_symb_1);

const f = function (p, t) {
	let customer = {};
	customer.name = 'person';
	customer.role = 'user';
	let x = p;
	let a = [
		0,
		0
	];
	a[0] = x;
	const v1 = a[0];
	customer[v1] = t;
	const v2 = console.log;
	const v3 = customer.role;
	const instr_test_0 = !is_symbolic('customer.role => ' + v3);
	Assert(instr_test_0);
	const v4 = v2('customer.role => ' + v3);
	v4;
	const v5 = console.log;
	const v6 = customer.toString;
	const v7 = v6();
	const instr_test_1 = !is_symbolic('toString implementation => ' + v7);
	Assert(instr_test_1);
	const v8 = v5('toString implementation => ' + v7);
	v8;
};

f(instr_symb_0, instr_symb_1);
