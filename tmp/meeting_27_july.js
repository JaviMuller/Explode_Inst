/*
{
	"function": "f",
	"params": ["o", "k"],
	"vars": [
		{
			"name": "o",
			"type": "object"
			"properties": [
				{
					"name": "x",
					"type": "number"
				}
			]
		},
		{
			"name": "k",
			"type": "object"
			"properties": [
				{
					"name": "x",
					"type": "string"
				}
			]
		}
	]
}

---> 

var obj_1 = {}; 
var num_1 = symb_number(num_1); 
obj_1.x = num_1; 

var obj_2 = {}; 
var str_1 = symb_string(str1); 
obj_2.x = str_1; 

f(obj_1, obj_2)
*/

function generate_symb_params(types_data) {
    var generated_instructions = ""; 
    var var_names = []

    for (var i=0; i<types_data.params.length; i++) {
        var param = types_data.params[i]; 
        var param_data = types_data.vars[i]; 

        var ret = generate_symb_param(param, param_data); 

        generated_instructions += ret.tmplt;
        var_names.push(ret.var); 

    } 

    return generated_instructions; 
} 


function generate_symb_param(param_data) { 
    switch (param_data.type) {
        case "number": 
            var new_var = fresh_number_var(); 
            tmplt = `var ${new_var} = symb_number(${new_var});\n`
            return {
                tmplt: tmplt, 
                var: new_var 
            }

        case "string": 
            var new_var = fresh_string_var(); 
            tmplt = `var ${new_var} = symb_string(${new_var});\n`
            return {
                tmplt: tmplt, 
                var: new_var 
            }
        
        case "object": 
            var obj_var = fresh_object_var (); 
            var generated_properties = `var ${obj_var} = {};\n`; 

            for (var i=0; i<param_data.properties.length; i++) {
                var ret = generate_symb_param(param_data.properties[i]);
                var cur_tmplt = `${obj_var}.${param_data.properties[i].name} = ${ret.var};\n`; 
                generated_properties += ret.tmplt; 
                generated_properties += cur_tmplt; 
            }
            
            return {
                tmplt: generated_properties, 
                var: obj_var
            }; 
    }


}



/*

var fresh_string_var = (function(){
    var count = 0; 
    var prefix = "instrumented_string_"; 

    return function () {
        return prefix + count++
    }
})(); 



function make_fresh_string_var_generator (){
    var count = 0; 
    var prefix = "instrumented_string_"; 

    return function () {
        return prefix + count++
    }
};

var fresh_string_var_1 = make_fresh_string_var_generator(); 

var fresh_string_var_2 = make_fresh_string_var_generator(); 

fresh_string_var_1() // instrumented_string_0

fresh_string_var_1() // instrumented_string_1

fresh_string_var_2() // instrumented_string_0


*/
