import Search from "./modules/Search";
import Recipe from "./modules/Recipe";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import {
	elements,
	renderLoader,
	clearLoader
} from "./views/base";

const state = {};

//*** SEARCH ***
const controlSearch = async () => {
	const querry = searchView.getInput();

	if (querry) {
		state.search = new Search(querry);

		searchView.clearInput();
		searchView.clearResults();
		recipeView.clearRecipe();
		renderLoader(elements.searchRes);

		try {
			await state.search.get_data();

			clearLoader();
			searchView.renderResults(state.search.recipes);
		} catch (error) {
			console.log('Error processing search!');
			clearLoader();
		}


	}
};

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');

	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.recipes, goToPage);
	}
});

//*** RECIPE ***
const controlRecipe = async () => {
	const id = window.location.hash.replace('#', '');

	if (id) {
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		if (state.search) searchView.highlightSelected(id);

		state.recipe = new Recipe(id);
		try {
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();

			state.recipe.calcTime();
			state.recipe.calcServings();

			clearLoader();
			recipeView.renderRecipe(state.recipe);
		} catch (error) {
			console.log('Error processing recipe!');
		}
	}
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Hadling recipe button clicks

elements.recipe.addEventListener('click', (e) => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    console.log('Add ingredients');
  }
});