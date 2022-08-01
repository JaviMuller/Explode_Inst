var instr_obj_0 = {};
var instr_obj_1 = {};
var instr_symb_0 = symb(instr_symb_0);
instr_obj_1.param = instr_symb_0;
instr_obj_0.body = instr_obj_1;

const f = function (req) {
	const x = req.body;
	x.a = 2;
	const v1 = x.param;
	const instr_test_0 = !is_symbolic(v1);
	Assert(instr_test_0);
	const v2 = eval(v1);
	return v2;
};

f(instr_obj_0);
