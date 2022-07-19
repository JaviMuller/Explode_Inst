const generate = require("escodegen").generate;
const yargs = require("yargs");
const fs = require("fs");

const argv = yargs
  .option("input", { alias: "i", description: "ECMA-SL input file", type: "string" })
  .option("output", {
    alias: "o",
    description: "JS output file",
    type: "string",
  })
  .demandOption("input")
	.check((argv, options) => {
		if (argv.input.substr(-5) === ".json" && argv.output.substr(-3) === ".js") {
			return true;
		}
		else {
			throw new Error("Incorrect input or output file extensions (.json and .js respectively");
		}
	})
  .usage("Usage: $0 -i [filepath]")
  .help()
  .alias("help", "h").argv;

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

fs.readFile(argv.input, "utf-8", (err, data) => {
	if (err) throw err;
	try {
		let progTxt = ast2js(JSON.parse(data));
		if(argv.output) {
			fs.writeFile(argv.output, JSON.stringify(progObj, null, 2), err => {
				if(err) {
					console.error(err);
					return;
				}
			})
		} else {
			console.log(progTxt);
		}
	} catch (ex) {
		console.log("error");
	}
})

module.exports = { ast2js }