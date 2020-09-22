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
  VRM,
  VRMUtils
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
camera.position.set(0, 0, 10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshStandardMaterial({
  color: 0x0000ff
});
const box = new THREE.Mesh(geometry, material);
// scene.add(box);

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

const loader = new GLTFLoader();
loader.crossOrigin = 'anonymous';
loader.load(
	'./models/miku.vrm',
	( gltf ) => {
    VRMUtils.removeUnnecessaryJoints( gltf.scene );
		VRM.from( gltf ).then( ( vrm ) => {
			scene.add( vrm.scene );
      console.log( vrm );
      vrm.scene.rotation.y = Math.PI;
		} );
	},
	( progress ) => console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' ),
	( error ) => console.error( error )
);

// first time
rendererThree.render(scene, camera);

function effectmain() {
  controls.update();
  rendererThree.render(scene, camera);
}