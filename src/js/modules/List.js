import uniqid from 'uniqid';

export default class List {
	constructor() {
		this.items = [];
	}
	addItem(count, unit, ingredient) {
		const item = {
			id: uniqid(),
			count,
			unit,
			ingredient
		};
		this.items.push(item);
		return item;
	}
	deleteItem(id) {
		const index = this.items.findIndex(el => el.id === id);
		this.items.splice(index, 1);
	}
	updateCount(id, newCount) {
		this.items.find(el => el.id === id).count = newCount;
	}
	// updateUnit(id, newUnit) {
	// 	this.items.find(el => el.id === id).unit = newUnit;
	// }
	// updateIngredient(id, newIngredient) {
	// 	this.items.find(el => el.id === id).ingredient = newIngredient;
	// }
	// toggleBookmark(id) {
	// 	const item = this.items.find(el => el.id === id);
	// 	item.bookmarked = !item.bookmarked;
	// }
	// toggleBookmarkAll() {
	// 	this.items.forEach(el => el.bookmarked = !el.bookmarked);
	// }
	// toggleBookmarkAllOff() {
	// 	this.items.forEach(el => el.bookmarked = false);
	// }
	// toggleBookmarkAllOn() {
	// 	this.items.forEach(el => el.bookmarked = true);
	// }
	// toggleBookmarkAllOnOff() {
	// 	this.items.forEach(el => el.bookmarked = !el.bookmarked);
	// }
	// toggleBookmarkAllOnOffOff() {
	// 	this.items.forEach(el => el.bookmarked = !el.bookmarked);
	// }
}