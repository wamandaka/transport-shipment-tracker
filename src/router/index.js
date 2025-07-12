import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import DetailShipment from "../pages/DetailShipment.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/shipment/:id",
    name: "DetailShipment",
    component: DetailShipment,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
