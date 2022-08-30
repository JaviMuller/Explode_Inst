var instr_symb_0 = symb(instr_symb_0);
var instr_symb_1 = symb(instr_symb_1);

const f = function (p, t) {
	let customer = {};
	customer.name = 'person';
	customer.role = 'user';
	let obj = {};
	obj.p1 = 'p1';
	obj.p2 = 'p2';
	customer[p] = t;
	let x = customer;
	x[t] = p;
	const v1 = x.role;
	v1;
	const v2 = x.p2;
	v2;
	obj[p] = t;
	const v3 = obj.p1;
	v3;
	obj[t] = p;
	return customer;
};

f(instr_symb_0, instr_symb_1);
