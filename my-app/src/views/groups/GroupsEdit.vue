<template>
  <div class="container py-3">
    <form v-on:submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Id of Department</label>
        <select v-model="departmentId">
          <option v-for="department in departments" :value="department.id">
            {{ department.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Name of group</label>
        <input type="text" class="form-control" v-model="nameOfGroup">
      </div>
      <div class="mb-3">
        <label class="form-label">Course</label>
        <input type="number" class="form-control" min="1" max="5" v-model="course">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";

export default {
  name: "GroupsEdit",
  data() {
    return {
      nameOfGroup: '',
      course: '',
      departments: [],
      departmentId: 1,
    }
  },
  props: {
    id: String,
  },
  methods: {
    getRow(evt) {
      console.log(this.id)
      axios
          .get(`http://localhost:3000/groups/${this.id}`)
          .then(response => {
            console.log(response);
            this.departmentId = response.data[0].department_id;
            this.nameOfGroup = response.data[0].name;
            this.course = response.data[0].course;
          })
          .catch(error => {
            console.log(error);
          })
    },

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

    handleSubmit(evt) {
      evt.preventDefault();
      axios
          .put(`http://localhost:3000/groups/${this.id}`, {departments_id: this.departmentId, name: this.nameOfGroup, course: this.course})
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
      router.push({name: 'groups'})
    }
  },

  beforeMount() {
    this.getRow();
    this.getDepartmentsIds();
  }
}

</script>

<style scoped>

</style>