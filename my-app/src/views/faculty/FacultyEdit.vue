<template>
  <div class="container py-3">
    <form v-on:submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Name of Faculty</label>
        <input type="text" class="form-control" required maxlength="30" :placeholder="nameOfFaculty" v-model="nameOfFaculty" aria-describedby="Name of Faculty">
      </div>
      <div class="mb-3">
        <label class="form-label">Short name of faculty</label>
        <input type="text" class="form-control" required maxlength="30" :placeholder="shortNameOfFaculty" v-model="shortNameOfFaculty">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";

export default {
  data() {
    return {
      arrayOfValues: [],
      nameOfFaculty: '',
      shortNameOfFaculty: '',
    }
  },
  props: {
    id: String,
  },
  name: "FacultyEdit",
  methods: {
    getRow(evt) {
      console.log(this.id)
      axios
          .get(`http://localhost:3000/faculty/${this.id}`)
          .then(response => {
            console.log(response);
            this.nameOfFaculty = response.data[0].name;
            this.shortNameOfFaculty = response.data[0].short_name
          })
          .catch(error => {
            console.log(error);
          })
    },

    handleSubmit(evt) {
      evt.preventDefault();
      axios
          .put(`http://localhost:3000/faculty/${this.id}`, {name: this.nameOfFaculty, short_name: this.shortNameOfFaculty})
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
      router.push({name: 'faculty'})
    }
  },
    created() {
      this.getRow();
    },
}

</script>

<style scoped>

</style>