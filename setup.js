var canvas, ctx, w, h,
	colourArray = [ [250,248,251],
					[240,240,244],
					[226,230,236],
					[212,219,225],
					[190,203,210],
					[160,178,194],
					[100,112,137],
					[50,58,65]];
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