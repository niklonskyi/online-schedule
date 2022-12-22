<template>
  <div class="container py-3">
    <form v-on:submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Id of Department</label>
        <select v-model="groupId">
          <option v-for="group in groups" :value="group.id">
            {{ group.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Name of student</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="email">
      </div>
      <div class="mb-3">
        <label class="form-label">Phone</label>
        <input type="tel" class="form-control" v-model="phone">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";
import {createRouter as $router} from "vue-router/dist/vue-router.mjs";

export default {
  name: "StudentsAdd",
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      groups: [],
      groupId: 1,
    }
  },
  methods: {
    handleSubmit(evt) {
      axios
          .post('http://localhost:3000/students/add', {group_id: this.groupId, name: this.name, email: this.email, phone: this.phone })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error);
          })
    },

    getGroupIds(evt) {
      axios
          .get(`http://localhost:3000/groups`)
          .then(response => {
            for (const obj of response.data) {
              const group = {id: obj.id, name: obj.name}
              this.groups.push(group)
            }
            console.log(this.groups)
          })
          .catch(error => {
            console.log(error);
          })
    }
  },

  beforeMount() {
    this.getGroupIds();
  }
}

</script>

<style scoped>

</style>