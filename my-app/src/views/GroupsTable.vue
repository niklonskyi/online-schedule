<template>
  <Table value="groups" :deleteRow="deleteRow" :arrayOfValues='this.arrayOfValues' v-bind:headlines="['#', 'Department id', 'Name', 'Course']"></Table>
</template>

<script>
import Table from "../components/Table.vue";
import axios from "axios";

export default {
  name: "GroupsTable",
  data() {
    return {
      departments: [],
      arrayOfValues: [],
    }
  },
  components: {
    Table,
  },
  methods: {
    getDepartmentsIds(evt) {
      axios
          .get(`http://localhost:3000/departments`)
          .then(response => {
            for (const obj of response.data) {
              const department = {id: obj.id, name: obj.name}
              this.departments.push(department)
            }
          })
          .catch(error => {
            console.log(error);
          })
    },

    deleteRow(evt) {
      const id = (this.arrayOfValues[evt.target.value].id);
      axios
          .delete(`http://localhost:3000/groups/${id}`)
          .then(response => {
            console.log(response);
            this.$forceUpdate();
          })
          .catch(error => {
            console.log(error);
          })
    },

    getArrayOfValues(evt) {
      axios
          .get(`http://localhost:3000/groups`)
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
        this.departments.map((department) => {
          if (value.department_id === department.id) {
            value.department_id = department.name;
          }
        })
      })
    },

  },

  beforeMount() {
    this.getArrayOfValues();
    this.getDepartmentsIds();
  },

  updated() {
    this.getArrayOfValues();
    this.getDepartmentsIds();
  }
}
</script>

<style scoped>

</style>