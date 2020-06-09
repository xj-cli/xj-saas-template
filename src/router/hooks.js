import store from '../store/index';
import { USER_VALIDATE, SET_MENU_PERMISSION, ADD_ROUTE, CREATE_WEBSOCKET } from '../store/action-types';

export const loginPermission = async function(to, from, next) {
    let r = await store.dispatch(`user/${USER_VALIDATE}`);
    let needLogin = to.matched.some(item => item.meta.needLogin);
    if (!store.state.user.hasPermission ) {
        // 无权限
        /* 拦截 需要登陆的页面 */
        if (needLogin) {
            return next('/login');
        }
        next();
    } else {
        // 有权限
        /* 拦截 再次去注册的页面 */
        if (to.path === '/login' || to.path === '/reg') {
            // 输入 路径 时，重定向到主页
            return next('/');
        } 
        next();
    }
}

export const menuPermission = async function(to, from, next) {
  if (store.state.user.hasPermission) {
    if (!store.state.user.menuPermission) {
      store.dispatch(`user/${ADD_ROUTE}`);
      next(to.path);
    }
    next();
  } else {
    next();
  }
}

/* websocket 创建 */ 
export const createWebSocket = (to, from ,next) => {
  if (store.state.user.hasPermission && !store.state.ws) {
    // 登录 没创建
    store.dispatch(CREATE_WEBSOCKET);
  }
  next();
}