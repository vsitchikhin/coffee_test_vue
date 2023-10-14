import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';

import { createPinia } from 'pinia';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { Routes } from './router/routes';
import VueAxios from 'vue-axios';
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(),
  routes: Routes,
});

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();

createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .use(VueAxios, axios)
  .mount('#app');
