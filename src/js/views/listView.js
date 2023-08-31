import { elements } from "./base";

export const renderItem = (item) => {
	const markup = `
	<li class="shopping__item" data-itemid=${item.id}>
		<div class="shopping__count">
			<input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
			<p>${item.unit}</p>
		</div>
		<p class="shopping__description">${item.ingredient}</p>
		<button class="shopping__delete btn-tiny">
			<svg>
				<use href="img/icons.svg#icon-circle-with-cross"></use>
			</svg>
		</button>
	</li>
	`;
	elements.shopping.insertAdjacentHTML("beforeend", markup);
}

export const renderDelBtnList = () => {
	const markup = `
	<button class="recipe__love recipe__delete">
	<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	width="800px" height="800px" viewBox="0 0 31.576 31.576"
	xml:space="preserve">
<g>
 <g>
	 <path d="M16.779,23.888H6.215c-1.079,0-1.968-0.844-1.968-1.923V4.446c0-1.079,0.889-1.928,1.968-1.928h13.677
		 c1.08,0,1.984,0.849,1.984,1.928v11.917l1.231,1.383l1.257-1.407c0.016-0.017,0.03-0.031,0.03-0.048V2.57
		 c0-1.419-1.14-2.57-2.56-2.57H4.169C2.807,0,1.73,1.104,1.73,2.466v21.44c0,1.42,1.123,2.574,2.543,2.574H15.22
		 c0.018,0,0.036-0.054,0.055-0.074l1.879-2.092L16.779,23.888z"/>
	 <path d="M18.838,5.8H7.498c-0.697,0-1.26,0.563-1.26,1.26c0,0.696,0.563,1.258,1.26,1.258h11.34c0.699,0,1.264-0.563,1.264-1.258
		 C20.102,6.362,19.537,5.8,18.838,5.8z"/>
	 <path d="M18.838,9.997H7.498c-0.697,0-1.26,0.524-1.26,1.221c0,0.693,0.563,1.221,1.26,1.221h11.34
		 c0.699,0,1.264-0.528,1.264-1.221C20.102,10.522,19.537,9.997,18.838,9.997z"/>
	 <path d="M15.594,16.017c1.259-1.137,2.992-1.426,4.482-0.878c-0.113-0.578-0.623-1.02-1.238-1.02H7.498
		 c-0.697,0-1.26,0.564-1.26,1.259c0,0.694,0.563,1.259,1.26,1.259h7.527C15.191,16.406,15.381,16.209,15.594,16.017z"/>
	 <path d="M7.498,18.164c-0.697,0-1.26,0.562-1.26,1.259s0.563,1.259,1.26,1.259h6.864c-0.268-0.84-0.294-1.679-0.083-2.519
		 L7.498,18.164L7.498,18.164z"/>
	 <path d="M26.065,24.332l1.483-1.646l1.728-1.914c0.813-0.904,0.744-2.301-0.161-3.115c-0.908-0.816-2.3-0.743-3.117,0.16
		 l-1.42,1.576l-1.484,1.646l-2.906-3.223c-0.814-0.902-2.209-0.978-3.117-0.16c-0.905,0.815-0.976,2.211-0.16,3.115l3.211,3.561
		 l-1.482,1.646l-1.729,1.912c-0.815,0.905-0.744,2.301,0.161,3.116c0.423,0.381,0.95,0.567,1.476,0.567
		 c0.604,0,1.203-0.245,1.641-0.729l1.42-1.572l1.484-1.646l2.906,3.221c0.438,0.482,1.037,0.729,1.641,0.729
		 c0.525,0,1.055-0.188,1.479-0.566c0.904-0.814,0.977-2.211,0.16-3.115L26.065,24.332z"/>
 </g>
</g>
</svg>
	</button>
	`
	elements.shopping.insertAdjacentHTML("beforeend", markup);
}

export const deleteItem = (id) => {
	const item = document.querySelector(`[data-itemid="${id}"]`);
	if (item) item.parentElement.removeChild(item);
}

export const deleteAllItems = () => {
	document.querySelector(".shopping__list").innerHTML = "";
}