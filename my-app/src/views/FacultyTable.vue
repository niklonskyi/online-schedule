<template>
  <Table value="faculty" :arrayOfValues='this.arrayOfValues' v-bind:headlines="['#', 'Name', 'Short name']"></Table>
</template>
<script>
import axios from "axios";
import {ref, onMounted, onBeforeMount} from 'vue'
import Table from "../components/Table.vue";
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