﻿#target illustrator

/******************************
* @title d3ColorTest
* @author Jonatan Hilden
* @info http://koponen-hilden.fi
* @version 1.0.0


DESCRIPTION

Basic test including d3 color https://github.com/d3/d3-color in an Illustrator script

*******************************/

// We have to include these to monkey-patch D3 to work with Illustrator at all, 
// since it doesn't support EcmaScript 5. Beware that something might be broken.
// https://github.com/es-shims/es5-shim
// Put the includes in a library subfolder in your script folder


#include 'libraries/es5-shim.js';
#include 'libraries/es5-sham.js';

// include d3 color

#include 'libraries/d3-color.v1.min.js';

var scriptID = "D3 Color";

var myD3Color; 


// Make a simple interface box for color value input
var box = new Window('dialog', "Create HCL color");  

box.panel = box.add('panel', undefined, "HCL");  

box.panel.group1 = box.panel.add('group', undefined );  
box.panel.group1.orientation='row';  

box.h = box.panel.group1.add('edittext', undefined, 25);
box.c = box.panel.group1.add('edittext', undefined, 50);
box.l = box.panel.group1.add('edittext', undefined, 70);    

box.panel.group2 = box.panel.add('group', undefined );  
box.panel.group2.orientation='row';  


box.panel.group2.text1 = box.panel.group2.add('statictext', undefined, "Run script");  
box.panel.group2.okBtn = box.panel.group2.add('button',undefined, "OK", {name:'ok'});  
box.panel.group2.closeBtn = box.panel.group2.add('button',undefined, "Cancel", {name:'close'});  


box.panel.group2.okBtn.onClick = function(){  

    // create a d3 color from box input values 
    myD3Color = d3.hcl(box.h.text, box.c.text, box.l.text); 
	box.ok();  
	
  }  

  box.panel.group2.closeBtn.onClick = function(){
	  box.close();
	}  
	
  box.show()



if ( app.documents.length > 0 ) {
   
    // Convert the d3 color to Illustrator rgb format
    var newRGBColor = makeIllustratorColor(myD3Color);
    var newRGBColorDark;

   
    // Draw some silly boxes with the new color, make the stroke darker for each step

    for (var index = 0; index < 5; index++) {
        var itemRef1 = app.activeDocument.pathItems.rectangle(-150*index, Math.random()*100, 150, 150);
        myD3Color = myD3Color.darker(.25);
        newRGBColorDark = makeIllustratorColor(myD3Color);
        itemRef1.fillColor = newRGBColorDark;
        itemRef1.strokeColor = newRGBColor; 
        itemRef1.strokeWidth = 10;
        
    }
    // Set the original version of the d3 color as document default fill color
    app.activeDocument.defaultFillColor = newRGBColor;
    redraw();
    // celebrate color
    alert("d3 color, voilà: \n" + myD3Color);
    }

// Utility to convert color into Illustrator format
function makeIllustratorColor(clr) {
    var newRGBColor = new RGBColor();
    newRGBColor.red = normalize(clr.rgb().r, 0, 255);
    newRGBColor.green = normalize(clr.rgb().g, 0, 255);
    newRGBColor.blue = normalize(clr.rgb().b, 0, 255);
    return newRGBColor;

}

// We have to make sure the color values stay in exactly in range, else errors
function normalize(val, min, max){
    if (val>max) {return max;}
    else if (val<min) {return min;}
    return val; 
}


