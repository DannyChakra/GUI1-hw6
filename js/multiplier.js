/**
Danny Abou-Chakra
Danny_AbouChakra@student.uml.edu
Danny Abou-Chakra Umass Lowell CS student, Copyright (c)
11/14/2019
JavaScript generation of multiplication table
**/
//given a row this function inserts a cell
function insertCell(row, text, attr = []) {
    var cell = document.createElement("td");
    if(attr.length){cell.setAttribute(attr[0],attr[1]); }
    var cellText = document.createTextNode(text);
    cell.appendChild(cellText);
    row.appendChild(cell);
}
//Draws table, takes inputs as an array
function drawTable(inputs) {
    
    hmin = inputs[0];
    hmax = inputs[1];
    vmin = inputs[2];
    vmax = inputs[3];
    
    //reference to div1  
    var div1 = document.getElementById("div1");

    //creating a table 
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    //hack to insert empty cell 
    var insertEmpty = 1;

    for(var j = vmin; j <= vmax; j++) { 
        //creating the rows
        var row = document.createElement("tr");
        //creates the header row
        var hrow = document.createElement("tr");
        hrow.setAttribute("id", "multiplier");
        //creating the cells 
        for (var i = hmin; i <= hmax; i++) {
            //add cells to header row
            if(j == vmin) {
                insertCell(hrow, i);
                if(insertEmpty) {
                    var empt = hrow.insertCell(0);
                    empt.innerHTML = "";
                    insertEmpty = 0;
                }            
                tblBody.appendChild(hrow);
            }
            //adds the column header
            if(i == hmin) {
                insertCell(row, j, ["id", "multiplicand"]);
            }
            insertCell(row, j*i);
        }
        tblBody.appendChild(row);
    }
    //append table body to table
    tbl.appendChild(tblBody);
    tbl.setAttribute("id", "multiplicationTable");

    //append table to div1
    if(div1.hasChildNodes()) {
        var exisitingTable = document.getElementById("multiplicationTable");
        div1.replaceChild(tbl, exisitingTable);
    }
    else { 
        div1.appendChild(tbl);
    }
}

//returns -1 if there are no empty strings in the array, returns index of the empty string
function isEmpty(input) { 
    for(var i = 0;i < input.length; i++){
        if(input[i] === "" || !input[i].trim())   
            return i;
    }
    return -1;
}
//returns -1 if all elements are numeric, returns index of non-numeric 
function isNumeric(input) { 
    let index = input.findIndex(Number.isNaN);
    return index;
}
//Main func after all inputs are validated
function myFunction() { 
    //getting limits for horizontal
    var herz1 = document.getElementById("horz1").value; 
    var herz2 = document.getElementById("horz2").value; 
    //getting limits for vertical
    var vert1 = document.getElementById("vert1").value; 
    var vert2 = document.getElementById("vert2").value;
    
    var isEmpt = isEmpty([herz1, herz2, vert1, vert2]); 
    var indexofNan = isNumeric([regexParse(herz1), regexParse(herz2), regexParse(vert1), regexParse(vert2)]); 
	var ValidationMessage = document.getElementById("ValidationMessage");

    if(isEmpt != -1) { 
        //Please fill out all fields
		ValidationMessage.innerHTML = "Please fill input " + (isEmpt+1);
		cleartable();
    }
    else if(indexofNan != -1 ) { 
        //Please enter a number at index indexofNan
        ValidationMessage.innerHTML = "Please enter a valid number on input " + (indexofNan + 1);
		cleartable();
    }
    else { 
        //validate horizontal max and min
        hmax = Math.max(regexParse(herz1), regexParse(herz2));
        hmin = Math.min(regexParse(herz1), regexParse(herz2));

        //validate vertical max and min
        vmax = Math.max(regexParse(vert1), regexParse(vert2));
        vmin = Math.min(regexParse(vert1), regexParse(vert2));

        drawTable([hmin, hmax, vmin, vmax]);
		ValidationMessage.innerHTML = "";
    }
}
//clears inputs 
function clearInput() { 
	document.getElementById("vert1").value = '';
	document.getElementById("vert2").value = '';
	document.getElementById("horz1").value = '';
	document.getElementById("horz2").value = '';
	document.getElementById("ValidationMessage").innerHTML = '';
	cleartable();
}
//clears table
function cleartable() { 

	var elem = document.getElementById('multiplicationTable');
	if (elem != null)
	{
	  elem.parentNode.removeChild(elem);
	}
}
//parses text to check for number
function regexParse(text) { 
	if(/^-?[0-9]\d*(\.\d+)?$/.test(text))
		return parseInt(text);
	return NaN;
}

