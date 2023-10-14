import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
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
