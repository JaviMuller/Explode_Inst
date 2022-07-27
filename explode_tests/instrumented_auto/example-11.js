var p = symb(p);
const f = function (p) {
	const a = {};
	a.b = p;
	const c = a.b;
		{
		var _instr_x1 = !is_symbolic(c);
		Assert(_instr_x1);
		var v1 = eval(c);
	}
	;
	return v1;
};
;
f(p);
