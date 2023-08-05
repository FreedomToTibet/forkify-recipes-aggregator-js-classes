import Search from "./modules/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";

const state = {};

const controlSearch = async () => {
	const querry = searchView.getInput();

	if (querry) {
		state.search = new Search(querry);

		searchView.clearInput();
		searchView.clearResults();

		await state.search.get_data();
		
		searchView.renderResults(state.search.recipes);
	}
};



elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});