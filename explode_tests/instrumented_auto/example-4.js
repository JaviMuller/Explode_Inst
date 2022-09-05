var req__instr_obj_0 = {};
var body__instr_obj_1 = {};
var param__instr_symb_0 = symb(param__instr_symb_0);
body__instr_obj_1.param = param__instr_symb_0;
req__instr_obj_0.body = body__instr_obj_1;

const f = function (req) {
	const x = req.body;
	x.a = 2;
	const v1 = x.param;
	const instr_test_0 = !is_symbolic(v1);
	Assert(instr_test_0);
	const v2 = eval(v1);
	return v2;
};

f(req__instr_obj_0);
