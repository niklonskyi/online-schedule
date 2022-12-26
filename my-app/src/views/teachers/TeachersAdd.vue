<template>
  <div class="container py-3">
    <form v-on:submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Name of teacher</label>
        <input type="text" class="form-control" required maxlength="30" v-model="name">
      </div>
      <div class="mb-3">
        <label class="form-label">Surname of teacher</label>
        <input type="text" class="form-control" required maxlength="30" v-model="surname">
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" required maxlength="30" v-model="email">
      </div>
      <div class="mb-3">
        <label class="form-label">Phone</label>
        <input type="tel" placeholder="(+38)" required v-mask="'(+38)###-###-####'" class="form-control" v-model="phone">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";
import {mask} from 'vue-the-mask';

export default {
  directives: {mask},
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