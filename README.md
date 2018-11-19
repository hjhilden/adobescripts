# Adobescripts
## Work-in-progress scripts for Adobe software, primarily Illustrator  CC
This is a collection of small scripts that accomplish different, possibly useful utility tasks.

To get Illustrator scripts to appear in the *File > Scripts menu*, put them in the folder `/Applications/Adobe Illustrator CC 2017/Presets.localized/en_US/Script`or corresponding location  (requires restart).

Alternatively, run the scripts from ExtendScript Toolkit.

All  interface stuff is made using this handy document as reference: 
http://www.kahrel.plus.com/indesign/scriptui.html

---- 

## Current scripts 

### ScaleStroke
Scales strokes by a given percentage. Default value for correcting strokes in SVG graphics exported from QGIS. 
Currently works only with ungrouped objects (any strokes inside groups are ignored).

### ReplaceWithSymbol v2
Script for replacing graphic objects with symbols. Select a number of objects and a **symbol instance** before running the script. Gives a choice of using the size of the symbol (default) or scaling the symbols to match the size of replaced objects.  
Groups are treated as single objects. Places the new symbols on the currently active layer. Note that it is slow when dealing with hundreds of symbols – expect minutes of working time. 

### d3colortest
Simple test  script for importing  **D3 color** functionality in Illustrator. 
Demo is an input box for HCL color values which creates some colorful boxes.
 
D3 Color & documentation:  https://github.com/d3/d3-color 

Probably has some limitations as Illustrator doesn't support EcmaScript 5. Requires  https://github.com/es-shims/es5-shim  to run; add d3-color and es5-shim & es5-sham to a `/libraries` folder in your scripts folder.
