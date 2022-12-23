import { createWebHistory, createRouter } from "vue-router";
import Faculty from "../views/faculty/FacultyTable.vue";
import FacultyAdd from "../views/faculty/FacultyAdd.vue";
import FacultyEdit from "../views/faculty/FacultyEdit.vue";
import DepartmentTable from "../views/department/DepartmentTable.vue";
import DepartmentAdd from "../views/department/DepartmentAdd.vue";
import DepartmentEdit from "../views/department/DepartmentEdit.vue";
import GroupsTable from "../views/groups/GroupsTable.vue";
import GroupsAdd from "../views/groups/GroupsAdd.vue";
import GroupsEdit from "../views/groups/GroupsEdit.vue";
import StudentsTable from "../views/students/StudentsTable.vue";
import StudentsAdd from "../views/students/StudentsAdd.vue";
import StudentsEdit from "../views/students/StudentsEdit.vue";
import DisciplinesTable from "../views/disciplines/DisciplinesTable.vue";
import DisciplinesAdd from "../views/disciplines/DisciplinesAdd.vue";
import DisciplinesEdit from "../views/disciplines/DisciplinesEdit.vue";
import TeachersTable from "../views/teachers/TeachersTable.vue";
import TeachersAdd from "../views/teachers/TeachersAdd.vue";
import TeachersEdit from "../views/teachers/TeachersEdit.vue";


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
  {
    path: '/students/:id',
    name: 'students-edit',
    component: StudentsEdit,
    props: true,
  },
  {
    path: '/disciplines/',
    name: 'disciplines',
    component: DisciplinesTable,
  },
  {
    path: '/disciplines/add',
    name: 'disciplines-add',
    component: DisciplinesAdd,
  },
  {
    path: "/disciplines/:id",
    name: "disciplines-edit",
    component: DisciplinesEdit,
    props: true,
  },
  {
    path: '/teachers/',
    name: 'teachers',
    component: TeachersTable,
  },
  {
    path: '/teachers/add',
    name: 'teachers-add',
    component: TeachersAdd,
  },
  {
    path: "/teachers/:id",
    name: "teachers-edit",
    component: TeachersEdit,
    props: true,
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