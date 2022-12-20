import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Login from "../views/auth/LoginView.vue";
import Signup from "../views/auth/SignupView.vue";
import { useAuthUserStore } from "@/stores/auth-user";
import StaffView from "@/views/StaffView.vue";
import StaffDetails from "@/components/details/StaffDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: false, title: "Home" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false, title: "Login" },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { requiresAuth: false, title: "Sign Up" },
  },
  {
    path: "/staff",
    name: "StaffView",
    component: StaffView,
    meta: { requiresAuth: false, title: "Staff" },
  },
  {
    path: "/staff/:id",
    name: "StaffDetails",
    component: StaffDetails,
    props: true,
    meta: { requiresAuth: true, title: "Staff Details" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const store = useAuthUserStore();
  document.title = "CSCA | " + to.meta.title
  
  if (to.meta.requiresAuth && !store.isLoggedIn) return "/login";
});

export default router;
