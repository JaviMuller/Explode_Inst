var key__instr_symb_str_0 = symb_string(key__instr_symb_str_0);
Assume(not(key__instr_symb_str_0 = "valueOf"));
Assume(not(key__instr_symb_str_0 = "toString"));
Assume(not(key__instr_symb_str_0 = "hasOwnProperty"));
Assume(not(key__instr_symb_str_0 = "constructor"));
var subKey__instr_symb_str_1 = symb_string(subKey__instr_symb_str_1);
Assume(not(subKey__instr_symb_str_1 = "valueOf"));
Assume(not(subKey__instr_symb_str_1 = "toString"));
Assume(not(subKey__instr_symb_str_1 = "hasOwnProperty"));
Assume(not(subKey__instr_symb_str_1 = "constructor"));
var value__instr_symb_0 = symb(value__instr_symb_0);

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

f(key__instr_symb_str_0, subKey__instr_symb_str_1, value__instr_symb_0);
