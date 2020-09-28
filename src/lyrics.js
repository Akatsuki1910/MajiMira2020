import {
	GlitchFilter
} from '@pixi/filter-glitch';
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
		this.timer = 0;
		this.fontSize = 80;
		document.getElementById("pixiview").appendChild(this.renderer.view);

		this.createLyric();
	}

	get status() {
		return this.statusFlg;
	}

	set status(p) {
		this.statusFlg = p;
	}

	animation(lyricesText, flg) {
		this.textobj.text = "　" + lyricesText + "　";
		this.textobj.position.set(this.w / 2 - (this.textobj.text.length) * this.fontSize / 2, this.h / 2 - 10);
		if (flg) {
			if (this.timer % 5 == 0) {
				this.filter.refresh();
			}
			this.timer++;
		}
		this.renderer.render(this.stage);
	}

	createLyric() {
		this.word = "";
		this.style = {
			fontFamily: 'Arial',
			fontSize: this.fontSize + "px",
			fill: 'white',
			fontWeight: "bold"
		};
		this.textobj = new PIXI.Text(this.word, this.style);
		this.textobj.interactive = true;
		this.textobj.on('click', function () {
			console.log("text click");
			var elements = document.getElementsByTagName('canvas');
			for (let i = 0; i < elements.length; i++) {
				elements[i].style.pointerEvents = "none";
			}
			document.getElementById("ThreeCanvas").style.pointerEvents = "auto";
		});

		const gli = 2;
		this.filter = new GlitchFilter({
			red: [gli * Math.cos(0), gli * Math.sin(0)],
			green: [gli * Math.cos(Math.PI * 2 / 3), gli * Math.sin(Math.PI * 2 / 3)],
			blue: [gli * Math.cos(Math.PI * 2 * 2 / 3), gli * Math.sin(Math.PI * 2 * 2 / 3)],
			fillMode: 1,
			offset: 3,
			slices: 5
		});
		this.textobj.filters = [this.filter];

		this.stage.addChild(this.textobj);
	}
}