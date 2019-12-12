import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddReverse from "../views/table/AddReverse.vue";
import routeNames, {needLogin} from './name'
import store from '@/store'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/workplace",
    name: "workplace",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Workbench.vue")
  },
  {
    path: "/reverse",
    name: "addReverse",
    component: AddReverse
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (needLogin.includes(to.path)) {
    let user = store.state.user;
    if (user && user.objectId) {
      next();
    } else {
      next(routeNames.home)
    }
  } else {
    next();
  }
})

export default router;
