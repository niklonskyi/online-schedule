import { createWebHistory, createRouter } from "vue-router";
import Faculty from "../views/Faculty.vue";
import FacultyAdd from "../views/FacultyAdd.vue";


const routes =  [
  {
    path: "/faculty",
    name: "faculty",
    component: Faculty,
  },
  {
    path: "/faculty/:id",
    name: "faculty-details",
    component: Faculty,
  },
  {
    path: '/faculty/add',
    name: 'faculty-add',
    component: FacultyAdd,
  }
  // {
  //   path: "/add",
  //   name: "add",
  //   component: () => import("./components/AddTutorial")
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;