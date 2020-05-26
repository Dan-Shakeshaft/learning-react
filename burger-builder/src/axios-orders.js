import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://learningreact-cf232.firebaseio.com/'
});

export default instance;