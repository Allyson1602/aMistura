import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3000/',
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	},
	responseType: 'json'
	// xsrfCookieName: 'XSRF-TOKEN',
});

export default instance;
