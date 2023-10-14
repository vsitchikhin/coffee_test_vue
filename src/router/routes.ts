import { RouteRecordRaw } from 'vue-router';

export const Routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'config',
    component: () => import('../pages/Configuration/index.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../pages/Cart/index.vue'),
  },
];
