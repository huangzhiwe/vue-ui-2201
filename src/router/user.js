

const routes = [
  {
    path: '/user/login',
    component: () => import('../view/user/Login.vue'),
  },
  {
    path: '/user/main',
    component: () => import('../view/user/Main.vue'),
  },
  {
    path: '/user/register',
    component: () => import('../view/user/Register.vue'),
  }
];
export { routes as default, routes as user };
