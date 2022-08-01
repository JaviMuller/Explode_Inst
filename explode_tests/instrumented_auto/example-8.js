var instr_symb_0 = symb(instr_symb_0);
var instr_symb_1 = symb(instr_symb_1);

const f = function (p, t) {
	let customer = {};
	customer.name = 'person';
	customer.role = 'user';
	customer[p] = t;
	const v1 = console.log;
	const v2 = customer.role;
	const instr_test_0 = !is_symbolic(`customer.role => ${ v2 }`);
	Assert(instr_test_0);
	const v3 = v1(`customer.role => ${ v2 }`);
	v3;
	const v4 = console.log;
	const v5 = customer.toString;
	const v6 = v5();
	const instr_test_1 = !is_symbolic(`toString implementation => ${ v6 }`);
	Assert(instr_test_1);
	const v7 = v4(`toString implementation => ${ v6 }`);
	v7;
};

f(instr_symb_0,instr_symb_1);
