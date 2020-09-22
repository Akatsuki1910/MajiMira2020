import {
  Player,
  Ease
} from "textalive-app-api";
import * as THREE from 'three';
import {
  OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader';
import {
  CCDIKSolver,
  CCDIKHelper
} from 'three/examples/jsm/animation/CCDIKSolver';
import {
  MMDLoader
} from 'three/examples/jsm/loaders/MMDLoader';
import {
  VRM,
  VRMUtils,
  VRMSchema
} from '@pixiv/three-vrm';
import LYRICS from './lyrics';


/*
  textalive-app-api
 */
const player = new Player({
  app: {
    appAuthor: "Akatsuki1910"
  },
  mediaElement: document.querySelector("#media") //動画
});

player.addListener({
  onAppReady,
  onTimerReady,
  onTimeUpdate,
  onThrottledTimeUpdate
});

const playBtn = document.querySelector("#play");
const jumpBtn = document.querySelector("#jump");
const pauseBtn = document.querySelector("#pause");
const rewindBtn = document.querySelector("#rewind");

function onAppReady(app) {
  if (!app.managed) {
    document.querySelector("#control").style.display = "block";
    playBtn.addEventListener("click", () => player.video && player.requestPlay());
    jumpBtn.addEventListener("click", () => player.video && player.requestMediaSeek(player.video.firstPhrase.startTime));
    pauseBtn.addEventListener("click", () => player.video && player.requestPause());
    rewindBtn.addEventListener("click", () => player.video && player.requestMediaSeek(0));
  }
  if (!app.songUrl) {
    player.createFromSongUrl("https://www.youtube.com/watch?v=XSLhsjepelI");
  }
}

function onTimerReady() {
  // アーティスト名 player.data.song.artist.name
  // 曲名 player.data.song.name

  document
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));

  let p = player.video.firstPhrase;
  jumpBtn.disabled = !p;

  // set `animate` method
  while (p && p.next) {
    p.animate = animatePhrase;
    // console.log(p.next)
    p = p.next;
  }
  animate();
}

function onTimeUpdate(position) {

  // show beatbar
  const beat = player.findBeat(position);
  // console.log(beat) // beat
  if (!beat) {
    return;
  }
}

function onThrottledTimeUpdate(position) {
  // positionEl.textContent = String(Math.floor(position)); //経過時間
}

let lyricesText = "ここに歌詞";

function animatePhrase(now, unit) {
  if (unit.contains(now)) {
    lyricesText = unit.text; //歌詞
  }
};

//pixi
const width = window.innerWidth;
const height = window.innerHeight;
const ly = new LYRICS(width, height);

function animate() {
  requestAnimationFrame(animate);
  effectmain();
  ly.animation(lyricesText);
}

//three
const rendererThree = new THREE.WebGLRenderer({
  canvas: document.querySelector("#ThreeCanvas"),
  antialias: true,
});
rendererThree.setPixelRatio(window.devicePixelRatio);
rendererThree.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
camera.position.set(0, 25, 50);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const directionalLight = new THREE.DirectionalLight(
  0xffffff
);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

//debug
const axesHelper = new THREE.AxesHelper(10000);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper( 1000, 1000);
scene.add( gridHelper );
const controls = new OrbitControls(camera, rendererThree.domElement);
controls.update();

// const loader = new GLTFLoader();
// let publicVrm;
// loader.crossOrigin = 'anonymous';
// loader.load(
// 	'./models/miku.vrm',
// 	( gltf ) => {
//     VRMUtils.removeUnnecessaryJoints( gltf.scene );
// 		VRM.from( gltf ).then( ( vrm ) => {
// 			scene.add( vrm.scene );
//       vrm.scene.rotation.y = Math.PI;
//       publicVrm=vrm;
// 		} );
// 	},
// 	( progress ) => console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' ),
// 	( error ) => console.error( error )
// );
// Instantiate a loader
var loader = new MMDLoader();

// Load a MMD model
let ikSolver;
loader.load(
	// path to PMD/PMX file
  // './models/mmd/miku_yukihane.pmx',
  './models/tsumi/miku.pmx',
	// called when the resource is loaded
	function ( mesh ) {
    ikSolver = new CCDIKSolver( mesh, mesh.geometry.iks );
    mesh.skeleton.bones[39].rotation.z=0.5;
    scene.add(ikSolver.createHelper())
    scene.add( mesh );
    console.log(mesh)

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

var geometry = new THREE.Geometry();
 
	// 八面体の頂点セット
	geometry.vertices.push(new THREE.Vector3(0, 0, 1));
	geometry.vertices.push(new THREE.Vector3(1, 0, 0));
	geometry.vertices.push(new THREE.Vector3(0, -1, 0));
	geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
	geometry.vertices.push(new THREE.Vector3(0, 1, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0, -1));
 
	// 八面体の面セット
	geometry.faces.push(new THREE.Face3( 0, 2, 1));
	geometry.faces.push(new THREE.Face3( 0, 3, 2));
	geometry.faces.push(new THREE.Face3( 0, 4, 3));
	geometry.faces.push(new THREE.Face3( 0, 1, 4));
	geometry.faces.push(new THREE.Face3( 5, 1, 2));
	geometry.faces.push(new THREE.Face3( 5, 2, 3));
	geometry.faces.push(new THREE.Face3( 5, 3, 4));
	geometry.faces.push(new THREE.Face3( 5, 4, 1));
 
	// 法線ベクトルの自動計算
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	// ワイヤーフレームのメッシュ作成
	var wire = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
	var wireMesh = new THREE.Mesh(geometry, wire);
	scene.add(wireMesh);

// first time
rendererThree.render(scene, camera);

let p = -1;
let deg = 0;
function effectmain() {
  controls.update();
  // publicVrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Neck).rotation.z = deg;
  deg+=p*0.01;
  if(Math.abs(deg)>0.3)p*=-1;
  if ( ikSolver !== undefined ) ikSolver.update();
  // if(ikHelper !== undefined && ikHelper.visible) ikHelper.update();
  rendererThree.render(scene, camera);
}