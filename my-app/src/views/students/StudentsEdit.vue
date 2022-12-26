<template>
  <div class="container py-3">
    <form v-on:submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Id of Department</label>
        <select v-model="groupId" required>
          <option v-for="group in groups" :value="group.id">
            {{ group.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Name of student</label>
        <input type="text" class="form-control" required maxlength="30" v-model="name">
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" required maxlength="30" v-model="email">
      </div>
      <div class="mb-3">
        <label class="form-label">Phone</label>
        <input type="tel" placeholder="(+38)" required maxlength="30" v-mask="'(+38)###-###-####'" class="form-control" v-model="phone">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";
import {mask} from 'vue-the-mask';

export default {
  directives: {mask},
  name: "StudentsEdit",
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      groups: [],
      groupId: 1,
    }
  },
  props: {
    id: String,
  },
  methods: {
    getRow(evt) {
      console.log(this.id)
      axios
          .get(`http://localhost:3000/students/${this.id}`)
          .then(response => {
            console.log(response);
            this.groupId = response.data[0].group_id;
            this.name = response.data[0].name;
            this.email = response.data[0].email;
            this.phone = response.data[0].phone;
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
          })
          .catch(error => {
            console.log(error);
          })
    },

    handleSubmit(evt) {
      evt.preventDefault();
      axios
          .put(`http://localhost:3000/students/${this.id}`, {group_id: this.groupId, name: this.name, phone: this.phone, email: this.email})
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
      router.push({name: 'students'})
    }
  },

  beforeMount() {
    this.getRow();
    this.getGroupIds();
  }
}

</script>

<style scoped>

</style>