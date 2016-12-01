import Promise from 'bluebird';
import quadScene from './quadScene';

var t=new quadScene(document.querySelector('.container canvas'));
t.load().delay(600).then(function(argument) {
	t._checkSize();
	t.play()
})