var instr_obj_0 = {};
var instr_symb_0 = symb(instr_symb_0);
instr_obj_0.symb_prop_1 = instr_symb_0;
var instr_symb_1 = symb(instr_symb_1);

const f = function (c, p) {
	let x = c[p];
	const instr_test_0 = !is_symbolic(x);
	Assert(instr_test_0);
	const v1 = eval(x);
	return v1;
};

f(instr_obj_0, instr_symb_1);
