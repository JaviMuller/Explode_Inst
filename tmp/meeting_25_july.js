const { ExportSpecifier, Module } = require("esprima-next");
const { mapJS } = require("./js_mapper");

function removeNestedBlocks(ast) {

  function callback_f (ast) {
    return null
  }

  function callback_fo(ast) {
    switch (ast.type) {
      case "BlockStatement": 
        var stmts = []; 
        for (var i=0; i< ast.body.length; i++) {
          var stmt = ast.body[i]; 
          if (stmt.type === "BlockStatement") {
            stmts = stmts.concat(stmt.body); 
          } else if (stmt.type !== "EmptyStatment") {
            stmts.push(stmt)
          }
        }
        ast.body = stmts; 
        return ast; 
      default: return ast; 
    }
  }

  return mapJS(callback_f, ast, callback_fo); 
}

module.exports = { removeNestedBlocks } 