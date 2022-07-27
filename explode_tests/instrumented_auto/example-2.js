var y = symb(y);
const f = function (y) {
	let x = {};
	x.f = y;
	let o = x;
	const v1 = o.f;
		{
		var _instr_x1 = !is_symbolic(v1);
		Assert(_instr_x1);
		var v2 = eval(v1);
	}
	;
	return v2;
};
;
f(y);
