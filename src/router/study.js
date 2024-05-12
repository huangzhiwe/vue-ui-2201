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
  },
  {
    path: '/study/pinia',
    component: () => import('../view/study/Pinia.vue'),
  },
  {
    path: '/study/pinia2',
    component: () => import('../view/study/Pinia2.vue'),
  },
  {
    path: '/study/ipinfo',
    component: () => import('../view/study/IpInfo.vue'),
  }



];

export{ routes as default,routes as study};