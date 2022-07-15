JS2JSILPREFLAGS = -file
JS2JSILPOSTFLAGS = -cosette
TARGETS = $(patsubst %.js, %.jsil, $(wildcard *.js))
# Added while example 8 is not working
TARGETS := $(filter-out example-8.jsil, $(TARGETS))

all: $(TARGETS)


%.jsil: %.js
	../../js2jsil.native $(JS2JSILPREFLAGS) $< $(JS2JSILPOSTFLAGS)
	rm *.log

clean:
	rm *.jsil