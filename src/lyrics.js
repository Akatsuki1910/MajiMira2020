import * as PIXI from 'pixi.js';
export default class {
	constructor(w, h, p) {
		this.stage = new PIXI.Container();
		this.renderer = PIXI.autoDetectRenderer({
			width: w,
			height: h,
			resolution: 1,
			antialias: true,
			transparent: true,
		});
		this.statusFlg = 0;
		this.player = p;
		this.w = w;
		this.h = h;
		document.getElementById("pixiview").appendChild(this.renderer.view);

		this.createLyric();
	}

	get status() {
		return this.statusFlg;
	}

	set status(p) {
		this.statusFlg = p;
	}

	animation(lyricesText) {
		this.textobj.text = lyricesText;
		this.textobj.position.set(this.w/2-this.textobj.text.length*10*2, this.h/2-10)
		this.renderer.render(this.stage);
	}

	createLyric() {
		this.word = "";
		this.style = {
			fontFamily: 'Arial',
			fontSize: '40px',
			fill: 'blue',
			fontWeight: "bold"
		};
		this.textobj = new PIXI.Text(this.word, this.style);
		this.textobj.interactive = true;
		this.textobj.on('click', function () {
			console.log(1111111);
			var elements = document.getElementsByTagName('canvas');
			for (let i = 0; i < elements.length; i++) {
				elements[i].style.pointerEvents = "none";
			}
			document.getElementById("ThreeCanvas").style.pointerEvents = "auto";
		});

		this.stage.addChild(this.textobj);
	}
}