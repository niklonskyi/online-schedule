<template>
  <Table value="teachers" :arrayOfValues='this.arrayOfValues' v-bind:headlines="['#', 'Name', 'Surname', 'Email', 'Phone']"></Table>
</template>

<script>
import Table from "../../components/Table.vue";
import axios from "axios";

export default {
  name: "TeachersTable",
  data() {
    return {
      arrayOfValues: [],
    }
  },
  components: {
    Table,
  },
  methods: {

    getArrayOfValues(evt) {
      axios
          .get(`http://localhost:3000/teachers`)
          .then(response => {
            this.setArrayOfValues(response.data);
          })
          .catch(error => {
            console.log(error);
          })
    },

    setArrayOfValues(newArray) {
      this.arrayOfValues = newArray
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