export default function createStar(scene,color=0xFFFFFF) {
	const geometry = new THREE.Geometry();
	const RANGE = 5000;
	const LENGTH = 50000;
	for (let i = 0; i < LENGTH; i++) {
		const theta = (Math.random() * 360 - 180) * Math.PI / 180;
		const phi = Math.asin((2 * Math.random()) - 1);
		geometry.vertices.push(new THREE.Vector3(
			(Math.cos(theta) * Math.sin(phi)) * RANGE / 2,
			(Math.sin(theta) * Math.sin(phi)) * RANGE / 2,
			(Math.cos(phi)) * RANGE / 2,
		));
	}
	const material = new THREE.PointsMaterial({
		size: 1,
		color: color,
	});
	const mesh = new THREE.Points(geometry, material);
	scene.add(mesh);
	return mesh;
}