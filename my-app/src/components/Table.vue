<script>
export default {
  props: ['value'],
  data() {
    return {
    }
  }
}
</script>

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
        <td v-for="itemValue in item">
          {{itemValue}}
        </td>
      </tr>
      </tbody>
    </table>
    <button><a href="/{{value}}/add">Add</a></button>
  </div>
  <Table></Table>
</template>