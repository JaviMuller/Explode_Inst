var instr_symb_0 = symb(instr_symb_0);

const f = function (y) {
	let x = {};
	x.f = y;
	let o = x;
	const v1 = o.f;
	const instr_test_0 = !is_symbolic(v1);
	Assert(instr_test_0);
	const v2 = eval(v1);
	return v2;
};

f(instr_symb_0);
