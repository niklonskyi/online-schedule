<template>
  <div class="container py-3">
    <form v-on:submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Name of Schedule</label>
        <input type="text" required maxlength="30" class="form-control" v-model="nameOfSchedule">
      </div>
      <div class="mb-3">
        <label class="form-label">Name of Teacher</label>
        <select v-model="teacherId" required>
          <option v-for="teacher in teachers" :value="teacher.id">
            {{ teacher.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Name of Discipline</label>
        <select v-model="disciplineId" required>
          <option v-for="discipline in disciplines" :value="discipline.id">
            {{ discipline.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Group</label>
        <select v-model="groupId" required>
          <option v-for="group in groups" :value="group.id">
            {{ group.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Time</label>
        <input type="time" required class="form-control" v-model="time">
      </div>
      <div class="mb-3">
        <label class="form-label">Classroom</label>
        <input type="text" required maxlength="30" class="form-control" v-model="classroom">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";
import {createRouter as $router} from "vue-router/dist/vue-router.mjs";

export default {
  name: "DepartmentAdd",
  data() {
    return {
      nameOfSchedule: '',
      time: '',
      classroom: '',
      shortNameOfDepartment: '',
      disciplines: [],
      teachers: [],
      groups: [],
      teacherId: 1,
      groupId: 1,
      disciplineId: 1,
    }
  },
  methods: {
    handleSubmit(evt) {
      axios
          .post('http://localhost:3000/schedule/add', {
            name: this.nameOfSchedule,
            teacher_id: this.teacherId,
            discipline_id: this.disciplineId,
            group_id: this.groupId,
            time: this.time,
            classroom: this.classroom,
          })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
    },

    getDisciplinesIds(evt) {
      axios
          .get(`http://localhost:3000/disciplines`)
          .then(response => {
            for (const obj of response.data) {
              const discipline = {id: obj.id, name: obj.name}
              this.disciplines.push(discipline)
            }
            console.log(this.disciplines)
          })
          .catch(error => {
            console.log(error);
          })
    },

    getGroupsIds(evt) {
      axios
          .get(`http://localhost:3000/groups`)
          .then(response => {
            for (const obj of response.data) {
              const group = {id: obj.id, name: obj.name}
              this.groups.push(group)
            }
          })
          .catch(error => {
            console.log(error);
          })
    },

    getTeachersIds(evt) {
      axios
          .get(`http://localhost:3000/teachers`)
          .then(response => {
            for (const obj of response.data) {
              const teacher = {id: obj.id, name: (obj.name + ' ' + obj.surname)}
              this.teachers.push(teacher)
            }
          })
          .catch(error => {
            console.log(error);
          })
    },
  },

    beforeMount() {
      this.getDisciplinesIds();
      this.getGroupsIds();
      this.getTeachersIds();
    }
}

</script>

<style scoped>

</style>