import * as THREE from './js/three.module.js.js';

//pixi
const width = window.innerWidth;
const height = window.innerHeight;
const x = width / 2;
const y = height / 2;
const stage = new PIXI.Container();
const renderer = PIXI.autoDetectRenderer({
	width: width,
	height: height,
	resolution: 1,
	antialias: true,
	transparent: true,
});
document.getElementById("pixiview").appendChild(renderer.view);
window.onresize = function () {
	location.reload();
};

var time = 0;

function animate() {
	requestAnimationFrame(animate);
	//textobj.text++;//########################################
	effectmain();
	renderer.render(stage);
}

var word = "0";
var style = {
	fontFamily: 'Arial',
	fontSize: '40px',
	fill: 'white',
	fontWeight: "bold"
};
var textobj = new PIXI.Text(word, style);
//stage.addChild(textobj);//########################################

//three
// レンダラーを作成
const canvas = document.querySelector('canvas');
const rendererThree = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true
});
rendererThree.setPixelRatio(window.devicePixelRatio);
rendererThree.setSize(width, height);
// シーンを作成
const scene = new THREE.Scene();
// カメラを作成
const camera = new THREE.PerspectiveCamera(60, width / height);
var cam_x = 500;
var cam_y = 500;
var cam_z = 1000;
camera.position.set(cam_x, cam_y, cam_z);
//camera.lookAt(new THREE.Vector3(0, 0, 0));

//var controls = new THREE.TrackballControls(camera);

function effectmain() {
	//tick();
	//controls.update();
	rendererThree.render(scene, camera);
}

animate();