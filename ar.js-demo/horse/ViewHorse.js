const ANIMATION_GROUPS = 25;
const FLOOR = 0;
let animGroups = [],morphs=[];
export default class  ViewHorse {

	constructor(scene,camera,renderer){
		this.scene = scene,this.camera = camera,this.renderer = renderer
		this.clock = new THREE.Clock();
		this._init()
	}

	//  PRIVATE MATHODS
	_init(){

		this.mixer = new THREE.AnimationMixer( this.scene );

		for ( var i = 0; i !== ANIMATION_GROUPS; ++ i ) {

			var group = new THREE.AnimationObjectGroup();
			animGroups.push( new THREE.AnimationObjectGroup() );

		}

		
	}
		

	//	PUBLIC METHODS
	load(fn){
		var loader = new THREE.JSONLoader();
		let self = this;
		loader.load( "models/animated/horse.js", function( geometry ) {

			for ( var i = 0; i < 2; i += 2 ) {

				self._addMorph( geometry, 55, 1, 0 , FLOOR, 0, true, true );

			}
			fn()
		} );
	}


	render(){
		var delta = this.clock.getDelta();

		if ( this.mixer ) this.mixer.update( delta );
	}
    

	// MORPHS

	_addMorph( geometry, speed, duration, x, y, z, fudgeColor, massOptimization ) {

		var material = new THREE.MeshLambertMaterial( { color: 0xffaa55, morphTargets: true, vertexColors: THREE.FaceColors } );

		if ( fudgeColor ) {

			material.color.offsetHSL( 0, Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25 );

		}

		var mesh = new THREE.Mesh( geometry, material );
		mesh.speed = speed;

		var clip = geometry.animations[ 0 ];

		if ( massOptimization ) {

			var index = Math.floor( Math.random() * ANIMATION_GROUPS ),
				animGroup = animGroups[ index ];

			animGroup.add( mesh );

			if ( ! this.mixer.existingAction( clip, animGroup ) ) {

				var randomness = 0.6 * Math.random() - 0.3;
				var phase = ( index + randomness ) / ANIMATION_GROUPS;

				this.mixer.clipAction( clip, animGroup ).
						setDuration( duration ).
						startAt( - duration * phase ).
						play();

			}

		} else {

			this.mixer.clipAction( clip, mesh ).
					setDuration( duration ).
					startAt( - duration * Math.random() ).
					play();

		}

		mesh.position.set( x, y, z );
		mesh.rotation.y = -Math.PI/4;
		mesh.scale.set(1/100,1/100,1/100)

		mesh.castShadow = true;
		mesh.receiveShadow = true;


		morphs.push( mesh );
		this.mesh = mesh

	}


}
