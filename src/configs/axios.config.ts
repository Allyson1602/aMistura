import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://a-mistura-efc46d5954fb.herokuapp.com/',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers':
			'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Access-Control-Allow-Origin'
	},
	responseType: 'json'
});

export default instance;
