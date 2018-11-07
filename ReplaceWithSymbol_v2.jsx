/******************************
* @title ReplaceWithSymbol
* @author Jonatan Hilden
* @info http://koponen-hilden.fi
* @version 2.0.0


DESCRIPTION
Replace objects with a symbol by selecting them and the desired symbol.
Treats groups as singe objects. Slow if the file has many objects.


*******************************/

var scriptID = "Replace with symbol ";
var numSelectedItems = 0;
var docRef = app.activeDocument;


var selectedSymbol = null; 
// find a symbol in the selection (first symbol found is used)
selectedSymbol = getSymbolInSelection(docRef, selectedSymbol);

// script will not work unless selection includes a symbol
var symbolName = 'NONE SELECTED – script will fail!';
if (selectedSymbol){
	symbolName = selectedSymbol.name;
}

// Make a simple interface box 
var box = new Window('dialog', scriptID);  
box.alignChildren='left';
// headline
box.add('statictext', undefined, "Replace selected objects with symbol instance");

// stats panel: display selected object count and symbol
box.statsPanel = box.add('panel', undefined, "Info");  
box.statsPanel.alignChildren='left';
box.statsPanel.group0 = box.statsPanel.add('group', undefined );  

box.statsPanel.add('statictext', undefined, "Symbol name: " + symbolName);
box.statsPanel.add('statictext', undefined, "Selected object count: " + numSelectedItems);

// options panel
box.optionsPanel = box.add('panel', undefined, "Options");  
box.optionsPanel.alignChildren='left';

// scale checkbox, default: false
var scaleCheck = box.optionsPanel.add('checkbox', undefined, "Scale symbols to match original objects?");
scaleCheck.value=false;

// clear originals checkbox; default true
var clearCheck = box.optionsPanel.add('checkbox', undefined, "Clear original objects?");
clearCheck.value=true;

// ok and cancel buttons group
box.buttons = box.add('group', undefined );  
box.buttons.orientation='row';  

box.buttons.add('statictext', undefined, "Run script");  
var okButton = box.buttons.add('button',undefined, "OK", {name:'ok'});  
var closeButton = box.buttons.add('button',undefined, "Cancel", {name:'close'});  

// Ok button function
okButton.onClick = function(){  
	
	var scaleSymbol = scaleCheck.value;
	var clearOriginals = clearCheck.value;

		if (selectedSymbol == null)
		{alert(scriptID + "\n" + "please select a symbol", scriptID, true); 
		box.close();
		} else {
			replaceWithSymbol(docRef, selectedSymbol, clearOriginals, scaleSymbol);
			box.close();
		}

    
	// box.ok();  
	
  }  

  closeButton.onClick = function(){
	  box.close();
	}  
	
  box.show()




function replaceWithSymbol(docRef, selectedSymbol, clearOriginals, scaleSymbol){ 

		// loop through remaining selection and replace them with symbols on current layer
		// clear originals if desired
		// TODO: modify to use faster built-in "selection" parameter instead of looping doc.pageItems

		for(i=0;i<docRef.selection.length;i++){  
				var currObj=docRef.selection[i];  
				var currLeft=currObj.left;  
				var currTop=currObj.top;  
				var currWidth=currObj.width;  
				var currHeight=currObj.height;  
				var currInstance=docRef.symbolItems.add(selectedSymbol); 
				if (scaleSymbol){
					currInstance.width*=currHeight/currInstance.height;  
					currInstance.height=currHeight;  
					currInstance.left=currLeft;  
					currInstance.top=currTop;  
				} else {
					currInstance.position = Array( currObj.position[0]+currObj.width/2 - currInstance.width/2,
					currObj.position[1]-currObj.height/2 + currInstance.height/2 );
				}
				currObj.selected = false;
				currInstance.selected = true;
				if (clearOriginals) {currObj.remove();}
		}
		redraw();


		if (numSelectedItems > 0) {
			// alert(scriptID + "\n" + numSelectedItems + " " + ((numSelectedItems == 1)?"object":"objects") + " in total", scriptID, true);
		} else {
			alert(scriptID + "\n" + "please select objects", scriptID, true);
			return;
		}	
}

function getSymbolInSelection(docRef, selectedSymbol) {
    // loop through selected items to get the desired symbol and deselect this item
    for(i=0;i<docRef.selection.length;i++){  
			if(docRef.selection[i].symbol) {
				selectedSymbol = docRef.selection[i].symbol;
				docRef.selection[i].selected = false;
				numSelectedItems -= 1;
				}
  		numSelectedItems += 1;
	}
    return  selectedSymbol;
}
