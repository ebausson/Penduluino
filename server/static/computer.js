function computerInit(){
  
  initComputerDom();
  
  
  // device seems to be a computer, here come the rendering code.
  socket = io.connect(socketLocation + "/computer");
  socket.on('handshake', function (data) {
    console.log(data);
    socket.emit('handshake', { my: navigator.userAgent });
  });
  
  socket.on('pendulum', function (data) {
    if( typeof(captors) === "undefined" )	return;
    Object.keys(data).forEach(function(captor){
      var value	= captors[captor];
      console.log("captor", captor, "value", value);
      var object	= captors[captor];
      object && object.tick();
    })
    
    /*
    console.log(data);
    for(var p in data){
      document.getElementById(p).className = data[p] ? 'on' : 'off';
    }
    */
  });
      
  socket.on('mobile', function(data){
    console.log('+MOBILE');
    console.log(data);
  });
}


function initComputerDom(){

      world	= tQuery.createWorld().boilerplate().start();
      world.renderer().setClearColorHex( 0x000000, 0 );

      initCameraControls(world);

      // init the library
      webaudio	= new WebAudio();

      // add lights
      tQuery.createDirectionalLight().addTo(world).position(1,1,1);
      tQuery.createDirectionalLight().addTo(world).position(-1,1,1);
      tQuery.createAmbientLight().addTo(world).color(0xFFFFFF);

      tLight	= new THREE.PointLight(0xFFAAAA, 10);
      tLight.position.set(0,0,0)

      tQuery(tLight).addTo(world);


      // create planets

      // sun
      if( true ){
        var planet	= new tQuery.Planet({
          textureUrl	: 'images/sunmap.jpg',
          soundUrl	: '../sounds/eatpill.mp3',
          soundUrl	: '../sounds/Kit3/kick.wav',
          radiusOrbit	: 0,
          periodOrbit	: 1
        });
        planet.object3d().addTo(world);
        if( hiGlEnable )	planet.planet().useFileballMaterial(2);
        var sun	= planet
        world.loop().hook(function(){
          // neutral value
          var min		= 0;
          var max		= 1;
          var offset	= 0;
          var range	= 1;
          var tweenFn	= TWEEN.Easing.Linear.None;
          // tuned value
          var min		= 0.7;
          var max		= 1;
          var offset	= 0.8;
          var range	= 1.2;
          var tweenFn	= TWEEN.Easing.Circular.InOut;
          var tweenFn	= TWEEN.Easing.Quadratic.InOut;
          // normalization of the scale
          var scale	= soundtrack.amplitude();
          
          scale		= Math.min(scale, max);
          scale		= Math.max(scale, min);
          scale		-= min;
          scale		/= max == min ? 1 : max - min;
          scale		= tweenFn(scale);
          scale		*= range;
          scale		+= offset;
          // apply a smooth on the result... doesnt work well on sound
          var oldScale	= sun.planet().get(0).scale.x;
          var spdScale	= 0.6;
          var newScale	= scale*spdScale+oldScale*(1-spdScale);
          // application of the scale
          sun.planet().scale(newScale);
        }); 
      }

      // moon	
      if( true ){
        var planet	= new tQuery.Planet({
          textureUrl	: 'images/moon_1024.jpg',
          //textureUrl	: 'images/earth_atmos_2048.jpg',
          soundUrl	: '../sounds/eatpill.mp3',
          soundUrl	: '../sounds/Kit3/hihat.wav',
          radiusOrbit	: 1,
          periodOrbit	: 2,
          axialTilt	: -23*Math.PI/180
        });
        planet.object3d().addTo(world);
        captors['p2']	= planet;
        var moon = planet;
        //planet.sound();
      }
      

      // mercury
      if( true ){
        var planet	= new tQuery.Planet({
          textureUrl	: 'images/mercurymap.jpg',
          soundUrl	: '../sounds/eatpill.mp3',
          soundUrl	: '../sounds/Kit3/snare.wav',
          radiusOrbit	: 2,
          periodOrbit	: 3,
          scale		: 0.2
        });
        captors['p3']	= planet;
        planet.object3d().addTo(world);		
      }

      // mercury
      if( true ){
        var planet	= new tQuery.Planet({
          textureUrl	: 'images/mercurymap.jpg',
          soundUrl	: '../sounds/Kit3/snare.wav',
          radiusOrbit	: 3,
          periodOrbit	: 3,
          scale		: 0.2
        });
        captors['p4']	= planet;
        planet.object3d().addTo(world);		
      }

      // mercury
      if( true ){
        var planet	= new tQuery.Planet({
          textureUrl	: 'images/mercurymap.jpg',
          soundUrl	: '../sounds/Kit3/snare.wav',
          radiusOrbit	: 4,
          periodOrbit	: 3,
          scale		: 0.2
        });
        captors['p5']	= planet;
        planet.object3d().addTo(world);		
      }

      // mercury
      if( true ){
        var planet	= new tQuery.Planet({
          textureUrl	: 'images/mercurymap.jpg',
          soundUrl	: '../sounds/Kit3/snare.wav',
          radiusOrbit	: 5,
          periodOrbit	: 3,
          scale		: 0.2
        });
        captors['p6']	= planet;
        planet.object3d().addTo(world);		
      }


      if( trackEnable )		soundtrack	= soundtrackCreate();
      //if( trackEnable && bg2dEnable )	histo2dBackgroundInit(soundtrack);
      histo3dBackgroundInit(soundtrack);
}
