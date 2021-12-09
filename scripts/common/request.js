export default class Request {
	static get = (url) => {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
		xhr.send();

		return xhr.responseText;
	}
}
