# WireWorld

This is a javascript implementation of Wireworld. Wireworld is a cellular automaton. Despite its simplicity it is turing complete (it can perform any calculation)


## Rules

A Wireworld cell can be in one of four different states, usually numbered 0 to 3 in software.

* Empty (Black)
* Electron head (Blue)
* Electron tail (Red)
* Conductor (Yellow)

As in all cellular automata, time proceeds in discrete steps called generations (sometimes "gens" or "ticks"). Cells behave as follows:

* Empty → Empty
* Electron head → Electron tail
* Electron tail → Conductor
* Conductor → Electron head if exactly one or two of the neighbouring cells are electron heads, or remains Conductor otherwise.

Wireworld uses what is called the Moore neighborhood, which means that in the rules above, neighbouring means one cell away (range value of one) in any direction, both orthogonal and diagonal.

[Learn more on wikipedia](https://en.wikipedia.org/wiki/Wireworld)

## Technology

This page is a static webpage build using

* Yeoman
* Gulp
* Sass

It uses 

* Boostrap 
* Vue.js