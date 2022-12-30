import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      component: () => import("@/App.vue"),
      redirect: { name: "Easy" },
    },
    {
      name: "Average",
      path: "/Average",
      component: () => import("@/views/ElevatorAverage.vue"),
    },
    {
      name: "Easy",
      path: "/Easy",
      component: () => import("@/views/ElevatorEasy.vue"),
    },

    {
      name: "Hard",
      path: "/Hard",
      component: () => import("@/views/ElevatorHard.vue"),
    },
  ],
});
