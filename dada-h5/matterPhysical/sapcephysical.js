import { Engine, Render, World, Body, Constraint, Events, Bodies, Runner, Vector } from 'matter-js';
var engine, render,starPos,arm;
var VIEW = {},bodiesDom,bodies=[],dpr=1.0,incX=0,R,useCanvas=false;
    initPhysicsWorld: function() {

        engine = Engine.create({
                constraintIterations: .1,
                positionIterations: .5
            }),
            engine.world.gravity.y =0,
            //engine.world.gravity.x =0.01,
            render = Render.create({
                element: this.container,
                canvas: this.canvas,
                engine: engine,
                options: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    background: 'img/space.png',
                    drawBackground:false,
                    wireframes: true,
                }
            });

    },
    _update: function() {
        if(!useCanvas){
            window.requestAnimationFrame(this.update.bind(this))
            this.renderer.render();
        }
    },
var spacePhysical=function(debugSize){
    VIEW.width = debugSize;
    VIEW.height = debugSize/(750/window.innerHeight);
    VIEW.scale = 750/VIEW.width;
    this.init();
}
spacePhysical.prototype={
    init:function(){
       this.initGround();
       this.initStar();
    },
    initGround: function() {
        var groundBottom = Bodies.rectangle(VIEW.width/2, VIEW.height, VIEW.width, 1, {
            isStatic: true,
            render:{
                visible:false
            }
        });
        var groundLeft = Bodies.rectangle(0, VIEW.height/2, 1, VIEW.height, {
            isStatic: true,
            render:{
                visible:false
            }
        });
        var groundRight = Bodies.rectangle(VIEW.width, VIEW.height/2, 1, VIEW.height, {
            isStatic: true,
            render:{
                visible:false
            }
        });
        var groundTop = Bodies.rectangle(VIEW.width/2, VIEW.width, 1, 1, {
            isStatic: true,
            render:{
                visible:false
            }
        });
        World.add(engine.world, [groundBottom,groundLeft,groundRight]);
    }, 
    initStar:function(){
        starPos=[ [431,478],[-1,246],[440,210],[457,381],[590,298],[307,492],[171,161],
        [240,222],[43,251],[339,623]]
        bodiesDom = document.querySelectorAll('.block');
        for (var i = 0, l = bodiesDom.length; i < l; i++) {
            
            var t=bodiesDom[i].classList.contains('static')
            var body = Bodies.rectangle(
                (starPos[i][0]+bodiesDom[i].offsetWidth/2)/VIEW.scale,
                (starPos[i][1]+bodiesDom[i].offsetHeight/2)/VIEW.scale, 
                VIEW.width*bodiesDom[i].offsetWidth/(window.innerWidth)-10, 
                VIEW.height*bodiesDom[i].offsetHeight/(window.innerHeight),
                {
                    isStatic:t,
                    mask:t?0:1,
                    render:{
                        globalCompositeOperation:t?'lighten':'source-over',
                        sprite:{
                            texture:bodiesDom[i].src
                        } 
                    }       
                }
            );
            if(!t){
                body.frictionAir= 0
                arm=body
            }
            bodiesDom[i].id = body.id;
            bodies.push(body);
        }
        World.add(engine.world, bodies);
        console.log(bodies[0])
    },
    render:function(){
        for (var i = 0, l = bodiesDom.length; i < l; i++) {
            var bodyDom = bodiesDom[i];
            var body = null;
            for (var j = 0, k = bodies.length; j < k; j++) {
                if ( bodies[j].id == bodyDom.id ) {
                    body = bodies[j];
                    break;
                }
            }        
            if ( body === null ) continue;
            var t=bodyDom.classList.contains('static'),
                x=( body.position.x) * VIEW.scale - bodyDom.offsetWidth/2;

            incX+=.3;
            if(incX>=700) incX=0;
            bodyDom.style.transform = "translate3d( " 
                + (!t ? x : x)
                + "px, "
                + ( ( body.position.y) * VIEW.scale - bodyDom.offsetHeight/2)
                + "px ,0)";
            bodyDom.style.transform += "rotate( " + (0 ? Math.sin(incX/32)*1.2 : body.angle/3)+ "rad )";
        
        }
    }
}