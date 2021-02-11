(() => {

	const canvas	= document.createElement('canvas');
	const ctx		= canvas.getContext('2d');
	let w, h;

	let 
		properties	= {
			canvasColor		: '#232332',
			circlesCount	: 3,
			maxLightLen		: 800,
			stepLen			: 3,
			tick			: 0,
			tickMax			: 3,
			maxOffSet		: 7,

		},
		circles		= [],
		mouse = {
			x		: 0,
			y		: 0,
			toggle	: 0,
		};

	class Circle {
		constructor(x, y) {
			this.x = x || Math.random() * w;
			this.y = y || Math.random() * h;
		}
		draw(x, y) {
			this.x = x || this.x;
			this.y = y || this.y;

			ctx.lineWidth = 1.5;
			ctx.fillStyle = 'white';
			ctx.strokeStyle = 'white';

			ctx.beginPath();
			ctx.arc(this.x, this.y, 6, 0, Math.PI*2);
			ctx.closePath();
			ctx.fill();

			ctx.beginPath();
			ctx.arc(this.x, this.y, 32, 0, Math.PI*2);
			ctx.closePath();
			ctx.stroke();
		}
	}

	Resize();
	window.addEventListener('resize', Resize, false);
	canvas.addEventListener('mousemove', MouseMove, false);
	window.addEventListener('click', Click, false);
	init();

	function Resize() {
		canvas.width = w = window.innerWidth;
		canvas.height = h = window.innerHeight;
	}

	function MouseMove(e) {
		mouse.x = e.x;
		mouse.y = e.y;
	}

	function Click() {
		mouse.toggle === circles.length - 1 ? mouse.toggle = 0 : mouse.toggle++;
	}
	
	function init() {
		document.querySelector('body').appendChild(canvas);
		canvas.style.background = properties.canvasColor;
		for(let i = 0; i < properties.circlesCount; i++) {
			circles.push(new Circle)
		}
		loop();
	}

	function loop() {
		if (properties.tick === properties.tickMax) {
			ctx.clearRect(0, 0, w, h);
			CreateLightning();
			circles.map(el => {el===circles[mouse.toggle] ? el.draw(mouse.x, mouse.y) : el.draw()});
			properties.tick = 0;
		}
		properties.tick++;
		requestAnimationFrame(loop)
	}

	function CreateLightning() {
		for (let i = 0; i < circles.length; i++) {
			for (let j = i + 1; j < circles.length; j++) {
				let dist	= GetDistance(circles[i], circles[j]);
				let chance	= dist / properties.maxLightLen;
				if (chance > Math.random()) continue;

				let r = Math.random() * 0 + 205;
				let g = Math.random() * 50 + 205;
				let b = Math.random() * 0 + 255;

				let stepsCount = dist / properties.stepLen;
				let sx = circles[i].x
				let sy = circles[i].y

				ctx.lineWidth = 2.5;
				ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;

				ctx.beginPath();
				ctx.moveTo(sx, sy);
				for (let k = stepsCount; k > 1; k--) {
					let pathLength	= GetDistance(circles[i], {x: sx, y: sy});
					let offset		= Math.sin(pathLength / dist * Math.PI) * properties.maxOffSet;
					sx += (circles[j].x - sx) / k + Math.random() * offset * 2 - offset;
					sy += (circles[j].y - sy) / k + Math.random() * offset * 2 - offset;
					ctx.lineTo(sx, sy);
				}
				// ctx.closePath();
				ctx.stroke();
			}
		}
	}

	function GetDistance(a, b) {
		return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
	}

})();