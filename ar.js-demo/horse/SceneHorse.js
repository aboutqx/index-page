import ViewHorse from './ViewHorse'

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

    var arToolkitSource = new THREEx.ArToolkitSource({
    // to read from the webcam 
    sourceType: 'webcam',

    // to read from an image
    // sourceType : 'image',
    // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',		

    // to read from a video
    // sourceType : 'video',
    // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',		
    })

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


    // create atToolkitContext
    var arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: THREEx.ArToolkitContext.baseURL + './data/camera_para.dat',
        detectionMode: 'mono',
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
        patternUrl: THREEx.ArToolkitContext.baseURL + './data/pattern-marker.patt',
        changeMatrixMode: 'cameraTransformMatrix'
    })
    scene.visible = false

    //////////////////////////////////////////////////////////////////////////////////
    //		add an object in the scene
    //////////////////////////////////////////////////////////////////////////////////
    var markerScene = new THREE.Scene()
    markerGroup.add(markerScene)


    // var mesh = new THREE.AxisHelper()
    // markerScene.add(mesh)
    // add a torus knot	
    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = geometry.parameters.height / 2
    // markerScene.add(mesh);

    var geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16);
    var material = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.5
     // markerScene.add(mesh);
     
    var material = new THREE.ShadowMaterial();
    material.opacity = 0.7; //! bug in threejs. can't set in constructor
    var geometry = new THREE.PlaneGeometry(6, 6)
    var planeMesh = new THREE.Mesh( geometry, material);
    planeMesh.receiveShadow = true;
    planeMesh.depthWrite = false;
    planeMesh.rotation.x = -Math.PI/2
    markerScene.add(planeMesh);

    let viewHorse = new ViewHorse(scene,camera,renderer)
    viewHorse.load(()=>{

        markerScene.add(viewHorse.mesh);
        directionalLight.target = mesh
    })
    

    onRenderFcts.push(function () {
    // mesh.rotation.x += 0.1
    viewHorse.render()
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