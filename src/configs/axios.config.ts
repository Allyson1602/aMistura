import axios from 'axios';
import md5 from 'md5';

const instance = axios.create({
	baseURL: 'http://localhost:3000/prod',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers':
			'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Access-Control-Allow-Origin',
		Authorization: md5(import.meta.env.VITE_AUTH_TOKEN)
	},
	responseType: 'json'
});

export default instance;
