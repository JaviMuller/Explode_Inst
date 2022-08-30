var instr_obj_0 = {};
var instr_symb_num_0 = symb_number(instr_symb_num_0);
var instr_symb_0 = symb(instr_symb_0);
instr_obj_0.length = instr_symb_num_0;
instr_obj_0.i = instr_symb_0;
var instr_symb_1 = symb(instr_symb_1);

const f = function (path, value) {
	obj = {};
	var i = 0;
	const v1 = path.length;
	let v2 = i < v1;
	while (v2) {
		const key = path[i];
		const v4 = path.length;
		const v5 = v4 - 1;
		const v6 = i === v5;
		if (v6) {
			obj[key] = value;
		}
		obj = obj[key];
		const v3 = i++;
		v2 = i < v1;
	}
};

f(instr_obj_0, instr_symb_1);
