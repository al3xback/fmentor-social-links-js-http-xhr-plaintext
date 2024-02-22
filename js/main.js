import { sendHttpRequest } from './util.js';

const URL =
	'https://gist.githubusercontent.com/al3xback/7abee37fc5e14acfacd9bd638afaa397/raw/dda74738ac52ca5e5e253f05558f8aca922f1b77/social-links-data.txt';

const cardWrapperEl = document.querySelector('.card-wrapper');
const cardTemplate = document.getElementById('card-template');
const cardHeadTemplate = document.getElementById('card-head-template');
const cardLinkTemplate = document.getElementById('card-link-template');
const cardBodyTemplate = document.getElementById('card-body-template');
const loadingEl = document.querySelector('.loading');

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

	/* [card head] */
	const cardHeadTemplateNode = document.importNode(
		cardHeadTemplate.content,
		true
	);
	const cardHeadEl = cardHeadTemplateNode.querySelector('.card__head');

	const cardTitleEl = cardHeadEl.querySelector('.card__title');
	cardTitleEl.textContent = name;

	const cardSubtitleEl = cardHeadEl.querySelector('.card__subtitle');
	cardSubtitleEl.textContent = location;

	const cardDescriptionEl = cardHeadEl.querySelector('.card__desc');
	cardDescriptionEl.textContent = `"${job}."`;

	const cardImageEl = cardHeadEl.querySelector('.card__image img');
	cardImageEl.src = './images/' + image;
	cardImageEl.alt = name;

	/* [card body] */
	const cardBodyTemplateNode = document.importNode(
		cardBodyTemplate.content,
		true
	);
	const cardBodyEl = cardBodyTemplateNode.querySelector('.card__body');

	const cardLinksEl = cardBodyEl.querySelector('.card__links');

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

	/* [init] */
	removeLoading();
	cardEl.appendChild(cardHeadTemplateNode);
	cardEl.appendChild(cardBodyTemplateNode);
	cardWrapperEl.appendChild(cardTemplateNode);
};

sendHttpRequest('GET', URL, renderCardContent, handleError);
