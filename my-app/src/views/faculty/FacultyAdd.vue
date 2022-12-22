<template>
  <div class="container py-3">
    <form v-on:submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Name of Faculty</label>
        <input type="text" class="form-control" v-model="nameOfFaculty" aria-describedby="Name of Faculty">
      </div>
      <div class="mb-3">
        <label class="form-label">Short name of faculty</label>
        <input type="text" class="form-control" v-model="shortNameOfFaculty">
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
  name: "FacultyAdd",
  data() {
    return {
      nameOfFaculty: '',
      shortNameOfFaculty: '',
    }
  },
  methods: {
    handleSubmit(evt) {
      axios
          .post('http://localhost:3000/faculty/adds', {name: this.nameOfFaculty, short_name: this.shortNameOfFaculty})
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
    },
  },
}

</script>

<style scoped>

</style>