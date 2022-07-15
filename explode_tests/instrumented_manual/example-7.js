var x = symb(x);

function sanitize(s) {
    return 3;
};

function f(x) {
	var x1 = sanitize(x);
	var ret = !is_symbolic(x1);
	Assert(ret);
    return eval(sanitize(x));
};

f(x);