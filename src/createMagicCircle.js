import Font from './Font';

export default function createMagicCircle(scene) {
	const Fo = new Font();
	const circleNum = 4;
	const outCircle = [];
	const aRad = 100;
	const bRad = 20;
	const material = new THREE.LineBasicMaterial({
		color: 0x008866,
		linewidth: 5,
		side: THREE.DoubleSide,
	});
	const group = new THREE.Group();
	const group1 = new THREE.Group();

	const outCircleGeometry = new THREE.CircleBufferGeometry(bRad, 200);
	const outCircleEdges = new THREE.EdgesGeometry(outCircleGeometry);
	for (let i = 0; i < circleNum; i++) {
		outCircle[i] = new THREE.LineSegments(outCircleEdges, material);
		outCircle[i].position.set(aRad * Math.cos(Math.PI * i / 2), aRad * Math.sin(Math.PI * i / 2), 0)
		group1.add(outCircle[i]);
	}

	const deg = 4 * Math.asin(bRad / (2 * aRad));
	const mathDeg = Math.PI / 2 - deg;
	for (let i = 0; i < circleNum; i++) {
		const geometry = new THREE.Geometry();
		for (let l = 0; l <= 100; l++) {
			const d = Math.PI * i / 2 + deg / 2 + mathDeg * l / 100;
			const x = aRad * Math.cos(d);
			const y = aRad * Math.sin(d);
			geometry.vertices.push(new THREE.Vector3(x, y, 0));
		}
		const mesh = new THREE.Line(geometry, material);
		group1.add(mesh);
	}

	const geometry = new THREE.CircleBufferGeometry(aRad - bRad, 200);
	const edges = new THREE.EdgesGeometry(geometry);
	const inCircle = new THREE.LineSegments(edges, material);
	group1.add(inCircle);

	const inSqu = [];
	const inSquNum = 3;
	const inSquGeometry = new THREE.CircleBufferGeometry(aRad - bRad, 4);
	const inSquEdges = new THREE.EdgesGeometry(inSquGeometry);
	for (let i = 0; i < inSquNum; i++) {
		inSqu[i] = new THREE.LineSegments(inSquEdges, material);
		inSqu[i].rotateZ(Math.PI * i / (2 * inSquNum));
		group1.add(inSqu[i]);
	}

	const geometry2 = new THREE.CircleBufferGeometry((aRad - bRad) / Math.sqrt(2), 200);
	const edges2 = new THREE.EdgesGeometry(geometry2);
	const ininCircle = new THREE.LineSegments(edges2, material);
	group1.add(ininCircle);

	const geometry3 = new THREE.CircleBufferGeometry(bRad * 2, 200);
	const edges3 = new THREE.EdgesGeometry(geometry3);
	const c1 = new THREE.LineSegments(edges3, material);
	group1.add(c1);

	const geometry4 = new THREE.CircleBufferGeometry(bRad * 2, 3);
	const edges4 = new THREE.EdgesGeometry(geometry4);
	const tr1 = new THREE.LineSegments(edges4, material);
	group1.add(tr1);
	const tr2 = new THREE.LineSegments(edges4, material);
	tr2.rotateZ(Math.PI);
	group1.add(tr2);


	group1.rotateX(Math.PI / 2);
	group.add(group1);
	let zo = [];
	for (let i = 0; i < circleNum; i++) {
		zo[i] = zeroone();
		zo[i].rotateX(-Math.PI / 2);
		zo[i].position.set(aRad * Math.cos(Math.PI * i / 2), 0, aRad * Math.sin(Math.PI * i / 2))
		zo[i].rotateZ(-Math.PI * (i + 1) / 2);
		zo[i].scale.set(3, 3, 3);
		group.add(zo[i]);
	}

	const FoArr = [];
	const FoText = "hatsunemiku-";
	for (let i = 0; i < FoText.length; i++) {
		FoArr.push(Fo.returnText(FoText.charAt(i)));
		FoArr[i].rotateX(Math.PI / 2);
		FoArr[i].scale.set(5, 5, 5);
		const c = Math.floor(i / 3);
		const FoDeg = (Math.PI / 2 - deg) / 3 * (-i + 3 - c);
		FoArr[i].rotateZ((Math.PI / 2 - deg) / 3 * (i + 1 + c));
		const x = (aRad - bRad / 2) * Math.cos(FoDeg);
		const z = -(aRad - bRad / 2) * Math.sin(FoDeg);
		FoArr[i].position.set(x, 0, z);
		group.add(FoArr[i]);
	}
	scene.add(group);

	function zeroone() {
		const group = new THREE.Group();
		const group1 = new THREE.Group();
		const group2 = new THREE.Group();
		const group3 = new THREE.Group();
		let g = [],
			m1 = [],
			m2 = [],
			m3 = [];
		const point = [
			[
				[-4, -4],
				[-2, -4]
			],
			[
				[-2, -3],
				[-3, -3]
			],
			[
				[-2, 3],
				[-3, 3]
			],
			[
				[-2, 4],
				[-4, 4]
			],

			[
				[-4, -4],
				[-4, 4]
			],
			[
				[-2, -4],
				[-2, -3]
			],
			[
				[-3, -3],
				[-3, 3]
			],
			[
				[-2, 4],
				[-2, 3]
			]
		];

		const point2 = [
			[
				[1.5, 2.5],
				[3, 4]
			],
			[
				[1.5, 2.5],
				[1.5, 1.5]
			],
			[
				[1.5, 1.5],
				[3, 3]
			],

			[
				[3, 4],
				[4, 4]
			],
			[
				[3, 3],
				[3, -4]
			],
			[
				[4, 4],
				[4, -4]
			],
			[
				[3, -4],
				[4, -4]
			],
		];

		for (let i = 0; i < point.length; i++) {
			g[i] = new THREE.Geometry();
			g[i].vertices.push(new THREE.Vector3(point[i][0][0], point[i][0][1], 0), new THREE.Vector3(point[i][1][0], point[i][1][1], 0));
			m1[i] = new THREE.Line(g[i], material);
			m2[i] = new THREE.Line(g[i], material);
			group1.add(m1[i]);
			group2.add(m2[i]);
		}
		for (let i = 0; i < point2.length; i++) {
			g[i] = new THREE.Geometry();
			g[i].vertices.push(new THREE.Vector3(point2[i][0][0], point2[i][0][1], 0), new THREE.Vector3(point2[i][1][0], point2[i][1][1], 0));
			m3[i] = new THREE.Line(g[i], material);
			group3.add(m3[i]);
		}
		group2.rotateY(Math.PI);
		group2.position.x = -3;
		group.add(group1);
		group.add(group2);
		group.add(group3);

		return group;
	}
	return group;
}