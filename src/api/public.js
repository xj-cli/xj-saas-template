import config from './config/public';
import axios from '@/utils/request';
import { getLocal } from '../utils/local';

export const getSlider = () => axios.get(config.getSlider);
export const getCaptcha = () => axios.get(config.getCaptcha, {
    params: {
        uid: getLocal('uuid'),
    }
});
