var instr_symb_0 = symb(instr_symb_0);
var instr_symb_1 = symb(instr_symb_1);

const f = function (p, t) {
	let customer = {};
	customer.name = 'person';
	customer.role = 'user';
	customer[p] = t;
	return customer;
};

f(instr_symb_0, instr_symb_1);
