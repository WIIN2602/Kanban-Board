import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Regis.vue';
import Board from '../views/Board.vue';

const routes = [
  { path: '/', component: Register },
  { path: '/login', component: Login},
  { path: '/board', component: Board }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
