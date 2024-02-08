import { sendHttpRequest } from './util.js';

const mainContainerEl = document.querySelector('main .container');
const cardTemplate = document.getElementById('card-template');

const URL =
	'https://gist.githubusercontent.com/al3xback/7abee37fc5e14acfacd9bd638afaa397/raw/f9670aa9e57d6e2e96e3e0a188438105d4b81b44/social-links-data.txt';

const renderCardContent = (data) => {
	const [title, subtitle, desc] = data.split('\n');

	const cardEl = document.importNode(cardTemplate.content, true);

	const cardTitleEl = cardEl.querySelector('.card__title');
	cardTitleEl.textContent = title;

	const cardSubtitleEl = cardEl.querySelector('.card__subtitle');
	cardSubtitleEl.textContent = subtitle;

	const cardDescEl = cardEl.querySelector('.card__desc');
	cardDescEl.textContent = `"${desc}."`;

	mainContainerEl.appendChild(cardEl);
};

sendHttpRequest('GET', URL, renderCardContent);