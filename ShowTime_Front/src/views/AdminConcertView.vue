<template>

  <AdminNavBlock></AdminNavBlock>

  <div class="wrapper">
    <h3>Create</h3>
    <div class="container">
      <table class="create">
        <thead>
          <tr>
              <th>Title</th>
              <th>Date</th>
              <th>City</th>
              <th>Price</th>
              <th>Group</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" placeholder="example" ref="title"></td>
            <td><input type="date" placeholder="xx/xx/xx" ref="date"></td>
            <td><input type="text" placeholder="somewhere" ref="city"></td>
            <td><input type="text" placeholder="34" ref="price"></td>
            <td>
              <select class="" v-model="group_id">
                <option v-for="group in getGroups" :key="group._id" :value="group._id">{{ group.name }}</option>
              </select>
            </td>
            <td><button class="edit" v-on:click="createConcert()">Create</button></td>
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
              <th>Title</th>
              <th>Date</th>
              <th>City</th>
              <th>Price</th>
              <th>Group</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
          <tr class="test" v-for="(concert, index) in this.$store.getters.getConcerts" :key="index">
              <td>{{ concert._id }}</td>
              <td v-if="this.edit==concert._id"><input type="text" id="title" :value="concert.title"></td>
              <td v-if="this.edit!=concert._id">{{concert.title}}</td>
              <td v-if="this.edit==concert._id"><input type="text" id="date" :value="concert.date"></td>
              <td v-if="this.edit!=concert._id">{{concert.date}}</td>
              <td v-if="this.edit==concert._id"><input type="text" id="city" :value="concert.city"></td>
              <td v-if="this.edit!=concert._id">{{concert.city}}</td>
              <td v-if="this.edit==concert._id"><input type="text" id="price" :value="concert.price"></td>
              <td v-if="this.edit!=concert._id">{{concert.price}}</td>
              
              <td v-if="this.edit==concert._id">
              <select class="" id="modify_group_id">
                <option v-for="group in getGroups" :key="group._id" :value="group._id" :selected="group._id == concert.group._id">{{ group.name }}</option>
              </select>
              </td>
              <td v-if="this.edit!=concert._id">{{concert.group.name}}</td>

              <td v-if="this.edit!=concert._id">
              <button class="edit" @click="this.edit=concert._id">Edit</button>
              <button class="delete" v-on:click="delConcert(concert._id)">Delete</button>
              </td>
              <td v-if="this.edit==concert._id" >
              <button class="edit editing" v-on:click="editConcert(concert._id)">✓</button>
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
      group_id : "",
      edit: false,
    };
  },

  computed: {
    getGroups() {
      return this.$store.getters.getGroups
    }
  },

  methods: {

    delConcert(id) {
      console.log(id);
      this.$store.dispatch("delConcert", id);
    },

    createConcert() {
      let user = {"title": this.$refs.title.value,
                "date": this.$refs.date.value,
                "city": this.$refs.city.value,
                "group_id": this.group_id,
                "price": this.$refs.price.value}

      this.$store.dispatch("postConcert", user);
    },

    editConcert(id) {
      let tab = {"title": document.querySelector('#title').value, 
                  "date": document.querySelector('#date').value, 
                  "city": document.querySelector('#city').value, 
                  "group_id": document.querySelector('#modify_group_id').value, 
                  "price": document.querySelector('#price').value, 
                }

      this.$store.dispatch("putConcert", {tab, id});
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
    this.$store.dispatch("getConcerts");
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

td:nth-child(n + 7) {
  text-align: right;
}

.create td:nth-child(6) {
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
