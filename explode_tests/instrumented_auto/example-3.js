var instr_obj_0 = {};
var instr_symb_0 = symb(instr_symb_0);
var instr_symb_1 = symb(instr_symb_1);
instr_obj_0.z = instr_symb_0;
instr_obj_0.w = instr_symb_1;

const f = function (o) {
	const v1 = o.z;
	const v2 = v1 > 0;
	if (v2) {
		o.y = '2';
		const v3 = o.y;
		const v4 = o.w;
		const v5 = v3 + v4;
				{
			const instr_test_0 = !is_symbolic(v5);
			Assert(instr_test_0);
			const v6 = eval(v5);
		}
		;
		return v6;
	}
};
;
f(instr_obj_0);
