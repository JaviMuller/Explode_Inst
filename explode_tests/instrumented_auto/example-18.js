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
	let x = customer;
	let y = p;
	x[y] = t;
	const v1 = console.log;
	const v2 = customer.role;
	const instr_test_0 = !is_symbolic('customer.role => ' + v2);
	Assert(instr_test_0);
	const v3 = v1('customer.role => ' + v2);
	v3;
	const v4 = console.log;
	const v5 = customer.toString;
	const v6 = v5();
	const instr_test_1 = !is_symbolic('toString implementation => ' + v6);
	Assert(instr_test_1);
	const v7 = v4('toString implementation => ' + v6);
	v7;
};

f(p__instr_symb_str_0, t__instr_symb_0);
