
import ViewLion from './ViewLion'
import ViewYuanBao from './ViewYuanBao'
window.debug = false

export default function play(container){
    // init renderer
    var renderer = new THREE.WebGLRenderer({
    antialias	: true,
    alpha: true
    });

    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.shadowMap.enabled = true;
    renderer.autoClear = false;

    renderer.setClearColor( 0x000000);
    // renderer.setPixelRatio( 1/2 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    container.appendChild(renderer.domElement);

    // array of functions for the rendering loop
    var onRenderFcts = [];

    // init scene and camera
    var scene = new THREE.Scene();
  

    scene.add(new THREE.AmbientLight(0x222222));

    var particleLight = new THREE.Mesh(new THREE.SphereBufferGeometry(4, 8, 8), new THREE.MeshBasicMaterial({
        color: 0xffffff
    }));

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    
    scene.add(particleLight);
    var pointLight = new THREE.PointLight(0xffffff, 1,500);
    particleLight.add(pointLight);
    particleLight.position.set(12, 12,-12).normalize();
    // Create a camera
    var camera = new THREE.Camera();
    scene.add(camera);

    ////////////////////////////////////////////////////////////////////////////////
    //          handle arToolkitSource
    ////////////////////////////////////////////////////////////////////////////////

    let sourceParam
    if(debug) {
        sourceParam = {
            sourceType : 'image',
            sourceUrl : './parttern/fu-profile.png',
        }
    } else {
        sourceParam = { sourceType: 'webcam' }
    }
    var arToolkitSource = new THREEx.ArToolkitSource(sourceParam)

    arToolkitSource.init(function onReady() {
    onResize()
    })

    // handle resize
    window.addEventListener('resize', function () {
    onResize()
    })

    function onResize() {
        arToolkitSource.onResize()
        arToolkitSource.copySizeTo(renderer.domElement)
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
        }
    }
    ////////////////////////////////////////////////////////////////////////////////
    //          initialize arToolkitContext
    ////////////////////////////////////////////////////////////////////////////////

    // artoolkitProfile.contextParameters.patternRatio = 0.9
    // create atToolkitContext
    var arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: './data/camera_para.dat',
        detectionMode: 'mono',
        patternRatio: 0.9
        // maxDetectionRate: 30,
        // canvasWidth: 80 * 3,
        // canvasHeight: 60 * 3,
    })
    // initialize it
    arToolkitContext.init(function onCompleted() {
        // copy projection matrix to camera
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    })

    var debounceMatrices = [];

    function smoothCamera(inputMatrix, debounce_count = 5) {
        // Creates a moving average over the last n matrices.
        debounceMatrices.push(inputMatrix);
        if (debounceMatrices.length < debounce_count + 1) {
            return inputMatrix;
        } else {
            debounceMatrices.shift();
            let outputMatrix = new THREE.Matrix4().multiplyScalar(0);
            for (let n in debounceMatrices) {
                for (let i in debounceMatrices[n].elements) {
                    outputMatrix.elements[i] += debounceMatrices[n].elements[i];
                }
            }
            return outputMatrix.multiplyScalar(1 / debounce_count)
            //取过去5个matrix的平均值
        }
    }

    // update artoolkit on every frame
    onRenderFcts.push(function () {
        if (arToolkitSource.ready === false) return

        arToolkitContext.update(arToolkitSource.domElement)
        scene.visible = camera.visible
        camera.updateMatrix()
        camera.matrix.copy(smoothCamera(camera.matrix.clone()))
    })


    ////////////////////////////////////////////////////////////////////////////////
    //          Create a ArMarkerControls
    ////////////////////////////////////////////////////////////////////////////////

    var markerGroup = new THREE.Group
    scene.add(markerGroup)
    var artoolkitMarker = new THREEx.ArMarkerControls(arToolkitContext, camera, {
        type: 'pattern',
        patternUrl: './parttern/fu-marker.patt',
        changeMatrixMode: 'cameraTransformMatrix'
    })
    scene.visible = false

    // build a smoothedControls
    var smoothedGroup = new THREE.Group()
    scene.add(smoothedGroup)
    var smoothedControls = new THREEx.ArSmoothedControls(smoothedGroup, {
        lerpPosition: 0.8,
        lerpQuaternion: 0.8,
        lerpScale: 1,
    })
    onRenderFcts.push(function(delta){
    	smoothedControls.update(markerGroup)
    })
    //////////////////////////////////////////////////////////////////////////////////
    //		add an object in the scene
    //////////////////////////////////////////////////////////////////////////////////
    var markerScene = new THREE.Scene()
    markerGroup.add(markerScene)

    markerScene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
    
    if(debug) {
        var mesh = new THREE.AxesHelper()
        markerScene.add(mesh)
    }

     
    var material = new THREE.ShadowMaterial();
    material.opacity = 0.7; //! bug in threejs. can't set in constructor
    var geometry = new THREE.PlaneGeometry(6, 6)
    var planeMesh = new THREE.Mesh( geometry, material);
    planeMesh.receiveShadow = true;
    planeMesh.depthWrite = false;
    planeMesh.rotation.x = -Math.PI/2
    markerScene.add(planeMesh);

    let viewLion = new ViewLion(scene, camera, renderer)
    viewLion.load(() => {

        markerScene.add(viewLion.mesh)
        directionalLight.target = viewLion.mesh
    })
    
    let viewYuanBao = new ViewYuanBao(scene, camera, renderer)
    viewYuanBao.load(() => {
        markerScene.add(viewYuanBao.mesh[0])
    })

    onRenderFcts.push(function () {
        // mesh.rotation.x += 0.1
        viewLion.render()
        viewYuanBao.render()
    })

 


    //////////////////////////////////////////////////////////////////////////////////
    //		render the whole thing on the page
    //////////////////////////////////////////////////////////////////////////////////
    var stats = new Stats();
    document.body.appendChild(stats.dom);
    // render the scene
    onRenderFcts.push(function () {
        renderer.render(scene, camera);
        stats.update();
    })

    // run the rendering loop
    var lastTimeMsec = null
    requestAnimationFrame(function animate(nowMsec) {
        // keep looping
        requestAnimationFrame(animate);
        // measure time
        lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
        var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec = nowMsec
            // call each update function
        onRenderFcts.forEach(function (onRenderFct) {
            onRenderFct(deltaMsec / 1000, nowMsec / 1000)
        })
    })
}