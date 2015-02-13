/*  the last update:2014-07-09
    version:v2.1.07092014
*/
var _json_type_=2;//值为1时，数据格式为jsonp，可传参。值为2时，数据格式为json，不可传参
var b__ua=navigator.userAgent;
var d__i=false;
var d__a=false;
if(/(iPhone|iPad|iPod|iOS)/i.test(b__ua)){
	d__i=true;
}else if(/(Android)/i.test(b__ua)){
	d__a=true;
};
if(!d__i&&!d__cf()){
	d__i=true;
}
var b__pld=null;
var _tide_play_num=0;
var _id_temp=new Object();
function showPlayer(obj){
	if(!obj.adurl){//视频广告接口
		obj.adurl="http://cms81.vojs.cn/ad/ad.php?ChannelCode="+obj.channelcode+"&Url="+encodeURIComponent(getPlayerPageUrl());
	}
	//obj.sturl="http://218.249.39.190:10284/tongji/tide_log_video.php";//统计接口
	if(!obj.skin){
		obj.skin="1,1,1,1";
	}
	if(obj.autoplay==undefined){
		obj.autoplay=true;
	}
	var _dom_name=obj.name;
	if(!obj.name){
		_dom_name="TIDE_PLAYER_"+(_tide_play_num++);
	}
	var _path="/js/v.swf";
	var _w=obj.width;
	if(!_w) _w=1000;
	var _h=obj.height;
	if(!_h) _h=560;//高度=宽度*（3/4）+36。36是播放器控制条高度。
	if(!obj.json) obj.json=obj.josn;
	if(!obj.json) obj.json=obj.url;
	if(!obj.json) obj.json=obj.id;
	if(!obj.json) obj.json=obj.xml;
	if(!obj.json) obj.json="";
	var _hs;
	if(d__i){
		_hs=d__shv(_dom_name,_w,_h,obj);
	}else{
		_hs=d__sf(_path,_dom_name,_w,_h,false,d__vo(obj));
		if(!obj.notool){		
			_hs="<div style='position:relative;z-index:300;'>"+_hs+"</div>";
		}
	}
	if(obj.divid){
		try{
			document.getElementById(obj.divid).innerHTML=_hs;
		}catch(e){};
	}else{
		document.write(_hs);
	};
}
function d__sf(a,b,w,h,c,d){var e='<object id="'+b+'" width="'+w+'" height="'+h+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ><param name="movie" value="'+a+'" /><param name="FlashVars" value="'+d+'" /><param name="wmode" value="'+(c?'transparent':'opaque')+'" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><embed name="'+b+'" width="'+w+'" height="'+h+'" src="'+a+'" wmode="'+(c?'transparent':'opaque')+'" allowFullScreen="true" allowScriptAccess="always" FlashVars="'+d+'" type="application/x-shockwave-flash"></embed></object>';return e;}
function d__shv(n,w,h,o){_id_temp.id=n;_id_temp.w=w;_id_temp.h=h;_id_temp.ap=o.autoplay;_id_temp.lp=o.loop;_id_temp.cv=o.cover;_id_temp.pc=o.playcallback;var a=o.json;var b;if(a){if(a.indexOf("http://")==-1){a=d__url(o.json)};if(a.split('/')[2]!==window.location.href.split('/')[2]){d__cjp(a+"&funcname=d__ihtml5")}else{d__cap(a)}b="正在读取请稍后..."}else{var c=o.video;if(c){var d=c.toLowerCase();var e=d.substr(d.lastIndexOf(".")+1);if(e=="mp4"){b=d__ihtml5(c,true)}}if(!b){b="此视频暂时不支持移动设备播放，请在电脑上浏览观看！"}}return'<div id='+n+' style="width:'+w+'px;height:'+h+'px;background:#000;line-height:'+h+'px;text-align:center;color:#fff;font-size:16px;clear:both;">'+b+'</div>'}
function d__cshv_b(vobj,func){if(eval(func)()){vobj.onplay=null;vobj.onplaying=null;onclick=null;}else{if(typeof vobj.webkitExitFullscreen!=="undefined"){vobj.webkitExitFullscreen()};vobj.currentTime=0;vobj.pause();try{vobj.stop();}catch(e){};}}
function d__ihtml5(a,b){var c;if(b){c=a}else{var vc;for(var i=a.videos.length-1;i>=0;i--){var vi=a.videos[i];if(!c){c=vi.url}if(vi.type=="v"){vc=vi.url}}if(vc){c=vc}}if(c){var cf="d__cshv_b(this,'"+_id_temp.pc+"');";var d='<video '+(_id_temp.pc?('onplay="'+cf+'" onplaying="'+cf+'" onclick="'+cf+'" '):'')+'width="'+_id_temp.w+'" height="'+_id_temp.h+'" controls="controls" '+(_id_temp.ap?'autoplay="autoplay" ':'')+(_id_temp.lp?'loop="loop" ':'')+(_id_temp.cv?('poster="'+_id_temp.cv+'" '):(a.photo?('poster="'+a.photo+'" '):''))+'src="'+c+'"></video>';if(b){return d}else{document.getElementById(_id_temp.id).innerHTML=d}}}
function d__cf(){if(navigator.mimeTypes.length>0){try{return navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin!=null}catch(e){return false}}else if(window.ActiveXObject){try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash");return true}catch(e){return false}}else{return false}}
function d__vo(a){var b=new Array();for(var c in a){b.push(c+"="+encodeURIComponent(a[c]))}return b.join("&")}
function d__pld(){var d=document.createElement("div");d.style.position="absolute";d.style.display="none";d.style.width="100%";d.style.height=document.documentElement.scrollHeight+"px";d.style.zIndex=299;d.style.left="0px";d.style.top="0px";d.style.backgroundColor="#000";return d}
function d__url(a){if(a.indexOf(".")!=-1){return a};var b=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);var c,c2,c3,c4;var i,len,out;len=a.length;i=0;out="";while(i<len){do{c=b[a.charCodeAt(i++)&0xff]}while(i<len&&c==-1);if(c==-1)break;do{c2=b[a.charCodeAt(i++)&0xff]}while(i<len&&c2==-1);if(c2==-1)break;out+=String.fromCharCode((c<<2)|((c2&0x30)>>4));do{c3=a.charCodeAt(i++)&0xff;if(c3==61)return out;c3=b[c3]}while(i<len&&c3==-1);if(c3==-1)break;out+=String.fromCharCode(((c2&0XF)<<4)|((c3&0x3C)>>2));do{c4=a.charCodeAt(i++)&0xff;if(c4==61)return out;c4=b[c4]}while(i<len&&c4==-1);if(c4==-1)break;out+=String.fromCharCode(((c3&0x03)<<6)|c4)}return out}
function d__cjp(a){var b=document.createElement("script");b.onload=b.onreadystatechange=function(){if(!this.readyState||this.readyState==="loaded"||this.readyState==="complete"){b.onload=null;b.onreadystatechange=null}};b.type="text/javascript";b.charset="utf-8";b.src=a;document.getElementsByTagName("head")[0].appendChild(b)}
var _tidev_aro;function d__cap(url){if(window.XMLHttpRequest){_tidev_aro=new XMLHttpRequest()}else if(typeof(ActiveXObject)!="undefined"){_tidev_aro=new ActiveXObject("Microsoft.XMLHTTP")}if(!_tidev_aro){document.getElementById(_id_temp.id).innerHTML="请求错误！"}else{_tidev_aro.open("GET",url,true);_tidev_aro.setRequestHeader("Content-Type","application/x-www-form-urlencoded");_tidev_aro.onreadystatechange=d__cap_func;_tidev_aro.send(null)}}
function d__cap_func(){if(_tidev_aro.readyState==4&&_tidev_aro.status==200){d__ihtml5(eval("("+(_tidev_aro.responseText).trim()+")"))}}
function getFlashDom(a){return document[a]}
function _getPlayer(){return getFlashDom("TIDE_PLAYER_0")};
function getPlayerPageUrl(){return window.location.href;}
String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"");}
//--------------控制灯
function controlLight(show){
	if(!b__pld){
		b__pld=d__pld();
		document.body.appendChild(b__pld);
	}
	b__pld.style.display=show?"none":"block";
}
