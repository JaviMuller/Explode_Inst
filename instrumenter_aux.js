/**
 * Requires
 */
const yargs = require("yargs");
const fs = require("fs");
const esprima = require("esprima-next");
const generate = require("escodegen").generate
const utils = require("./utils");
const replaceEvalWithBanana = require("./example_mapper").replaceEvalWithBanana; 

/**
 * Command line interface
 */
const argv = yargs
  .option("input", { alias: "i", description: "JS input file", type: "string" })
  .option("types", { alias: "t", description: "JS input file", type: "string" })
  .option("output", {
    alias: "o",
    description: "ECMA-SL output file",
    type: "string",
  })
  .demandOption("input")
  .demandOption("types")
  .usage("Usage: $0 -i [filepath]")
  .help()
  .alias("help", "h").argv;


/* Step 1 - parse the program and the types */

try { 
  var data = fs.readFileSync(argv.input, "utf-8"); 
  var ast = esprima.parseScript(data);
  data = fs.readFileSync(argv.types, "utf-8")
  var types = JSON.parse(data);
} catch (ex) {
  console.log(ex.toString())
}

console.log(ast)
console.log(types)

var new_ast = replaceEvalWithBanana(ast); 
console.log(utils.ast2js(new_ast))









