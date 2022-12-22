<template>
  <div class="container py-3">
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
        <tr>
          <th scope="col" v-for="headline in headlines">
            {{headline}}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in arrayOfValues">
          <td v-for="itemValue in item">
            {{ itemValue }}
          </td>
          <td scope="col"><button :value=index v-on:click="deleteRow($event)">Delete</button></td>
          <td scope="col"><button :value=index v-on:click="editRow($event)">Edit</button></td>
        </tr>
        </tbody>
      </table>
      <button><a :href="'/' + value + '/add'">Add</a></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  data() {
    return {
    }
  },
  props: [
    'deleteRow',
    'headlines',
    'arrayOfValues',
    'value',
    ],
  name: "Table",
  methods: {
    editRow(evt) {
      const id = (this.arrayOfValues[evt.target.value].id);
      router.push({ name: `${this.value}-edit`, params: { id: id } })
    }
  },
}

</script>

<style scoped>

</style>