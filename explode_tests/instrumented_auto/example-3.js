var o__instr_obj_0 = {};
var z__instr_symb_0 = symb(z__instr_symb_0);
var w__instr_symb_1 = symb(w__instr_symb_1);
o__instr_obj_0.z = z__instr_symb_0;
o__instr_obj_0.w = w__instr_symb_1;

const f = function (o) {
	const v1 = o.z;
	const v2 = v1 > 0;
	if (v2) {
		o.y = '2';
		const v3 = o.y;
		const v4 = o.w;
		const v5 = v3 + v4;
		const instr_test_0 = !is_symbolic(v5);
		Assert(instr_test_0);
		const v6 = eval(v5);
		return v6;
	}
};

f(o__instr_obj_0);
