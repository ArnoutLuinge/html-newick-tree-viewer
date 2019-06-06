let rasterLineWidth = 0.5;
let defaultTree = "(A:0.1,B:0.2,(C:0.3,D:0.4):0.5);";

drawRaster();

function showTree(){
	console.log('button pressed');
	let x = document.getElementById("newick_text_input").value;

	document.getElementById("test_text").innerHTML = x;
	
	drawTree();	
}

function drawTree(){
	let newick = document.getElementById("newick_text_input").value;
	let openBracePlace = [];
	let closeBracePlace = [];
	
	for (let i = 0; i < newick.length; i++) {
		if((newick.charAt(i)) == "(") {
//			alert(newick.charAt(i));
			openBracePlace = openBracePlace.concat([i]);
		}
		if((newick.charAt(i)) == ")") {
			closeBracePlace = closeBracePlace.concat([i]);
		}
	}
	
	if (openBracePlace.length != closeBracePlace.length){
		document.getElementById("newick_text_input").style = "border: 1px solid red;";
		console.log("%cINVALID INPUT; amount of opening brackets does not equal amount of closing brackets in newick input!", 'color: red;')
	} else if (openBracePlace.length == closeBracePlace.length){
		document.getElementById("newick_text_input").style = "";
	}
	
	for (let i = openBracePlace[0]; i < newick.length; i++) {
		if((newick.charAt(i)) == "(") {
//			alert(newick.charAt(i));
			openBracePlace = openBracePlace.concat([i]);
		}
	}
	
	drawTest();
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
	let amount_branch = str.(?<=\()(.*)(?=>\));
}