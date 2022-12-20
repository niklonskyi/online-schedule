<template>
  <Table value="departments" :arrayOfValues='this.arrayOfValues' v-bind:headlines="['#', 'Faculty id', 'Name', 'Short name']"></Table>
</template>

<script>
import Table from "../components/Table.vue";
import axios from "axios";

export default {
  name: "DepartmentTable",
  data() {
    return {
      faculties: [],
      arrayOfValues: [],
    }
  },
  components: {
    Table,
  },
  methods: {
    getFacultiesIds(evt) {
      axios
          .get(`http://localhost:3000/faculty`)
          .then(response => {
            for (const obj of response.data) {
              const faculty = {id: obj.id, name: obj.name}
              this.faculties.push(faculty)
            }
          })
          .catch(error => {
            console.log(error);
          })
    },

    getArrayOfValues(evt) {
      axios
          .get(`http://localhost:3000/departments`)
          .then(response => {
            this.setArrayOfValues(response.data);
          })
          .catch(error => {
            console.log(error);
          })
    },

    setArrayOfValues(newArray) {
      this.arrayOfValues = newArray;
      this.arrayOfValues.map((value) => {
        this.faculties.map((faculty) => {
          if (value.faculty_id === faculty.id) {
            value.faculty_id = faculty.name;
          }
        })
      })
    },

  },

  beforeMount() {
    this.getArrayOfValues();
    this.getFacultiesIds();
  },

  updated() {
    this.getArrayOfValues();
    this.getFacultiesIds();
  }
}
</script>

<style scoped>

</style>