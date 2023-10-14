import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { routes } from './router/routes.ts';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const vuetify = createVuetify({
  components,
  directives,
});


createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app');
