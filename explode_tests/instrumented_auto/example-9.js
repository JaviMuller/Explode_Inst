var source1__instr_symb_0 = symb(source1__instr_symb_0);
var source2__instr_symb_str_0 = symb_string(source2__instr_symb_str_0);
Assume(not(source2__instr_symb_str_0 = "valueOf"));
Assume(not(source2__instr_symb_str_0 = "toString"));
Assume(not(source2__instr_symb_str_0 = "hasOwnProperty"));
Assume(not(source2__instr_symb_str_0 = "constructor"));

const f = function (source1, source2) {
	const Func = function () {
	};
	const v1 = Func.prototype;
	v1.x = '2';
	const myFunc = new Func();
	if (source1) {
		const v2 = myFunc.x;
		const v3 = v2 + source1;
		myFunc[source2] = v3;
	}
	const v4 = myFunc.x;
	const instr_test_0 = !is_symbolic(v4);
	Assert(instr_test_0);
	const v5 = eval(v4);
	return v5;
};

f(source1__instr_symb_0, source2__instr_symb_str_0);
