import axios from 'axios';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async get_data() {
		try {
			const response = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
			this.recipes = response.data.recipes;
		} catch (error) {
			console.log("Getting data error", error);
		}
	}
}