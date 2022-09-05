var p__instr_symb_0 = symb(p__instr_symb_0);

const f = function (p) {
	const a = {};
	a.b = p;
	const c = a.b;
	const instr_test_0 = !is_symbolic(c);
	Assert(instr_test_0);
	const v1 = eval(c);
	return v1;
};

f(p__instr_symb_0);
