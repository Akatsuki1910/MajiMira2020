export function createMoon(scene) {
	const geometry = new THREE.Geometry();
	const p = 3;
	const deg = 180;
	const firstPoint = -90 - deg / 3;
	const endPoint = 270 + deg;
	const t = 1.3;
	const moveX = 0.8;
	for (var i = firstPoint; i < endPoint; i++) {
		geometry.vertices.push(new THREE.Vector3(p * Math.cos(Math.PI * i / 180), p * Math.sin(Math.PI * i / 180), 0));
		geometry.vertices.push(new THREE.Vector3(p * Math.cos(Math.PI * i / 180) / t - moveX, p * Math.sin(Math.PI * i / 180) / t, 0));
	}
	const pointNum = Math.abs(firstPoint - endPoint);
	for (var i = 0; i < pointNum - 2; i++) {
		geometry.faces.push(new THREE.Face3(i, i + 1, i + 2));
	}
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
	const material = new THREE.MeshBasicMaterial({
		color: 0xffff00,
		side: THREE.DoubleSide
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	return mesh;
}