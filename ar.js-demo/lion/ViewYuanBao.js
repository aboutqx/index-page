
let prevTime = 0
let now = 0
export default class ViewLion {

    constructor(scene, camera, renderer) {
        this.scene = scene, this.camera = camera, this.renderer = renderer
        this.clock = new THREE.Clock()
        this._originalMesh = null
        this._init()
    }

    //  PRIVATE MATHODS
    _init() {
        this.mesh = []
        const scaleSize = window.debug ? 120 :180
        this.scaleSize = scaleSize
    }


    //	PUBLIC METHODS
    load(fn) {
        var loader = new THREE.FBXLoader()
        loader.load('models/animated/yuanbao.FBX', (mesh) => {

            mesh.scale.set(this.scaleSize, this.scaleSize, this.scaleSize)
            mesh.rotation.x = Math.PI * 1.2
            mesh.position.y = 1.
            mesh.position.z = -1.7

            this._originalMesh = mesh
            this.mesh.push(mesh)

            fn()
        })
    }


    render() {
        var delta = this.clock.getDelta()
        now = performance.now()
        if (now - prevTime > 2000 && this._originalMesh && this._originalMesh.position.z > 0) {
            for (let j = 0; j < 3; j++) {
                let clone = this._originalMesh.clone()
                clone.position.x = (Math.random()*2 -1) * 2
                clone.position.z = -1.7-Math.random()

                this.scene.add(clone)
                this.mesh.push(clone)
            }

            prevTime = now
        }


        if (this.mesh) {
            for (let i = 0; i < this.mesh.length; i++) {

                this.mesh[i].position.z += .04

                let camera = this.camera
                camera.updateMatrix();
                camera.updateMatrixWorld();
                var frustum = new THREE.Frustum();
                frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));

                // Your 3d point to check
                var pos = this.mesh[i].position
                if (!frustum.containsPoint(new THREE.Vector3(pos.x, pos.y, pos.z-.8)) && pos.z > 0) {
                    this.scene.remove(this.mesh[i])
                    // this.mesh.shift()
                }
            }
        }
    }

    _setMatrial(mesh) {
        // mesh.material.map = new THREE.CanvasTexture(document.querySelector('img'))
    }
}