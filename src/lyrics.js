import * as PIXI from 'pixi.js';
export default class {
	constructor(w, h) {
		this.stage = new PIXI.Container();
		this.renderer = PIXI.autoDetectRenderer({
			width: w,
			height: h,
			resolution: 1,
			antialias: true,
			transparent: true,
		});
		document.getElementById("pixiview").appendChild(this.renderer.view);

		this.createLyric();
	}

	animation(lyricesText) {
		this.textobj.text = lyricesText;
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
		this.stage.addChild(this.textobj);
	}
}