let rasterLineWidth = 0.5;
let defaultTree = "(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5);";
let step2;
let step1;
const branch_distance = 35;
const treeLineWidth = 2;

drawRaster();

//spit en verwerk de newick input string
function getValues() {

	//step 1: filtering outer brackets outer brackets
	const regex = /(?<=\()(.*)(?=\))/gm;
	const str1 = document.getElementById("newick_text_input").value;

	step1 = regex.exec(str1)
	console.log("step1 string:", step1);
	//de eerste takken eruit halen
	const str2 = step1[0];
	step2 = str2.split(/,(?![^()]*\))/gm);
	console.log("step 2 string:", step2)


}	

//haal de input string op een reops de voldgende vuncties
function showTree(){
	console.log('button pressed');
	let x = document.getElementById("newick_text_input").value;

	document.getElementById("test_text").innerHTML = x;
	
	validateInput();
	getValues();
	drawTree();	
}

//teken de boomm
function drawTree(){

	let treeArray = ["A:0.1","B:0.2",["C:0.3","D:0.4"],"E:0.5"];
	console.log("treeArray:" + treeArray);
	
	//initialiseer het canvas
	let c = document.getElementById("drawing_canvas");
	let ctx = c.getContext("2d");
	
	//cirkel op het beginpunt
	ctx.beginPath();
	ctx.moveTo(180, 200);
	ctx.arc(180, 200, 3, 0, 2* Math.PI);
	ctx.strokeStyle = "#000"
	ctx.stroke();
	
	let amount_branches_start = step2.length;
	console.log("amount branches:", amount_branches_start);
	let line_length = branch_distance * amount_branches_start;
	let start_point = 200 - (line_length / 2);
	console.log("starting point", start_point);

	//eerste verticale lijn tekenen
	ctx.beginPath();
	ctx.moveTo(180, start_point);
	ctx.lineTo(180, (start_point + line_length));
	ctx.lineWidth = treeLineWidth;
	ctx.strokeStyle = "#000";
	ctx.stroke();
	
	//horizontale lijnen tekenen
	for (i = 0; i <= treeArray.length; i++){
		console.log("loop:" + i);
		
		const nameFilterRegex = /(.*)(?=:)/gm
		const lengthFilterRegex = /(?<=:)(.*)/gm
		let lineStr = treeArray[i];
		let lineName = (nameFilterRegex.exec(lineStr))[0];
		let lineLength = (lengthFilterRegex.exec(lineStr))[0];

		console.log("lineName:" + lineName);
		console.log("lineLength:" + lineLength);
		
		let lineLengthPx = (500*lineLength);
		let lineHeightPx = (200+(i*10)); 
		console.log("lineLengthPx:" + lineLengthPx);		
		console.log("lineHeightPx:" + lineHeightPx);
		
		ctx.beginPath();
		ctx.moveTo(180, lineHeightPx);
		ctx.lineTo((180 + lineLengthPx), lineHeightPx);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#000";
		ctx.stroke();
		
	}
	
}

//als je op de knop 'load default' klikt laadt hij de default tree in en laat hij hem zien
function loadDefault() {
	document.getElementById("newick_text_input").value = defaultTree;

	showTree();
}

//hetv tekenen van een raster met 20px tussen de lijnen
function drawRaster(){
	let c = document.getElementById("drawing_canvas");
	let ctx = c.getContext("2d");
	
	for (i = 0; i < 1000; (i = i+20)){
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, 400);
		ctx.lineWidth = rasterLineWidth;
		ctx.strokeStyle = "#eee";
		ctx.stroke();
	}
	
	for (i = 0; i < 1000; (i = i+20)){
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(1000, i);
		ctx.lineWidth = rasterLineWidth;
		ctx.strokeStyle = "#eee";
		ctx.stroke();
	}
}

