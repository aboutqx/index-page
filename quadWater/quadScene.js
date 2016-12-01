import Promise from 'bluebird';
import createScene from './createScene';
import Model from './Model';

var d={mouse:{x:0,y:0},isDown:false};
function isMobile(){
    var ua=navigator.userAgent.toLowerCase();
    return /android|iphone|ipad/.test(ua)
}
var quadScene = createScene({
    init: function() {
        var e = this.gl;
        var o=function(){};
        this.addListener();
        this.nrmCompo = {preRender:o,load:o,render:o,fbo:{color:0xffffff}},
            this.noiseBg = {preRender:o,load:o,render:o},
            this.ribbon = Model.ribbon(e),
            this.text = {preRender:o,load:o,render:o}
    },
    getContextOptions: function() {
        return {
            depth: !0,
            stencil: !1,
            antialias: window.devicePixelRatio <= 1,
            alpha: !1,
            premultipliedAlpha: !1,
            preserveDrawingBuffer: !1
        }
    },
    render: function(frameTime) {
        var t = window.devicePixelRatio,
            width = this.width * t,
            height = this.height * t,
            posX = d.mouse.x / this.width * 2 - 1,
            posY = d.mouse.y / this.height * 2 - 1,
            a = this.gl;
        this.nrmCompo.preRender(frameTime),
            a.bindFramebuffer(a.FRAMEBUFFER, null),
            a.viewport(0, 0, width, height),
            a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT),
            this.noiseBg.render(),
            this.ribbon.preRender(frameTime, width, height, posX, posY);
            this.ribbon.renderCut(frameTime, width, height, this.nrmCompo.fbo.color)
            //this.ribbon.renderDetached(e, n, i, this.noiseBg),
            this.ribbon.renderShadow(frameTime, width, height)
            //this.text.render(n, i)
    },
    resize: function(e, t) {
        var n = window.devicePixelRatio;
        this.canvas.width = e * n,
            this.canvas.height = t * n
    }
});

quadScene.prototype.load = function() {
    return Promise.all([this.text.load(), this.nrmCompo.load()])
},
quadScene.prototype.addListener = function(){
    window.addEventListener('mousedown',function(){
        d.isDown=true;
    })
    window.addEventListener('mousemove',function(e){
            d.mouse={
                x:e.pageX,
                y:e.pageY
            }
    })
    window.addEventListener('mouseup',function(){
        d.isDown=false;
    })
    var self=this;
    window.addEventListener('resize',function(){
        self.resize(window.innerWidth,window.innerHeight)
    })
},

quadScene.prototype.renderTextOnly = function() {
    var e = window.devicePixelRatio,
        t = this.width * e,
        n = this.height * e,
        i = this.gl;
    i.bindFramebuffer(i.FRAMEBUFFER, null),
        i.viewport(0, 0, t, n),
        i.clear(i.COLOR_BUFFER_BIT | i.DEPTH_BUFFER_BIT),
        this.noiseBg.render(),
        this.text.render(t, n)
},
quadScene.prototype.reset = function() {};
module.exports = quadScene;
