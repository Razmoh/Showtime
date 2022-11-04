<template>

  <AdminNavBlock></AdminNavBlock>

  <div class="wrapper">
    <h3>Create</h3>
    <div class="container">
      <table class="create">
        <thead>
          <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Image</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" placeholder="example" ref="name"></td>
            <td>
              <select class="" v-model="type_selected">
                <option v-for="types in this.$store.getters.getTypes" :key="types">{{ types }}</option>
              </select>
            </td>
            <td><input type="text" placeholder="... is the best ..." ref="description"></td>
            <td><input type="text" placeholder="http://somepictureoninternet.com" ref="image"></td>
            
            <td><button class="edit" v-on:click="createGroup()">Create</button></td>
          </tr>
        </tbody>
      </table>
    </div>


    <h3>View / Modify</h3>
    <div class="container">
      <table class="see">
        <thead>
          <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Image</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
          <tr class="test" v-for="(group, index) in this.$store.getters.getGroups" :key="index">
              <td>{{ group._id }}</td>
              <td v-if="this.edit==group._id"><input type="text" id="name" :value="group.name"></td>
              <td v-if="this.edit!=group._id">{{group.name}}</td>

              <td v-if="this.edit==group._id">
              <select class="" id="type">
                <option v-for="types in getTypes" :key="types" :value="types" :selected="types == group.type">{{ types }}</option>
              </select>
              </td>
              <td v-if="this.edit!=group._id">{{group.type}}</td>

              <td v-if="this.edit==group._id"><input type="text" id="description" :value="group.description"></td>
              <td v-if="this.edit!=group._id">{{group.description}}</td>
              <td v-if="this.edit==group._id"><input type="text" id="image" :value="group.image"></td>
              <td v-if="this.edit!=group._id">{{group.image.slice(0, 30)+"..."}}</td>
              <td v-if="this.edit!=group._id">
              <button class="edit" @click="this.edit=group._id">Edit</button>
              <button class="delete" v-on:click="delGroup(group._id)">Delete</button>
              </td>
              <td v-if="this.edit==group._id" >
              <button class="edit editing" v-on:click="editGroup(group._id)">✓</button>
              <button class="delete editing" v-on:click="this.edit=false">X</button>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminNavBlock from "@/components/AdminNavBlock.vue";

export default {
  name: "AdminUserView",
  components: {
    AdminNavBlock
  },

  data() {
    return {
      type_selected : "",
      edit: false,
    };
  },

  computed: {
    getTypes() {
      return this.$store.getters.getTypes
    }
  },

  methods: {

    delGroup(id) {
      console.log(id);
      this.$store.dispatch("delGroup", id);
    },

    createGroup() {
      let group = {"name": this.$refs.name.value,
                "type": this.type_selected,
                "description": this.$refs.description.value,
                "image": this.$refs.image.value}

      this.$store.dispatch("postGroup", group);
    },

    editGroup(id) {
      
      let tab = {"name": document.querySelector('#name').value, 
                  "type": document.querySelector('#type').value, 
                  "description": document.querySelector('#description').value, 
                  "image": document.querySelector('#image').value, 
                }

      this.$store.dispatch("putGroup", {tab, id});
      this.edit = false
    },

  },
  created() {
    if (this.$store.getters.isAdmin == "false") {
      this.$router.push("/");
    }
  },

  mounted() {
    this.$store.dispatch("getGroups");
  }
}
</script>


<style scoped>

.wrapper {
  width: 90%;
  padding: 10px 0;
  margin: 0 auto;
}

h3 {
  text-align: left;
  margin: 10px 0;
}

.container {
  display: inline-block;
  border-radius: 10px;
  overflow: hidden;
  margin: 0px auto 30px auto;
  max-width: 100%;
}

table {
  table-layout: fixed;
  width: 100%;
  margin: -5px auto;
  text-align: left;
  font-weight: 300;
  font-size: 16px;
  border-spacing: 0px 3px;
}

thead {
  background-color: var(--green2);
  color: var(--white);
}

tbody {
  margin-bottom: 10px;
}

tbody tr {
  background-color: var(--white);
  color: var(--black);
  font-size: 14px;
}

.see tbody tr:hover {
  box-shadow: inset 3px 0px 0px 0px var(--green3);
  background-color: transparent;
  color: var(--textBlack);
}

tbody tr:hover button {
  visibility: visible;
}

tr {
  /* display: inline-block; */
  max-height: 50px;
}

th,
td {
  padding: 10px 15px;
  overflow: scroll;
  text-overflow: ellipsis;
}

td:first-child {
  font-size: 0.8em;
}

td:nth-child(n + 6) {
  text-align: right;
}

.create td:nth-child(5) {
  text-align: right;
}

.see button {
    visibility: hidden;
}

button {
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  color: var(--white);
}

.see input {
  background-color: rgb(255, 255, 255);
  padding: 5px;
  border-radius: 5px;
}

.create input {
    background-color: rgb(231, 231, 231);
    padding: 5px;
    border-radius: 5px;
}

label {
  margin: 5px 25px 0 5px;
}

tr input{
  border: none;
  width: 90%;
}

.edit {
  background-color: var(--green3);
}

.edit:hover {
  background-color: var(--green4);
}

.delete {
  background-color: var(--red1);
}

.delete:hover {
  background-color: var(--red2);
}
.radio{
  display: flex;
}
.editing{
  padding: 5px;
  width: 40px;
}
.radio input{
  width: 20px;
}

select {
  background-color: var(--white);
  border-radius: 5px;
  background-color: rgb(231, 231, 231);
  border: none;
  padding: 5px;
}

</style>
