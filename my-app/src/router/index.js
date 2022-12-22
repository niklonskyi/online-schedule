import { createWebHistory, createRouter } from "vue-router";
import Faculty from "../views/FacultyTable.vue";
import FacultyAdd from "../views/FacultyAdd.vue";
import FacultyEdit from "../views/FacultyEdit.vue";
import DepartmentTable from "../views/DepartmentTable.vue";
import DepartmentAdd from "../views/DepartmentAdd.vue";
import DepartmentEdit from "../views/DepartmentEdit.vue";
import GroupsTable from "../views/GroupsTable.vue";
import GroupsAdd from "../views/GroupsAdd.vue";
import GroupsEdit from "../views/GroupsEdit.vue";
import StudentsTable from "../views/StudentsTable.vue";
import StudentsAdd from "../views/StudentsAdd.vue";


const routes =  [
  {
    path: "/faculty",
    name: "faculty",
    component: Faculty,
  },
  {
    path: "/faculty/:id",
    name: "faculty-edit",
    component: FacultyEdit,
    props: true,
  },
  {
    path: '/faculty/add',
    name: 'faculty-add',
    component: FacultyAdd,
  },
  {
    path: '/departments/',
    name: 'departments',
    component: DepartmentTable,
  },
  {
    path: '/departments/add',
    name: 'departments-add',
    component: DepartmentAdd,
  },
  {
    path: '/departments/:id',
    name: 'departments-edit',
    component: DepartmentEdit,
    props: true,
  },
  {
    path: '/groups/',
    name: 'groups',
    component: GroupsTable,
  },
  {
    path: '/groups/add',
    name: 'groups-add',
    component: GroupsAdd,
  },
  {
    path: '/groups/:id',
    name: 'groups-edit',
    component: GroupsEdit,
    props: true,
  },
  {
    path: '/students/',
    name: 'students',
    component: StudentsTable,
  },
  {
    path: '/students/add',
    name: 'students-add',
    component: StudentsAdd,
  },
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