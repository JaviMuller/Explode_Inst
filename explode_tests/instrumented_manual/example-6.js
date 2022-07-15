function read() {
    var x = 2;
    return x;
};

function f() {
    const s = read();
	var ret = !is_symbolic(s);
	Assert(ret);
    return eval(s);
};

f();