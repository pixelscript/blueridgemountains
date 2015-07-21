$(function(){
	var arrays = [];
	var maxPasses = 4;
	var passes = 0;
	var suppressionRate = 0.15;
	function genratePoints(min,max,array,ammount){
		var newPoints = [];
		for (var i=0;i<array.length-1;i++){
			var difference = 0;
			if (array[i+1]){
				var difference = array[i+1] - array[i];
			}
			newPoints.push(array[i]);
			for(var m = 0; m<ammount; m++){
				var basePoint = array[i]+((difference/ammount)*m);
				if(isNaN(basePoint)){
					basePoint = 0;
				}
				newPoints.push(basePoint+getRandomInt(min,max));
			}
		}
		newPoints.push(array[array.length-1]);
		passes++;
		if(passes<maxPasses){
			array = genratePoints(min*suppressionRate,max*suppressionRate,newPoints,5);
			arrays.push(array.slice(0));
		}
		return array;
	}
	function drawPath(array,colour){
		var gap = w/array.length;
		ctx.beginPath();
		ctx.moveTo(0,array[0]);
		for(var i=0; i<array.length;i++){
			var skip = getRandomInt(0,1);
			if(skip && i!= array.length-1){
				continue;
			}
			var x = (gap*i) + gap,
				y = array[i];
			ctx.lineTo(x,y);
		}
		ctx.lineTo(w,h);
		ctx.lineTo(0,h);
		ctx.closePath();
		ctx.fillStyle = colour;
		ctx.fill();
	}

	function drawRange(){
		var increments = h / (colourArray.length);
		var range = increments*1.2;
		var firstRange = range;
		var spread = increments;
		for(var i=0; i<colourArray.length;i++){
			var num = (spread*i)+firstRange;
			passes = 0;
			pointArray = genratePoints(0-range,range,[num,num],5);
			drawPath(pointArray,colourArray[i+1]);	
			range*=0.9;
		}
	}
	function reset() {
		ctx.fillStyle = colourArray[0];
		ctx.fillRect (0, 0, w, h);
		drawRange();
	}
	drawRange();
	$('body').on('touchstart mouseup',function(){
		reset();
	})
});