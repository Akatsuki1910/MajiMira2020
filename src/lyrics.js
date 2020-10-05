import {
	GlitchFilter
} from '@pixi/filter-glitch';
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

		this.easeStartTime = 0;
		this.easeFlg = 0;
		this.easeArr = [
			[11, 2],
			[31, 0],
			[34, 1],
			[44, 2],
			// [1, 0],
			// [5, 1],
		];
		this.easeArrNum = 0;

		const gli = 2;
		this.filter = new GlitchFilter({
			red: [gli * Math.cos(0), gli * Math.sin(0)],
			green: [gli * Math.cos(Math.PI * 2 / 3), gli * Math.sin(Math.PI * 2 / 3)],
			blue: [gli * Math.cos(Math.PI * 2 * 2 / 3), gli * Math.sin(Math.PI * 2 * 2 / 3)],
			fillMode: 1,
			offset: 2,
			slices: 5
		});
		document.getElementById("pixiview").appendChild(this.renderer.view);

		this.firstContent();
		this.createLyric();
	}

	get status() {
		return this.statusFlg;
	}

	set status(p) {
		this.statusFlg = p;
	}

	onReady() {
		this.createTitleSong();
		this.statusFlg = 1;
	}

	onPlay() {
		this.player.video && this.player.requestPlay();
		this.timer = 0;
		this.statusFlg = 2;
	}

	animation(lyricesText, lynum) {
		if (this.statusFlg == 1) {
			this.titleobj.text = "Start";
			this.titleobj.position.set(this.w / 2 - (this.titleobj.text.length / 2) * this.fontSize / 2, this.h / 2 - this.fontSize / 2);
		}
		if (this.statusFlg == 2) {
			if (this.timer % 5 == 0) {
				this.filter.refresh();
			}
			this.titleSong(this.player.timer.position);

			if (!this.easeFlg) {
				if (this.easeArrNum != this.easeArr.length) {
					if (lynum == this.easeArr[this.easeArrNum][0]) {
						console.log(1);
						this.easeStartTime = this.timer;
						this.easeFlg = true;
						this.easeArrNum++;
					}
				}
			}
			this.easeBlock((this.timer - this.easeStartTime) / 100, this.easeArr[(this.easeArrNum == 0) ? 0 : this.easeArrNum - 1][1])
			this.timer++;
		}

		this.contentFade(this.player.timer.position)
		this.textobj.text = "　" + lyricesText + "　";
		this.textobj.position.set(this.w / 2 - (this.textobj.text.length) * this.fontSize / 2, this.h / 2 - this.fontSize / 2);
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
		this.textobj.filters = [this.filter];
		this.stage.addChild(this.textobj);
	}

	firstContent() {
		this.square = new PIXI.Graphics();
		this.square.beginFill(0xff00ff);
		this.square.drawRect(0, 0, this.w, this.h);
		this.square.endFill();

		this.stage.addChild(this.square);

		this.title = "Now Loading...";
		this.titleStyle = {
			fontFamily: 'Arial',
			fontSize: this.fontSize + "px",
			fill: 'white',
			fontWeight: "bold"
		};
		this.titleobj = new PIXI.Text(this.title, this.titleStyle);
		this.stage.addChild(this.titleobj);
		this.titleobj.position.set(this.w / 2 - (this.titleobj.text.length / 2) * this.fontSize / 2, this.h / 2 - this.fontSize / 2);
		this.titleobj.interactive = true;
		this.titleobj.on('click', () => {
			console.log("text click");
			if (this.statusFlg == 1) {
				this.onPlay();
			}
		});
	}

	titleSong(time) {
		// console.log(this.player.data)

		if ((time >= 24000 && time <= 33000) || time >= 238000) {
			this.songTitleobj.alpha = 1;
			this.songArtistobj.alpha = 1;
			this.songMVobj.alpha = 1;
		} else {
			this.songTitleobj.alpha = 0;
			this.songArtistobj.alpha = 0;
			this.songMVobj.alpha = 0;
		}
		// console.log(this.songTitleobj.alpha)
	}

	createTitleSong() {
		const songTitleFontSize = 100;
		this.songTitle = this.player.data.song.name;
		this.songTitleStyle = {
			fontFamily: 'Arial',
			fontSize: songTitleFontSize + "px",
			fill: 'white',
			fontWeight: "bold"
		};
		this.songTitleobj = new PIXI.Text(this.songTitle, this.songTitleStyle);
		this.generateGlitch(this.songTitleobj);
		this.stage.addChild(this.songTitleobj);
		this.songTitleobj.position.set(this.w / 2 - (this.songTitleobj.text.length) * songTitleFontSize / 2, this.h / 2 - songTitleFontSize - 30);

		this.songArtist = "Music : " + this.player.data.song.artist.name;
		this.songArtistStyle = {
			fontFamily: 'Arial',
			fontSize: this.fontSize + "px",
			fill: 'white',
			fontWeight: "bold"
		};
		this.songArtistobj = new PIXI.Text(this.songArtist, this.songArtistStyle);
		this.generateGlitch(this.songArtistobj);
		this.stage.addChild(this.songArtistobj);
		this.songArtistobj.position.set(this.w / 2 - (this.songTitleobj.text.length) * this.fontSize / 2 - 60, this.h / 2 + 50);

		this.songMV = "Movie : 暁の流星";
		this.songMVStyle = {
			fontFamily: 'Arial',
			fontSize: this.fontSize + "px",
			fill: 'white',
			fontWeight: "bold"
		};
		this.songMVobj = new PIXI.Text(this.songMV, this.songMVStyle);
		this.generateGlitch(this.songMVobj);
		this.stage.addChild(this.songMVobj);
		this.songMVobj.position.set(this.w / 2 - 20, this.h / 2 + 50);

		this.titleSong(0);
	}

	contentFade(time) {
		const timer = 7000;
		let alpha = (timer - time) / timer;
		if (alpha >= 0) {
			this.square.alpha = alpha;
			this.titleobj.alpha = alpha;
		}
	}

	generateGlitch(textObj) {
		textObj.text = " " + textObj.text + " ";
		textObj.filters = [this.filter];
	}

	easeBlock(time, s) {
		if (this.easeFlg) {
			this.square.alpha = 1;
			if (s == 2) {
				s = (time < 0.5) ? 0 : 1;
				time = (time - 0.5 * s) * 2;
			}
			const eoe = this.easeOutExpo(time);
			const p = (s == 0) ? eoe : (1 - eoe);
			this.square.width = this.w * p;
			if (eoe >= 1) this.easeFlg = false;
		}
	}

	easeOutExpo(x) {
		return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
	}
}