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
	customer[p] = t;
	return customer;
};

f(p__instr_symb_str_0, t__instr_symb_0);
