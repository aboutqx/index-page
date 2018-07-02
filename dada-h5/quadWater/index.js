import Promise from 'bluebird';
import quadScene from './quadScene';

document.addEventListener('DOMContentLoaded',function(){
    window.addEventListener("touchstart", function(e) {
        e.preventDefault()
    }, false),
    window.addEventListener("touchmove", function(e) {
        e.preventDefault()
    }, false)
})
window.audioTag=document.querySelector('audio')

var t=new quadScene(document.querySelector('.container canvas'));
t.load().delay(600).then(function(argument) {
	t._checkSize();
	t.resize(window.innerWidth,window.innerHeight)
	t.play()
})