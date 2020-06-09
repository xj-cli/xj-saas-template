import { BASE_URL } from './constants';

// config axios baseURL
export default {
    baseURL: process.env.NODE_ENV === 'development' ? BASE_URL : '/',
};
