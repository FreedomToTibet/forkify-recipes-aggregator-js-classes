export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = {id, title, author, img};

    this.likes.push(like);
    this.persistData();

    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);
		localStorage.clear();
		this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  // Write data to the local storage
  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  // Read data from the local storage
  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));
    if (storage) this.likes = storage;
  }
}
