var instr_symb_0 = symb(instr_symb_0);
var instr_symb_1 = symb(instr_symb_1);
var instr_symb_2 = symb(instr_symb_2);

const f = function (key, subKey, value) {
	const v1 = { first: 'person' };
	let customer = {};
	customer.name = v1;
	customer.role = 'user';
	const v2 = customer[key];
	v2[subKey] = value;
	const v3 = console.log;
	const v4 = customer.name;
	const v5 = v4.first;
	const instr_test_0 = !is_symbolic('customer.name.first => ' + v5);
	Assert(instr_test_0);
	const v6 = v3('customer.name.first => ' + v5);
	v6;
	return customer;
};

f(instr_symb_0, instr_symb_1, instr_symb_2);
