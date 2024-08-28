function renderIdle() {
	mario.drawImage(canvasIdle, 3 * p, p);
}
function renderRun1() {
	mario.drawImage(canvasRun1, 2 * p, 0);
}
function renderRun2() {
	mario.drawImage(canvasRun2, 2 * p, p);
}
function renderRun3() {
	mario.drawImage(canvasRun3, 2 * p, 0);
}
function renderJump() {
	mario.drawImage(canvasJump, 0, 0);
}
function clearMario() {
	mario.clearRect(0, 0, 18 * p, 17 * p);
}

function turnLeft() {
	mario.translate(canvas.width, 0);
	mario.scale(-1, 1);
	faceRight = false;
}

function turnRight() {
	mario.setTransform(1, 0, 0, 1, 0, 0);
	faceRight = true;
}

function renderRun(timestamp) {
	if (timestamp >= now + 80) {
		now = timestamp;
		switch (renderState) {
			case 'Idle':
				clearMario();
				renderRun1();
				renderState = 'Run1';
				break;
			case 'Run1':
				clearMario();
				renderRun2();
				renderState = 'Run2';
				break;
			case 'Run2':
				clearMario();
				renderRun3();
				renderState = 'Run3';
				break;
			case 'Run3':
				clearMario();
				renderRun1();
				renderState = 'Run1';
				break;
		}
	}
	runAnim = requestAnimationFrame(renderRun);
}
function xMario() {
	return parseInt(canvas.style.left);
}
function yMario() {
	return parseInt(canvas.style.top);
}
function centerScreen() {
	bw = 1500;
	bh = 599;
	mx = xMario();
	my = yMario() - (y + g);
	mw = canvas.width;
	mh = canvas.height;
	dw = innerWidth;
	dh = innerHeight;
	// dw = screen.width;
	// dh = screen.height;

	// if (dw + screenx <= bw) {
	if (mx < (dw - mw) / 2) {
		screenx = 0;
	} else {
		screenx = mx - (dw - mw) / 2;
	}
	// }
	// if (dh + screeny <= bh) {
	if (my < (dh - mh) / 2) {
		screeny = 0;
	} else {
		screeny = my - (dh - mh) / 2 - 83;
	}
	// }
	console.log(screeny);
	scrollTo(screenx, screeny);
}
function pressRight(event) {
	if (
		right == false &&
		(event.key == 'ArrowRight' || event.key == 'd' || event.key == 'D' || event.target == buttonRight)
	) {
		right = true;
		if (!faceRight) turnRight();
		now = performance.now();
		requestAnimationFrame(goRight);
		if (!inAir) requestAnimationFrame(renderRun);
		if (inAir) {
			clearMario();
			renderJump();
		}
	}
}
function releaseRight(event) {
	if (
		right == true &&
		(event.key == 'ArrowRight' || event.key == 'd' || event.key == 'D' || event.target == buttonRight)
	) {
		right = false;
		cancelAnimationFrame(rightAnim);
		rightAnim = null;
		cancelAnimationFrame(runAnim);
		runAnim = null;
		if (!inAir) {
			clearMario();
			renderIdle();
		}
		renderState = 'Idle';
	}
}
function pressLeft(event) {
	if (
		left == false &&
		(event.key == 'ArrowLeft' ||
			event.key == 'a' ||
			event.key == 'A' ||
			event.key == 'q' ||
			event.key == 'Q' ||
			event.target == buttonLeft)
	) {
		left = true;
		if (faceRight) turnLeft();
		now = performance.now();
		requestAnimationFrame(goLeft);
		if (!inAir) requestAnimationFrame(renderRun);
		if (inAir) {
			clearMario();
			renderJump();
		}
	}
}
function releaseLeft(event) {
	if (
		left == true &&
		(event.key == 'ArrowLeft' ||
			event.key == 'a' ||
			event.key == 'A' ||
			event.key == 'q' ||
			event.key == 'Q' ||
			event.target == buttonLeft)
	) {
		left = false;
		cancelAnimationFrame(leftAnim);
		leftAnim = null;
		cancelAnimationFrame(runAnim);
		runAnim = null;
		if (!inAir) {
			clearMario();
			renderIdle();
		}
		renderState = 'Idle';
	}
}
function pressJump(event) {
	if (
		inAir == false &&
		(event.key == 'ArrowUp' ||
			event.key == 'w' ||
			event.key == 'W' ||
			event.key == 'z' ||
			event.key == 'Z' ||
			event.target == buttonTop ||
			event.target == buttonA) &&
		!falling
	) {
		inAir = true;
		cancelAnimationFrame(gravAnim);
		gravAnim = null;
		requestAnimationFrame(jumping);
	}
}
function animIcon() {
	if (objStrike.id == 'cube6') {
		let linkedin = document.querySelector('#linkedin');
		linkedin.animate(
			[
				{ transform: `translateY(0px) scale(1,1)` },
				{ transform: `translateY(-70px) scale(1,1)` },
				{ transform: `translateY(-140px) scale(1,1)` },
				{ transform: `translateY(-210px) scale(0,0)` }
			],
			{
				duration : 300
			}
		).onfinish = function() {
			linkedin.style.display = 'none';
			let linkedinLink = document.querySelector('#linkedinLink');
			linkedinLink.style.display = 'initial';
			if (iconCount === 0) linkedinLink.style.left = '20px';
			if (iconCount === 1) linkedinLink.style.left = '80px';
			if (iconCount === 2) linkedinLink.style.left = '140px';
			iconCount++;
			linkedinLink.animate(
				[
					{ transform: `scale(0,0)` },
					{ transform: `scale(1,1)` }
				],
				{
					duration : 200
				}
			).onfinish = function() {
				linkedinLink.addEventListener('click', function() {
					open('https://www.linkedin.com/in/sabarikameswaran/');
				});
			};
		};
	}
	if (objStrike.id == 'cube2') {
		let cv = document.querySelector('#cv');
		cv.animate(
			[
				{ transform: `translateY(0px) scale(1,1)` },
				{ transform: `translateY(-70px) scale(1,1)` },
				{ transform: `translateY(-140px) scale(1,1)` },
				{ transform: `translateY(-210px) scale(0,0)` }
			],
			{
				duration : 300
			}
		).onfinish = function() {
			cv.style.display = 'none';
			let cvLink = document.querySelector('#cvlink');
			cvLink.style.display = 'initial';
			if (iconCount === 0) cvLink.style.left = '20px';
			if (iconCount === 1) cvLink.style.left = '80px';
			if (iconCount === 2) cvLink.style.left = '140px';
			iconCount++;
			cvLink.animate(
				[
					{ transform: `scale(0,0)` },
					{ transform: `scale(1,1)` }
				],
				{
					duration : 200
				}
			).onfinish = function() {
				cvLink.addEventListener('click', function() {
					open('https://sabarikameswaran.github.io/cv');
				});
			};
		};
	}
	if (objStrike.id == 'cube4') {
		let pf = document.querySelector('#folder');
		pf.animate(
			[
				{ transform: `translateY(0px) scale(1,1)` },
				{ transform: `translateY(-70px) scale(1,1)` },
				{ transform: `translateY(-140px) scale(1,1)` },
				{ transform: `translateY(-210px) scale(0,0)` }
			],
			{
				duration : 300
			}
		).onfinish = function() {
			pf.style.display = 'none';
			let pfLink = document.querySelector('#folderlink');
			pfLink.style.display = 'initial';
			if (iconCount === 0) pfLink.style.left = '20px';
			if (iconCount === 1) pfLink.style.left = '80px';
			if (iconCount === 2) pfLink.style.left = '140px';
			iconCount++;
			pfLink.animate(
				[
					{ transform: `scale(0,0)` },
					{ transform: `scale(1,1)` }
				],
				{
					duration : 200
				}
			).onfinish = function() {
				pfLink.addEventListener('click', function() {
					open('https://github.com/sabarikameswaran');
				});
			};
		};
	}
}

