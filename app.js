document.addEventListener('DOMContentLoaded', populateBoard);
const UIgameBoard = document.querySelector('.game-board');
const UItime = document.getElementById('time');
const UIflips = document.getElementById('flips');

let cards = [
	{ image: './public/images/bat.png', name: 'bat' },
	{ image: './public/images/candy.png', name: 'candy' },
	{ image: './public/images/cat.png', name: 'cat' },
	{ image: './public/images/ghost.png', name: 'ghost' },
	{ image: './public/images/moon.png', name: 'moon' },
	{ image: './public/images/pumpkin.png', name: 'pumpkin' },
	{ image: './public/images/spider.png', name: 'spider' },
	{ image: './public/images/witch.png', name: 'witch' },
	{ image: './public/images/bat.png', name: 'bat' },
	{ image: './public/images/candy.png', name: 'candy' },
	{ image: './public/images/cat.png', name: 'cat' },
	{ image: './public/images/ghost.png', name: 'ghost' },
	{ image: './public/images/moon.png', name: 'moon' },
	{ image: './public/images/pumpkin.png', name: 'pumpkin' },
	{ image: './public/images/spider.png', name: 'spider' },
	{ image: './public/images/witch.png', name: 'witch' },
];

cards = shuffle(cards); // shuffle cards

let chosenCards = [];
let chosenCardsID = [];
let pairs = 0;
let flips = 0;
let s = 0;
let ms = 0;
let ready = true;
let timing = false;

const time = () => {
	if (timing) {
		ms += 1;
		if (ms === 99) {
			s += 1;
			ms = 0;
		}
	}
	UItime.children[0].textContent = s <= 9 ? `0${s}` : s;
	UItime.children[1].textContent = ms <= 9 ? `0${ms}` : ms;
};

function populateBoard() {
	for (let i = 0; i < cards.length; i++) {
		const img = document.createElement('img');
		img.setAttribute('src', '/public/images/starter.png');
		img.setAttribute('data-id', i);
		img.addEventListener('click', flipCard);
		UIgameBoard.appendChild(img);
	}
}

function timer(start) {
	if (!start) {
		clearInterval(time);
	} else {
		timing = true;
		setInterval(time, 10);
	}
}

function flipCard() {
	if (!timing) timer(true);

	if (ready === true) {
		if (this.src === 'http://127.0.0.1:5500/public/images/starter.png') {
			const cardId = this.getAttribute('data-id');
			chosenCards.push(cards[cardId].name);
			chosenCardsID.push(cardId);
			this.setAttribute('src', cards[cardId].image);

			if (chosenCards.length === 2) {
				ready = false;
				flips += 1;
				UIflips.children[0].textContent = flips;
				pairWon(chosenCards[0] === chosenCards[1] ? true : false);
			}
		}
	}
}

function pairWon(bool) {
	setTimeout(() => {
		const cards = document.querySelectorAll('img');

		if (!bool) {
			cards[chosenCardsID[0]].setAttribute('src', './public/images/starter.png');
			cards[chosenCardsID[1]].setAttribute('src', './public/images/starter.png');
		} else {
			pairs += 1;
			cards[chosenCardsID[0]].setAttribute('src', './public/images/won.png');
			cards[chosenCardsID[1]].setAttribute('src', './public/images/won.png');
			if (pairs === cards.length / 2) {
				timing = false;
				timer(false);
			}
		}
		chosenCards = [];
		chosenCardsID = [];
		ready = true;
	}, 1000);
}

function shuffle(array) {
	let m = array.length,
		t,
		i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}
