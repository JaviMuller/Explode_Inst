var path__instr_array_0 = [];
var instr_symb_str_0 = symb_string(instr_symb_str_0);
Assume(not(instr_symb_str_0 = "valueOf"));
Assume(not(instr_symb_str_0 = "toString"));
Assume(not(instr_symb_str_0 = "hasOwnProperty"));
Assume(not(instr_symb_str_0 = "constructor"));
path__instr_array_0.push(instr_symb_str_0);
var value__instr_symb_0 = symb(value__instr_symb_0);

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

f(path__instr_array_0, value__instr_symb_0);
