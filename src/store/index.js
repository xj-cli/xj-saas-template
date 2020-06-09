import Vue from 'vue'
import Vuex from 'vuex'
import rootModule from './rootModule';

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/ );
files.keys().forEach(index => {
  let store = files(index).default;
  let modulesName = index.replace(/^\.\//, '').replace(/\.js$/, '');
  let modules = rootModule.modules = (rootModule.modules || {});
  modules[modulesName] = store;
  modules[modulesName].namespaced = true;
})

export default new Vuex.Store(rootModule);
