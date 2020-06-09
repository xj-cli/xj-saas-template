import config from '@/config';
import axios from 'axios';
import { getLocal } from '../utils/local';

class Http {
    constructor() {
        this.baseURL = config.baseURL;
        this.timeout = 3000;
    }

    mergeOptions(options) {
        return {
            baseURL: this.baseURL,
            timeout: this.timeout,
            ...options,
        }
    }

    setInterceptors(instance){
        // interceptors has two callbacks: resolve, reject
        instance.interceptors.request.use(config => {
            config.headers.authorization = `Bear ${getLocal('token')}`;
            return config;
        });
        instance.interceptors.response.use(response => {
            // 注意返回的数据中，验证不通过时，err: 1
            if (response.status == 200) return Promise.resolve(response.data);
            return Promise.resolve(response.data.data);
        }, err => {
            console.log(err);
            if (err.response) {
              
              switch(err.response.status) {
                case '401':
                  console.log(err);
                  break;
                  default:
                    break;
                  }
            }
            return Promise.reject(err);
        })
    }

    request(options){
        const instance = axios.create();
        const opts = this.mergeOptions(options);
        this.setInterceptors(instance);
        return instance(opts);
    }

    get(url, config) {
        return this.request({
            url,
            method: 'GET',
            ...config,
        })
    }

    post(url, data) {
        return this.request({
            url,
            method: 'POST',
            data,
        })
    }
}

export default new Http;