const sink = function f(y) {
	return eval(y);
};
const f = function (x) {
    const v1 = sink(x);
    return v1;
};
module.exports = f;