/* testing taint from parameter to eval function call */

var v = function f(x) {
   let y = eval(x); 
	return y;
};

module.exports = v;

v(x);