
var canvas;
var gl;

var cubeVerticesBuffer;
var cubeVerticesColorBuffer;
var cubeVerticesIndexBuffer;
var cubeVerticesIndexBuffer;
var cubeRotation = 0.0;
var cubeXOffset = 0.0;
var cubeYOffset = 0.0;
var cubeZOffset = 0.0;
var lastCubeUpdateTime = 0;
var xIncValue = 0.2;
var yIncValue = -0.4;
var zIncValue = 0.3;

var mvMatrix;
var shaderProgram;
var vertexPositionAttribute;
var vertexColorAttribute;
var textureCoordAttribute;
var perspectiveMatrix;

//
// start
//
// Called when the canvas is created to get the ball rolling.
//
function start() {
  canvas = document.getElementById("glcanvas");

  initWebGL(canvas);      // Initialize the GL context

  // Only continue if WebGL is available and working

  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Initialize the shaders; this is where all the lighting for the
    // vertices and so forth is established.
  this.$SphericalRenderer1=gl;
    initShaders();

    // Here's where we call the routine that builds all the objects
    // we'll be drawing.

    initBuffers();

    initTextures();

    
  }
}
var cubeTexture;
function initTextures() {
  cubeTexture = gl.createTexture();
  cubeImage = new Image();
  cubeImage.onload = function() { handleTextureLoaded(cubeImage, cubeTexture); }
  cubeImage.src = "Koala.jpg";
}

function handleTextureLoaded(image, texture) {
  console.log("handleTextureLoaded, image = " + image);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
        gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  this.$SphericalRenderer1.texParameteri(this.$SphericalRenderer1.TEXTURE_2D, this.$SphericalRenderer1.TEXTURE_WRAP_S, this.$SphericalRenderer1.CLAMP_TO_EDGE);
  this.$SphericalRenderer1.texParameteri(this.$SphericalRenderer1.TEXTURE_2D, this.$SphericalRenderer1.TEXTURE_WRAP_T, this.$SphericalRenderer1.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);

  setInterval(drawScene, 15);
}
//
// initWebGL
//
// Initialize WebGL, returning the GL context or null if
// WebGL isn't available or could not be initialized.
//
function initWebGL() {
  gl = null;

  try {
    gl = canvas.getContext("webgl");
  }
  catch(e) {
  }

  // If we don't have a GL context, give up now

  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
  }
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just have
// one object -- a simple two-dimensional cube.
//
function initBuffers() {
  
  o=3;
  var p = 2,
            q = 3,
            r = [5, 1, 3, 7, 0, 4, 6, 2, 6, 7, 3, 2, 0, 1, 5, 4, 4, 5, 7, 6, 1, 0, 2, 3],
            s = [];
        for (var t = 0; t < r.length; t++) {
            var u = r[t] >> 2 & 1,
                v = r[t] >> 1 & 1,
                w = r[t] >> 0 & 1;
            s.push(u * 2 - 1);
            s.push(v * 2 - 1);
            s.push(w * 2 - 1); }
        this.$SphericalRenderer14 = this.$SphericalRenderer1.createBuffer();
        this.$SphericalRenderer1.bindBuffer(this.$SphericalRenderer1.ARRAY_BUFFER, this.$SphericalRenderer14);
        this.$SphericalRenderer1.bufferData(this.$SphericalRenderer1.ARRAY_BUFFER, new Float32Array(s), this.$SphericalRenderer1.STATIC_DRAW);
        this.$SphericalRenderer14.itemSize = 3;
        this.$SphericalRenderer14.numItems = s.length / 3;
        var x = [],
            y = 1 / q,
            z = 1 / p,
            aa = (o - 1) / 2;
        for (var ba = 0; ba < p; ++ba)
            for (var ca = 0; ca < q; ++ca) {
                var da = p - 1 - ba,
                    ea = ca;
                x.push((ea + aa) * y);
                x.push((da + aa) * z);
                x.push((ea + 1 - aa) * y);
                x.push((da + aa) * z);
                x.push((ea + 1 - aa) * y);
                x.push((da + 1 - aa) * z);
                x.push((ea + aa) * y);
                x.push((da + 1 - aa) * z); }
        this.$SphericalRenderer13 = this.$SphericalRenderer1.createBuffer();
        this.$SphericalRenderer1.bindBuffer(this.$SphericalRenderer1.ARRAY_BUFFER, this.$SphericalRenderer13);
        this.$SphericalRenderer1.bufferData(this.$SphericalRenderer1.ARRAY_BUFFER, new Float32Array(x), this.$SphericalRenderer1.STATIC_DRAW);
        this.$SphericalRenderer13.itemSize = 2;
        this.$SphericalRenderer13.numItems = x.length / 2;
        var fa = [];
        for (var ga = 0; ga < r.length; ga += 4) { fa.push(ga);
            fa.push(ga + 2);
            fa.push(ga + 1);
            fa.push(ga);
            fa.push(ga + 3);
            fa.push(ga + 2); }
        this.$SphericalRenderer15 = this.$SphericalRenderer1.createBuffer();
        this.$SphericalRenderer1.bindBuffer(this.$SphericalRenderer1.ELEMENT_ARRAY_BUFFER, this.$SphericalRenderer15);
        this.$SphericalRenderer1.bufferData(this.$SphericalRenderer1.ELEMENT_ARRAY_BUFFER, new Uint16Array(fa), this.$SphericalRenderer1.STATIC_DRAW);
        this.$SphericalRenderer15.itemSize = 1;
        this.$SphericalRenderer15.numItems = fa.length; 
}

