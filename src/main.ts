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

import { aliases, mdi } from 'vuetify/iconsets/mdi';


const router = createRouter({
  history: createWebHistory(),
  routes: Routes,
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(VueAxios, axios)
  .use(vuetify)
  .mount('#app');
