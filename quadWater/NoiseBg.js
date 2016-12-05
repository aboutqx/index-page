import glProgram from './glProgram';
import glMatrix from 'gl-matrix';
import {arrayBuffer} from './glBuffer';
for(var r = 512, o = new Uint8Array(r * r), a = 0;r * r > a;a++){
	o[a] = Math.min(255 * Math.random() * 3, 255);
}

var noiseTexture = (function() {
    function e(t) {
            this.gl = t,
            this.id = this.gl.createTexture(),
            t.bindTexture(t.TEXTURE_2D, this.id),
            t.texImage2D(t.TEXTURE_2D, 0, t.LUMINANCE, r, r, 0, t.LUMINANCE, t.UNSIGNED_BYTE, o),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT),
            t.bindTexture(t.TEXTURE_2D, null)
    }
    return e.prototype.bind= function(e, t) {
                var n = this.gl;
                n.activeTexture(n.TEXTURE0 + t),
                    n.bindTexture(n.TEXTURE_2D, this.id),
                    n.uniform1i(e, t)
            },
        e
})();
var noiseVShader = [
	'#define GLSLIFY 1',
	'precision highp float;',
	'attribute vec2 aPosition;',
	'uniform vec2 uResolution;',
	'varying vec2 vResolution;',
	'void main() {',
		'vResolution = uResolution;',
    	'gl_Position = vec4(aPosition, 1., 1);',
  
	'}'
].join('\n');

var noiseFShader = [
	'#define GLSLIFY 1',
	'precision highp float;',
	'varying vec2 vResolution;',
	'uniform vec4 uNoiseParam;',
	'uniform vec2 uNoiseRand;',
	'uniform sampler2D tNoise;',

	'void main( void ){',
	  'vec2 vTexCoord=gl_FragCoord.xy/vResolution.xy;',
	  'vTexCoord.y = vTexCoord.y * uNoiseParam.z;',
	  'float dist     = 0.5 - distance( vTexCoord.xy, uNoiseParam.xy );',
	  'float texColor = texture2D(tNoise, ( vTexCoord.xy + uNoiseRand ) * uNoiseParam.w ).r * 0.4;',
	  
	  'float color     = dist * texColor*1.2 ;',
	  'gl_FragColor   = vec4( color, color,color, 1.0 );',
	'}'
].join('\n');

var vec2 = glMatrix.vec2;
var mat2 = glMatrix.mat2;

var NoiseBg = function(gl) {
	this.gl=gl;
	var self=this;

    this.noiseTexture =new  noiseTexture(gl);
    this.noisePrg = new glProgram(gl);
    this.noisePrg.compile(noiseVShader,noiseFShader);
    this.randomOffset = vec2.create();
    this.resolution = vec2.create();
	this.mouse = vec2.create(),
	this.noiseParam = mat2.create(),
	this.mouse[0] = window.innerWidth / 2,
	this.mouse[1] = window.innerHeight / 2,
	window.addEventListener("mousemove", function(e) {
		self.mouse[0] = e.clientX,
		self.mouse[1] = e.clientY
	}),

    this.vBuffer = new arrayBuffer(gl);
    this.init()
}
NoiseBg.prototype = {
	init: function(){
		
		this.vBuffer.attrib('aPosition',2,this.gl.FLOAT);
		this.vBuffer._stride=0;	
		
	},
	prepare: function(){//Setup all the needed attributes.
		var data=new Float32Array([
			  -1, -1,
			  1, -1,
			  -1, 1,
			  1, -1,
			  1, 1,
			  -1, 1,
		]);
		this.vBuffer.data(data);

		this.resolution[0]= window.innerWidth;
		this.resolution[1] = window.innerHeight;
		this.noisePrg.bind(),
		this.vBuffer.attribPointer(this.noisePrg);
		this.noiseTexture.bind(this.noisePrg.tNoise(), 0);

		this.randomOffset[0] = Math.random(),
		this.randomOffset[1] = Math.random(),
		this.noiseParam[0] = this.mouse[0] / this.resolution[0],
		this.noiseParam[1] = (this.resolution[1] - this.mouse[1]) / this.resolution[0],
		this.noiseParam[2] = this.resolution[1] / this.resolution[0],
		this.noiseParam[3] = this.resolution[0] / 512
	},
	render: function(){
		var e=this.gl;
		this.prepare();

		this.noisePrg.uResolution(this.resolution[0],this.resolution[1]);
		this.noisePrg.uNoiseParam(this.noiseParam);
		this.noisePrg.uNoiseRand(this.randomOffset);

		e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
		e.disable(e.CULL_FACE),
		this.vBuffer.drawTriangles(6,0);
		e.enable(e.CULL_FACE)
	},
	getComposerPass:function(){
		return new g(this)
	}
}
var g=function(){
	var Pass=function(t){
		this.noise = t,
    	this.enabled = !0
	}
	Pass.prototype.render=function(e,t,n){
		e.setRenderTarget(n),
	    this.noise.render()
	}
	return Pass
}();
	
module.exports = NoiseBg;
