var p__instr_symb_0 = symb(p__instr_symb_0);

const f = function (p) {
	const a = [
		0,
		0
	];
	const c = a;
	a[0] = p;
	const v1 = c[0];
	const instr_test_0 = !is_symbolic(v1);
	Assert(instr_test_0);
	const v2 = eval(v1);
	return v2;
};

f(p__instr_symb_0);
