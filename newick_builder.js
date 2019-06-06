let rasterLineWidth = 0.5;
let defaultTree = "(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5);";

drawRaster();

function getValues() {
	
	//step 1: filtering outer brackets outer brackets
	const regex = /(?<=\()(.*)(?=\))/gm;
	const str = document.getElementById("newick_text_input").value;
	let step1;
	
	
	while((step1 = regex.exec(str)) !== null) {
		if (step1.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		
		step1.forEach((match, groupIndex) => {
			console.log(`Found match, group ${groupIndex}: ${match}`);
			step1 = match;
			console.log(step1);
		});
	}
	
	//step 2: getting the first branches (splitting at comma's)
	//var step2 = step1.split(",");
	//console.log(step2);	
}	

function showTree(){
	console.log('button pressed');
	let x = document.getElementById("newick_text_input").value;

	document.getElementById("test_text").innerHTML = x;
	
	validateInput();
	getValues();
	drawTree();	
}

function drawTree(){

	

	
	drawTest();
}

function loadDefault() {
	document.getElementById("newick_text_input").value = defaultTree;

	showTree();
}



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

document.getElementById('newick_text_input').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
	  showTree();
      return false;
    }
  }

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

function clearInput(){
	document.getElementById("newick_text_input").value = "";

}