
function generate_symb_assignment (param) {

    var tmplt; 

    switch (param.type) {
        case "number":
                // var param_name = symb_number(param_name); 
               tmplt = `var ${param.name} = symb_number(${param.name})`; 
               return ast2js(tmplt);   

        case "string":
                // var param_name = symb_string(param_name); 
               tmplt = `var ${param.name} = symb_string(${param.name})`; 
               return ast2js(tmplt);   

        default: throw new Error ("Unsupported: generate_symb_assignment")

    }





}


function generate_test(types, prog) {


    /** Step 1 - Generate symbolic assignments for parameters */
    var params = types.params; 
    var symb_assignments = params.map(generate_symb_assignment); 

    /** Step 2 - Instrument the function to execute symbocally  */



}