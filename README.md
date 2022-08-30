# ExplodeInst - Symbolic test instrumentation for ExplodeJS

This package serves to instrument normalized files outputted from js-cpg. It also uses the config file outputted from the same tool.

## Usage

	node ./src/instrumenter.js -i <input_file_path> -c <config_file_path> [-o <output_file_path>]

## Config constants

The file ./constants/instr_constants.js contains some constants which can be altered to change the behaviour of the program such as the length of a symbolic generated array or the generated variable names' prefixes.

## Dependencies

	> NodeJS
	> esprima-next
	> fs
	> yargs

## Format of Input Files

The source files must come in a format in which each logic block is assigned to a unique variable, (e.g. return eval(x+y) => var a1 = x+y; var a2 = eval(a1); return a2).
The config files specify which variables are symbolic (i.e. user controlled), the source function and its arguments and the sink types (e.g. eval, console.log, jquery.execute, ...). The config file might also include the executed lines for optimization (blocking unused computation paths).
