
function showTree(){
	console.log('button pressed');
	var x = document.getElementById("newick_text_input").value;

	document.getElementById("test_text").innerHTML = x;
}


var c = document.getElementById("drawing_canvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(0.5, 0);
ctx.lineTo(30.5, 50);
ctx.lineWidth = 5;
ctx.stroke();


document.getElementById("filetoRead").addEventListener("change",function(){
  var file = this.files[0];

  if (file) {
      var reader = new FileReader();

      reader.onload = function (evt) {
        console.log(evt);
        document.getElementById("editor").value = evt.target.result;
      };

      reader.onerror = function (evt) {
        console.error("An error ocurred reading the file",evt);
      };

      reader.readAsText(file, "UTF-8");
    }
},false);