function frameRate(timestamp, animID, fName) {
	if (animID == null) {
		fName.start = timestamp;
	}
	fName.timer = timestamp - fName.start;
	fName.frameRatio = fName.timer / (1000 / 60);
	fName.start = timestamp;
	if (fName.frameRatio == 0) {
		fName.frameRatio = 1;
	}
	return fName.frameRatio;
}

function goRight(timestamp) {
	goRight.frameRatio = frameRate(timestamp, rightAnim, goRight);
	for (obj in gameObj) {
		for (i = 0; y + i <= y + parseInt(canvas.height); i++) {
			if (
				xMario() + parseInt(canvas.width) > gameObj[obj].xmin - 5 &&
				xMario() + parseInt(canvas.width) < gameObj[obj].xmax &&
				(y + i < gameObj[obj].ymax && y + i > gameObj[obj].ymin)
			) {
				canvas.style.left = gameObj[obj].xmin - 1;
				centerScreen();
				rightAnim = requestAnimationFrame(goRight);
				return;
			}
		}
	}
	if (x <= 1500 - canvas.width - 20) {
		x += 6 * goRight.frameRatio;
		canvas.style.left = x + 'px';
		centerScreen();
		rightAnim = requestAnimationFrame(goRight);
	}
}

function goLeft(timestamp) {
	goLeft.frameRatio = frameRate(timestamp, leftAnim, goLeft);
	for (obj in gameObj) {
		for (i = 0; y + i <= y + parseInt(canvas.height); i++) {
			if (
				xMario() < gameObj[obj].xmax + 5 &&
				xMario() > gameObj[obj].xmin &&
				(y + i < gameObj[obj].ymax && y + i > gameObj[obj].ymin)
			) {
				canvas.style.left = gameObj[obj].xmax + 1;
				centerScreen();
				leftAnim = requestAnimationFrame(goLeft);
				return;
			}
		}
	}
	if (x >= 0) {
		x -= 6 * goLeft.frameRatio;
		canvas.style.left = x + 'px';
		centerScreen();
		leftAnim = requestAnimationFrame(goLeft);
	}
}

