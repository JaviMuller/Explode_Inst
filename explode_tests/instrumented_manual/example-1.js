var y = symb(y);

function f(y) {
    var x = {};
    x.f = y;
    var r = !is_symbolic(x.f); 
    Assert(r);
    return eval(x.f);
};

f(y);