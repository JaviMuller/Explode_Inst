/* testing taint from parameter to eval function call */

module.exports = function f(x) {
   let y = eval(x); 
	return y;
};