//
// drawScene
//
// Draw the scene.
//

function drawScene() {
  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Establish the perspective with which we want to view the
  // scene. Our field of view is 45 degrees, with a width/height
  // ratio of 640:480, and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);
  
  // Set the drawing position to the "identity" point, which is
  // the center of the scene.

  loadIdentity();

  // Now move the drawing position a bit to where we want to start
  // drawing the cube.

  mvTranslate([-0.0, 0.0, -6.0]);

  // Save the current matrix, then rotate before we draw.

  mvPushMatrix();
  mvRotate(cubeRotation, [1, 0, 1]);
  mvTranslate([cubeXOffset, cubeYOffset, cubeZOffset]);

  // Draw the cube by binding the array buffer to the cube's vertices
  // array, setting attributes, and pushing it to GL.
  this.$SphericalRenderer1.clear(this.$SphericalRenderer1.COLOR_BUFFER_BIT | this.$SphericalRenderer1.DEPTH_BUFFER_BIT);
  this.$SphericalRenderer1.activeTexture(this.$SphericalRenderer1.TEXTURE0);
  this.$SphericalRenderer1.bindTexture(this.$SphericalRenderer1.TEXTURE_2D, cubeTexture);
  this.$SphericalRenderer1.uniform1i(this.$SphericalRenderer4.samplerUniform, 0);
  gl.bindBuffer(this.$SphericalRenderer1.ARRAY_BUFFER, this.$SphericalRenderer14);
  gl.vertexAttribPointer(vertexPositionAttribute, this.$SphericalRenderer14.itemSize, this.$SphericalRenderer1.FLOAT, false, 0, 0);
  gl.bindBuffer(this.$SphericalRenderer1.ARRAY_BUFFER, this.$SphericalRenderer13);
  gl.vertexAttribPointer(textureCoordAttribute, this.$SphericalRenderer13.itemSize, this.$SphericalRenderer1.FLOAT, false, 0, 0);
  gl.bindBuffer(this.$SphericalRenderer1.ELEMENT_ARRAY_BUFFER, this.$SphericalRenderer15);
  gl.uniformMatrix4fv(this.$SphericalRenderer4.pMatrixUniform, false, perspectiveMatrix.flatten());
  gl.uniformMatrix4fv(this.$SphericalRenderer4.mvMatrixUniform, false, mvMatrix.flatten());

  gl.drawElements(gl.TRIANGLES, self.$SphericalRenderer15.numItems, gl.UNSIGNED_SHORT, 0);


  // Update the rotation for the next draw, if it's time to do so.

  var currentTime = (new Date).getTime();
  if (lastCubeUpdateTime) {
    var delta = currentTime - lastCubeUpdateTime;
    if(delta<1111) return;
    cubeRotation += (30 * delta) / 1000.0;
    cubeXOffset += xIncValue * ((30 * delta) / 1000.0);
    cubeYOffset += yIncValue * ((30 * delta) / 1000.0);
    cubeZOffset += zIncValue * ((30 * delta) / 1000.0);

    if (Math.abs(cubeYOffset) > 2.5) {
      xIncValue = -xIncValue;
      yIncValue = -yIncValue;
      zIncValue = -zIncValue;
    }
  }

  lastCubeUpdateTime = currentTime;
}

//
// initShaders
//
// Initialize the shaders, so WebGL knows how to light our scene.
//
function initShaders() {
  var fragmentShader = getShader(gl, "shader-fs");
  var vertexShader = getShader(gl, "shader-vs");

  // Create the shader program

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }

  gl.useProgram(shaderProgram);
  this.$SphericalRenderer4=shaderProgram;

  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
  gl.enableVertexAttribArray(textureCoordAttribute);
  this.$SphericalRenderer4.pMatrixUniform = this.$SphericalRenderer1.getUniformLocation(this.$SphericalRenderer4, 'uPMatrix');
  this.$SphericalRenderer4.mvMatrixUniform = this.$SphericalRenderer1.getUniformLocation(this.$SphericalRenderer4, 'uMVMatrix');
  this.$SphericalRenderer4.samplerUniform = this.$SphericalRenderer1.getUniformLocation(this.$SphericalRenderer4, 'uSampler');
}

//
// getShader
//
// Loads a shader program by scouring the current document,
// looking for a script with the specified ID.
//
function getShader(gl, id) {
  var shaderScript = document.getElementById(id);

  // Didn't find an element with the specified ID; abort.

  if (!shaderScript) {
    return null;
  }

  // Walk through the source element's children, building the
  // shader source string.

  var theSource = "";
  var currentChild = shaderScript.firstChild;

  while(currentChild) {
    if (currentChild.nodeType == 3) {
      theSource += currentChild.textContent;
    }

    currentChild = currentChild.nextSibling;
  }

  // Now figure out what type of shader script we have,
  // based on its MIME type.

  var shader;

  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;  // Unknown shader type
  }

  // Send the source to the shader object

  gl.shaderSource(shader, theSource);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

//
// Matrix utility functions
//

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

var mvMatrixStack = [];

function mvPushMatrix(m) {
  if (m) {
    mvMatrixStack.push(m.dup());
    mvMatrix = m.dup();
  } else {
    mvMatrixStack.push(mvMatrix.dup());
  }
}

function mvPopMatrix() {
  if (!mvMatrixStack.length) {
    throw("Can't pop from an empty matrix stack.");
  }

  mvMatrix = mvMatrixStack.pop();
  return mvMatrix;
}

function mvRotate(angle, v) {
  var inRadians = angle * Math.PI / 180.0;

  var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
  multMatrix(m);
}
