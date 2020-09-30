import {
  Player,
  Ease
} from "textalive-app-api";
import {
  OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader';
import {
  VRM,
  VRMUtils,
  VRMSchema
} from '@pixiv/three-vrm';
import LYRICS from './lyrics';
import {
  createMoon
} from './moon';
import {
  createStar
} from './star';
import Stats from 'stats.js';
import {
  createStone
} from './stone';
import {
  createMMD
} from './mmd';


/*
  textalive-app-api
 */
const player = new Player({
  app: {
    appAuthor: "Akatsuki1910"
  },
  valenceArousalEnabled: true,
  vocalAmplitudeEnabled: true,
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
    playBtn.addEventListener("click", () => ly.onPlay());
    jumpBtn.addEventListener("click", () => player.video && player.requestMediaSeek(player.video.firstPhrase.startTime));
    pauseBtn.addEventListener("click", () => player.video && player.requestPause());
    rewindBtn.addEventListener("click", () => player.video && player.requestMediaSeek(190000));
  }
  if (!app.songUrl) {
    player.createFromSongUrl("https://www.youtube.com/watch?v=XSLhsjepelI");
  }
}

function onTimerReady() {
  // アーティスト名 player.data.song.artist.name
  // 曲名 player.data.song.name

  console.log(player.video)

  document
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));

  let p = player.video.firstPhrase;
  jumpBtn.disabled = !p;

  while (p && p.next) {
    p.animate = animatePhrase;
    p = p.next;
  }

  console.log("All load complete");
  ly.onReady();
}

function onTimeUpdate(position) {

  // const beat = player.findBeat(position);
  // stats.begin();
  // effectmain();
  // ly.animation(lyricesTextFunc());
  // stats.end();
  // console.log(beat) // beat
  // if (!beat) {
  //   return;
  // }
  // console.log(player.timer.position)
}

function onThrottledTimeUpdate(position) {
  // positionEl.textContent = String(Math.floor(position)); //経過時間
}

let lyricesText = "ここに歌詞";

function animatePhrase(now, unit) {
  console.log(player.video.findChar(player.timer.position)._data.char);
  if (unit.contains(now)) {
    lyricesText = unit.text; //歌詞
  }
};

//pixi
const width = window.innerWidth;
const height = window.innerHeight;
const ly = new LYRICS(width, height, player);

function animate() {
  requestAnimationFrame(animate);
  stats.begin();
  effectmain();
  ly.animation(lyricesTextFunc());
  stats.end();
}

let whileTimeStart;
let whileTimeEnd;

function lyricesTextFunc() {
  if (ly.status > 0) {
    const p = player.video.findWord(player.timer.position);
    const nowEndTime = (p == null) ? 0 : player.video.findWord(player.timer.position)._data.endTime;
    const nextStartTime = (p == null) ? 0 : (p._next == null) ? 999999 : player.video.findWord(player.timer.position)._next._data.startTime;
    if (nextStartTime - nowEndTime >= 5000) {
      whileTimeStart = nowEndTime;
      whileTimeEnd = nextStartTime;
    }
    const nowTime = player.timer.position;
    if (whileTimeStart < nowTime && nowTime < whileTimeEnd) {
      lyricesText = "";
    }
  }
  return lyricesText;
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
camera.position.set(0, 30, 300);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const light = new THREE.PointLight(0xFFFFFF, 2, 1000, 1.0);
light.position.set(0, 100, 500);
scene.add(light);

//debug
// const axesHelper = new THREE.AxesHelper(10000);
// scene.add(axesHelper);
// const gridHelper = new THREE.GridHelper(1000, 1000);
// scene.add(gridHelper);
const controls = new OrbitControls(camera, rendererThree.domElement);
controls.update();
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

createMoon(scene);
createStar(scene);
const stone = createStone(scene)
stone.scale.set(3, 3, 3)
stone.rotateY(Math.PI / 6)
createMMD(scene);

// first time
rendererThree.render(scene, camera);

function effectmain() {
  controls.update();
  rendererThree.render(scene, camera);
}
animate();