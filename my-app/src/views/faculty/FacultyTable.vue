<template>
  <Table value="faculty" :deleteRow="deleteRow" :arrayOfValues='this.arrayOfValues' v-bind:headlines="['#', 'Name', 'Short name']"></Table>
</template>
<script>
import axios from "axios";
import {ref, onMounted, onBeforeMount} from 'vue'
import Table from "../../components/Table.vue";
export default {
  name: "FacultyTable",
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
    getArrayOfValues(evt) {
      axios
          .get(`http://localhost:3000/faculty`)
          .then(response => {
            this.setArrayOfValues(response.data);
          })
          .catch(error => {
            console.log(error);
          })
    },

    deleteRow(evt) {
      const id = (this.arrayOfValues[evt.target.value].id);
      axios
          .delete(`http://localhost:3000/faculty/${id}`)
          .then(response => {
            console.log(response);
            this.$forceUpdate();
          })
          .catch(error => {
            console.log(error);
          })
    },

    setArrayOfValues(newArray) {
      this.arrayOfValues = newArray;
    },
  },

  beforeMount() {
    this.getArrayOfValues();
  },

  updated() {
    this.getArrayOfValues();
  }
}

</script>

<style scoped>

</style>