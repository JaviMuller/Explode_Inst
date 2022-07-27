var req = symb(req);
const f = function (req) {
	const x = req.body;
	x.a = 2;
	const v1 = x.param;
		{
		var _instr_x1 = !is_symbolic(v1);
		Assert(_instr_x1);
		var v2 = eval(v1);
	}
	;
	return v2;
};
;
f(req);
