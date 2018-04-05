import glProgram from './glProgram';
import glTexture from './glTexture';
import * as glMatrix from 'gl-matrix';
import { arrayBuffer, indexBuffer } from './glBuffer';

var ribbonVShader = "#define GLSLIFY 1\n" +
    "attribute vec4 aDeltas;\n" +
    "attribute vec2 aCenter;\n" +
    "attribute vec2 aParams;\n" +
    "uniform vec2 uVPScale;\n" +
    "uniform float uTime;\n" +
    "varying vec2 vTexCoord;\n" +
    "varying float vLighting;\n" +
    "#define EXP_SLOPE 8.0\n" +
    "#define EXP_MIDPT 1.0\n" +
    "void main( void ){\n" +
    "  float dt = uTime-aParams.x;\n" +
    "  float expand = -abs( dt-EXP_MIDPT) * EXP_SLOPE + (EXP_SLOPE*EXP_MIDPT);\n" +
    "  expand = clamp( expand, 0.0, 1.0 );\n" +
    "  gl_Position.xy = uVPScale * ( aCenter.xy + aDeltas.xy + aDeltas.zw*expand );\n" +
    "  gl_Position.zw = vec2( 0.0, 1.0 );\n" +
    "  vTexCoord.xy   = 2.0 * (gl_Position.xy * .5 + .5) / uVPScale;\n" +
    "  vLighting = aParams.y*.7 +1.2;\n" +
    "}\n";

var ribbonFShader = ['#define GLSLIFY 1',
'precision highp float;',
'#define TAU 6.28318530718',
'#define MAX_ITER 5',
'uniform float uTime;',
'uniform vec2 iResolution;',
'varying float vLighting;',
'uniform sampler2D uGradTex;',
'void main()' ,
'{',
    'float time = uTime * .5+23.0;',
    'vec2 uv = gl_FragCoord.xy / iResolution.xy;',
    'vec2 p = mod(uv*TAU, TAU)-250.0;',
    'vec2 i = vec2(p);',
    'float c = 1.0;',
    'float inten = .005;',
    'for (int n = 0; n < MAX_ITER; n++)', 
    '{',
        'float t = time * (1.0 - (3.5 / float(n+1)));',
        'i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));',
        'c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));',
    '}',
    'c /= float(MAX_ITER);',
    'c = 1.17-pow(c, 1.4);',
    'vec3 colour = vec3(pow(abs(c), 8.0));',
    'colour = vec3(0.0, 0.35, 0.5);//clamp(colour + vec3(0.0, 0.35, 0.5), 0.0, 1.0);',
    'gl_FragColor = vLighting*texture2D( uGradTex, vec2( 1.0 - (colour.x * 5.0 - colour.y * 5.0), .5 ) );',
'}'
].join('\n');
var shadowVShader="#define GLSLIFY 1\n" +

"attribute vec4 aDeltas;\n" +
"attribute vec2 aCenter;\n" +
"attribute vec2 aParams;\n" +
"uniform vec2 uVPScale;\n" +
"uniform float uTime;\n" +

// Noise
"uniform vec4 uNoiseParam;\n" +
"varying vec2 vTexCoord;\n" +
"varying float vLighting;\n" +
"#define EXP_SLOPE 8.0\n" +
"#define EXP_MIDPT .4\n" +

"#ifndef DEPTH\n" +
  "#define DEPTH 0.0\n" +
"#endif\n" +

"void main( void ){\n" +
"  float dt = uTime-aParams.x;\n" +
 " float expand = -abs( dt-EXP_MIDPT) * EXP_SLOPE + (EXP_SLOPE*EXP_MIDPT);\n" +
 " expand = clamp( expand, 0.0, 1.0 );\n" +
  // rotation
"  float r = dt * aParams.y * 3.0;\n" +
"  float sinR = sin(r);\n" +
 " float cosR = cos(r);\n" +
"  mat2 rm = mat2( cosR, -sinR, sinR, cosR );\n" +
  // detach
"  vec2 cpos = aCenter.xy;\n" +

