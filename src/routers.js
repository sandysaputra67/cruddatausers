import Vue from "vue";
import VueRouter from "vue-router";
import user from "./views/user.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", name: "user", component: user },
  ],
});

export default router;
