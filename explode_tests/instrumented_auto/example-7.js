var x = symb(x);
const sanatize = function (s) {
	return s;
};
const f = function (x) {
	const v1 = sanatize(x);
		{
		var _instr_x1 = !is_symbolic(v1);
		Assert(_instr_x1);
		var v2 = eval(v1);
	}
	;
	return v2;
};
;
f(x);
