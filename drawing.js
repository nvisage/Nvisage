//registers div as canvas - for IE?
var canvasDiv = document.getElementById('canvasDiv');
canvas = document.createElement('canvas');
canvas.setAttribute('width', 400);
canvas.setAttribute('height', 400);
canvas.setAttribute('id', 'canvas');
canvas.setAttribute("styles", 'position:relative, z-index:0')
canvasDiv.appendChild(canvas);

if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");

//drawing functions
var paint = false;
var isDrawMode = true;

$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  if(!isDrawMode){
    console.log("TEXT");
    var motionContainer = $("<div></div>", {"class": "Contain"});
    var textBox = $("<textarea>Test</textarea>", {"class":"TextBox", "left":mouseX, "top":mouseY});
    motionContainer.append(textBox);
    motionContainer.draggable().resizable();
    $("#canvasDiv").append(motionContainer);
  }
  if(isDrawMode){
    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
  }
});

$('#canvas').mousemove(function(e){
  if(isDrawMode){
    if(paint){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  }
});

$('#canvas').mouseup(function(e){
  if(isDrawMode){
    paint = false;
  }
});

$('#canvas').mouseleave(function(e){
  if(isDrawMode){
    paint = false;
  }
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for(var i=0; i < clickX.length; i++) {
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}

//save button
$('#saveButton').click(function(){
  console.log("HELLO");
  html2canvas(canvasDiv, {
      onrendered: function (canvas) {
          var imageData = canvas.toDataURL('image/png',1.0);

          document.getElementById('canvasImg').src = imageData;
   }
  });

})

//switches between draw and text
$('#switchButton').click(function(){
  console.log("SWITCH");
  isDrawMode = !isDrawMode;
  if(isDrawMode){
    $(this).text("DRAWING");
  }else{
    $(this).text("TYPING");
  }
})
