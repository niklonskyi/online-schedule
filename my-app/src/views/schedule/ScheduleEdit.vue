<template>
  <div class="container py-3">
    <form v-on:submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Name of Schedule</label>
        <input type="text" class="form-control" v-model="nameOfSchedule">
      </div>
      <div class="mb-3">
        <label class="form-label">Name of Teacher</label>
        <select v-model="teacherId">
          <option v-for="teacher in teachers" :value="teacher.id">
            {{ teacher.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Name of Discipline</label>
        <select v-model="disciplineId">
          <option v-for="discipline in disciplines" :value="discipline.id">
            {{ discipline.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Group</label>
        <select v-model="groupId">
          <option v-for="group in groups" :value="group.id">
            {{ group.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Time</label>
        <input type="time" class="form-control" v-model="time">
      </div>
      <div class="mb-3">
        <label class="form-label">Classroom</label>
        <input type="text" class="form-control" v-model="classroom">
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
  name: "ScheduleEdit",
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
  props: {
    id: String,
  },
  methods: {
    getRow(evt) {
      console.log(this.id)
      axios
          .get(`http://localhost:3000/schedule/${this.id}`)
          .then(response => {
            console.log(response);
            this.disciplineId = response.data[0].discipline_id;
            this.nameOfSchedule = response.data[0].name;
            this.classroom = response.data[0].classroom;
            this.teacherId = response.data[0].teacher_id;
            this.time = response.data[0].time;
            this.groupId = response.data[0].group_id;
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

    handleSubmit(evt) {
      evt.preventDefault();
      axios
          .put(`http://localhost:3000/schedule/${this.id}`, {
            name: this.nameOfSchedule,
            teacher_id: this.teacherId,
            discipline_id: this.disciplineId,
            group_id: this.groupId,
            time: this.time,
            classroom: this.classroom,
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
      router.push({name: 'schedule'})
    }
  },

  beforeMount() {
    this.getRow();
    this.getDisciplinesIds();
    this.getTeachersIds();
    this.getGroupsIds();
  }
}

</script>

<style scoped>

</style>