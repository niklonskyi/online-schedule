<template>
  <Table value="schedule" :deleteRow="deleteRow" :arrayOfValues='this.arrayOfValues' v-bind:headlines="['#', 'Name', 'Teacher id', 'Discipline id', 'Time', 'Classroom', 'Group id']"></Table>
</template>
<script>
import axios from "axios";
import {ref, onMounted, onBeforeMount} from 'vue'
import Table from "../../components/Table.vue";
export default {
  name: "ScheduleTable",
  data() {
    return {
      arrayOfValues: [],
      disciplines: [],
      teachers: [],
      groups: [],
    }
  },
  components: {
    Table,
  },
  methods: {
    getArrayOfValues(evt) {
      axios
          .get(`http://localhost:3000/schedule`)
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
          .delete(`http://localhost:3000/schedule/${id}`)
          .then(response => {
            console.log(response);
            this.$forceUpdate();
          })
          .catch(error => {
            console.log(error);
          })
    },

    getDisciplineIds(evt) {
      axios
          .get(`http://localhost:3000/disciplines`)
          .then(response => {
            for (const obj of response.data) {
              const discipline = {id: obj.id, name: obj.name}
              this.disciplines.push(discipline)
            }
          })
          .catch(error => {
            console.log(error);
          })
    },

    getTeachersIds(evt) {
      axios
          .get(`http://localhost:3000/teachers`)
          .then(response => {
            for (const obj of response.data) {
              const teacher = {id: obj.id, name: (obj.name + ' ' + obj.surname)}
              this.teachers.push(teacher)
            }
          })
          .catch(error => {
            console.log(error);
          })
    },

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

    setArrayOfValues(newArray) {
      this.arrayOfValues = newArray;
      this.arrayOfValues.map((value) => {
        this.disciplines.map((discipline) => {
          if (value.discipline_id === discipline.id) {
            value.discipline_id = discipline.name;
          }
        })
        this.teachers.map((teacher) => {
          if (value.teacher_id === teacher.id) {
            value.teacher_id = teacher.name;
          }
        })
        this.groups.map((group) => {
          if (value.group_id === group.id) {
            value.group_id = group.name;
          }
        })
      })
    },
  },

  beforeMount() {
    this.getGroupsIds();
    this.getTeachersIds();
    this.getDisciplineIds();
    this.getArrayOfValues();
  },

  updated() {
    this.getGroupsIds();
    this.getTeachersIds();
    this.getDisciplineIds();
    this.getArrayOfValues();
  }
}

</script>

<style scoped>

</style>