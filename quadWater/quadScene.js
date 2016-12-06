import Promise from 'bluebird';
import createScene from './createScene';
import Model from './Model';
import NoiseBg from './NoiseBg.js';

var d={mouse:{x:window.innerWidth/2,y:window.innerHeight/2},isDown:false};
function isMobile(){
    var ua=navigator.userAgent.toLowerCase();
    return /android|iphone|ipad/.test(ua)
}
var lastX,lastY,timer;
var quadScene = createScene({
    init: function() {
        var e = this.gl;
        var o=function(){};
        this.addListener();
        this.gl
        this.nrmCompo = {preRender:o,load:o,render:o,fbo:{color:0xffffff}},
            this.noiseBg = new NoiseBg(e),
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

        if(!(lastX==d.mouse.x&&lastY==d.mouse.y)){
            clearTimeout(timer)
            audioTag.play()  
        }
        lastX=d.mouse.x;
        lastY=d.mouse.y;
        var t = window.devicePixelRatio,
            width = this.width * t,
            height = this.height * t,
            posX = d.mouse.x / this.width * 2 - 1,
            posY = d.mouse.y / this.height * 2 - 1;
        var a = this.gl;
        this.nrmCompo.preRender(frameTime),
        this.ribbon.preRender(frameTime, width, height, posX, posY),
            a.bindFramebuffer(a.FRAMEBUFFER, null),
            a.viewport(0, 0, width, height),
            a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT),

            //this.noiseBg.render()

            this.ribbon.renderCut(frameTime, width, height, this.nrmCompo.fbo.color)
            this.ribbon.renderDetached(frameTime, width, height, this.noiseBg),
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
        e.preventDefault(),
        d.mouse={
            x:e.pageX,
            y:e.pageY
        }
    })
    window.addEventListener('mouseup',function(){
        d.isDown=false;

    })
    window.addEventListener('touchmove',function(e){
        e.touches[0] && (d.mouse.x = e.touches[0].clientX,
        d.mouse.y = e.touches[0].clientY)
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
