function backgroundInit(sound){
	var canvas	= document.createElement('canvas');
	canvas.width	= window.innerWidth;
	canvas.height	= window.innerHeight;
	canvas.id	= "background";
	var ctx		= canvas.getContext("2d");  
	document.body.appendChild(canvas)

	/**
	 * Put this function is .Sound with getByt as private callback
	*/
	var updateBar	= function(){
		if( sound.isPlayable() === false )	return;
		
		var nBar	= 40;
		var histo	= sound.makeHistogram(nBar);

		// clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawHisto(canvas, histo);
		return;

		/**
		 * This could be in image processing too
		*/
		function drawHisto(canvas, histo){
			var nBar	= histo.length;
			var barW	= Math.floor(canvas.width/nBar);
			for(var i = 0; i < histo.length; i++){
				var height	= Math.floor(histo[i]) / 256;
				
				ctx.fillStyle	= "hsl("+(height*360)+", 100%, 50%)";
				
				var heightPix	= height * canvas.height;
				ctx.fillRect(i*barW, canvas.height-heightPix, barW, heightPix) ;
			}
		}
	};
	setInterval(function(){
		updateBar();
	}, 1000/60);
};
