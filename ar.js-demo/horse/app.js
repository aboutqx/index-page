import AssetsLoader from'assets-loader';
import play from './SceneHorse.js'

const container = document.querySelector('.container'),progressbar = container.querySelector('.progress-bar');
const assets =[{id: 'bg',url: 'textures/bg1.jpg'},{id: 'cloud',url: 'textures/cloud.png'}];
window.getAssets = function(id) {	return window.assets.find( (a) => a.id === id).file;	}



let loader = AssetsLoader({ log: true })
	.add(assets)
	.on('error', function(error) {
		console.error(error)
	})
	.on('progress', (progress) => {
		progressbar.innerHTML = 'Loading...'+(progress * 100).toFixed() + '%';
	})
	.on('complete', _loadScene)
	.start();

function _loadScene(assets){
	window.assets=assets;
	play()
	setTimeout(()=>{
		progressbar.style.display='none'

		container.querySelector('canvas').style.opacity=1;

	},200)


}