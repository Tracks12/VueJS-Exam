export default class Store {
	static load = (data) => {
		return JSON.parse(atob(data));
	}

	static save = (data) => {
		return btoa(JSON.stringify(data));
	}
}
