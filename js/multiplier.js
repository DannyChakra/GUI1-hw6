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

$(document).ready(function(){  
    //input validation for non-empty and isDigit  
    $("#formInputs").validate( { 
            rules: { 
                firstInput: { 
                    required: true,
                    digits: true,
                },
                secondInput: { 
                    required: true,
                    digits: true,
                },
                thirdInput: { 
                    required: true,
                    digits: true,
                },
                fourthInput: { 
                    required: true,
                    digits: true,
                },
            },
            // errorPlacement: function(error, element) {
            //     error.appendTo( element.parent("div").next());
            // },
            // //submit handler generates the table
            submitHandler: function (form) { 
                //getting limits for horizontal
                var herz1 = parseInt($("#horz1").val());
                console.log(herz1)
                var herz2 = parseInt($("#horz2").val()); 
                //getting limits for vertical
                var vert1 = parseInt($("#vert1").val()); 
                var vert2 = parseInt($("#vert2").val());

                hmax = Math.max((herz1), (herz2));
                hmin = Math.min((herz1), (herz2));

                //validate vertical max and min
                vmax = Math.max((vert1), (vert2));
                vmin = Math.min((vert1), (vert2));

                drawTable([hmin, hmax, vmin, vmax]);
            }
        });
    //clears error from loading page
    var isValid = $("#formInputs").validate().form(); 
    $('label[class^="error').remove();

    //clear button 
    $("#clearButton").on("click", function() {
        //clears inputs
        $("#horz1").val('');
        $("#horz2").val('');
        $("#vert1").val('');
        $("#vert2").val('');
        //clears table if not null
        var elem = $('#multiplicationTable');
        if (elem != null){
            elem.remove();
        }
        //removes error messages 
        $('label[class^="error"]:not(.valid)').remove();
    });     
});