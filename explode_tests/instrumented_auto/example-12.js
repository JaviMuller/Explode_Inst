var c__instr_obj_0 = {};
var symb_prop_1__instr_symb_0 = symb(symb_prop_1__instr_symb_0);
c__instr_obj_0.symb_prop_1 = symb_prop_1__instr_symb_0;
var p__instr_symb_str_0 = symb_string(p__instr_symb_str_0);
Assume(not(p__instr_symb_str_0 = "valueOf"));
Assume(not(p__instr_symb_str_0 = "toString"));
Assume(not(p__instr_symb_str_0 = "hasOwnProperty"));
Assume(not(p__instr_symb_str_0 = "constructor"));

const f = function (c, p) {
	let x = c[p];
	const instr_test_0 = !is_symbolic(x);
	Assert(instr_test_0);
	const v1 = eval(x);
	return v1;
};

f(c__instr_obj_0, p__instr_symb_str_0);
