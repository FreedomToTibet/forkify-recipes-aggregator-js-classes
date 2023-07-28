import Search from "./modules/Search";

const state = {};

const controlSearch = async () => {
	const querry = 'pizza';
	if (querry) {
		state.search = new Search(querry);
		await state.search.get_data();
		console.log(state.search.recipes);
	}
};



document.querySelector('.search').addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});