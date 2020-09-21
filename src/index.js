
import { Player, Ease } from "textalive-app-api";
// const { Player, Ease } = TextAliveApp;

const player = new Player({
  app: {
    appAuthor: "Jun Kato",
    appName: "Phrase example"
  },
  mediaElement: document.querySelector("#media")
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
const positionEl = document.querySelector("#position strong");

const artistSpan = document.querySelector("#artist span");
const songSpan = document.querySelector("#song span");
const phraseEl = document.querySelector("#container p");
const beatbarEl = document.querySelector("#beatbar");

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
  artistSpan.textContent = player.data.song.artist.name; // アーティスト名
  songSpan.textContent = player.data.song.name; // 曲名

  document
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));

  let p = player.video.firstPhrase;
  jumpBtn.disabled = !p;

  // set `animate` method
  while (p && p.next) {
    p.animate = animatePhrase;
    p = p.next;
  }
}

function onTimeUpdate(position) {

  // show beatbar
  const beat = player.findBeat(position);
  if (!beat) {
    return;
  }
  beatbarEl.style.width = `${Math.ceil(Ease.circIn(beat.progress(position)) * 100)}%`;
}

function onThrottledTimeUpdate(position) {
  positionEl.textContent = String(Math.floor(position)); //経過時間
  textobj.text++;
}

function animatePhrase(now, unit) {
  // show current phrase
  if (unit.contains(now)) {
    phraseEl.textContent = unit.text; //歌詞
  }
};

import * as THREE from 'three';
import * as PIXI from 'pixi.js'

//pixi
const width = window.innerWidth;
const height = window.innerHeight;
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

function animate() {
	requestAnimationFrame(animate);
  effectmain();
  renderer.render(stage);
}

var word = "0";
var style = {
	fontFamily: 'Arial',
	fontSize: '40px',
	fill: 'blue',
	fontWeight: "bold"
};
var textobj = new PIXI.Text(word, style);
stage.addChild(textobj);

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