function createScene(e) {

    var glScene = function(e) {
        var t = this.getContextOptions();
        this.gl = e.getContext("webgl", t) || e.getContext("experimental-webgl", t) || e.getContext("webgl"),
            this.canvas = e,
            this.width = 0,
            this.height = 0,
            this.frame = this._frame.bind(this),
            this.previousTime = r(),
            this._rafId = 0,
            this._playing = !1,
            this.init()

    };
    var r = window.performance && window.performance.now ? function() {
            return performance.now()
        } : Date.now || function() {
            return +new Date
        },
        i = function(id) {
            return window.requestAnimationFrame(id)
        };
    i.cancel = function(id){try{window.cancelAnimationFrame(id)}catch(e){}};
    var o = function() {},
        n = glScene.prototype;
    return n.getContextOptions = e.getContextOptions || function() {},
        n.render = e.render || o,
        n.resize = e.resize || o,
        n.init = e.init || o,
        n.dispose = function() {
            this.stop()
        },
        n.play = function() {
            this._playing || (this._playing = !0,
                this.frame(),
                this.previousTime = r(),
                this._requestFrame())
        },
        n.stop = function() {
            i.cancel(this._rafId),
                this._playing = !1,
                this._rafId = 0
        },
        n._checkSize = function() {
            var e = getComputedStyle(this.canvas),
                t = parseInt(e.getPropertyValue("width")),
                n = parseInt(e.getPropertyValue("height"));
            return isNaN(t) || isNaN(n) || 0 === t || 0 === n ? !1 : ((t !== this.width || n !== this.height) && (this.width = t,
                this.height = n,
                this.resize(t, n)), !0)
        },
        n._requestFrame = function() {
            i.cancel(this._rafId),
                this._rafId = i(this.frame)
        },
        n._frame = function() {
            if (this._playing) {

                var e = r(),
                    t = (e - this.previousTime) / 1e3;
                this.previousTime = e,
                    (t > .2 || 1 / 180 > t) && (t = 1 / 60),
                    this._checkSize() && this.render(t),
                    this._playing && this._requestFrame()
            }
        },glScene
}
module.exports = createScene;
