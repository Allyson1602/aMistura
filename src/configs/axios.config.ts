import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://1xvq0wt8i2.execute-api.sa-east-1.amazonaws.com/prod',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers':
			'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Access-Control-Allow-Origin',
		Authorization: import.meta.env.VITE_AUTH_TOKEN
	},
	responseType: 'json'
});

export default instance;
