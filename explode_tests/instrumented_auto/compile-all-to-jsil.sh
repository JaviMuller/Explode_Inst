#! /bin/bash

number=`find . -name 'example-*' | wc -l`

for i in $(seq 0 $(($number - 1)))
do
	echo $i
	../../js2jsil.native -file example-${i}.js -cosette
done