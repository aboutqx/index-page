
function i(e) {
    e.split("\n").map(n).join("\n")
}
function n(e, t) {
    return d[String(t + 1).length] + (t + 1) + ": " + e
}
function r(e) {
    return e = String(e),
    "uniform" + f[e]
}
function o(e, t, n, i) {
    switch (e) {
    case n.FLOAT_MAT2:
    case n.FLOAT_MAT3:
    case n.FLOAT_MAT4:
        return s(e, t, n, i);
    case n.SAMPLER_2D:
    case n.SAMPLER_CUBE:
        return u(e, t, n, i);
    default:
        return a(e, t, n, i)
    }
}
function a(e, t, n, i) {
    var o = r(e);
    return function() {
        return 1 === arguments.length && void 0 !== arguments[0].length ? n[o + "v"](t, arguments[0]) : arguments.length > 0 && n[o].apply(n, Array.prototype.concat.apply(t, arguments)),
        t
    }
}
function s(e, t, n, i) {
    var o = r(e);
    return function() {
        return arguments.length > 0 && void 0 !== arguments[0].length && n[o + "v"](t, !!arguments[1], arguments[0]),
        t
    }
}
function u(e, t, n, i) {
    var r = i.texIndex++;
    return function() {
        return 1 === arguments.length && (void 0 !== arguments[0].bind ? (arguments[0].bind(r),
        n.uniform1i(t, r)) : n.uniform1i(t, arguments[0])),
        t
    }
}
function l(e) {
    return function() {
        return e
    }
}
function compileShader(gl, shader, shaderSource) {

    return gl.shaderSource(shader, shaderSource),
    gl.compileShader(shader),
    gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? !0 : (glProgram.warn(gl.getShaderInfoLog(shader)),
    glProgram.warn('source:'+i(shaderSource)),
    !1)
}
function glProgram(e) {
    this.gl = e,
        this.program = e.createProgram(),
        this.vShader = e.createShader(e.VERTEX_SHADER),
        this.fShader = e.createShader(e.FRAGMENT_SHADER),
        e.attachShader(this.program, this.vShader),
        e.attachShader(this.program, this.fShader)
}
var d = ["", "   ", "  ", " ", ""],f = {};
f[String(5126)] = "1f",
    f[String(35664)] = "2f",
    f[String(35665)] = "3f",
    f[String(35666)] = "4f",
    f[String(35667)] = "2i",
    f[String(35668)] = "3i",
    f[String(35669)] = "4i",
    f[String(35670)] = "1i",
    f[String(35671)] = "2i",
    f[String(35672)] = "3i",
    f[String(35673)] = "4i",
    f[String(35674)] = "Matrix2f",
    f[String(35675)] = "Matrix3f",
    f[String(35676)] = "Matrix4f",
    f[String(5124)] = "1i",
    f[String(35678)] = "1i",
    f[String(35680)] = "1i",
    glProgram.verbose = !0,
    glProgram.prototype = {
        use: function() {
            this.gl.useProgram(this.program)
        },
        compile: function(e, t, n) {
            n = (n || "") + "\n";
            var i = this.gl;
            if(compileShader(i, this.fShader, n + t) && compileShader(i, this.vShader, n + e)){
                if(i.linkProgram(this.program), i.getProgramParameter(this.program, i.LINK_STATUS)){
                    return (this._grabParameters(), !0)
                } else{
                    return (glProgram.warn(i.getProgramInfoLog(this.program)), !1) 
                }
            } else {
                glProgram.warn(this.fShader,this.vShader)
            }
        },
        dispose: function() {
            this.gl.deleteProgram(this.program),
                this.gl.deleteShader(this.Shader),
                this.gl.deleteShader(this.Shader)
        },
        _grabParameters: function() {
            for (var e = this.gl, t = this.program, n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), i = {
                    texIndex: 0
                }, r = 0; n > r; ++r) {
                var a = e.getActiveUniform(t, r);
                if (null !== a) {
                    var s = a.name,
                        u = s.indexOf("["),
                        c = 1;
                    u >= 0 && (c = parseInt(s.substring(u + 1, s.indexOf("]"))),
                        s = s.substring(0, u));
                    var h = e.getUniformLocation(t, a.name);
                    this[s] = o(a.type, h, e, i)
                } else
                    glProgram.warn(e.getError())
            }
            for (var d = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), f = 0; d > f; ++f) {
                var p = e.getActiveAttrib(t, f).name,
                    m = e.getAttribLocation(t, p);
                this[p] = l(m)
            }
        }
    },
    glProgram.prototype.bind = glProgram.prototype.use,
    glProgram.warn = function(e) {
        glProgram.verbose && console.warn(e)
    };
module.exports = glProgram;
