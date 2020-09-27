import {
	TextureLoader
} from "three/src/loaders/TextureLoader";

export function createMoon(scene) {
	const geometry = new THREE.SphereGeometry(20, 20, 20);
	const loader = new TextureLoader();
	loader.load('./moon_nasa.jpg', (texture) => {
		const mesh = new THREE.Mesh(
			geometry,
			new THREE.MeshStandardMaterial({
				map: texture
			})
		);
		mesh.position.set(window.innerWidth / 10, window.innerHeight / 10, 0)
		scene.add(mesh);
	});
	// return mesh;
}