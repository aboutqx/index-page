import Promise from 'bluebird';
function isMobile(){
    var ua=navigator.userAgent.toLowerCase();
    return /android|iphone|ipad/.test(ua)
}
var isMobile=isMobile();
var app={
	p:null,
	load:function(dom){
		this.p=new pacmanScene(dom);
	},
	inactive:function(){
		this.p.removeListener()
	}
}
var pacmanScene=function(dom){
	this.container=dom;
	this.foodLength=23;
	this.foodPre='f';
	this.foodPos={x:0,y:0}
	this.food=null,
	this.lastAngle=0,
	this.isEating=false,
	this.pacman=document.createElement('div');
	this.down=this._down.bind(this);
	this.init();
	
}
pacmanScene.prototype={
	init:function(){
		var self=this;		
		this.addPacman().then(function(){
			self.addListener()
		})
	},
	addPacman:function(){
		var self=this;
		return new Promise(function(resolve,reject){
			var img=new Image();
			img.src='img/pacman1.gif';
			img.onload=function(){
				self.pacman.appendChild(img)
				self.pacman.width=img.width;
				self.pacman.height=img.height;
				resolve(img)
			}
			self.pacman.img=img		
			self.pacman.style='z-index:99;position:absolute;left:'+(window.innerWidth/2-66/2)+'px;top:330px;'

			self.container.appendChild(self.pacman)
		})	
	},
	addFood:function(e){
		var x=isMobile ? e.targetTouches[0].clientX : e.pageX, y=isMobile ? e.targetTouches[0].clientY : e.pageY,
		foodId=Math.round(Math.random()*(this.foodLength-1)),self=this;
		
		return new Promise(function(resolve,reject){
			var img=new Image();
			img.src="img/"+self.foodPre+foodId+'.png';
			img.onload=function(){
				self.container.appendChild(img);
				self.foodPos={x:x-img.width/2,y:y-img.height/2}
				img.className='food ';
				img.style="transition:.5s;z-index:98;position:absolute;top:"+self.foodPos.y+'px;left:'+self.foodPos.x+'px;';


				self.food=img;
				resolve(self.food)
			}
		})
		
	},
	eatFood:function(){
		this.isEating=true;

		var moveX=this.foodPos.x+this.food.width/2-parseFloat(this.pacman.style.left)-this.pacman.width/2,
		    moveY=this.foodPos.y+this.food.height/2-parseFloat(this.pacman.style.top)-this.pacman.height/2,
		self=this;

		var angle=this.getAngle();
		this.pacman.style.transition='.6s ease-out';
		this.pacman.img.style.transition='.3s'
		this.pacman.img.style.transform='rotate('+angle+'deg)'

		setTimeout(function(){self.pacman.style[preFix('transform')]='translate('+moveX+'px,'+moveY+'px)'},500)
		setTimeout(function(){self.food.style.opacity=0},800)
		setTimeout(function(){self.container.removeChild(self.food);self.isEating=false;},900)
	},
	getAngle:function(){
		var rect=this.pacman.getBoundingClientRect();

		var tan=(this.foodPos.y-rect.top)/(this.foodPos.x-rect.left);
		var angle=Math.atan(tan)*180/Math.PI;//-90..90
		if(this.foodPos.x-rect.left<0){
			angle=angle+180

		} else {
			
		}
		return angle;
		
	},
	_down:function(e){
		if(!this.isEating){
			this.addFood(e).then(this.eatFood.bind(this))
		}	
	},
	addListener:function(){
		isMobile ? window.addEventListener('touchstart',this.down) : window.addEventListener('mousedown',this.down)

	},
	removeListener:function(){
		window.removeEventListener('mousedown',this.down)
		window.removeEventListener('touchstart',this.down)
	}
}

function preFix(name){
	var div = document.createElement("div"),
	divStyle = div.style,vendor=['O','webkit','ms','Moz'],tmp;
	if(name in divStyle) return name;
	for(var i=0;i<vendor.length;i++){
		if((vendor[i]+name) in divStyle){
			tmp=vendor[i]+name
			break;
		}		
	}
	return tmp;
}
module.exports=app;