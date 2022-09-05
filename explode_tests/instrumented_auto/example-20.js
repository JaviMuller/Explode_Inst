var p__instr_symb_str_0 = symb_string(p__instr_symb_str_0);
Assume(not(p__instr_symb_str_0 = "valueOf"));
Assume(not(p__instr_symb_str_0 = "toString"));
Assume(not(p__instr_symb_str_0 = "hasOwnProperty"));
Assume(not(p__instr_symb_str_0 = "constructor"));
var t__instr_symb_str_1 = symb_string(t__instr_symb_str_1);
Assume(not(t__instr_symb_str_1 = "valueOf"));
Assume(not(t__instr_symb_str_1 = "toString"));
Assume(not(t__instr_symb_str_1 = "hasOwnProperty"));
Assume(not(t__instr_symb_str_1 = "constructor"));

const f = function (p, t) {
	let customer = {};
	customer.name = 'person';
	customer.role = 'user';
	let obj = {};
	obj.p1 = 'p1';
	obj.p2 = 'p2';
	customer[p] = t;
	let x = customer;
	x[t] = p;
	const v1 = x.role;
	v1;
	const v2 = x.p2;
	v2;
	obj[p] = t;
	const v3 = obj.p1;
	v3;
	obj[t] = p;
	return customer;
};

f(p__instr_symb_str_0, t__instr_symb_str_1);
