export default class Font {
	constructor() {
		this.material = new THREE.LineBasicMaterial({
			color: 0x008866,
			side: THREE.DoubleSide,
		});

		this.textPoint={
			"H":[
				[[-1,1],[-1,-1]],
				[[-1,0],[1,0]],
				[[1,1],[1,-1]]
			],
			"A":[
				[[-1,1],[-1,-1]],
				[[-1,-1],[1,-1]],
				[[-1,0],[1,0]],
				[[1,1],[1,-1]]
			],
			"T":[
				[[-1,-1],[1,-1]],
				[[0,1],[0,-1]]
			],
			"S":[
				[[-1,-1],[-1,0]],
				[[-1,-1],[1,-1]],
				[[-1,0],[1,0]],
				[[-1,1],[1,1]],
				[[1,0],[1,1]]
			],
			"U":[
				[[-1,1],[-1,-1]],
				[[-1,1],[1,1]],
				[[1,1],[1,-1]]
			],
			"N":[
				[[-1,1],[-1,-1]],
				[[-1,-1],[1,1]],
				[[1,1],[1,-1]]
			],
			"E":[
				[[-1,1],[-1,-1]],
				[[-1,-1],[1,-1]],
				[[-1,0],[1,0]],
				[[-1,1],[1,1]]
			],
			"M":[
				[[-1,1],[-1,-1]],
				[[-1,-1],[0,1]],
				[[1,-1],[0,1]],
				[[1,1],[1,-1]]
			],
			"I":[
				[[0,1],[0,-1]],
				[[-1,-1],[1,-1]],
				[[-1,1],[1,1]]
			],
			"K":[
				[[-1,1],[-1,-1]],
				[[1,1],[-1,0]],
				[[1,-1],[-1,0]]
			],
			"-":[
				[[0,-1],[1,0]],
				[[0,1],[0,-1]],
				[[-1,1],[0,1]],
				[[-1,0],[0,0]],
				[[-1,0],[-1,1]]
			]
		}
	}

	returnText(t) {
		const group = new THREE.Group();
		let g = [],
			m = [];
		const text = t.toUpperCase();
		const point = this.textPoint[text];

		for(let i=0;i<point.length;i++){
			g[i] = new THREE.Geometry();
			g[i].vertices.push(new THREE.Vector3(point[i][0][0], point[i][0][1], 0), new THREE.Vector3(point[i][1][0], point[i][1][1], 0));
			m[i] = new THREE.Line(g[i], this.material);
			group.add(m[i]);
		}

		return group;
	}
}