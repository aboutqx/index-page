import ViewLion from './ViewLion'

export default function play(){
    // init renderer
    var renderer = new THREE.WebGLRenderer({
    // antialias	: true,
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
    document.body.appendChild(renderer.domElement);

    // array of functions for the rendering loop
    var onRenderFcts = [];

    // init scene and camera
    var scene = new THREE.Scene();
  

    var ambient = new THREE.AmbientLight( 0x444444 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 'white' );
    directionalLight.position.set( 1, 8, 4.3 ).setLength(12)
    directionalLight.shadow.mapSize.set(256,128)
    directionalLight.shadow.camera.bottom = -12
    directionalLight.shadow.camera.top = 12
    directionalLight.shadow.camera.right = 12
    directionalLight.shadow.camera.left = -12
    directionalLight.castShadow = true;

    scene.add( directionalLight );
    // Create a camera
    var camera = new THREE.Camera();
    scene.add(camera);

    ////////////////////////////////////////////////////////////////////////////////
    //          handle arToolkitSource
    ////////////////////////////////////////////////////////////////////////////////
    let debug = false

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
        cameraParametersUrl: './data/data/camera_para.dat',
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

    // update artoolkit on every frame
    onRenderFcts.push(function () {
        if (arToolkitSource.ready === false) return

        arToolkitContext.update(arToolkitSource.domElement)
        scene.visible = camera.visible
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
    

    onRenderFcts.push(function () {
        // mesh.rotation.x += 0.1
        viewLion.render()
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