"  cpos += .5*(dt)*vec2(cos(aParams.y*10.0), sin(aParams.y*10.0));\n" +
"  #ifdef SHADOW_OFFSET\n" +
"    cpos += SHADOW_OFFSET;\n" +
"  #endif\n" +
"  vec2 deltaLon = rm*aDeltas.xy;\n" +
"  vec2 deltaTrv = (rm*aDeltas.zw)*expand;\n" +
"  gl_Position.xy = uVPScale * ( cpos + deltaLon + deltaTrv );\n" +
 " gl_Position.zw = vec2( DEPTH, 1.0 );\n" +
" vTexCoord.xy   = gl_Position.xy * .5 + .5;\n" +
"  vTexCoord.y = vTexCoord.y * uNoiseParam.z;\n" +
"  vLighting = aParams.y+1.0;\n" +

"}\n" ;
var detachedVShader = shadowVShader;
var detachedFShader ="#define GLSLIFY 1\n" +
"precision highp float;\n" +
"varying vec2 vTexCoord;\n" +
"varying float vLighting;\n" +
"uniform vec4 uNoiseParam;\n" +
"uniform vec2 uNoiseRand;\n" +

"uniform sampler2D tNoise;\n" +

"void main( void ){\n" +
"  float dist     = 0.5 - distance( vTexCoord.xy, uNoiseParam.xy );\n" +
"  float texColor = texture2D(tNoise, ( vTexCoord.xy + uNoiseRand ) * uNoiseParam.w ).r * 0.4;\n" +
"  float color     = dist * texColor + vLighting*.05;\n" +
"  gl_FragColor   = vec4( color, color, color, 1.0 );\n" +
"}";

var shadowFShader="#define GLSLIFY 1\n" +
"precision highp float;\n" +
"#define SHADOW .6\n" +
"void main( void ){\n" +
"  gl_FragColor   = vec4( SHADOW, SHADOW, SHADOW, 1.0 );\n" +

"}";


var g = new Float32Array(2),
    v = new Float32Array(2),
    p = glMatrix.vec2,
    m = glMatrix.mat2,
    y = m.create();
