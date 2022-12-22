<template>
  <div class="container py-3">
    <form v-on:submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Id of Department</label>
        <select v-model="departmentId">
          <option v-for="department in departments" :value="department.id">
            {{ department.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Name of group</label>
        <input type="text" class="form-control" v-model="nameOfGroup">
      </div>
      <div class="mb-3">
        <label class="form-label">Course</label>
        <input type="number" class="form-control" min="1" max="5" v-model="course">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index.js";
import {createRouter as $router} from "vue-router/dist/vue-router.mjs";

export default {
  name: "GroupsAdd",
  data() {
    return {
      nameOfGroup: '',
      course: '',
      departments: [],
      departmentId: 1,
    }
  },
  methods: {
    handleSubmit(evt) {
      axios
          .post('http://localhost:3000/groups/add', {department_id: this.departmentId, name: this.nameOfGroup, course: this.course})
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
    },

    getFacultiesIds(evt) {
      axios
          .get(`http://localhost:3000/departments`)
          .then(response => {
            for (const obj of response.data) {
              const department = {id: obj.id, name: obj.name}
              this.departments.push(department)
            }
            console.log(this.departments)
          })
          .catch(error => {
            console.log(error);
          })
    }
  },

  beforeMount() {
    this.getFacultiesIds();
  }
}

</script>

<style scoped>

</style>