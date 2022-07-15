var req = {};
var body = {};
var param = symb(param);

body.param = param;
req.body = body;

function f(req) {
    var x = req.body;
    x.a = 2;
	var ret = !is_symbolic(x.param);
	Assert(ret);
    return eval(x.param);
}

f(req);