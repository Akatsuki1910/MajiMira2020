import {
	MMDAnimationHelper
} from 'three/examples/jsm/animation/MMDAnimationHelper';
import {
	MMDLoader
} from 'three/examples/jsm/loaders/MMDLoader';
const modelFile = './models/on_v101/miku.pmx';

var motionFiles = [{
	filePath: './models/motion.vmd',
	loop: THREE.LoopRepeat,
	action: null,
	fadeIn: 0.1,
	fadeOut: 0.1
}];
const loader = new MMDLoader();
var helper = new MMDAnimationHelper({
	afterglow: 2.0,
	resetPhysicsOnLoop: true
});
export default function createMMD(scene) {
	var animations = [];
	let meshPub;

	loader.load(modelFile, (mesh) => {
			helper.add(mesh, {
				animation: animations,
				physics: true,
				warmup: 12,
				unitStep: 1 / 120
			});
			const vmdPath = motionFiles[0].filePath;
			loader.loadAnimation(vmdPath, mesh, (vmd) => {
				animations[0] = vmd;

				meshPub = mesh;
				scene.add(mesh);
				let mixer = helper.objects.get(mesh).mixer;
				mixer.stopAllAction();
				for (let i = 0; i < animations.length; i++) {
					if (animations[i]) {
						let action = mixer.clipAction(animations[i]);
						action.setLoop(motionFiles[i].loop);
						motionFiles[i].action = action;
					} else {
						return false;
					}
				}

				const ikHelper = helper.objects.get(mesh).ikSolver.createHelper();
				ikHelper.visible = false;
				scene.add(ikHelper);

				const physicsHelper = helper.objects.get(mesh).physics.createHelper();
				physicsHelper.visible = false;
				scene.add(physicsHelper);
				motionFiles[0].action.play();

				mesh.position.set(0, 1.5, 9)

				animate();
			}, (xhr) => {
				progress(xhr);
			}, (e) => {
			});
		},
		(xhr) => {
			progress(xhr);
		},
		(e) => {
		});

	const animate = () => {
		requestAnimationFrame(animate);
		helper.update(1 / 100);
	}
}