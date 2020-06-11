import { SET_SLIDER, CREATE_WEBSOCKET, SET_MESSAGE } from './action-types';
import { getSlider } from '@/api/public';
// import { getSlider } from '@/api/mock/public';
import WS from '../utils/websocket';

export default {
    state: {
      sliders: [],
      ws: null,
      message: 'ok',
    },
    mutations: {
      [SET_SLIDER](state, sliders) {
        state.sliders = sliders;
      },
      [CREATE_WEBSOCKET](state, ws) {
        state.ws = ws;
      },
      [SET_MESSAGE](state, message) {
        state.message = message;
      },
    },
    actions: {
      async [SET_SLIDER]({ commit }) {
        try {
          const sliders = await getSlider();
          commit(SET_SLIDER, sliders.data);
        } catch(err) {
          console.log(err);
        }
      },
      async [CREATE_WEBSOCKET]({ commit }) {
        let ws = new WS();
        ws.create();
        commit(CREATE_WEBSOCKET, ws);
      }
    },
};
