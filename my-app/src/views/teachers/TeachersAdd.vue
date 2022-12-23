<template>
  <div class="container py-3">
    <form v-on:submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Name of teacher</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="mb-3">
        <label class="form-label">Surname of teacher</label>
        <input type="text" class="form-control" v-model="surname">
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="email">
      </div>
      <div class="mb-3">
        <label class="form-label">Phone</label>
        <input type="tel" class="form-control" v-model="phone">
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
  name: "StudentsAdd",
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      surname: '',
    }
  },
  methods: {
    handleSubmit(evt) {
      axios
          .post('http://localhost:3000/teachers/add', {name: this.name, surname: this.surname, email: this.email, phone: this.phone })
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