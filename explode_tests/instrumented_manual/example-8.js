var p = symb(p);
var t = symb(t);

function f(p, t) {
    var customer = { name: "person", role: "user" }
    customer[p] = t;
	var ret0 = "customer.role => " + customer.role;
	var ret1 = !is_symbolic(ret0);
	Assert(ret1);
    console.log(ret0);
	var ret2 = "toString implementation => " + customer.toString();
	var ret3 = !is_symbolic(x);
	Assert(ret3);
    console.log(ret2);
};

f(p, t);