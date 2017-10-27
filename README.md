# Adobescripts
## Work-in-progress scripts for Adobe software, primarily Illustrator  CC
This is a collection of small scripts that accomplish different, possibly useful utility tasks.

To get Illustrator scripts to appear in the File > Scripts menu, put them in the folder ´/Applications/Adobe Illustrator CC 2017/Presets.localized/en_US/Scripts´or corresponding location  (requires restart).

All  interface stuff is made using this handy document as reference: 
http://www.kahrel.plus.com/indesign/scriptui.html

---- 

## Current scripts 

### ScaleStroke
Scales strokes by a given percentage. Default value for correcting strokes in SVG graphics exported from QGIS. 
Currently works only with ungrouped objects (strokes inside groups are ignored).
### ReplaceSymbol
Replace objects with a symbol by selecting them and the desired symbol.
Treats groups as singe objects. Slow if the file has many objects.
### d3colortest
Simple test  script for importing  d3 color functionality in Illustrator. 
Demo is an input for HCL color values which creates some colorful boxes.
https://github.com/d3/d3-color 
Requires  https://github.com/es-shims/es5-shim  to run; add d3-color and es5-shim & es5-sham to a /libraries folder in your scripts folder.
