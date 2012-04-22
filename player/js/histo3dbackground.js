function histo3dBackgroundInit(sound){
	var world	= tQuery.world;

	var nBar	= 21;
	console.assert(nBar%2)
	var nBarHalf	= Math.ceil(nBar/2)
	var bars3d	= [];
	
	var barW	= 0.8;
	var group3d	= tQuery.createObject3D().addTo(world);
	group3d.rotateX(100*Math.PI/180)
	group3d.position(0,-1,0)
	for(var i = 0; i < nBar; i++){
		var material	= new THREE.MeshBasicMaterial({
			color	: 0x333333
		});

		var object3d	= tQuery.createCube(barW,30,0.2, material).addTo(group3d);
		object3d.position((i-nBar/2)*barW, 0, 0);

		bars3d.push(object3d)
	}
	
	var updateBar	= function(){
		if( sound.isPlayable() === false )	return;
		
		var histo	= sound.makeHistogram(nBarHalf);

		for(var i = 0; i < nBar; i++){
			var object3d	= bars3d[i];
			var histoIdx	= i < nBarHalf ? nBarHalf-1-i : i - nBarHalf;
			var height	= histo[histoIdx] / 256;
			object3d.get(0).scale.y	= height;
			object3d.get(0).material.color.setHSV(0.7+height*0.3,1,0.6)
		}
	};
	setInterval(function(){
		updateBar();
	}, 1000/60);



};
