$(function(){
	var ranges = [];
	var maxPasses = 3;
	var suppressionRate = 0.15;
	var increaseBy = 5;
	var positionArray = [];
	var sectionHeight = h / (colourArray.length-1);
	var startScale = (sectionHeight/100)*2;
	var scaleReduction = 0.9;
	var speed = 1;

	function reset() {
		ctx.fillStyle = 'rgb('+colourArray[0][0]+','+colourArray[0][1]+','+colourArray[0][2]+')';;
		ctx.fillRect (0, 0, w, h);
	}

	$('body').on('touchstart mouseup',function(){
		reset();
	})

	// ================ GENERATE RANGES ================ //

	function generateRanges(){
		var scale = startScale;
		for(var i=0; i<colourArray.length-1;i++){
			var yStart = (sectionHeight*i);

			var p = [0,0];
			for(var m=0;m<maxPasses;m++) {
				p = generateRange(p,m);
			}
			p = randomifyDetail(p);
			ranges.push({
				"points" : p,
				"colour" : colourArray[i],
				"yStart" : yStart,
				"scale" : scale,
			})	
			scale *= scaleReduction;

			positionArray.push(yStart);
		}
		positionArray.push(h);
	}

	function generateRange(array,pass){
		var max =  100,
			newPoints = [];

		for (var i=0;i<array.length-1;i++){
			var difference = 0;
			if (array[i+1]){
				difference = array[i+1] - array[i];
			}
			newPoints.push(array[i]);
			for(var m = 0; m<increaseBy; m++){
				var basePoint = array[i]+((difference/increaseBy)*m);
				if(isNaN(basePoint)){
					basePoint = 0;
				}
				var num = max;
				for (var p=0;p<pass;p++){
					num *= suppressionRate;
				}
				newPoints.push(basePoint+getRandomInt(0-num,num));
			}
		}
		newPoints.push(array[array.length-1]);
		return newPoints.slice(0);
	}

	function randomifyDetail(array){
		var newArray = []
		for(var i=0;i<array.length-1;i++){
			var skip = getRandomInt(0,1);
			if(skip){
				continue;
			}
			newArray.push(array[i]);
		}
		return newArray;
	}
	var heightAnimate = 0;
	function animateRange(){
		for (var i=0;i<ranges.length;i++){
			var range = ranges[i];
			range.yStart+=speed;
			range.scale = startScale*Math.pow(scaleReduction,(range.yStart/sectionHeight));
			var closest = closestDivision(range.yStart);
			range.colour = colourBlending(closest.index,closest.percent);
		}
		var lastRange = ranges[ranges.length-1];
		if((lastRange.yStart-(100*lastRange.scale))>h){
			incrementStack();
			removeFromStack();
		}
	}
	function incrementStack(){
		ranges.unshift(generateNewRange());
	}

	function removeFromStack(){
		ranges.splice(ranges.length-1,1);
	}

	function generateNewRange(){
		var p = [0,0];
		for(var m=0;m<maxPasses;m++) {
			p = generateRange(p,m);
		}
		p = randomifyDetail(p);
		return{
			"points" : p,
			"colour" : colourArray[0],
			"yStart" : 0,
			"scale" : 2,
		};
	}

	function colourBlending(index,percent){
		var colour1 = colourArray[index],
			colour2 = colourArray[index+1],
			rDiff = colour2[0]-colour1[0],
			gDiff = colour2[1]-colour1[1],
			bDiff = colour2[2]-colour1[2],
			newR = Math.round((rDiff*percent) + colour1[0]),
			newG = Math.round((gDiff*percent) + colour1[1]),
			newB = Math.round((bDiff*percent) + colour1[2]);
		return [newR,newG,newB];
	}

	function closestDivision(y){
		var diff = h;
		var chosenIndex = 0;
		var secondIndex = 0;
		var actualIndex = 0
		for (var i=0; i<positionArray.length;i++){
			var val = Math.abs(positionArray[i]-y);
			if (val<diff){
				diff = Math.abs(positionArray[i]-y);
				secondIndex = chosenIndex;
				chosenIndex = i;
			} else if (val<Math.abs(positionArray[secondIndex]-y)){
				secondIndex = i;
			}
		}
		actualIndex = Math.min(secondIndex,chosenIndex);

		var range = positionArray[actualIndex+1]-positionArray[actualIndex];
		var startPoint = y-positionArray[actualIndex];
		var percent = Math.max(Math.min(startPoint/range,1),0);
		return {index:actualIndex,percent:percent};
		
	}


	// ==================== DRAWING ==================== //

	function drawCycle(){
		reset();
		for (var i=0;i<ranges.length;i++){
			var range = ranges[i];
			drawRange(range);
		}
		requestAnimationFrame(drawCycle);
	}

	function drawRange(range){
		drawPath(range.points,range.colour,range.yStart,range.scale);
	}

	function drawPath(array,colour,yStart,scale){
		var gap = w/array.length;
		ctx.beginPath();
		console.log(yStart);
		ctx.moveTo(0,yStart);
		for(var i=0; i<array.length;i++){
			var x = (gap*i) + gap,
				y = (array[i]*scale) + yStart;
			ctx.lineTo(x,y);
		}
		ctx.lineTo(w,h);
		ctx.lineTo(0,h);
		ctx.closePath();
		ctx.fillStyle = 'rgb('+colour[0]+','+colour[1]+','+colour[2]+')';;
		ctx.fill();
	}

	// ================== GET STARTED ================
	generateRanges();
	requestAnimationFrame(drawCycle);
	setInterval(animateRange,1);
});