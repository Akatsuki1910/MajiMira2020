import {
  Player,
  Ease
} from "textalive-app-api";
import {
  OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
import LYRICS from './lyrics';
import createMoon from './moon';
import createStar from './star';
import createStone from './stone';
import createMMD from './mmd';
import createCircleStone from './circleStone';

window.addEventListener("resize", () => location.reload());
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

  // console.log(player.video)

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
  // console.log(data);
  ly.onReady();
}

function onTimeUpdate(position) {

}

function onThrottledTimeUpdate(position) {
  // positionEl.textContent = String(Math.floor(position)); //経過時間
}

let lyricesText = ""; //ここに歌詞
let lyricesDataNum = 0;

function animatePhrase(now, unit) {
  // if (unit.contains(now)) {
  //   lyricesText = unit.text; //歌詞
  // }
};

//pixi
const width = window.innerWidth;
const height = window.innerHeight;
const ly = new LYRICS(width, height, player);

function animate() {
  requestAnimationFrame(animate);
  stats.begin();
  effectmain();
  ly.animation(lyricesTextFunc(), lyricesDataNum);
  stats.end();
}

let whileTimeStart;
let whileTimeEnd;
// let ccmem = {};

function lyricesTextFunc() {
  if (ly.status > 1) {
    if (lyricesDataNum != jsonData.data.length && player.timer.position >= jsonData.data[lyricesDataNum].startTime) {
      lyricesText = jsonData.data[lyricesDataNum].lyric;
      lyricesDataNum++;
    }

    // const c = player.video.findChar(player.timer.position);
    // const cc = (c == null) ? "" : c._data;
    // if (cc != ccmem) console.log(cc);
    // ccmem = cc;

    const p = player.video.findWord(player.timer.position);
    const nowEndTime = (p == null) ? 0 : p._data.endTime;
    const nextStartTime = (p == null) ? 0 : (p._next == null) ? 999999 : p._next._data.startTime;
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
camera.position.set(-100, 70, -270);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const light = new THREE.PointLight(0xFFFFFF, 2, 1000, 1.0);
light.position.set(-300, 50, 100);
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
const star = createStar(scene);
const stone = createStone(scene);
createCircleStone(scene);
stone.scale.set(3, 3, 3);
stone.rotateY(Math.PI / 6);
createMMD(scene);

// first time
rendererThree.render(scene, camera);

function effectmain() {
  controls.update();
  rendererThree.render(scene, camera);
}
animate();