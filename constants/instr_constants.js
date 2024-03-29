/**
 * Config constants
 */
const symb_array_length = 3;

/**
 * Instrumentation generated variable names' prefix
 */
const instr_prefix = "instr_";


/**
 * Symbolic var prefixes
 */
const symb_prefix = instr_prefix + "symb_";
const symb_num_prefix = instr_prefix + "symb_num_";
const symb_str_prefix = instr_prefix + "symb_str_";
const symb_bool_prefix = instr_prefix + "symb_bool_";
const concrete_prefix = instr_prefix + "concrete_";
const obj_prefix = instr_prefix + "obj_";
const array_prefix = instr_prefix + "array_"


/**
 * Symbolic test var prefix
 */
const symb_test = instr_prefix + "test_";

module.exports = { symb_array_length, symb_prefix, symb_num_prefix, symb_str_prefix, symb_bool_prefix, concrete_prefix, obj_prefix, array_prefix, symb_test }