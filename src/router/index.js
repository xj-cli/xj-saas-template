import Vue from "vue";
import VueRouter from "vue-router";
import * as hooks from './hooks';

Vue.use(VueRouter);

const files = require.context("./", false, /\.router.js$/);
const routes = [];
files.keys().forEach((key) => routes.push(...files(key).default));

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

Object.values(hooks).forEach(hook => {
  router.beforeEach(hook.bind(router));
});

export default router;
