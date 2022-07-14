import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import(/* webpackChunkName: "recipes" */ '../views/RecipesList.vue'),
  },
  {
    path: '/recipe/:id',
    name: 'recipe',
    component: () => import(/* webpackChunkName: "recipe" */ '../views/RecipeDetails.vue'),
    props: true
  },
  {
    path: '/add-recipe',
    name: 'add-recipe',
    component: () => import(/* webpackChunkName: "recipe-add" */ '../views/AddRecipe.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
