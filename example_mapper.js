const mapJS = require("./js_mapper").mapJS;



function replaceEvalWithBanana (p) {
    function f (s) {
        console.log("checking statement of type: " + s.type)
        switch(s.type) {
            case "CallExpression": 
                if (s.callee.name === "eval") {
                    console.log("found eval");
                    return {
                        "type": "Literal",
                        "value": "banana",
                        "raw": "\"banana\""
                    }
                } else {
                    return null
                }
            default: return null 
        }
    }

    return mapJS (f, p);
}

module.exports = {replaceEvalWithBanana}