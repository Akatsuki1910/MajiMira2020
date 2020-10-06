export default function createCircleStone(scene) {
	const topSize = 5;
	const bodySize = 10;
	const bodyRad = 5;
	const pointSlice = 6;

	const stoneNum = 3*5;
	const stonePosi = 50;
	const stoneColor = [0xb90b50,0x0054a6,0x00a474]

	const pointArr = createPoint(topSize, bodySize, bodyRad, pointSlice);
	const wrap = new THREE.Group();
	const geometry = createGeometry(pointArr, pointSlice);

	for (let i = 0; i < stoneNum; i++) {
		const material = new THREE.MeshStandardMaterial({
			color: stoneColor[i%3],
			roughness: 0.1,
		});
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(stonePosi * Math.cos(2 * Math.PI * i / stoneNum), 0, stonePosi * Math.sin(2 * Math.PI * i / stoneNum));
		wrap.add(mesh);
	}

	scene.add(wrap);
	return wrap;
}

function createPoint(topSize, bodySize, bodyRad, pointSlice) {
	const Arr = [];

	Arr.push([0, bodySize / 2 + topSize, 0]);
	for (let i = 0; i < pointSlice; i++) {
		const a = bodyRad * Math.cos(2 * Math.PI * i / pointSlice);
		const b = bodySize / 2;
		const c = bodyRad * Math.sin(2 * Math.PI * i / pointSlice);
		Arr.push([a, b, c]);
	}
	for (let i = 0; i < pointSlice; i++) {
		const a = bodyRad * Math.cos(2 * Math.PI * i / pointSlice);
		const b = -bodySize / 2;
		const c = bodyRad * Math.sin(2 * Math.PI * i / pointSlice);
		Arr.push([a, b, c]);
	}
	Arr.push([0, -bodySize / 2 - topSize, 0]);

	return Arr;
}

function createGeometry(pointArr, pointSlice) {
	const geometry = new THREE.Geometry();
	pointArr.forEach(r => {
		// console.log(r)
		geometry.vertices.push(new THREE.Vector3(r[0], r[1], r[2]))
	});

	console.log(geometry.vertices)

	for (let i = 1; i <= pointSlice; i++) {
		const a = i;
		const b = (i + 1 <= pointSlice) ? i + 1 : 1;
		const c = pointSlice + i;
		const d = (c + 1 <= pointSlice * 2) ? c + 1 : pointSlice + 1;
		geometry.faces.push(new THREE.Face3(b, a, 0)); //top
		geometry.faces.push(new THREE.Face3(a, b, c)); //body
		geometry.faces.push(new THREE.Face3(d, c, b)); //body
		geometry.faces.push(new THREE.Face3(c, d, pointSlice * 2 + 1)); //bottom
	}

	geometry.computeFaceNormals();

	return geometry;
}