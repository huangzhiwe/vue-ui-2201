const routes=[
  {
    path: '/crud/softwaretype',
    component: () => import('../view/crud/SoftwareType.vue'),
  },
  {
    path: '/crud/software',
    component: () => import('../view/crud/Software.vue'),
  },
  
  

];

export{ routes as default,routes as crud};