import glProgram from './glProgram';
import gltexture from './glTexture';
import glMatrix from 'gl-matrix';
import { arrayBuffer, indexBuffer } from './glbuffer';

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

var ribbonFShader = document.getElementById('frag-shader').innerText;
var shadowVShader ="#define GLSLIFY 1\n" +

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

var shadowFShader ="#define GLSLIFY 1\n" +
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
    this.setupGL(t);
}
Ribbon.prototype = {
    setupGL: function(gl) {
        this.geom = new Geom(gl);
        this.ribbonPrg = new glProgram(gl);
        this.ribbonPrg.compile(ribbonVShader, ribbonFShader);

        this.prgShadow = new glProgram(gl),
        this.prgShadow.compile(shadowVShader, shadowFShader, "#define SHADOW_OFFSET vec2(.01,-.01)\n#define DEPTH .99") 
    },
    preRender: function(time, width, height, posX, posY) {
        this.ribbonPrg.use();
        var e = time,
            t = width,
            n = height,
            i = posX,
            r = posY;
        this.time += e,
            this.ltime += e,
            r = -r,
            i *= t / n,
            p.set(this.currPos, i, r),
            this.started || (p.copy(this.lastPos, this.currPos),
                this.started = !0);
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
                this.geom.addQuad(this.lastPos, this.lastDir, this.currPos, this.currDir, this.time),
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
            //r.uGradTex(this.gradientTex),
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
            var e = lastPos,
                t = lastDir,
                n = currPos,
                i = currDir;

            time += .1 * Math.random() - .05;
            var o = this.endQuad;
            this.endQuad++,
                this.endQuad > d - 1 && (this.endQuad = 0),
                this.times.push(time);
            var a = .5 * (e[0] + n[0]),
                s = .5 * (e[1] + n[1]),
                u = n[0] - a,
                l = n[1] - s,
                c = 2 * Math.random() - 1;
            m[0 * f + 0] = a,
                m[0 * f + 1] = s,
                m[0 * f + 2] = -u,
                m[0 * f + 3] = -l,
                m[0 * f + 4] = -t[0],
                m[0 * f + 5] = -t[1],
                m[0 * f + 6] = time,
                m[0 * f + 7] = c,
                m[1 * f + 0] = a,
                m[1 * f + 1] = s,
                m[1 * f + 2] = -u,
                m[1 * f + 3] = -l,
                m[1 * f + 4] = t[0],
                m[1 * f + 5] = t[1],
                m[1 * f + 6] = time,
                m[1 * f + 7] = c,
                m[2 * f + 0] = a,
                m[2 * f + 1] = s,
                m[2 * f + 2] = u,
                m[2 * f + 3] = l,
                m[2 * f + 4] = -i[0],
                m[2 * f + 5] = -i[1],
                m[2 * f + 6] = time,
                m[2 * f + 7] = c,
                m[3 * f + 0] = a,
                m[3 * f + 1] = s,
                m[3 * f + 2] = u,
                m[3 * f + 3] = l,
                m[3 * f + 4] = i[0],
                m[3 * f + 5] = i[1],
                m[3 * f + 6] = time,
                m[3 * f + 7] = c,
                this.vBuffer.subData(m, o * h * p)
        },
        prepare: function(prg) {
            this.vBuffer.attribPointer(prg)
            this.iBuffer.bind()
        },
        updateRange: function(e) {
            
            for (var t = this.startQuad, n = this.endQuad, i = this.times, r = d; t !== n && i[0] - e < -v;)
                i.shift(),
                t++,
                t > r && (t = 0);
            this.startQuad = t
        },
        render: function() {
            var e;
            this.endQuad < this.startQuad ? (e = 6 * (d - this.startQuad),
                this.iBuffer.drawTriangles(6 * this.endQuad, 0),
                this.iBuffer.drawTriangles(e, 12 * this.startQuad)) : (e = 6 * (this.endQuad - this.startQuad),
                this.iBuffer.drawTriangles(e, 12 * this.startQuad))
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
