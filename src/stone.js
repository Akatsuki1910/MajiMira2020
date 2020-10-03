export default function createStone(scene) {
	const wrap = new THREE.Group();
	const p = 6;
	const geometry = new THREE.CylinderGeometry(5, 5, 7, p);
	const material = new THREE.MeshStandardMaterial({
		color: 0x00FFC3,
		roughness: 0.1
	});
	const cylinder = new THREE.Mesh(geometry, material);
	wrap.add(cylinder);

	const geometry2 = new THREE.ConeGeometry(5, 7, p);
	const material2 = new THREE.MeshStandardMaterial({
		color: 0x00FFC3,
		roughness: 0.1
	});
	const cone = new THREE.Mesh(geometry2, material2);
	cone.rotateX(Math.PI);
	cone.position.y = -7;
	wrap.add(cone);

	const geometry3 = new THREE.SphereGeometry(2, 50, 50);
	const material3 = new THREE.MeshStandardMaterial({
		color: 0x00FFC3,
		roughness: 0.1
	});
	const sphere = new THREE.Mesh(geometry3, material3);
	sphere.position.y = -11;
	wrap.add(sphere);

	const geometry4 = new THREE.TorusGeometry(8, 0.5, 30, 200);
	const material4 = new THREE.MeshStandardMaterial({
		color: 0x00FFC3,
		roughness: 0.1
	});
	const torus = new THREE.Mesh(geometry4, material4);
	torus.rotateX(Math.PI / 2);
	torus.position.y = -11;
	wrap.add(torus);

	scene.add(wrap);
	return wrap;
}