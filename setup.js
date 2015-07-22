var canvas, ctx, w, h;
// var colourArray = ['#ded4de','#bbbbc6','#a0a6b2','#8d979f','#78858c','#707b86','#414754']
// var colourArray = ['#faf8fb','#f0f0f4','#e2e6ec','#d4dbe1','#becbd2','#a0b2c2','#647089']
var colourArray = [ [250,248,251],
					[240,240,244],
					[226,230,236],
					[212,219,225],
					[190,203,210],
					[160,178,194],
					[100,112,137],
					[50,58,65]]
	// var colourArray = [[255,0,0],
	// 				[0,255,0],
	// 				[0,0,255]]

$(function(){
	var $element = $('body'),
	$document = $(document),
	startX,startY
	mouseX = startX = lastX = w*0.55,
	mouseY = startY = lastY = h*0.55;

	createCanvas();

	function resetCanvas(){
		$element.find('canvas').remove();
		createCanvas();
	}

	$(window).resize(function() {
		resetCanvas();
	});

	function createCanvas() {
		w = $document.width();
		h = $document.height();
		canvas = $('<canvas alt="click" title="click"></canvas>');
		canvas.css({'position':'absolute','top':0,'left':0});
		ctx = canvas[0].getContext('2d');
		$element.append(canvas);
		canvas.attr('width',w+'px');
		canvas.attr('height',h+'px');
		ctx.fillStyle = 'rgb('+colourArray[0][0]+','+colourArray[0][1]+','+colourArray[0][2]+')';
		ctx.fillRect (0, 0, w, h);
	}
});