var p__instr_symb_str_0 = symb_string(p__instr_symb_str_0);
Assume(not(p__instr_symb_str_0 = "valueOf"));
Assume(not(p__instr_symb_str_0 = "toString"));
Assume(not(p__instr_symb_str_0 = "hasOwnProperty"));
Assume(not(p__instr_symb_str_0 = "constructor"));
var t__instr_symb_0 = symb(t__instr_symb_0);

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

f(p__instr_symb_str_0, t__instr_symb_0);
