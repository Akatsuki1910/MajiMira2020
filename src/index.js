import {
  Player
} from "textalive-app-api";
import LYRICS from './lyrics';
import createMoon from './moon';
import createStar from './star';
import createStone from './stone';
import createMMD from './mmd';
import createCircleStone from './circleStone';
import createMagicCircle from './createMagicCircle';
PIXI.TextMetrics.BASELINE_SYMBOL += "あ｜";

window.addEventListener("resize", () => location.reload());
const player = new Player({
  app: {
    appAuthor: "Akatsuki1910"
  },
  valenceArousalEnabled: true,
  vocalAmplitudeEnabled: true,
});

player.addListener({
  onAppReady,
  onTimerReady
});

function onAppReady(app) {
  if (!app.songUrl) {
    player.createFromSongUrl("https://www.youtube.com/watch?v=XSLhsjepelI");
  }
}

function onTimerReady() {
  ly.onReady();
}

let lyricesText = "";
let lyricesDataNum = 0;

const width = window.innerWidth;
const height = window.innerHeight;
const ly = new LYRICS(width, height, player);

function animate() {
  requestAnimationFrame(animate);
  effectmain();
  ly.animation(lyricesTextFunc());
}

let whileTimeStart;
let whileTimeEnd;
let starRotation = false;

function lyricesTextFunc() {
  if (ly.status > 1) {
    if (lyricesDataNum != jsonData.data.length && player.timer.position >= jsonData.data[lyricesDataNum].startTime) {
      lyricesText = jsonData.data[lyricesDataNum].lyric;
      lyricesDataNum++;
    }

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

    switch (lyricesDataNum) {
      case 11:
        circleStone.visible = true;
        break;
      case 34:
        magicCircle.visible = true;
        star2.visible = true;
        star3.visible = true;
        break;
      case 46:
        starRotation = true;
        break;
    }
  }
  return lyricesText;
}

const rendererThree = new THREE.WebGLRenderer({
  canvas: document.querySelector("#ThreeCanvas"),
  antialias: true,
});
rendererThree.setPixelRatio(window.devicePixelRatio);
rendererThree.setSize(width, height);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
camera.position.set(-150, 30, -175);
camera.rotation.set(0, -2.7, 0);

const light = new THREE.PointLight(0xFFFFFF, 2, 1000, 1.0);
light.position.set(-300, 50, 100);
scene.add(light);

createMoon(scene);
const star = createStar(scene);
const star2 = createStar(scene, 0x00ff00);
const star3 = createStar(scene, 0x0000ff);
star2.visible = false;
star3.visible = false;
const stone = createStone(scene);
const magicCircle = createMagicCircle(scene);
magicCircle.position.y = -20;
magicCircle.visible = false;
const circleStone = createCircleStone(scene);
circleStone.visible = false;
stone.scale.set(3, 3, 3);
stone.rotateY(Math.PI / 6);
createMMD(scene);

rendererThree.render(scene, camera);

function effectmain() {
  circleStone.rotation.y -= 0.005;
  magicCircle.rotation.y += 0.005;
  if (starRotation) {
    star.rotation.z += 0.001;
    star2.rotation.z -= 0.0005;
    star3.rotation.z += 0.0005;
  }
  rendererThree.render(scene, camera);
}
animate();