# ExplodeInst - Symbolic test instrumentation for ExplodeJS

This package serves to instrument normalized files outputted from js-cpg parser. It uses also the config file outputted from the same tool.

## Usage

	node ./src/instrumenter.js -i <input_file_path> -c <config_file_path> [-o <output_file_path>]

## Dependencies

	> NodeJS
	> esprima-next
	> fs
	> yargs