import user from './config/user';
import axios from '@/utils/request';

export const login = data => axios.post(user.login, data);
export const reg = data => axios.post(user.reg, data);
export const validate = () => axios.get(user.validate);