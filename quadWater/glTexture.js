function n(e, t, n) {
    return 9728 | +e | +t << 8 | +(t && n) << 1
}

function glTexture(e, t) {
    this._uid = r++,
        this.gl = e,
        this.id = this.gl.createTexture(),
        this.width = 0,
        this.height = 0,
        this.format = t || e.RGB,
        this.type = e.UNSIGNED_BYTE,
        e.bindTexture(e.TEXTURE_2D, this.id),
        this.setFilter(!0),
        this.clamp(),
        e.bindTexture(e.TEXTURE_2D, null)
}
var r = 0;
glTexture.prototype = {
    fromImage: function(e) {
        var t = this.gl;
        this.width = e.width,
            this.height = e.height,
            t.bindTexture(t.TEXTURE_2D, this.id),
            t.texImage2D(t.TEXTURE_2D, 0, this.format, this.format, this.type, e),
            t.bindTexture(t.TEXTURE_2D, null)
    },
    fromData: function(e, t, n, i) {
        var r = this.gl;
        this.width = e,
            this.height = t,
            n = n || null,
            this.type = i || r.UNSIGNED_BYTE,
            r.bindTexture(r.TEXTURE_2D, this.id),
            r.texImage2D(r.TEXTURE_2D, 0, this.format, e, t, 0, this.format, this.type, n),
            r.bindTexture(r.TEXTURE_2D, null)
    },
    bind: function(e) {
        var t = this.gl;
        void 0 !== e && t.activeTexture(t.TEXTURE0 + (0 | e)),
            t.bindTexture(t.TEXTURE_2D, this.id)
    },
    dispose: function() {
        this.gl.deleteTexture(this.id),
            this.id = null,
            this.gl = null
    },
    setFilter: function(e, t, i) {
        var r = this.gl;
        e = !!e,
            t = !!t,
            i = !!i;
        var o = n(e, t, i);
        r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, n(e, !1, !1)),
            r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, o)
    },
    repeat: function() {
        this.wrap(this.gl.REPEAT)
    },
    clamp: function() {
        this.wrap(this.gl.CLAMP_TO_EDGE)
    },
    mirror: function() {
        this.wrap(this.gl.MIRRORED_REPEAT)
    },
    wrap: function(e) {
        var t = this.gl;
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, e),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, e)
    }
}
module.exports = glTexture;
