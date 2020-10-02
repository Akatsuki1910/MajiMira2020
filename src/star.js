export function createStar(scene) {
	const geometry = new THREE.Geometry();
	const RANGE = 10000;
	const LENGTH = 100000;
	for (let i = 0; i < LENGTH; i++) {
		geometry.vertices.push(new THREE.Vector3(
			RANGE * (Math.random() - 0.5),
			RANGE * (Math.random() - 0.5),
			RANGE * (Math.random() - 0.5),
		));
	}
	const material = new THREE.PointsMaterial({
		size: 1,
		color: 0xFFFFFF,
	});
	const mesh = new THREE.Points(geometry, material);
	scene.add(mesh);
	return mesh;
}