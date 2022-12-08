import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Login from "../views/auth/LoginView.vue";
import Signup from "../views/auth/SignupView.vue";
import { useAuthUserStore } from "@/stores/auth-user";
import StaffView from "@/views/StaffView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { requiresAuth: false },
  },
  {
    path: "/staff",
    name: "StaffView",
    component: StaffView,
    meta: { requiresAuth: false },
  },
  // {
  //   path: "/staff/create",
  //   name: "CreateStaff",
  //   component: CreateStaff,
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: "/staff/:id",
  //   name: "StaffDetails",
  //   component: StaffDetails,
  //   props: true,
  //   meta: { requiresAuth: true },
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const store = useAuthUserStore();

  if (to.meta.requiresAuth && !store.isLoggedIn) return "/login";
});

export default router;
