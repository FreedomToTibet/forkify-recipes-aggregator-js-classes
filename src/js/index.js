import Search from "./modules/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

const state = {};

const controlSearch = async () => {
	const querry = searchView.getInput();

	if (querry) {
		state.search = new Search(querry);

		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		await state.search.get_data();
		
		clearLoader();
		searchView.renderResults(state.search.recipes);
	}
};



elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});