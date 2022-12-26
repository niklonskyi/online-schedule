<template>
  <div class="container py-3">
    <form v-on:submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Id of Faculty</label>
        <select v-model="facultyId">
          <option v-for="faculty in faculties" :value="faculty.id">
            {{ faculty.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Name of department</label>
        <input type="text" class="form-control" required maxlength="30" v-model="nameOfDepartment">
      </div>
      <div class="mb-3">
        <label class="form-label">Short name of department</label>
        <input type="text" class="form-control" required maxlength="30" v-model="shortNameOfDepartment">
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
  name: "DepartmentEdit",
  data() {
    return {
      nameOfDepartment: '',
      shortNameOfDepartment: '',
      faculties: [],
      facultyId: 1,
    }
  },
  props: {
    id: String,
  },
  methods: {
    getRow(evt) {
      console.log(this.id)
      axios
          .get(`http://localhost:3000/departments/${this.id}`)
          .then(response => {
            console.log(response);
            this.facultyId = response.data[0].faculty_id;
            this.nameOfDepartment = response.data[0].name;
            this.shortNameOfDepartment = response.data[0].short_name;
          })
          .catch(error => {
            console.log(error);
          })
    },

    getFacultiesIds(evt) {
      axios
          .get(`http://localhost:3000/faculty`)
          .then(response => {
            for (const obj of response.data) {
              const faculty = {id: obj.id, name: obj.name}
              this.faculties.push(faculty)
            }
            console.log(this.faculties)
          })
          .catch(error => {
            console.log(error);
          })
    },

    handleSubmit(evt) {
      evt.preventDefault();
      axios
          .put(`http://localhost:3000/departments/${this.id}`, {faculty_id: this.facultyId, name: this.nameOfDepartment, short_name: this.shortNameOfDepartment})
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
      router.push({name: 'departments'})
    }
  },

  beforeMount() {
    this.getRow();
    this.getFacultiesIds();
  }
}

</script>

<style scoped>

</style>