/*

const int BYTE = 5120;
const int UNSIGNED_BYTE = 5121;
const int SHORT = 5122;
const int UNSIGNED_SHORT = 5123;
const int INT = 5124;
const int UNSIGNED_INT = 5125;
const int FLOAT = 5126;
*/
var h = {
    getComponentSize: function(e) {
        switch (e) {
            case 5120:
            case 5121:
                return 1;
            case 5122:
            case 5123:
                return 2;
            case 5124:
            case 5125:
            case 5126:
                return 4;
            default:
                return 0
        }
    },
    createDrawFunctions: function(e) {
        e.drawPoints = function(e, t) {
                this.draw(this.gl.POINTS, e, t)
            },
            e.drawLineStrip = function(e, t) {
                this.draw(this.gl.LINE_STRIP, e, t)
            },
            e.drawLineLoop = function(e, t) {
                this.draw(this.gl.LINE_LOOP, e, t)
            },
            e.drawLines = function(e, t) {
                this.draw(this.gl.LINES, e, t)
            },
            e.drawTriangleStrip = function(e, t) {
                this.draw(this.gl.TRIANGLE_STRIP, e, t)
            },
            e.drawTriangleFan = function(e, t) {
                this.draw(this.gl.TRIANGLE_FAN, e, t)
            },
            e.drawTriangles = function(e, t) {
                this.draw(this.gl.TRIANGLES, e, t)
            }
    }
}
var ARRAY_BUFFER = 34962

function i(e, t, n) {
    this.gl = e,
        this.usage = n || e.STATIC_DRAW,
        this.buffer = e.createBuffer(),
        this._attribs = [],
        this._stride = 0,
        this.byteLength = 0,
        this.length = 0,
        t && this.data(t)
}
var r = h;

i.prototype = {
        bind: function() {
            this.gl.bindBuffer(34962, this.buffer)
        },
        attrib: function(e, t, n, f) {
            return this._attribs.push({
                    name: e,
                    type: 0 | n,
                    size: 0 | t,
                    normalize: !!f,
                    offset: this._stride
                }),
                this._stride += r.getComponentSize(n) * t,
                this.length = this.byteLength / this._stride,
                this
        },
        data: function(e) {
            var t = this.gl;
            t.bindBuffer(34962, this.buffer),
                t.bufferData(34962, e, this.usage),
                t.bindBuffer(34962, null),
                this.byteLength = e.byteLength,
                this._stride > 0 && (this.length = this.byteLength / this._stride)
        },
        subData: function(e, t) {
            var n = this.gl;
            n.bindBuffer(34962, this.buffer);
                n.bufferSubData(34962, t, e),
                n.bindBuffer(34962, null)
        },
        attribPointer: function(e) {
            var t = this.gl;
            t.bindBuffer(34962, this.buffer);
            for (var n = 0; n < this._attribs.length; n++) {
                var i = this._attribs[n];
                if (void 0 !== e[i.name]) {
                    var r = e[i.name]();
                    t.enableVertexAttribArray(r),
                        t.vertexAttribPointer(r, i.size, i.type, i.normalize, this._stride, i.offset)
                }
            }
        },
        draw: function(e, t, n) {//
            t = void 0 === t ? this.length : t,
                n = void 0 === n ? 0 : n,
                this.gl.drawArrays(e, n, t)
        },
        dispose: function() {
            this.gl.deleteBuffer(this.buffer),
                this.buffer = null,
                this.gl = null
        }
    },
    r.createDrawFunctions(i.prototype);

function j(e, t, n, i) {
    this.gl = e,
        this.buffer = e.createBuffer(),
        this.length = 0,
        this.type = t || e.UNSIGNED_SHORT,
        this.usage = i || e.STATIC_DRAW,
        this.typeSize = r.getComponentSize(this.type),
        n && this.data(n)
}
var ELEMENT_ARRAY_BUFFER = 34963;
var r = h;
j.prototype = {
        bind: function() {
            this.gl.bindBuffer(34963, this.buffer)
        },
        data: function(e) {
            var t = this.gl;
            t.bindBuffer(34963, this.buffer),
                t.bufferData(34963, e, this.usage),
                t.bindBuffer(34963, null),
                this.length = e.byteLength / this.typeSize
        },
        subData: function(e, t) {
            var n = this.gl;
            n.bindBuffer(34963, this.buffer),
                n.bufferSubData(34963, t, e),
                n.bindBuffer(34963, null)
        },
        dispose: function() {
            this.gl.deleteBuffer(this.buffer),
                this.buffer = null,
                this.gl = null
        },
        draw: function(e, t, n) {
            t = void 0 === t ? this.length : t,
                n = void 0 === n ? 0 : n,
                this.gl.drawElements(e, t, this.type, n)
        }
    },
    r.createDrawFunctions(j.prototype),
    module.exports = {arrayBuffer:i,indexBuffer:j}
