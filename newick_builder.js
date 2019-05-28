var rasterLineWidth = 0.5;
var defaultTree = "(A:0.1,B:0.2,(C:0.3,D:0.4):0.5);";

drawRaster();

function showTree(){
	console.log('button pressed');
	var x = document.getElementById("newick_text_input").value;

	document.getElementById("test_text").innerHTML = x;
	
	drawTree();	
}

function drawTree(){
	var newick = document.getElementById("newick_text_input").value;
	var openBracePlace = [];
	var closeBracePlace = [];
	
	for (var i = 0; i < newick.length; i++) {
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
	
	for (var i = openBracePlace[0]; i < newick.length; i++) {
		if((newick.charAt(i)) == "(") {
//			alert(newick.charAt(i));
			openBracePlace = openBracePlace.concat([i]);
		}
	}
	
	drawTest();
}

function loadDefault(){
	document.getElementById("newick_text_input").value = defaultTree;
	
	showTree();
}

function drawRaster(){
	var c = document.getElementById("drawing_canvas");
	var ctx = c.getContext("2d");
	
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
	var c = document.getElementById("drawing_canvas");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(10.5, 50);
	ctx.lineTo(80.5, 50);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000";
	ctx.fillText("x", 248, 43);
	ctx.stroke();
}

document.getElementById("input_file").addEventListener("change",function(){
  var file = this.files[0];

  if (file) {
      var reader = new FileReader();

      reader.onload = function (evt) {
        console.log(evt);
        document.getElementById("test_text").innerHTML = evt.target.result;
		document.getElementById("newick_text_input").value = evt.target.result;
      };

      reader.onerror = function (evt) {
        console.error("An error ocurred reading the file",evt);
      };

      reader.readAsText(file, "UTF-8");
	  
    }
},false);