function jumping(timestamp) {
	jumping.frameRatio = frameRate(timestamp, jumpAnim, jumping);
	t += 1 * jumping.frameRatio;
	y = 17 * t - (0.6 * t) ** 2 + yt;
	for (obj in gameObj) {
		if (
			xMario() + parseInt(canvas.width) > gameObj[obj].xmin &&
			xMario() < gameObj[obj].xmax &&
			y < gameObj[obj].ymax &&
			y > gameObj[obj].ymin
		) {
			yt = gameObj[obj].ymax;
			y = yt;
			canvas.style.transform = `translateY(${-y}px)`;
			t = 0;
			inAir = false;
			jumpAnim = null;
			if (right || left) {
				requestAnimationFrame(renderRun);
			} else {
				clearMario();
				renderIdle();
			}
			cancelAnimationFrame(gravAnim);
			requestAnimationFrame(gravity);
			return;
		}
		if (
			xMario() + parseInt(canvas.width) >= gameObj[obj].xmin &&
			xMario() <= gameObj[obj].xmax &&
			y + parseInt(canvas.height) < gameObj[obj].ymax &&
			y + parseInt(canvas.height) >= gameObj[obj].ymin
		) {
			headStrike = true;
			yt = gameObj[obj].ymin - parseInt(canvas.height);
			y = yt;
			canvas.style.transform = `translateY(${-y}px)`;
			requestAnimationFrame(gravity);
			jumpAnim = null;
			for (obj in gameObj) {
				if (
					xMario() + parseInt(canvas.width) / 2 >= gameObj[obj].xmin &&
					xMario() + parseInt(canvas.width) / 2 <= gameObj[obj].xmax
				) {
					objStrike = gameObj[obj].item;
					if (objStrike.classList.contains('break')) {
						objStrike.animate(
							[
								{ transform: `translateY(0px)` },
								{ transform: `translateY(-25px)` },
								{ transform: `translateY(2px)` },
								{ transform: `translateY(5px)` },
								{ transform: `translateY(0px)` }
							],
							{
								duration : 200
							}
						);
						animIcon();

						objStrike.classList.remove('break');
					}
				}
			}
			return;
		}
	}
	if (y > 0) {
		canvas.style.transform = `translateY(${-y}px)`;
		inAir = true;
		g = 0;
		cancelAnimationFrame(runAnim);
		clearMario();
		renderJump();
		centerScreen();
		jumpAnim = requestAnimationFrame(jumping);
	} else {
		yt = 0;
		y = yt;
		canvas.style.transform = `translateY(${y}px)`;
		// canvas.style.transform = `translate(${x}px,${y}px)`;
		t = 0;
		inAir = false;
		jumpAnim = null;
		if (right || left) {
			requestAnimationFrame(renderRun);
		} else {
			clearMario();
			renderIdle();
		}
	}
}

