var o = symb(o);
const f = function (o) {
	const v1 = o.z;
	const v2 = v1 > 0;
	if (v2) {
		o.y = '2';
		const v3 = o.y;
		const v4 = o.w;
		const v5 = v3 + v4;
				{
			var _instr_x1 = !is_symbolic(v5);
			Assert(_instr_x1);
			var v6 = eval(v5);
		}
		;
		return v6;
	}
};
;
f(o);
