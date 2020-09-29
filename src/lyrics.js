import {
	GlitchFilter
} from '@pixi/filter-glitch';
import * as PIXI from 'pixi.js';
export default class {
	constructor(w, h, p) {
		this.stage = new PIXI.Container();
		this.stage.sortChildren = true;
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
		this.firstContent();
	}

	get status() {
		return this.statusFlg;
	}

	set status(p) {
		this.statusFlg = p;
	}

	onPlay() {
		this.player.video && this.player.requestPlay();
		this.timer = 0;
		this.statusFlg = 2;
	}

	animation(lyricesText) {
		this.textobj.text = "　" + lyricesText + "　";
		this.textobj.position.set(this.w / 2 - (this.textobj.text.length) * this.fontSize / 2, this.h / 2 - this.fontSize / 2);
		if (this.statusFlg == 1) {
			this.titleobj.text = "Start";
			this.titleobj.position.set(this.w / 2 - (this.titleobj.text.length / 2) * this.fontSize / 2, this.h / 2 - this.fontSize / 2);
		}
		if (this.statusFlg == 2) {
			if (this.timer % 5 == 0) {
				this.filter.refresh();
			}
			this.timer++;
		}
		this.contentFade(this.player.timer.position)
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

	firstContent() {
		this.square = new PIXI.Graphics();
		this.square.beginFill(0xff00ff);
		this.square.drawRect(0, 0, this.w, this.h);
		this.square.endFill();

		this.stage.addChild(this.square);
		this.square.zIndex = 5;

		this.title = "Now Loading...";
		this.titleStyle = {
			fontFamily: 'Arial',
			fontSize: this.fontSize + "px",
			fill: 'white',
			fontWeight: "bold"
		};
		this.titleobj = new PIXI.Text(this.title, this.titleStyle);
		this.stage.addChild(this.titleobj);
		this.titleobj.zIndex = 6;
		this.titleobj.position.set(this.w / 2 - (this.titleobj.text.length / 2) * this.fontSize / 2, this.h / 2 - this.fontSize / 2);
		this.titleobj.interactive = true;
		this.titleobj.on('click', () => {
			console.log("text click");
			if (this.statusFlg == 1) {
				this.onPlay();
			}
		});

	}

	contentFade(time) {
		const timer = 8000;
		let alpha = (timer - time) / timer;
		if (alpha <= 0) alpha = 0;
		this.square.alpha = alpha;
		this.titleobj.alpha = alpha;
	}
}