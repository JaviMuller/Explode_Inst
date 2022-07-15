var source1 = symb(source1);
var source2 = symb(source2);

function f(source1, source2) {
    function Func() {};
    Func.prototype.x = "2";
    const myFunc = new Func;
    if (source1)
        myFunc[source2] = myFunc.x + source1; // internal property tampering
	var ret = !is_symbolic(myFunc.x);
	Assert(ret);
    return eval(myFunc.x); // taint - style vulnerability like command injection
};

f(source1, source2);