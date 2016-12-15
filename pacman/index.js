import Promise from 'bluebird';
import TweenMax from 'gsap'
function isMobile(){
    var ua=navigator.userAgent.toLowerCase();
    return /android|iphone|ipad/.test(ua)
}
var isMobile=isMobile();
var app={
	p:null,
	load:function(dom){
		var self=this;
		this.p=new pacmanScene(dom);
		this.p.load().then(function(){
			self.p.init();
			self.p.play();
		})
	},
	inactive:function(){
		this.p.removeListener()
		this.p.dispose();
	}
}
var pacmanScene=function(dom){
	this.container=dom;
	this.foodLength=23;
	this.foodPre='f';
	this.foodPos={x:0,y:0}
	this.food=[],
	this.eatPromise=null,
	this.isEating=false,
	this.foodImg=[],
	this.pacman=document.createElement('div');
	this.down=this._down.bind(this);
	this.resize=this._resize.bind(this);
}
pacmanScene.prototype={
	init:function(){
		var self=this;		
		self.container.appendChild(self.pacman)
		self.pacman.setAttribute('style','z-index:99;position:absolute;left:'+(window.innerWidth/2-100/2)+'px;top:'+(window.innerHeight/2-100/2)+'px;')
	},
	load:function(){
		return Promise.all([this.loadPacman(),this.loadImage()])
	},
	play:function(){
		this.addListener()	
	},
	loadImage:function(){
		var self=this,num=0;
		return new Promise(function(resolve,reject){
			for(var i=0;i<self.foodLength;i++){
				(function(){
					var index=i;
					var img= new Image();
					img.src="img/"+self.foodPre+index+'.png';
					img.onload=function(){
						num++
						self.foodImg.push(img)
						if(num==self.foodLength){
							resolve(img)
						}				
					}
				})()		
			}
		})
	},
	loadPacman:function(){
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
		})	
	},
	addFood:function(e){

		var x=isMobile ? e.targetTouches[0].clientX : e.pageX, y=isMobile ? e.targetTouches[0].clientY : e.pageY,
		foodId=Math.round(Math.random()*(this.foodLength-1)),self=this;

		var img=this.foodImg[foodId]
		if(has(this.food,'target',img)){
			img =new Image();
			img.src=self.foodImg[foodId].src;
			img.onload=function(){
				self.container.appendChild(img);
			}
		}else {
			self.container.appendChild(img);
		}
		
		self.foodPos={x:x-img.width/2,y:y-img.height/2}
		img.className='food';
		img.setAttribute('style',"z-index:98;position:absolute;top:"+self.foodPos.y+'px;left:'+self.foodPos.x+'px;');
		var moveX=x-parseFloat(self.pacman.style.left)-self.pacman.width/2,
		moveY=y-parseFloat(self.pacman.style.top)-self.pacman.height/2;

		self.food.push({target:img,move:{x:moveX,y:moveY},position:self.foodPos})
	
	},
	startEat:function(){
		if(this.food.length>0&&(!this.eatPromise||this.eatPromise.isFulfilled())&&!this.isEating){
			this.eatFood()
		}
	},
	eatFood:function(){
		
		self=this;

		this.eatPromise= new Promise(function(resolve,reject){
			var angle=self.getAngle();
			
			//self.pacman.img.style.transform='rotate('+angle+'deg)'
			TweenMax.to(self.pacman.img,.3,{transform:'rotate('+angle+'deg)',onComplete:move})
			var moveX=self.food[0].move.x,
		    moveY=self.food[0].move.y

			function move(){
				TweenMax.to(self.pacman,.8,{'transform':'translate('+moveX+'px,'+moveY+'px)', onComplete:next})
				
				//self.pacman.img.removeEventListener('webkitTransitionEnd',move)
				//self.pacman.img.removeEventListener('transitionend',move)
			}
			function next(){
				self.food[0].target.style.display='none';
				//self.food[0].target.style.background='red';
				self.food.shift()
				if(self.food.length>0){
					self.eatFood()
					self.isEating=true;
				}else {
					console.log('eatFinished')
					TweenMax.to(self.pacman,.4,{'transform':'translate('+0+'px,'+0+'px)'})
					TweenMax.to(self.pacman.img,.4,{transform:'rotate('+0+'deg)'})
					self.isEating=false;
				}		
				resolve('eat next')
			}	
	
		})
		return this.eatPromise
	},
	getAngle:function(){
		var rect=this.pacman.getBoundingClientRect();
		this.food.forEach(function(v,i){
			this.food[i].distance=Math.pow(this.food[i].position.y-rect.top,2)+Math.pow(this.food[i].position.x-rect.left,2)
		}.bind(this))
		this.food.sort(function(a,b){
			if (a.distance > b.distance) {
			    return 1;
			}
			if (a.distance < b.distance) {
			    return -1;
			}
			return 0;
		})
		var tan=(this.food[0].position.y-rect.top)/(this.food[0].position.x-rect.left);
		var angle=Math.atan(tan)*180/Math.PI;//-90..90
		if(this.food[0].position.x-rect.left<0){
			angle=angle+180

		} else {
			
		}
		return angle;
	},
	_down:function(e){
		e.preventDefault();
		
		this.addFood(e)
		this.startEat()
		
	},
	_resize:function(){

		this.pacman.setAttribute('style','z-index:99;position:absolute;left:'+(window.innerWidth/2-100/2)+'px;top:'+(window.innerHeight/2-100/2)+'px;')
	},
	addListener:function(){
		isMobile ? window.addEventListener('touchstart',this.down) : window.addEventListener('mousedown',this.down)
		window.addEventListener('resize',this.resize)
	},
	removeListener:function(){
		window.removeEventListener('mousedown',this.down)
		window.removeEventListener('touchstart',this.down)
		window.removeEventListener('resize',this.resize)
	},
	dispose:function(){
		this.foodImg=null,this.food=null;
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
function has(arr, key, value) { //array child object has key-value
    if (!arr||!arr.length) return -1;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] == value) return i;
    }
    return -1;
}

module.exports=app;