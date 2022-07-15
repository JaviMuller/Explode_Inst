/**
 * Requires
 */
const esprima = require("esprima-next");
const yargs = require("yargs");
const fs = require("fs");
const generate = require("escodegen").generate
const util = require("util");


/**
 * Global constants
 */
const EMPTY_OBJ = 0;
const SYMB      = 1;
const SYMB_NUM  = 2;
const SYMB_STR  = 3;
const SYMB_BOOL = 4;

/**
 * Command line interface
 */
const argv = yargs
  .option("input", { alias: "i", description: "JS input file", type: "string" })
  .option("output", {
    alias: "o",
    description: "ECMA-SL output file",
    type: "string",
  })
  .demandOption("input")
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


/**
 * This function cleans the export.module
 * @param {AST_object} progObj - Program Object in AST notation
 * @returns {AST_object} - Program Object without module.export
 */
function clean_mod_exp(progObj) {
  /* Deep copy of argument */
  let instObj = JSON.parse(JSON.stringify(progObj));
  const index_export = progObj.body.findIndex(object => {
    return object.expression.left.object.name === "module" &&
      object.expression.left.property.name === "exports";
  })
  instObj.body[index_export] = JSON.parse(JSON.stringify(progObj.body[index_export].expression.right));
  instObj.body[index_export].type = "FunctionDeclaration";
  return instObj;
}

/**
 * Build the symbolic variable declarator given a variable and a symbolic type 
 * (see global constants)
 * @param {string} varname - name of symbolic variable (argument of f)
 * @param {int} type - type of symbolic variable
 */
 function symb_var_decl_obj(varname, type) {
  let varObj = {
    type: "VariableDeclaration",
    declarations: [
      {
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: varname
        },
        init: {}
      }
    ],
    kind: "var"
  };
  switch (type) {
    case EMPTY_OBJ:
      varObj.declarations[0].init = { 
        type: "ObjectExpression",
        properties: []
      };
      break;
    case SYMB:
      varObj.declarations[0].init = {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "symb"
        },
        arguments: [
          {
            type: "Identifier",
            name: varname
          }
        ],
        optional: false
      };
      break;
    case SYMB_NUM:
      varObj.declarations[0].init = {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "symb_number"
        },
        arguments: [
          {
            type: "Identifier",
            name: "z"
          }
        ],
        optional: false
      };
      break;
    case SYMB_STR:
      varObj.declarations[0].init = {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "symb_string"
        },
        arguments: [
          {
            type: "Identifier",
            name: "z"
          }
        ],
        optional: false
      };
      break;
    case SYMB_BOOL:
      varObj.declarations[0].init = {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "symb_bool"
        },
        arguments: [
          {
            type: "Identifier",
            name: "z"
          }
        ],
        optional: false
      };
      break;
    default:
      throw 'Incorrect type (for reference, see global constants)'
  };
  return varObj;
}

/**
 * TODO: Change to implement different types (need to parse specification 
 * file to know symbolic type of each variable)
 * TODO: Missing adding non-declared members of symbolic variables
 * @param {AST_object} progObj 
 */
function var_assignment(progObj) {
  /* Deep copy */
  let instObj = JSON.parse(JSON.stringify(progObj));
  /* Add the arguments of the function f as symbolic variables */
  const index_f = progObj.body.findIndex(object => {
    return object.type === "FunctionDeclaration" &&
           object.id.name === "f";
  })
  instObj.body[index_f].params.forEach(element => {
    instObj.body.splice(index_f, 0, symb_var_decl_obj(element.name, SYMB));
  })
  return instObj;
}

function add_fun_call(progObj) {
	let instObj = JSON.parse(JSON.stringify(progObj));
	const index_f = progObj.body.findIndex(object => {
		return object.type === "FunctionDeclaration" &&
			   object.id.name === "f";
	  });
	let args = JSON.parse(JSON.stringify(progObj.body[index_f].expression.arguments));
	instObj.body.push({
		type: "ExpressionStatement",
		expression: {
		  type: "CallExpression",
		  callee: {
			type: "Identifier",
			name: "f"
		  },
		  arguments: args,
		  optional: false
		}
	  })
	return instObj;
}

/**
 * The input file must have the function to be executed symbolically as f
 */
fs.readFile(argv.input, "utf-8", (err, data) => {
  if (err) throw err;
  try {
    let progObj = esprima.parseScript(data);
    /* Decorator to obtain the desired instrumented object */
    let instObj = add_fun_call(var_assignment(clean_mod_exp(progObj)));
    console.log(util.inspect(progObj, {showHidden: false, depth: null, colors: true}))
    console.log(ast2js(instObj));
  } catch (ex) {
    console.log(ex.toString())
  }
})
