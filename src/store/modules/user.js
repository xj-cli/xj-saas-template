import { SET_USER, USER_LOGIN, SET_PERSSION, USER_VALIDATE, USER_LOGOUT, SET_MENU_PERMISSION, ADD_ROUTE } from '../action-types';
import { setLocal, getLocal } from '@/utils/local';
import { login, validate } from '../../api/user';
import permission from '../../router/permission';
import router from '../../router/index';

const filterRouter = authList => {
  // pid: -1
  // _id: "5edcc4d71f9b5a73e1f77293"
  // name: "我的文章"
  // auth: "myArticle"
  // id: 9
  // role: "5ec73bc0c514dc322467cd63"
  // path: "/manager/myArticle"
 let auths = authList.map(auth => auth.auth);
  function filter(routes) {
   return routes.filter(route => {
     if (auths.includes(route.meta.auth)) {
       if (route.children) {
         route.children = filter(route.children);
       }
       return route;
     }
   })
 };

 return filter(permission);
};

export default {
    state: {
        userInfo: {},
        hasPermission: false,
        menuPermission: false,
    },
    mutations: {
        [SET_USER](state, userInfo) {
            state.userInfo = userInfo;
            if (userInfo && userInfo.token) {
                setLocal('token', userInfo.token);
            } else {
                localStorage.clear('token');
            }
        },
        [SET_PERSSION](state, payload) {
            state.hasPermission = payload;
        },
        [SET_MENU_PERMISSION](state, permission) {
          state.menuPermission = permission;
        }
    },

    actions: {
        async [USER_LOGIN]({ dispatch }, payload) {
            try {
                let result = await login(payload);
                if (result.err) {
                    return Promise.reject(result.data);
                } else {
                    dispatch(SET_USER, { payload: result.data, permisson: true });
                }
            } catch(error) {
                return Promise.reject(error);
            }
        },
        async [SET_USER]({ commit }, { payload, permisson }) {
            commit(SET_USER, payload);
            commit(SET_PERSSION, permisson);
        },
        async [USER_VALIDATE]({ dispatch }) {
            if (!getLocal('token')) return false;
            try {
                let result = await validate();
                dispatch(SET_USER, { payload: result.data, permisson: true });
                return true;
            } catch(err) {
                dispatch(SET_USER, { payload:{}, permisson: false });
                return false;
            }
        },
        async [USER_LOGOUT]({ dispatch }) {
            await dispatch(SET_USER, { userInfo: {}, hasPermission: false });
        },
        /* dynamic router */ 
        async [ADD_ROUTE]({ commit, state }) {
          let authList = state.userInfo.authList;
          if (authList) {
            // server responded authList
            let routes = filterRouter(authList);
            let route = router.options.routes.find(item => item.path === '/manager');
            route.children = routes;
            router.addRoutes([route]); // add routes
            commit(SET_MENU_PERMISSION,  true);
          } else {
            commit(SET_MENU_PERMISSION, true);
          }
        }
    }
}