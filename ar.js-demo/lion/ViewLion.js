
export default class  ViewLion {

	constructor(scene,camera,renderer){
		this.scene = scene,this.camera = camera,this.renderer = renderer
		this.clock = new THREE.Clock()
		this._init()
	}

	//  PRIVATE MATHODS
	_init(){
		this.mixers = []
		const scaleSize = window.debug ? 0.03 : .06
		this.scaleSize = scaleSize
	}
		

	//	PUBLIC METHODS
	load(fn){
		var loader = new THREE.FBXLoader();
		loader.load('models/animated/lion.FBX', (mesh) => {
			mesh.mixer = new THREE.AnimationMixer(mesh);
			this.mixers.push(mesh.mixer);
			var action = mesh.mixer.clipAction(mesh.animations[0]);
			action.play();
			mesh.traverse((child) => {
				if (child.isMesh) {
					// child.castShadow = true;
					child.receiveShadow = true;

					this._setMatrial(child)
				}
			});

			mesh.scale.set(this.scaleSize, this.scaleSize, this.scaleSize)
			mesh.rotation.y = Math.PI
			mesh.rotation.x = -Math.PI / 2
			this.mesh = mesh
			fn()
		})
	}


	render(){
		var delta = this.clock.getDelta();

		if (this.mixers.length > 0) {
			for (var i = 0; i < this.mixers.length; i++) {
				this.mixers[i].update(delta);
			}
		}
	}
    
	_setMatrial (mesh) {
		// mesh.material = new THREE.MeshPhongMaterial({
		// 	color: new THREE.Color(0xff0000)
		// })
		mesh.material.map = new THREE.CanvasTexture(document.querySelector('img'))
	}
}
