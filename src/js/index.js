import Search from './modules/Search';
import Recipe from './modules/Recipe';
import List from './modules/List';
import Likes from './modules/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

import {elements, renderLoader, clearLoader} from './views/base';

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

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', (e) => {
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
      recipeView.renderRecipe(
				state.recipe,
				state.likes.isLiked(id)
			);
    } catch (error) {
      console.log('Error processing recipe!');
    }
  }
};

['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));

//*** LIST ***

const controlList = () => {
  if (!state.list) state.list = new List();

  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

elements.shopping.addEventListener('click', (e) => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

//*** LIKE ***

const contolLike = () => {
  if (!state.likes) state.likes = new Likes();

  const currentID = state.recipe.id;

	// User didn't press Like for this recipe yet
  if (!state.likes.isLiked(currentID)) {
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.image
    );

    likesView.toggleLikeBtn(true);
    likesView.renderLike(newLike);

  } else {
    state.likes.deleteLike(currentID);

    likesView.toggleLikeBtn(false);
    likesView.deleteLike(currentID);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

window.addEventListener('load', () => {
  state.likes = new Likes();
  state.likes.readStorage();
  likesView.toggleLikeMenu(state.likes.getNumLikes());
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

// Hadling recipe button clicks

elements.recipe.addEventListener('click', (e) => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add ingredients to shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // Like controller
    contolLike();
  }
});

elements.header.addEventListener('click', (e) => {
	if (e.target.matches('.header__logo, .header__logo *')) {
		window.location.href = "http://localhost:8080/";
	}
});