import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/admin/Admin.vue';
import Overview from '../views/admin/Overview.vue';
import Products from '../views/admin/Products.vue';
import Orders from '../views/admin/Orders.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'overview',
        name: 'Admin-Overview',
        component: Overview,
      },
      {
        path: 'products',
        name: 'Admin-Products',
        component: Products,
      },
      {
        path: 'orders',
        name: 'Admin-Orders',
        component: Orders,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  const authUser = store.state.auth.user;
  if (requiresAuth && !authUser) {
    return next('/');
  }
  return next();
});

export default router;