// een test cirkel een lijtjes tekenen
function drawTest(){
	let c = document.getElementById("drawing_canvas");
	let ctx = c.getContext("2d");
	
	//cirkel op het beginpunt
	ctx.beginPath();
	ctx.moveTo(180, 200);
	ctx.arc(180, 200, 3, 0, 2* Math.PI);
	ctx.strokeStyle = "#000"
	ctx.stroke();
	
	//eerste lijn
	ctx.beginPath();
	ctx.moveTo(180, 200);
	ctx.lineTo(680, 200);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000";
	ctx.stroke();
}

//als je in het input fiels op enter drukt klikt hij op de showtree knop
document.getElementById('newick_text_input').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
	  showTree();
      return false;
    }
  }

//kijkt od er iets ij\n de file input zien endals dat zo laadt hij het bestand als text
document.getElementById("input_file").addEventListener("change",function(){
  let file = this.files[0];

  if (file) {
      let reader = new FileReader();

      reader.onload = function (evt) {
        console.log(evt);
        document.getElementById("test_text").innerHTML = evt.target.result;
		document.getElementById("newick_text_input").value = evt.target.result;
      };

      reader.onerror = function (evt) {
        console.error("An error ocurred reading the file",evt);
      };

      reader.readAsText(file, "UTF-8");
	  let str = document.getElementById("newick_text_input").value;
	  
    }
	
},false);


function readNewick() {
	let amount_branch = new RegExp(!'()');
	console.log(amount_branch);
}

//valideer de user input of er daadwerkelijk kloppende newick staat en geef relevenate foutmeldeinge aan de gebruiker
function validateInput(){
	console.log("Validating input...");
	let newick = document.getElementById("newick_text_input").value;
	let validationErrors = 0;
	document.getElementById("error_message").innerHTML = "";
	linebreak = document.createElement("br");
	
	//Checking if there is something in the input
	if (newick == ""){
		validationErrors++;
		document.getElementById("error_message").innerHTML = "INVALID INPUT; newick input is empty!";
		error_message.appendChild(linebreak);
		console.log("%cINVALID INPUT; newick input is empty!", 'color: red;')
	}
	
	//Checking start with (
	if (newick[0] != "("){
		validationErrors++;
		document.getElementById("error_message").innerHTML += "INVALID INPUT; newick input does not start with '('!";
		error_message.appendChild(linebreak);
		console.log("%cINVALID INPUT; newick input does not start with '('!", 'color: red;')
	} 
	
	//Checking end with );
	if (((newick[newick.length -1]) != ";" )&& ((newick[newick.length -2]) != ")")){
		validationErrors++;
		document.getElementById("error_message").innerHTML += "INVALID INPUT; newick input does not end with ');'!";
		error_message.appendChild(linebreak);
		console.log("%cINVALID INPUT; newick input does not end with ');'!", 'color: red;')
	}	
	
	//Checking opening/closing brackets
	let openBracePlace = [];
	let closeBracePlace = [];
	
	for (let i = 0; i < newick.length; i++) {
		if((newick.charAt(i)) == "(") {
			openBracePlace = openBracePlace.concat([i]);
		}
		if((newick.charAt(i)) == ")") {
			closeBracePlace = closeBracePlace.concat([i]);
		}
	}
	
	if (openBracePlace.length != closeBracePlace.length){
		validationErrors++;
		document.getElementById("error_message").innerHTML += "INVALID INPUT; amount of opening brackets does not equal amount of closing brackets in newick input!";
		error_message.appendChild(linebreak);
		console.log("%cINVALID INPUT; amount of opening brackets does not equal amount of closing brackets in newick input!", 'color: red;')
	} 
	
	if (validationErrors > 0){
		document.getElementById("newick_text_input").style = "border: 1px solid red;";
		document.getElementById("error_message").style = "color: red;";
	} else if (validationErrors == 0){
		console.log("No validation errors found.")
		document.getElementById("newick_text_input").style = "border: 1px solid green;";
		document.getElementById("error_message").style = "color: black;";
	}
}

//leeg het input field
function clearInput(){
	document.getElementById("newick_text_input").value = "";
	
	let c = document.getElementById("drawing_canvas");
	let ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);

}