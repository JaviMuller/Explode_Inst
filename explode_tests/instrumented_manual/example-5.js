// const read = require("./aux-files/external-read");
function read() {
    var x = symb(x);
    return x;
};


function f() {
    var s = read();
	var ret = !is_symbolic(s);
	Assert(ret);
    return eval(s);
};

f();