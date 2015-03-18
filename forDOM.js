
 function id(name){
	return document.getElementById(name);
}
function tag(name,elem){
	return (elem||document).getElementsByTagName(name);
}
function prev(elem){
    elem=elem.previousSibling;
	do{
		elem=elem.previousSibling;
	}while(elem&&elem.nodeType!=1);
	return elem;
} 
function next(elem){
    elem=elem.nextSibling;
	do{
		elem=elem.nextSibling;
	}while(elem&&elem.nodeType!=1);
	return elem;
} 
function first(elem){
    elem=elem.firstChild;
return elem&&elem.nodeType!=1?next(elem):elem;
}
function last(elem){
    elem=elem.lastChild;
	return elem&&elem.nodeType!=1?prev(elem):elem;
}
function parent(elem,num){
	num=num||1;
	for(var i=0;i<num;i++)
		if(elem!=null)elem=elem.parentChild;
		return elem;
}
function attr(elem,name,value){
	if(!name||name.constructor!=String)return '';
	name={'for':'htmmlFor','class':'className'}[name]||name;
	if(typeof value!='undefined'){
		elem[name]=value;
		if(elem.setAttribute)
			elem.setAttribute(name,value);
	}
	return elem[name]||elem.getAttribute(name)||'';
}
function create(elem){
	return document.ceateElement(elem);
}
function before(parent,before,elem){
	if(elem==null){
		elem=before;
		before=parent;
		parent=before.parentNode;
	}
	parent.insertBefore(checkElem(elem),before)
}
function append(parent,elem){
	parent.appenChild(check(elem));
}
	function checkElem(elem){
		return elem&&elem.constructor==String?document.createTextNode(elem):elem;
	}
	function remove(elem){
		if(elem)elem.parentNode.removeChild(elem);
	}
function addEvent(elm, evType, fn, useCapture){
  if (elm.addEventListener){
   elm.addEventListener(evType, fn, useCapture);
   return true;
  } else if (elm.attachEvent) {
   var r = elm.attachEvent('on' + evType, fn);
   return r;
  } else {
   elm['on' + evType] = fn;
  }
 }
  function stopDefault(e){
	if (e && e.preventDefault){
			e.preventDefault();
		}else		window.event.returnValue = false;
		return false;
	}
	function stopBubble(e){
		if(e&&e.stopPropagation){
			e.stopPropagation();
		}else  window.event.cacelBubble=true;
	}
//获取指定元素的最终样式值
function getStyle(elem,name){
	//如果属性存在于style[]中，那么他已被设置了，并是最终的
	if(elem.style[name])
		return elem.style[name];
	//否则尝试ie的办法
	else if(elem.currentStyle)
		return elem.currentStyle[name];
	//或者w3c的方法，如果存在的话
	else if(document.defaultView&&document.defaultView.getComputedStyle){
		name=name.replace(/([A-Z])/g,"-$1");
		name=name.toLowerCase();
	    var s=document.defaultView.getComputedStyle(elem,'');
		return s&&s.getPropertyValue(name);
	}//否则用户使用的是其他浏览器，返回null
	else return null;
}

//页面主体的高度与宽度
function pageheight(){
	return document.body.scrollHeight;
}
function pagewidth(){
	return document.body.scrollWidth;
}
//获得视口的高度与宽度
function widowHeight(){
	var de=document.documentElement;
	return self.innerHeight||(de&&de.clientHeight)||document.body.clientHeight;
}
function widowWidth(){
	var de=document.documentElement;
	return self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth;
}
//鼠标相对整个页面的当前位置
function getX(e){
	e=e||window.event;
	return e.pageX||e.clientX+document.body.scrollLeft;
}
function getY(e){
	e=e||window.event;
	return e.pageY||e.clientY+document.body.scrollTop;
}
//确定元素相对于整个文档的x,y位置
function pageX(elem){
	//查看我们是否位于根元素,在ff中offsetParent指向的元素是根节点,opera中就是元素的直接父亲
	return elem.offsetParent?
	//能的话，增加偏移量并递归
		elem.offsetLeft+pageX(elem.offsetParent):elem.offsetLeft;
}
function pageY(elem){
	return elem.offsetParent?
		elem.offsetTop+pageY(elem.offsetParent):elem.offsetTop;
}
//设置元素的x和y位置，与当前位置无关
function setX(elem,pos){
	elem.style.left=pos+'px';
}
function setY(elem,pos){
	elem.style.top=pos+'px';
}

//获得元素的宽度与高度
function getHeight(elem){
	return parseInt(getStyle(elem,'height'));
}
function getWidth(elem){
	return parseInt(getStyle(elem,'width'));
}
//获得元素的潜在高度与宽度
function fullHeight(elem){
	if (getStyle(elem,'display')!='none')
	{return elem.offsetHeight||getHeight(elem);
	}
	var old=resetCSS(elem,{
		display:'',
		visibility:'hidden',
			position:'absolute'
		})
	//使用clientHeight找出元素的完整高度，如果还不生效，使用getHeight函数
		var h=elem.clientHeight||getHeight(elem);
		restoreCSS(elem,old);
		return h;
}
function fullWidth(elem){
	if (getStyle(elem,'display')!='none')
	{return elem.offsetWidth||getWidth(elem);
	}
	var old=resetCSS(elem,{
		display:'',
		visibility:'hidden',
			position:'absolute'
		})
	//使用clientWidth找出元素的完整高度，如果还不生效，使用getWidth函数
		var h=elem.clientWidth||getWidth(elem);
		restoreCSS(elem,old);
		return h;
}
function resetCSS(elem,prop){
	var old={};
	for (var i in prop )
	{old[i]=elem.style[i];
	elem.style[i]=prop[i];
	}
return old;
}
function restoreCSS(elem,prop){
	for (var i in prop )
	{elem.style[i]=prop[i];
	}
}
//设置元素的透明度，从0-100
function setOpacity(elem,level){
	//ie的方法
	if(elem.filters)
		elem.style.filters='alpha(opacity='+level+')';
	//w3c的opacity属性
	else elem.style.opacity=level/100;
}
//渐显函数
function slideDown(elem){
show(elem);
var h=fullHeight(elem);
	elem.style.height='0px';
for (var i=0;i<101; i+=5){
(function(){//使用一个匿名函数来激发一个作用域
var pos=i;
setTimeout(
function(){elem.style.height=((pos/100)*h)+'px';}
,(pos+1)*12);})();
	}
}
function show(elem)
{
	elem.style.display=elem.style.display=='none'?'block':'none';
}
 function fadeIn( elem ) {
     //透明度从零开始
     setOpacity(elem,0);
     //显示元素(但是你看不到它，因为透明度为零)
     show( elem );
     //我们将做一个在一秒钟内播放的20"帧"的动画
     for ( var i = 0; i <= 100; i += 5 ) {

         //保证我们有一个正确的i的闭包
         (function(){
             var pos = i;
             //设置未来特定时间的定时器
             setTimeout(function(){
                 //设置元素的新的透明度
                 setOpacity(elem,pos);
             }, ( pos + 1 ) * 10 );
         })();
     }
 }

