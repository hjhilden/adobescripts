﻿#target illustrator

/******************************
* @title ScaleStrokes
* @author Jonatan Hilden
* @info http://koponen-hilden.fi
* @version 1.0.0


DESCRIPTION
Scale Strokes of selected objects by given percentage.
Default value is correct scaling for strokes when importing QGIS svg to Illustrator


*******************************/


var scriptID = "Scale Strokes ";
var SCALEDEFAULT = 0.084666836
var SCALE;

var box = new Window('dialog', "Scale selected strokes");  

box.panel = box.add('panel', undefined, "Scale %");  
box.panel_text1 = box.panel.add('edittext', undefined, SCALEDEFAULT*100);  

box.panel.group = box.panel.add('group', undefined );  
box.panel.group.orientation='row';  


box.panel.group.text1 = box.panel.group.add('statictext', undefined, "Run script");  
box.panel.group.okBtn = box.panel.group.add('button',undefined, "OK", {name:'ok'});  
box.panel.group.closeBtn = box.panel.group.add('button',undefined, "Cancel", {name:'close'});  


box.panel.group.okBtn.onClick = function(){  
	SCALE = box.panel_text1.text/100;
	scaleStroke(SCALE);
	box.ok();  
	
  }  

  box.panel.group.closeBtn.onClick = function(){
	  box.close();
	}  
	
  box.show()  






function roundTo(n, digits) {
     if (digits === undefined) {
       digits = 0;
     }

     var multiplicator = Math.pow(10, digits);
     n = parseFloat((n * multiplicator).toFixed(11));
     var test =(Math.round(n) / multiplicator);
     return +(test.toFixed(2));
   }

function scaleStroke(s) {
    if(selection.length> 0) {
    var numScaledItems = 0;
    var scaleStroke = s;
	
    // scale selected items
    for(i = 0; i<selection.length; i++) {
    	if(selection[i].stroked == true) {
            selection[i].strokeWidth *= scaleStroke;
            numScaledItems += 1;
        }
    }
    if(numScaledItems> 0)  {
        alert(scriptID + "\n" + " by " + roundTo(scaleStroke * 100, 2) + "% of " + numScaledItems + " " +((numScaledItems == 1)?"object": "objects"), scriptID,     true);
    }
    }
    else {
        alert(scriptID + "\nError: Please select something", scriptID, false);
    }
}

