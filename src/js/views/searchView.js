import {
	elements
} from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => {
	elements.searchResList.innerHTML = '';
	elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
	const resultsArr = Array.from(document.querySelectorAll('.results__link'));
	resultsArr.forEach(el => {
		el.classList.remove('results__link--active');
	});
	document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}

const limitRecipeTitle = (title, limit = 17) => {
	if (title.length > limit) {
		return title = `${title.substring(0, limit)}...`;
	} else {
		return title;
	}
}

const renderRecipe = (recipe) => {
	const markup = `
	<li>
		<a class="results__link" href="#${recipe.recipe_id}">
			<figure class="results__fig">
				<img src="${recipe.image_url}" alt="${recipe.title}">
			</figure>
			<div class="results__data">
				<h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
				<p class="results__author">${recipe.publisher}</p>
			</div>
		</a>
	</li>
	`;
	elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page, type) => `
	<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
	<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
		<svg class="search__icon">
			<use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
		</svg>
	</button>
`;

const renderButtons = (page, numResults, recipiesPerPage) => {
	const pages = Math.ceil(numResults / recipiesPerPage);

	let button;
	if (page === 1 && pages > 1) {
		// Only button to the next page
		button = createButton(page, 'next');
	} else if (page < pages) {
		// Both buttons
		button = `
			${createButton(page, 'next')}
			${createButton(page, 'prev')}
		`;
	} else if (page === pages && pages > 1) {
		// Only button to the previous page
		button = createButton(page, 'prev');
	}

	elements.searchResPages.insertAdjacentHTML('afterbegin', button);

}

export const renderResults = (recipies, page = 1, recipiesPerPage = 12) => {

	const startPosition = (page - 1) * recipiesPerPage;
	const endPosition = page * recipiesPerPage;

	recipies.slice(startPosition, endPosition).forEach(renderRecipe);

	renderButtons(page, recipies.length, recipiesPerPage);
};