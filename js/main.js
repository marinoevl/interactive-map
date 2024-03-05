// Function to get the nth key from the object
Object.prototype.getByIndex = function (index) {
  return this[Object.keys(this)[index]];
};

// Styles to apply
// Default style
var style = {
  fill: "#ddd",
  stroke: "#000",
  "stroke-width": 4.5,
  "stroke-linejoin": "round",
  "display":"inline",  
  "stroke":"#646666",
  "stroke-opacity":1,
  "stroke-dasharray":"none",
  cursor: "pointer",
};

// Style when hovering
var hoverStyle = {
  fill: "#1f4b03",
};

// Styles for tax brackets
var fivePercent = {
  fill: "#04490c",
};

var overFourPercent = {
  fill: "#0a7400",
};

var overThreePercent = {
  fill: "#15a708",
};

var overTwoPercent = {
  fill: "#04c707",
};

var overOnePercent = {
  fill: "#00fb1d",
};

var overZeroPercent = {
  fill: "#caffde",
};

var animationSpeed = 500;

// Return style by tax bracket for provided council name using the concelhosIRS array
function corConcelho(nome) {
  console.log(nome);
  var selectedCouncil = councilData.find((council) => {
    return council.municipio == nome;
  });
  console.log(selectedCouncil);

  return {
    fill: selectedCouncil.getByIndex(2),
  }
}

// Main loop
// Initializes the map with default styles
// Adds event listeners for mouseover and mouseout to allow us to see which council we are selecting
for (var concelhoName in concelhosSVG) {
    
  (function (concelho, nome) {    
    concelho.attr(style);
    concelho.attr(corConcelho(nome));

    concelho[0].addEventListener(
      "mouseover",
      function () {
        concelho.animate(hoverStyle, animationSpeed);
        document.getElementById("popup").style.display = "block";
        document.getElementById("popup").innerHTML = nome;
      },
      true
    );

    concelho[0].addEventListener(
      "mouseout",
      function () {
        concelho.animate(corConcelho(nome), animationSpeed);
        document.getElementById("popup").style.display = "none";
        document.getElementById("popup").innerHTML = null;
      },
      true
    );

    concelho[0].addEventListener(
      "click",
      function () {
        var selectedCouncil = councilData.find((council) => {
          return council.municipio == nome;
        });
        fillInformation(selectedCouncil);
      },
      true
    );
  })(concelhosSVG[concelhoName], concelhoName);
}


function fillInformation(council) {
  var keys = Object.keys(council);
  document.getElementById("councilName").innerHTML = council["municipio"];

  // Draw table with headers
  var tableToFill = document.getElementById("results");
  tableToFill.innerHTML = "";
  var tblHeader = document.createElement("thead");
  var headerId = document.createElement("th");
  headerId.innerHTML = "Id";
  headerId.scope = "col";
  var headerName = document.createElement("th");
  headerName.innerHTML = "Municipio";
  headerName.scope = "col";
  var headerColor = document.createElement("th");
  headerColor.innerHTML = "Color";
  headerColor.scope = "col";

  tblHeader.appendChild(headerId);
  tblHeader.appendChild(headerName);
  tblHeader.appendChild(headerColor);
  tableToFill.appendChild(tblHeader);

  // Fill in rows, 3 elements at a time because they are a "pair"
  // of related values, for 2011 and 2021
  var tblBody = document.createElement("tbody");
  var x = 0;
  while (x < keys.length) {
    // Properties
    var headerRow = document.createElement("tr");
    var headerTextId = document.createElement("td");
    headerTextId.innerHTML = keys[x];
    var headerTextName = document.createElement("td");
    headerTextName.innerHTML = keys[x + 1];
    var headerTextColor = document.createElement("td");
    headerTextColor.innerHTML = keys[x + 2];
    headerRow.appendChild(headerTextId);
    headerRow.appendChild(headerTextName);
    headerRow.appendChild(headerTextColor);

    // Values
    var valuesRow = document.createElement("tr");
    var valuesTextId = document.createElement("td");
    valuesTextId.innerHTML = council.getByIndex(x+1);
    var valuesTextName = document.createElement("td");
    valuesTextName.innerHTML = council.getByIndex(x);
    var valuesTextColor = document.createElement("td");
    valuesTextColor.innerHTML = council.getByIndex(x + 2);
    valuesRow.appendChild(valuesTextId);
    valuesRow.appendChild(valuesTextName);
    valuesRow.appendChild(valuesTextColor);

    tblBody.appendChild(headerRow);
    tblBody.appendChild(valuesRow);

    tableToFill.appendChild(tblBody);

    x = x + 3;
  }
}
