const app = () => {
	const song = document.querySelector('.song');
	const play = document.querySelector('.play');
	const outline = document.querySelector('.moving-outline circle');
	const video = document.querySelector('.vid-container video');

	// Sounds
	const sounds = document.querySelectorAll('.sound-picker button');

	// Time selector
	const timeDisplay = document.querySelector('.time-display');

	// get the lenght of the outline
	const outlineLength = outline.getTotalLength();
	const timeSelect = document.querySelectorAll('.time-select button');
	// Durations
	let fakeDuration = 600;

	outline.style.strokeDasharray = outlineLength;
	outline.style.strokeDashoffset = outlineLength;

	// Pick different sounds
	sounds.forEach((sound) => {
		sound.addEventListener('click', function () {
			song.src = this.getAttribute('data-sound');
			video.src = this.getAttribute('data-video');
			checkPlay(play);
		});
	});

	// Play sound
	play.addEventListener('click', () => {
		checkPlay(song);
	});

	// Select sound
	timeSelect.forEach((optiom) => {
		optiom.addEventListener('click', function () {
			fakeDuration = this.getAttribute('data-time');
			timeDisplay.textContent = `${Math.floor(
				fakeDuration / 60
			)}:${Math.floor(fakeDuration % 60)}`;
		});
	});

	// Create a func spesific to stop and play sounds
	const checkPlay = (song) => {
		if (song.paused) {
			song.play();

			play.src = './svg/pause.svg';
			video.play();
		} else {
			song.pause();

			play.src = './svg/play.svg';
			video.pause();
		}
	};

	// We can animated the circle
	song.ontimeupdate = () => {
		let currentTime = song.currentTime;
		let elapsed = fakeDuration - currentTime;
		let seconds = Math.floor(elapsed % 60);
		let minitutes = Math.floor(elapsed / 60);

		// Animate the circle
		let progress =
			outlineLength - (currentTime / fakeDuration) * outlineLength;
		outline.style.strokeDashoffset = progress;

		// Animate the text
		timeDisplay.textContent = `${minitutes}:${seconds}`;

		if (currentTime >= fakeDuration) {
			song.pause();
			song.currentTime = 0;
			play.src = './svg/play.svg';
			video.pause();
		}
	};
};

app();