var Ribbon = function(t) {
    this.gl = t;
    this.lastPos = new Float32Array(2);
    this.currPos = new Float32Array(2);
    this.lastDir = new Float32Array(2);
    this.currDir = new Float32Array(2);
    this.time = 0,
    this.ltime=0;
    this.setupGL();
    this.started = false;
}
Ribbon.prototype = {
    setupGL: function() {
    	  var gl = this.gl
        this.geom = new Geom(gl);
        this.ribbonPrg = new glProgram(gl);
        this.ribbonPrg.compile(ribbonVShader, ribbonFShader);

        this.prgShadow = new glProgram(gl),
        this.prgShadow.compile(shadowVShader, shadowFShader, "#define SHADOW_OFFSET vec2(.01,-.01)\n#define DEPTH .99")

        this.gradientTex=(function(e){
            var a=new Uint8Array([160, 33, 232, 153, 21, 230, 150, 21, 230, 148, 21, 230, 146, 21, 230, 143, 21, 230, 140, 21, 230, 138, 21, 230, 135, 21, 229, 132, 21, 229, 129, 21, 229, 126, 21, 229, 123, 21, 229, 119, 21, 229, 116, 21, 228, 113, 21, 228, 110, 21, 228, 106, 21, 228, 103, 21, 228, 99, 21, 227, 96, 21, 227, 94, 21, 227, 93, 21, 227, 91, 21, 227, 89, 21, 227, 88, 21, 227, 86, 21, 226, 84, 21, 226, 83, 21, 226, 81, 21, 226, 79, 21, 226, 78, 21, 226, 76, 21, 226, 75, 21, 226, 73, 21, 226, 71, 21, 226, 70, 21, 226, 68, 21, 225, 67, 21, 225, 65, 21, 225, 64, 21, 225, 62, 21, 225, 61, 21, 225, 59, 21, 225, 58, 21, 225, 57, 21, 225, 55, 21, 225, 54, 21, 225, 53, 21, 224, 51, 21, 224, 50, 21, 224, 49, 21, 224, 48, 21, 224, 46, 21, 224, 45, 21, 224, 44, 21, 224, 43, 21, 224, 42, 21, 224, 41, 21, 224, 39, 21, 224, 38, 21, 224, 38, 21, 223, 37, 21, 223, 36, 21, 223, 35, 21, 223, 34, 21, 223, 33, 21, 223, 33, 21, 223, 32, 21, 223, 31, 21, 223, 31, 23, 223, 31, 24, 223, 31, 26, 223, 31, 27, 223, 31, 29, 223, 31, 31, 223, 31, 32, 223, 31, 34, 223, 31, 36, 223, 31, 38, 223, 31, 40, 223, 31, 42, 222, 31, 45, 222, 31, 47, 222, 31, 49, 222, 31, 52, 222, 31, 54, 222, 31, 56, 222, 31, 59, 222, 31, 61, 222, 31, 64, 222, 31, 67, 222, 31, 70, 222, 31, 73, 222, 31, 75, 222, 31, 78, 222, 31, 81, 222, 31, 84, 222, 31, 87, 222, 31, 90, 222, 31, 93, 222, 31, 96, 222, 31, 99, 222, 31, 102, 222, 31, 105, 222, 31, 108, 222, 31, 111, 222, 31, 114, 222, 31, 118, 222, 31, 120, 222, 31, 123, 222, 31, 128, 222, 31, 132, 222, 31, 137, 222, 31, 142, 222, 31, 146, 222, 31, 151, 222, 31, 156, 222, 31, 160, 222, 31, 164, 222, 32, 169, 222, 33, 174, 222, 33, 178, 222, 34, 182, 222, 34, 186, 222, 35, 190, 222, 35, 194, 222, 47, 201, 224]);

            var t = new glTexture(e);
            return t.fromData(128, 1, a),
            t.bind(),
            t.mirror(),
            t
        })(gl)
    },
    preRender: function(time, width, height, posX, posY) {
        this.time += time,
            this.ltime += time,
            posY = -posY,
            posX *= width / height,
            p.set(this.currPos, posX, posY)

        if(!this.started){
          p.copy(this.lastPos, this.currPos),
          this.started = true
        }
        var o = v,
            a = g;
        p.subtract(o, this.currPos, this.lastPos);
        var s = p.length(o),
            u = s / this.ltime;
        
        if (s > .03) {
            var l = Math.PI / 2 + 1.3 * (Math.random() - .5);
            m.fromRotation(y, l),
                p.transformMat2(a, o, y),
                p.normalize(a, a);
            var c = u / 200;
            c *= 1 + 3 * Math.random(),
                c += .02 * Math.random(),
                c = Math.min(.3, c),
                p.scale(this.currDir, a, c),
                this.geom.addQuad(this.lastPos, this.lastDir, this.currPos, this.currDir, this.time);
                p.copy(this.lastDir, this.currDir),
                p.copy(this.lastPos, this.currPos),
                this.ltime = 0

        }
        this.geom.updateRange(this.time)

    },
    renderCut: function(time, width, height, color) {
        var r = this.ribbonPrg;
        r.use(),
            r.uVPScale(height / width, 1),
            r.uTime(this.time),
            r.iResolution(width,height)
            //r.uNormalTex(color),
            r.uGradTex(this.gradientTex),
            this.geom.prepare(this.ribbonPrg),
            this.geom.render()
    },
    renderDetached: function() {

    },
    renderShadow: function(e,t,n){
        var i = this.prgShadow;
            i.use(),
            i.uVPScale(n / t, 1),
            i.uTime(this.time),
            this.geom.prepare(this.prgShadow);//reuse the vBuffer and iBuffer
            var r = this.gl;
            r.enable(r.BLEND),
            r.enable(r.DEPTH_TEST),
            r.blendFunc(r.ZERO, r.SRC_COLOR),
            r.depthMask(!0),
            this.geom.render(),
            r.depthMask(!1),
            r.disable(r.BLEND),
            r.disable(r.DEPTH_TEST)
    }
};
(function() {
    var c = 8192,
        h = 4,
        d = c / h,
        f = 8,
        m = new Float32Array(f * h),
        p = 4 * f,v = 3.5;
    var Geom = function(gl) {
        this.gl = gl;
        var t = this.gl,
            n = c * p;
        this.vBuffer = new arrayBuffer(t);
        this.iBuffer = new indexBuffer(t);

        t.bindBuffer(t.ARRAY_BUFFER, this.vBuffer.buffer),
            t.bufferData(t.ARRAY_BUFFER, n, this.vBuffer.usage),
            t.bindBuffer(t.ARRAY_BUFFER, null),
            this.vBuffer.byteLength = n,
            this.vBuffer.attrib("aCenter", 2, t.FLOAT),
            this.vBuffer.attrib("aDeltas", 4, t.FLOAT),
            this.vBuffer.attrib("aParams", 2, t.FLOAT);

        for (var i = new Uint16Array(6 * d), o = 0, a = 0; d > o; o++) {
            var u = 4 * o;
            i[a++] = u,
                i[a++] = u + 2,
                i[a++] = u + 1,
                i[a++] = u + 1,
                i[a++] = u + 2,
                i[a++] = u + 3
        }
        this.iBuffer.data(i),

            this.currLen = 0,
            this.startQuad = 0,
            this.endQuad = 0,
            this.times = []
    }
    Geom.prototype = {
        addQuad: function(lastPos, lastDir, currPos, currDir, time) {
            time += .1 * Math.random() - .05;
            var o = this.endQuad;
            this.endQuad++,
                this.endQuad > d - 1 && (this.endQuad = 0),
                this.times.push(time);
            var a = .5 * (lastPos[0] + currPos[0]),
                s = .5 * (lastPos[1] + currPos[1]),
                u = currPos[0] - a,
                l = currPos[1] - s,
                c = 2 * Math.random() - 1;
            m[0 * f + 0] = a,
                m[0 * f + 1] = s,
                m[0 * f + 2] = -u,
                m[0 * f + 3] = -l,
                m[0 * f + 4] = -lastDir[0],
                m[0 * f + 5] = -lastDir[1],
                m[0 * f + 6] = time,
                m[0 * f + 7] = c,
                m[1 * f + 0] = a,
                m[1 * f + 1] = s,
                m[1 * f + 2] = -u,
                m[1 * f + 3] = -l,
                m[1 * f + 4] = lastDir[0],
                m[1 * f + 5] = lastDir[1],
                m[1 * f + 6] = time,
                m[1 * f + 7] = c,
                m[2 * f + 0] = a,
                m[2 * f + 1] = s,
                m[2 * f + 2] = u,
                m[2 * f + 3] = l,
                m[2 * f + 4] = -currDir[0],
                m[2 * f + 5] = -currDir[1],
                m[2 * f + 6] = time,
                m[2 * f + 7] = c,
                m[3 * f + 0] = a,
                m[3 * f + 1] = s,
                m[3 * f + 2] = u,
                m[3 * f + 3] = l,
                m[3 * f + 4] = currDir[0],
                m[3 * f + 5] = currDir[1],
                m[3 * f + 6] = time,
                m[3 * f + 7] = c,
                this.vBuffer.subData(m, o * h * p)
        },
        prepare: function(prg) {
            this.vBuffer.attribPointer(prg)
            this.iBuffer.bind()
        },
        updateRange: function(e) {
            
            for (var t = this.startQuad, n = this.endQuad, r = d; t !== n && this.times[0] - e < -v;)
                this.times.shift(),
                t++,
                t > r && (t = 0);
            this.startQuad = t
            
        },
        render: function() {
            var e;console.log(this.endQuad,this.startQuad)
            if(this.endQuad < this.startQuad) {
                e = 6 * (d - this.startQuad),
                this.iBuffer.drawTriangles(6 * this.endQuad, 0),
                this.iBuffer.drawTriangles(e, 12 * this.startQuad)

            }  else{
                e = 6 * (this.endQuad - this.startQuad);
                this.iBuffer.drawTriangles(e, 12 * this.startQuad)
                if(e==0) {
                    audioTag.currentTime=0;
                    audioTag.pause()
                }
            } 
        }
    }
    window.Geom = Geom;
})();
var Model = {
    ribbon: function(t) {
        return new Ribbon(t)
    }
}
module.exports = Model;
