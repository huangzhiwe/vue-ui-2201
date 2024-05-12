const routes=[
  {
    path: '/study/comp',
    component: () => import('../view/study/Comp.vue'),
  },
  {
    path: '/study/idiomGame',
    component: () => import('../view/study/IdiomGame.vue'),
  },
  {
    path: '/study/link',
    component: () => import('../view/study/Link.vue'),
  }

];

export{ routes as default,routes as study};