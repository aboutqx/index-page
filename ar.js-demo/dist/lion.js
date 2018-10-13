!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=13)}([function(e,t,n){"use strict";function r(){o.call(this),this.setMaxListeners(20)}var o=n(6).EventEmitter;r.prototype=Object.create(o.prototype),r.prototype.constructor=r,r.prototype.off=function(e,t){return t?this.removeListener(e,t):e?this.removeAllListeners(e):this.removeAllListeners()},e.exports=r},function(e,t,n){"use strict";e.exports={mbs:0,secs:0,update:function(e,t,n,r){var o,i=e.getAllResponseHeaders();if(i){var s=i.match(/content-length: (\d+)/i);s&&s.length&&(o=s[1])}if(o){o=parseInt(o,10);var a=o/1024/1024,u=(Date.now()-t)/1e3;this.secs+=u,this.mbs+=a,r&&this.log(n,a,u)}else r&&console.warn.call(console,"Can't get Content-Length:",n)},log:function(e,t,n){if(e){var r="File loaded: "+e.substr(e.lastIndexOf("/")+1)+" size:"+t.toFixed(2)+"mb time:"+n.toFixed(2)+"s speed:"+(t/n).toFixed(2)+"mbps";console.log.call(console,r)}var o="Total loaded: "+this.mbs.toFixed(2)+"mb time:"+this.secs.toFixed(2)+"s speed:"+this.getMbps().toFixed(2)+"mbps";console.log.call(console,o)},getMbps:function(){return this.mbs/this.secs}}},function(e,t,n){"use strict";var r=n(4);r.stats=n(1),e.exports=r},function(e,t,n){"use strict";e.exports=function(){try{return!!new Blob}catch(e){return!1}}()},function(e,t,n){"use strict";var r=n(0),o=n(5),i=0;e.exports=function e(t){var n,s={},a=[],u=[],c=0,l=0,d={},f=function(r){if(Array.isArray(r))return r.forEach(f),n;var i,s=!!r.assets&&Array.isArray(r.assets);return i=s?e(m(r,t)):o(m(r,t)),i.once("destroy",E),u.push(i),d[i.id]=i,n},h=function(e){return arguments.length?s[e]?s[e]:d[e]:a},p=function(e){if(h(e))return h(e);var t=null;return Object.keys(d).some(function(n){return!!(t=d[n].find&&d[n].find(e))}),t},v=function(e){return e&&e.split("?")[0].split(".").pop().toLowerCase()},m=function(e,t){if("string"==typeof e){e={url:e}}return void 0===e.isTouchLocked&&(e.isTouchLocked=t.isTouchLocked),void 0===e.blob&&(e.blob=t.blob),void 0===e.basePath&&(e.basePath=t.basePath),e.id=e.id||e.url||String(++i),e.type=e.type||v(e.url),e.crossOrigin=e.crossOrigin||t.crossOrigin,e.webAudioContext=e.webAudioContext||t.webAudioContext,e.log=t.log,e},y=function(){return l=u.length,u.forEach(function(e){e.on("progress",g).once("complete",b).once("error",w).start()}),u=[],n},g=function(e){var t=c+e;n.emit("progress",t/l)},b=function(e,t,r){Array.isArray(e)&&(e={id:t,file:e,type:r}),c++,n.emit("progress",c/l),s[e.id]=e.file,a.push(e),n.emit("childcomplete",e),_()},w=function(e){l--,n.listeners("error").length?n.emit("error",e):console.error(e),_()},E=function(e){d[e]=null,delete d[e],s[e]=null,delete s[e],a.some(function(t,n){if(t.id===e)return a.splice(n,1),!0})},_=function(){c>=l&&n.emit("complete",a,s,t.id,"group")},L=function(){for(;u.length;)u.pop().destroy();return n.off("error"),n.off("progress"),n.off("complete"),a=[],s={},t.webAudioContext=null,l=0,c=0,Object.keys(d).forEach(function(e){d[e].destroy()}),d={},n.emit("destroy",n.id),n};return n=Object.create(r.prototype,{_events:{value:{}},id:{get:function(){return t.id}},add:{value:f},start:{value:y},get:{value:h},find:{value:p},getLoader:{value:function(e){return d[e]}},loaded:{get:function(){return c>=l}},file:{get:function(){return a}},destroy:{value:L}}),t=m(t||{},{basePath:"",blob:!1,touchLocked:!1,crossOrigin:null,webAudioContext:null,log:!1}),Array.isArray(t.assets)&&f(t.assets),Object.freeze(n)}},function(e,t,n){"use strict";var r=n(0),o=n(3),i=n(1);e.exports=function(e){var t,n,s,a,u,c,l=e.id,d=e.basePath||"",f=e.url,h=e.type,p=e.crossOrigin,v=e.isTouchLocked,m=e.blob&&o,y=e.webAudioContext,g=e.log,b=function(){switch(a=Date.now(),h){case"json":T();break;case"jpg":case"png":case"gif":case"webp":case"svg":R();break;case"mp3":case"ogg":case"opus":case"wav":case"m4a":O();break;case"ogv":case"mp4":case"webm":case"hls":S();break;case"bin":case"binary":E("arraybuffer");break;case"txt":case"text":E("text");break;default:throw"AssetsLoader ERROR: Unknown type for file with URL: "+d+f+" ("+h+")"}},w=function(e){e&&(c={id:l,file:e,type:h},t.emit("progress",1),t.emit("complete",c,l,h),F())},E=function(e,t){n=t||L,s=new XMLHttpRequest,s.open("GET",d+f,!0),s.responseType=e,s.addEventListener("progress",_),s.addEventListener("load",n),s.addEventListener("error",P),s.send()},_=function(e){e.lengthComputable&&t.emit("progress",e.loaded/e.total)},L=function(){x()&&w(s.response)},x=function(){return s&&s.status<400?(i.update(s,a,f,g),!0):(P(s&&s.statusText),!1)},T=function(){E("json",function(){if(x()){var e=s.response;"string"==typeof e&&(e=JSON.parse(e)),w(e)}})},R=function(){m?k():M()},M=function(){s=new Image,p&&(s.crossOrigin="anonymous"),s.addEventListener("error",P,!1),s.addEventListener("load",A,!1),s.src=d+f},A=function(e){if(window.clearTimeout(u),!e&&(s.error||!s.readyState))return void P();w(s)},k=function(){E("blob",function(){x()&&(s=new Image,s.addEventListener("error",P,!1),s.addEventListener("load",C,!1),s.src=window.URL.createObjectURL(s.response))})},C=function(){window.URL.revokeObjectURL(s.src),w(s)},O=function(){y?H():j("audio")},S=function(){m?E("blob"):j("video")},H=function(){E("arraybuffer",function(){x()&&y.decodeAudioData(s.response,function(e){s=null,w(e)},function(e){P(e)})})},j=function(e){s=document.createElement(e),v||(window.clearTimeout(u),u=window.setTimeout(A,2e3),s.addEventListener("canplaythrough",A,!1)),s.addEventListener("error",P,!1),s.preload="auto",s.src=d+f,s.load(),v&&w(s)},P=function(e){window.clearTimeout(u);var n=e;if(s&&s.tagName&&s.error){n="MediaError: "+["","ABORTED","NETWORK","DECODE","SRC_NOT_SUPPORTED"][s.error.code]+" "+s.src}else s&&s.statusText?n=s.statusText:e&&e.message?n=e.message:e&&e.type&&(n=e.type);t.emit("error",'Error loading "'+d+f+'" '+n),U()},F=function(){t.off("error"),t.off("progress"),t.off("complete"),s&&(s.removeEventListener("progress",_),s.removeEventListener("load",n),s.removeEventListener("error",P),s.removeEventListener("load",A),s.removeEventListener("canplaythrough",A),s.removeEventListener("load",C))},U=function(){F(),s&&s.abort&&s.readyState<4&&s.abort(),s=null,y=null,c=null,window.clearTimeout(u),t.emit("destroy",l)};return t=Object.create(r.prototype,{_events:{value:{}},id:{value:e.id},start:{value:b},loaded:{get:function(){return!!c}},file:{get:function(){return c}},destroy:{value:U}}),Object.freeze(t)}},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(e){return"function"==typeof e}function o(e){return"number"==typeof e}function i(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!o(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,o,a,u,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var l=new Error('Uncaught, unspecified "error" event. ('+t+")");throw l.context=t,l}if(n=this._events[e],s(n))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),n.apply(this,a)}else if(i(n))for(a=Array.prototype.slice.call(arguments,1),c=n.slice(),o=c.length,u=0;u<o;u++)c[u].apply(this,a);return!0},n.prototype.addListener=function(e,t){var o;if(!r(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,r(t.listener)?t.listener:t),this._events[e]?i(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,i(this._events[e])&&!this._events[e].warned&&(o=s(this._maxListeners)?n.defaultMaxListeners:this._maxListeners)&&o>0&&this._events[e].length>o&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),o||(o=!0,t.apply(this,arguments))}if(!r(t))throw TypeError("listener must be a function");var o=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,o,s,a;if(!r(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],s=n.length,o=-1,n===t||r(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(i(n)){for(a=s;a-- >0;)if(n[a]===t||n[a].listener&&n[a].listener===t){o=a;break}if(o<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(o,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],r(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){return this._events&&this._events[e]?r(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(r(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},,function(e,t,n){"use strict";function r(){function e(){c.onResize(),c.copySizeTo(t.domElement),null!==l.arController&&c.copySizeTo(l.arController.canvas)}var t=new THREE.WebGLRenderer({alpha:!0});t.shadowMap.type=THREE.PCFSoftShadowMap,t.shadowMap.enabled=!0,t.autoClear=!1,t.setClearColor(0),t.setSize(window.innerWidth,window.innerHeight),t.domElement.style.position="absolute",t.domElement.style.top="0px",t.domElement.style.left="0px",document.body.appendChild(t.domElement);var n=[],r=new THREE.Scene,o=new THREE.AmbientLight(4473924);r.add(o);var s=new THREE.DirectionalLight("white");s.position.set(1,8,4.3).setLength(12),s.shadow.mapSize.set(256,128),s.shadow.camera.bottom=-12,s.shadow.camera.top=12,s.shadow.camera.right=12,s.shadow.camera.left=-12,s.castShadow=!0,r.add(s);var a=new THREE.Camera;r.add(a);var u=void 0;u={sourceType:"webcam"};var c=new THREEx.ArToolkitSource(u);c.init(function(){e()}),window.addEventListener("resize",function(){e()});var l=new THREEx.ArToolkitContext({cameraParametersUrl:"./data/data/camera_para.dat",detectionMode:"mono",patternRatio:.9});l.init(function(){a.projectionMatrix.copy(l.getProjectionMatrix())}),n.push(function(){!1!==c.ready&&(l.update(c.domElement),r.visible=a.visible)});var d=new THREE.Group;r.add(d);new THREEx.ArMarkerControls(l,a,{type:"pattern",patternUrl:"./parttern/fu-marker.patt",changeMatrixMode:"cameraTransformMatrix"});r.visible=!1;var f=new THREE.Scene;d.add(f),f.fog=new THREE.Fog(10526880,200,1e3);var h=new THREE.ShadowMaterial;h.opacity=.7;//! bug in threejs. can't set in constructor
var p=new THREE.PlaneGeometry(6,6),v=new THREE.Mesh(p,h);v.receiveShadow=!0,v.depthWrite=!1,v.rotation.x=-Math.PI/2,f.add(v);var m=new i.default(r,a,t);m.load(function(){f.add(m.mesh),s.target=m.mesh}),n.push(function(){m.render()});var y=new Stats;document.body.appendChild(y.dom),n.push(function(){t.render(r,a),y.update()});var g=null;requestAnimationFrame(function e(t){requestAnimationFrame(e),g=g||t-1e3/60;var r=Math.min(200,t-g);g=t,n.forEach(function(e){e(r/1e3,t/1e3)})})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var o=n(12),i=function(e){return e&&e.__esModule?e:{default:e}}(o)},,,,function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(t,n,o){r(this,e),this.scene=t,this.camera=n,this.renderer=o,this.clock=new THREE.Clock,this._init()}return o(e,[{key:"_init",value:function(){this.mixers=[]}},{key:"load",value:function(e){var t=this;(new THREE.FBXLoader).load("models/animated/lion.fbx",function(n){console.log(n),n.mixer=new THREE.AnimationMixer(n),t.mixers.push(n.mixer),n.mixer.clipAction(n.animations[0]).play(),n.traverse(function(e){e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0,t._setMatrial(e))}),n.scale.set(.05,.05,.05),n.rotation.y=Math.PI,n.rotation.x=-Math.PI/2,t.mesh=n,e()})}},{key:"render",value:function(){var e=this.clock.getDelta();if(this.mixers.length>0)for(var t=0;t<this.mixers.length;t++)this.mixers[t].update(e)}},{key:"_setMatrial",value:function(e){e.material.map=new THREE.CanvasTexture(document.querySelector("img"))}}]),e}();t.default=i},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){window.assets=e,(0,u.default)(),setTimeout(function(){l.style.display="none",document.querySelector("canvas").style.opacity=1},200)}var i=n(2),s=r(i),a=n(8),u=r(a),c=document.querySelector(".container"),l=c.querySelector(".progress-bar"),d=[{id:"bg",url:"textures/bg1.jpg"},{id:"cloud",url:"textures/cloud.png"}];window.getAssets=function(e){return window.assets.find(function(t){return t.id===e}).file};(0,s.default)({log:!0}).add(d).on("error",function(e){console.error(e)}).on("progress",function(e){l.innerHTML="Loading..."+(100*e).toFixed()+"%"}).on("complete",o).start()}]);