<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Short Name</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="item in arrayOfFaculties">
          <td v-for="value in item">
            {{value}}
          </td>
        </tr>
      </tbody>
    </table>
    <button><a href="/faculty/add">Add</a></button>
  </div>
  <Table></Table>
</template>

<script>
import axios from "axios";
import {ref, onMounted, onBeforeMount} from 'vue'
import Table from "../components/Table.vue";
export default {
  components: {
    Table,
  },
  data() {
    return {
      arrayOfFaculties: []
    }
  },
  name: "Faculty",
  methods: {
    getArrayOfFaculties(evt) {
      axios
          .get('http://localhost:3000/faculty')
          .then(response => {
            this.setArrayOfFaculties(response.data);
          })
          .catch(error => {
            console.log(error);
          })
    },

    setArrayOfFaculties(newArray) {
      this.arrayOfFaculties = newArray;
    }
  },

  setup(props) {
    },

  beforeMount() {
    this.getArrayOfFaculties();
  },
}

</script>

<style scoped>

</style>