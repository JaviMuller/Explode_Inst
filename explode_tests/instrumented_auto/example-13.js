var instr_symb_0 = symb(instr_symb_0);
var instr_symb_1 = symb(instr_symb_1);

const f = function (e, x) {
	const v2 = e === 1;
	if (v2) {
		const instr_test_0 = !is_symbolic(x);
		Assert(instr_test_0);
		const v1 = eval(x);
		return v1;
	} else {
	}
};

f(instr_symb_0, instr_symb_1);
