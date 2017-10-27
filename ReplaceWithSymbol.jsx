/******************************
* @title ReplaceWithSymbol
* @author Jonatan Hilden
* @info http://koponen-hilden.fi
* @version 1.0.0


DESCRIPTION
Replace objects with a symbol by selecting them and the desired symbol.
Treats groups as singe objects. Slow if the file has many objects.


*******************************/

var scriptID = "Replace with symbol ";
var numSelectedItems = 0;


replaceWithSymbol(clearOriginals=true);


function replaceWithSymbol(clearOriginals){ 

	if (app.documents.length > 0) {
		
		var doc = app.activeDocument;
		var selectedSymbol = null; 

	
        selectedSymbol = getSymbolInSelection(doc, selectedSymbol);

		if (selectedSymbol == null)
		{alert(scriptID + "\n" + "please select a symbol item", scriptID, true); 
		return;}


		// loop through remaining selection and replace them with symbols on current layer
		// clear originals if desired
		// TODO: modify to use faster built-in "selection" parameter instead of looping doc.pageItems

		for (i = 0; i < doc.pageItems.length; i++) {
			if (doc.pageItems[i].selected == true) {
				currentItem =  doc.pageItems[i];
				newSymbol = doc.activeLayer.symbolItems.add(selectedSymbol);
				newSymbol.position = Array( currentItem.position[0]+currentItem.width/2 - newSymbol.width/2,
					currentItem.position[1]-currentItem.height/2 + newSymbol.height/2 
				);
				currentItem.selected = false;
				if (clearOriginals) {currentItem.remove();}
			}
		}


		if (numSelectedItems > 0) {
			alert(scriptID + "\n" + numSelectedItems + " " + ((numSelectedItems == 1)?"object":"objects") + " in total", scriptID, true);
		} else {
			alert(scriptID + "\n" + "please select items", scriptID, true);
			return;
		}	
	} else {
		alert (scriptID + "\nError: No active document\nPlease open a document and try again", scriptID, false);
		return;
	}
}

function getSymbolInSelection(doc, selectedSymbol) {
    // loop through selected items to get the desired symbol and deselect this item
    for(i = 0; i<doc.pageItems.length; i++) {
    	if(doc.pageItems[i].selected == true) {
			if(doc.pageItems[i].symbol) {
				selectedSymbol = doc.pageItems[i].symbol;
				doc.pageItems[i].selected = false;
				numSelectedItems -= 1;
				}
  		numSelectedItems += 1;
		}
	}
    return  selectedSymbol;
}
