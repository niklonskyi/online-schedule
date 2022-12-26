<template>
  <div class="container py-3">
    <form v-on:submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Name of Faculty</label>
        <input type="text" class="form-control" required maxlength="30" :placeholder="nameOfDiscipline" v-model="nameOfDiscipline" aria-describedby="Name of Faculty">
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
      nameOfDiscipline: '',
    }
  },
  props: {
    id: String,
  },
  name: "DisciplinesEdit",
  methods: {
    getRow(evt) {
      console.log(this.id)
      axios
          .get(`http://localhost:3000/disciplines/${this.id}`)
          .then(response => {
            console.log(response);
            this.nameOfDiscipline = response.data[0].name;
          })
          .catch(error => {
            console.log(error);
          })
    },

    handleSubmit(evt) {
      evt.preventDefault();
      axios
          .put(`http://localhost:3000/disciplines/${this.id}`, {name: this.nameOfDiscipline})
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
      router.push({name: 'disciplines'})
    }
  },
  created() {
    this.getRow();
  },
}

</script>

<style scoped>

</style>