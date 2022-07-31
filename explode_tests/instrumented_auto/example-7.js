var instr_symb_0 = symb(instr_symb_0);

const sanatize = function (s) {
	return s;
};
const f = function (x) {
	const v1 = sanatize(x);
		{
		const instr_test_0 = !is_symbolic(v1);
		Assert(instr_test_0);
		const v2 = eval(v1);
	}
	;
	return v2;
};
;
f(instr_symb_0);
