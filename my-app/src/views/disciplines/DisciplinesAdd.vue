<template>
  <div className="container py-3">
    <form v-on:submit="handleSubmit">
      <div className="mb-3">
        <label className="form-label">Name of Discipline</label>
        <input type="text" className="form-control" required maxlength="30" v-model="nameOfDiscipline" aria-describedby="Name of Faculty">
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";
import {createRouter as $router} from "vue-router/dist/vue-router.mjs";

export default {
  name: "DisciplinesAdd",
  data() {
    return {
      nameOfDiscipline: '',
    }
  },
  methods: {
    handleSubmit(evt) {
      axios
          .post('http://localhost:3000/disciplines/add', {name: this.nameOfDiscipline})
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