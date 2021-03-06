var canvas_margin = 20;
var width = 640;
var height = 480;
var canvas = document.getElementById("canvas");
var context = canvas.getContext( '2d' );
var playerX = canvas_margin;
var	playerY = canvas_margin;
var speed = 5;
var behindLine = [{'x': playerX, 'y': playerY}];
var marginLine = [{'x': canvas_margin, 'y': canvas_margin}];;
window.addEventListener("keydown",doKeyDown,true);

for(var i = canvas_margin+5;i<=height-canvas_margin;i+=5)
{
	marginLine.push({'x':canvas_margin,'y':i});
}
for(var i = canvas_margin;i<=width-canvas_margin;i+=5)
{
	marginLine.push({'x':i,'y':height-canvas_margin});
}
for(var i = height-canvas_margin;i >= canvas_margin;i-=5)
{
	marginLine.push({'x':width-canvas_margin,'y':i});
}
for(var i = width-canvas_margin;i >= canvas_margin;i-=5)
{
	marginLine.push({'x':i,'y':canvas_margin});
}

function mainLoop(){

context.fillStyle = "black";
context.fillRect(0,0,width,height);
drawLine(marginLine,"yellow");
drawLine(behindLine,"pink");
context.fillStyle = "red";
context.beginPath();
context.arc(playerX, playerY, 10, 0, 2*Math.PI, true);
context.closePath();
context.fill();


}

function doKeyDown(event) {
	switch (event.keyCode) {
			case 38: /*Up arrow*/
				playerY-=speed;
				if(playerY < canvas_margin)
					playerY = canvas_margin;
				break;
			case 40: /*Down arrow*/
				playerY +=speed;
				if(playerY > height - canvas_margin)
					playerY = height - canvas_margin;
				break;
			case 37: /*Left arrow*/
				playerX -=speed;
				if(playerX < canvas_margin)
					playerX = canvas_margin;
				break;
			case 39: /*Right arrow*/
				playerX +=speed;
				if(playerX > width - canvas_margin)
					playerX = width - canvas_margin;
				break;
	}
	if(!onMargin())
		behindLine = addLine();//.push({'x':playerX,'y':playerY});
	else
	{
	   if ( behindLine.length > 3){
			updateMarginLine();
		}

		behindLine = [{'x': playerX, 'y': playerY}];
	}
}

function determine_direction( poz)
{
	var stop;
	var i;
	for ( i = poz; i < marginLine.length ; i++)
	     if(playerX== marginLine[i].x && playerY == marginLine[i].y )
			return i;
	if(i==marginLine.length)
	{
		for ( i = 0; i < poz ; i++)
	     if(playerX== marginLine[i].x && playerY == marginLine[i].y )
			return i;
	}
  var total= marginLine.length; //nr total de liniute

}

function redesignMargin(start, stop){
		behindLine.push({'x':playerX,'y':playerY});
		if(stop>start){
			var auxLeft = marginLine.slice(0,start);
			var auxRight = marginLine.slice(stop);
			marginLine = auxLeft.concat(behindLine.concat( auxRight));
		}
		else{
			var auxLeft = marginLine.slice(0,stop);
			var auxRight = marginLine.slice(start);
			marginLine = auxLeft.concat((behindLine.reverse()).concat(auxRight))
		}
}

function updateMarginLine(){
	var first;
	for (var i = 0; i< marginLine.length; i++){
		if (behindLine[0].x== marginLine[i].x && behindLine[0].y == marginLine[i].y)
			{
				var stop = determine_direction(i);
				redesignMargin(i,stop);

			break;
			}
		}
}

function addLine() {
	var auxBehindLine = [{'x': behindLine[0].x, 'y': behindLine[0].y}];
	for( var i =1;i<behindLine.length;i++)
		if(playerX == behindLine[i].x && playerY == behindLine[i].y)
			break;
		else
			auxBehindLine.push({'x': behindLine[i].x, 'y': behindLine[i].y});
	auxBehindLine.push({'x':playerX,'y':playerY});
	return auxBehindLine;
}


function onMargin() {
	for (var i = 0; i< marginLine.length; i++){
		if (playerX == marginLine[i].x && playerY == marginLine[i].y)
		return true;
	}
	return false;
}

function drawLine(line,color) {
	for(var i = 1; i < line.length ; i++ )
	{
		context.strokeStyle = color;
		context.beginPath();
		context.moveTo(line[i-1].x,line[i-1].y);
		context.lineTo(line[i].x,line[i].y);
		context.closePath();
		context.stroke();
	}
}
