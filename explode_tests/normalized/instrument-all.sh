#! /bin/bash

number=`find . -name 'example-*' | wc -l`

for i in $(seq 0 $(($number - 1)))
do
	echo $i
	node ../../src/instrumenter.js -i example-${i}.js -c config_example-${i}.json -o ../instrumented_auto/example-${i}.js
done