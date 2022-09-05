var x__instr_symb_0 = symb(x__instr_symb_0);

const f = function (x) {
	const instr_test_0 = !is_symbolic('' + x);
	Assert(instr_test_0);
	const v1 = eval('' + x);
	return v1;
};

f(x__instr_symb_0);