function gravity(timestamp) {
	for (obj in gameObj) {
		if (
			xMario() + parseInt(canvas.width) > gameObj[obj].xmin &&
			xMario() < gameObj[obj].xmax &&
			y + g <= gameObj[obj].ymax &&
			y + g > gameObj[obj].ymin
		) {
			onObj = true;
			break;
		} else {
			onObj = false;
		}
	}
	gravity.frameRatio = frameRate(timestamp, gravAnim, gravity);

	if (!inAir && onObj == false) {
		falling = true;
		g -= 10 * gravity.frameRatio;
		canvas.style.transform = `translateY(${-1 * (y + g)}px)`;
		if (y + g <= 0) {
			g = 0;
			yt = 0;
			y = yt;
			canvas.style.transform = `translateY(${y}px)`;
			// canvas.style.transform = `translate(${x}px,${y}px)`;
			t = 0;
			inAir = false;
			falling = false;
			return;
		}
		centerScreen();
		gravAnim = requestAnimationFrame(gravity);
		return;
	} else if (headStrike) {
		g -= 10 * gravity.frameRatio;
		canvas.style.transform = `translateY(${-1 * (y + g)}px)`;
		if (y + g <= 0) {
			g = 0;
			yt = 0;
			y = yt;
			canvas.style.transform = `translateY(${y}px)`;
			// canvas.style.transform = `translate(${x}px,${y}px)`;
			t = 0;
			inAir = false;
			headStrike = false;
			if (right || left) {
				requestAnimationFrame(renderRun);
			} else {
				clearMario();
				renderIdle();
			}
			return;
		}
		centerScreen();
		gravAnim = requestAnimationFrame(gravity);
		return;
	} else {
		gravAnim = requestAnimationFrame(gravity);
		return;
	}
}
let gameObj = {};
blocks = document.querySelectorAll('.cube');
let count = 0;
for (block of blocks) {
	count++;
	gameObj[`block${count}`] = {
		item : block,
		xmin : parseInt(block.offsetLeft),
		xmax : parseInt(block.offsetLeft) + parseInt(block.clientWidth),
		ymin : -1 * (parseInt(block.offsetTop) + parseInt(block.clientHeight) - (yMario() + parseInt(canvas.height))),
		ymax : -1 * (parseInt(block.offsetTop) - (yMario() + parseInt(canvas.height)))
	};
}
// y = 0 is the ground, y > 0 if mario is going up
vity
let t = 0;
let y = 0;
let yt = 0;
let x = xMario();
let screenx = 0;
let screeny = 0;
let g = 0;
let countGrav = 0;
let right = false;
let rightAnim = null;
let faceRight = true;
let left = false;
let leftAnim = null;
let inAir = false;
let onObj = false;
let jumpAnim = null;
let gravAnim = null;
let falling = false;
let headStrike = null;
let objStrike = null;
let now = performance.now();
let renderState = 'Idle';
let runAnim = null;
let iconCount = 0;
renderIdle();
centerScreen();
screen.orientation.addEventListener('change', function() {
	setTimeout(centerScreen, 200);
});

document.addEventListener('keydown', pressRight);
document.addEventListener('keyup', releaseRight);

buttonRight = document.querySelector('#right');
// buttonRight.addEventListener('mousedown', pressRight);
// buttonRight.addEventListener('mouseup', releaseRight);
// buttonRight.addEventListener('mouseleave', releaseRight);
buttonRight.addEventListener('touchstart', function(e) {
	e.preventDefault();
	// console.log(e);
	pressRight(e);
});
buttonRight.addEventListener('touchend', function(e) {
	e.preventDefault();
	// console.log(e);
	if (e.touches.length < 2) releaseRight(e);
});
buttonRight.addEventListener('touchcancel', function(e) {
	e.preventDefault();
	releaseRight(e);
});
document.addEventListener('keydown', pressLeft);
document.addEventListener('keyup', releaseLeft);
buttonLeft = document.querySelector('#left');
// buttonLeft.addEventListener('mousedown', pressLeft);
// buttonLeft.addEventListener('mouseup', releaseLeft);
// buttonLeft.addEventListener('mouseleave', releaseLeft);
buttonLeft.addEventListener('touchstart', function(e) {
	e.preventDefault();
	pressLeft(e);
});
buttonLeft.addEventListener('touchend', function(e) {
	e.preventDefault();
	// console.log(e);
	if (e.touches.length < 2) releaseLeft(e);
});
buttonLeft.addEventListener('touchcancel', function(e) {
	e.preventDefault();
	releaseLeft(e);
});
document.addEventListener('keydown', pressJump);
buttonTop = document.querySelector('#top');
buttonA = document.querySelector('#A');
// buttonTop.addEventListener('mousedown', pressJump);
// buttonA.addEventListener('mousedown', pressJump);
buttonTop.addEventListener('touchstart', function(e) {
	e.preventDefault();
	pressJump(e);
});
buttonA.addEventListener('touchstart', function(e) {
	e.preventDefault();
	pressJump(e);
});
document.querySelector('#B').addEventListener('click', function(e) {
	if (!document.fullscreenElement) document.documentElement.requestFullscreen();
});
