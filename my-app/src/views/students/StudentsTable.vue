<template>
  <Table value="students" :arrayOfValues='this.arrayOfValues' v-bind:headlines="['#', 'Group id', 'Name', 'Email', 'Phone']"></Table>
</template>

<script>
import Table from "../../components/Table.vue";
import axios from "axios";

export default {
  name: "StudentsTable",
  data() {
    return {
      groups: [],
      arrayOfValues: [],
    }
  },
  components: {
    Table,
  },
  methods: {
    getGroupsIds(evt) {
      axios
          .get(`http://localhost:3000/groups`)
          .then(response => {
            for (const obj of response.data) {
              const group = {id: obj.id, name: obj.name}
              this.groups.push(group)
            }
          })
          .catch(error => {
            console.log(error);
          })
    },

    getArrayOfValues(evt) {
      axios
          .get(`http://localhost:3000/students`)
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
        this.groups.map((group) => {
          if (value.group_id === group.id) {
            value.group_id = group.name;
          }
        })
      })
    },

  },

  beforeMount() {
    this.getArrayOfValues();
    this.getGroupsIds();
  },

  updated() {
    this.getArrayOfValues();
    this.getGroupsIds();
  }
}
</script>

<style scoped>

</style>