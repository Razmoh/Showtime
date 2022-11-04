<template>

  <AdminNavBlock></AdminNavBlock>

  <div class="wrapper">
    <h3>Create</h3>
    <div class="container">
      <table class="create">
        <thead>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>City</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" placeholder="example" ref="name"></td>
            <td><input type="text" placeholder="example@gmail.co" ref="email"></td>
            <td><input type="password" ref="password"></td>
            <td><input type="text" placeholder="anywhere" ref="city"></td>
            <td><button class="edit" v-on:click="createUser()">Create</button></td>
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
              <th>Email</th>
              <th>City</th>
              <th>Admin</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
          <tr class="test" v-for="(user, index) in this.$store.getters.getUsers" :key="index">
              <td>{{ user._id }}</td>
              <td v-if="this.edit==user._id"><input type="text" id="name" :value="user.name"></td>
              <td v-if="this.edit!=user._id">{{user.name}}</td>
              <td v-if="this.edit==user._id"><input type="text" id="email" :value="user.email"></td>
              <td v-if="this.edit!=user._id">{{user.email}}</td>
              <td v-if="this.edit==user._id"><input type="text" id="city" :value="user.city"></td>
              <td v-if="this.edit!=user._id">{{user.city}}</td>
              <td v-if="this.edit!=user._id">{{ user.admin }}</td>
              <td v-if="this.edit==user._id" class="radio">
                <input type="radio" name="isAdmin" id="admin" :checked="user.admin=='true'" @click="setAdmin('true')">
                <label for="true" >true</label>
                <input type="radio" name="isAdmin" :checked="user.admin=='false'" @click="setAdmin('false')">
                <label for="true" >false</label>
              </td>
              <td v-if="this.edit!=user._id">
              <button class="edit" @click="editMode(user._id, user.admin)">Edit</button>
              <button class="delete" v-on:click="delUser(user._id)">Delete</button>
              </td>
              <td v-if="this.edit==user._id" >
              <button class="edit editing" v-on:click="editUser(user._id)">✓</button>
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
      edit: false,
      checkAdmin: "",
    };
  },

  methods: {

    editMode(id, admin) {
      this.edit = id
      this.checkAdmin = admin
    },

    setAdmin(state) {
      this.checkAdmin = state
    },

    delUser(id) {
      this.$store.dispatch("delUser", id);
    },

    createUser() {
      let user = {"name": this.$refs.name.value,
                "email": this.$refs.email.value,
                "city": this.$refs.city.value,
                "password": this.$refs.password.value}

      this.$store.dispatch("postUser", user);
    },

    editUser(id) {
      console.log("ref: ", document.querySelector('#admin').value);

      let tab = {"name": document.querySelector('#name').value, 
                  "email": document.querySelector('#email').value, 
                  "city": document.querySelector('#city').value, 
                  "admin": this.checkAdmin,
                  "roles": [this.checkAdmin]
                }

      this.$store.dispatch("putUser", {tab, id});
      this.edit = false
    },

  },
  
  created() {
    if (this.$store.getters.isAdmin == "false") {
      this.$router.push("/");
    }
  },

  mounted() {
    this.$store.dispatch("getUsers");
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

th,
td {
  padding: 10px 15px;
  overflow: auto;
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

</style>
