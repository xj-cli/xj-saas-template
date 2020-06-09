export default [
  {
    path: "/",
    component: () => import(/*webpackChunkName:'home'*/ "@/views/Home.vue"), //懒加载模式，按需加载
  },
  {
    path: "*",
    component: () => import(/*webpackChunkName:'404'*/ "@/views/404.vue"),
  },
  {
    path: "/manager",
    component: () => import(/*webpackChunkName:'manager'*/ "@/views/manager/index.vue"),
  },
];
