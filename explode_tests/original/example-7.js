// testing sanatized parameter to eval call

function sanitize(s) {
    return s;
}

module.exports = function f(x) {
    return eval(sanitize(x));
};