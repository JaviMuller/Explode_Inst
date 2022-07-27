var y = symb(y);

const f = function (y) {
	let x = {};
	x.f = y;
	const v1 = x.f;
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
