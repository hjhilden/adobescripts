//
// Scale Strokes of selected objects
//
// 

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
    var doc = app.activeDocument;
    var numPageItems = 0;
    var numGroups = 0;
    var scaleStroke = s;
	
    // scale selected items
    for(i = 0; i<selection.length; i++) {
    	if(selection[i].stroked == true) {
    		selection[i].strokeWidth *= scaleStroke;
    // alert(scriptID + doc.pageItems[i].strokeWidth); 	
}
    numPageItems += 1;
}
    // subtract the group items themselves since only their contents count
    var numSelectedObjects = numPageItems - numGroups;
    if(numGroups> 0) {
    alert(scriptID + "\n" + " by " + roundTo(scaleStroke * 100, 2) + "% of " + numSelectedObjects + " " +((numSelectedObjects == 1)?"object": "objects") + ", " + numGroups +((numGroups == 1)?" group": " groups"), scriptID, true);
}
else {
    alert(scriptID + "\n" + " by " + roundTo(scaleStroke * 100, 2) + "% of " + numSelectedObjects + " " +((numSelectedObjects == 1)?"object": "objects"), scriptID, true);
}
}
else {
    alert(scriptID + "\nError: Please select something", scriptID, false);
}
}

