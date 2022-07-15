var y = symb(y);

function f(y) {
    var x = {};
    x.f = y;
    var o = x;
    var ret = !is_symbolic(o.f);
	Assert(ret);
    return eval(o.f);
};

f(y);