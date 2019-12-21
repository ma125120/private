import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddReverse from "../views/table/AddReverse.vue";
import routeNames, {needNotLogin} from './name'
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
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Workbench.vue")
  },
  {
    path: "/reverse",
    name: "addReverse",
    component: AddReverse
  },
  {
    path: "/setting/staff",
    name: "staff",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/setting/Staff.vue")
  },
  {
    path: "/setting/room",
    name: "room",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/setting/Room.vue")
  },
  {
    path: "/setting/account",
    name: "account",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/setting/Account.vue")
  },
  {
    path: "/setting/shop",
    name: "shop",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/setting/Shop.vue")
  },
  {
    path: "/setting/child",
    name: "child",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/setting/ChildAccount.vue")
  },
  {
    path: "/setting/child/new",
    name: "childNew",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/setting/child/NewChild.vue")
  },
  {
    path: "/setting/child/edit",
    name: "childEdit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/setting/child/EditChild.vue")
  },
  {
    path: "/workplace/act/add",
    name: "actAdd",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/table/AddAct.vue")
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
  store.commit('restoreUser');
  if (!needNotLogin.includes(to.path)) {
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
