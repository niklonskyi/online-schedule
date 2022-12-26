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
  name: "TeachersEdit",
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      phone: '',
    }
  },
  props: {
    id: String,
  },
  methods: {
    getRow(evt) {
      console.log(this.id)
      axios
          .get(`http://localhost:3000/teachers/${this.id}`)
          .then(response => {
            console.log(response);
            this.surname = response.data[0].surname;
            this.name = response.data[0].name;
            this.email = response.data[0].email;
            this.phone = response.data[0].phone;
          })
          .catch(error => {
            console.log(error);
          })
    },

    handleSubmit(evt) {
      evt.preventDefault();
      axios
          .put(`http://localhost:3000/teachers/${this.id}`, {name: this.name, surname: this.surname, phone: this.phone, email: this.email})
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
      router.push({name: 'teachers'})
    }
  },

  beforeMount() {
    this.getRow();
  }
}

</script>

<style scoped>

</style>