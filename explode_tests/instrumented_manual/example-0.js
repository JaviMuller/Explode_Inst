var x = symb(x);

function f(x) {
	var ret = !is_symbolic(x);
	Assert(ret);
    return eval(x);
};

f(x);