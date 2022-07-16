const esprima = require("esprima-next");
const generate = require("escodegen").generate;

function ast2js(obj) {
	try {
		const option = {
			format: {
				quotes: 'single',
				indent: {
					style: '\t'
				}
			}
		};
		return generate(obj, option);
	} catch (err) {
		if ((typeof obj) === "object") {
			console.log("converting the following ast to str:\n" + e);
		} else {
			console.log("e is not an object!!!")
		}
		throw "ast2str failed.";
	}
}

function js2ast(str) {
	return esprima.parseScript(str);
}



module.exports = { ast2js, js2ast }