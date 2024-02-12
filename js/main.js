import { sendHttpRequest } from './util.js';

const cardWrapperEl = document.querySelector('.card-wrapper');
const cardTemplate = document.getElementById('card-template');
const cardLinkTemplate = document.getElementById('card-link-template');
const loadingEl = document.querySelector('.loading');

const URL =
	'https://gist.githubusercontent.com/al3xback/7abee37fc5e14acfacd9bd638afaa397/raw/dda74738ac52ca5e5e253f05558f8aca922f1b77/social-links-data.txt';

const removeLoading = () => {
	loadingEl.parentElement.removeChild(loadingEl);
};

const handleError = (msg) => {
	removeLoading();

	const errorEl = document.createElement('p');
	errorEl.className = 'error';
	errorEl.textContent = msg;

	cardWrapperEl.appendChild(errorEl);
};

const renderCardContent = (data) => {
	const [name, location, job, image, ...socialLinks] = data.split('\n');
	const transformedSocialLinks = socialLinks
		.filter((link) => Boolean(link))
		.map((link) => link.split(': '));

	const cardTemplateNode = document.importNode(cardTemplate.content, true);
	const cardEl = cardTemplateNode.querySelector('.card');

	const cardImageEl = cardEl.querySelector('.card__image img');
	cardImageEl.src = './images/' + image;
	cardImageEl.alt = name;

	const cardTitleEl = cardEl.querySelector('.card__title');
	cardTitleEl.textContent = name;

	const cardSubtitleEl = cardEl.querySelector('.card__subtitle');
	cardSubtitleEl.textContent = location;

	const cardDescEl = cardEl.querySelector('.card__desc');
	cardDescEl.textContent = `"${job}."`;

	const cardLinksEl = cardEl.querySelector('.card__links');

	for (const socialLink of transformedSocialLinks) {
		const [name, url] = socialLink;

		const cardLinkTemplateNode = document.importNode(
			cardLinkTemplate.content,
			true
		);
		const cardLinkEl = cardLinkTemplateNode.querySelector('.card__link');

		const cardLinkAnchorEl = cardLinkEl.querySelector('.btn');
		cardLinkAnchorEl.href = url;
		cardLinkAnchorEl.textContent = name;

		cardLinksEl.appendChild(cardLinkTemplateNode);
	}

	removeLoading();
	cardWrapperEl.appendChild(cardTemplateNode);
};

sendHttpRequest('GET', URL, renderCardContent, handleError);
