import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/MainDashboard.vue";
import ManagementObat from "@/views/ManagementObat.vue";
import ManagementTransaksi from "@/views/ManagementTransaksi.vue";
import ManagementStok from "@/views/ManagementStok.vue";
import PembukuanAll from "@/views/PembukuanPseudo.vue";
import PemasokPseudo from "@/views/PemasokPseudo.vue";
import LoginPseudo from "@/views/LoginPseudo.vue";
import PelangganList from "@/components/PelangganList.vue";
import VerifTransaksi from "@/components/VerifTransaksi.vue";
import SignUp from "@/views/SignUp.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/management",
    name: "Management Obat",
    component: ManagementObat,
    meta: { requiresAuth: true },
  },
  {
    path: "/historitransaksi",
    name: "Management Transaksi",
    component: ManagementTransaksi,
    meta: { requiresAuth: true },
  },
  {
    path: "/stok",
    name: "Management Stok",
    component: ManagementStok,
    meta: { requiresAuth: true },
  },
  {
    path: "/pembukuan",
    name: "Pembukuan",
    component: PembukuanAll,
    meta: { requiresAuth: true },
  },
  {
    path: "/pemasok",
    name: "Pemasok",
    component: PemasokPseudo,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPseudo,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: SignUp,
    meta: { requiresAuth: false },
  },
  {
    path: "/pelanggan",
    name: "pelanggan",
    component: PelangganList,
    meta: { requiresAuth: false },
  },
  {
    path: "/veriftransaksi",
    name: "veriftransaksi",
    component: VerifTransaksi,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0, behavior: "instant" };
    }
  },
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (to.path === "/login" && token) {
    next("/");
  } else {
    next();
  }
});

export default router;
