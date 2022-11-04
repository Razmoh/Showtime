<template>
  <NavBlock></NavBlock>

  <div class="searchBar">
    <div class="filter">
      Order by <span> | </span>
      <select>
        <option  selected="selected" value="id">Last Published</option>
      </select>
    </div>

    <div class="main_filter">
      <div class="filter">
        Filter by <span> | </span>
        <select v-model="filter">
          <option value=""></option>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>

      <select v-model="filter_value">
        <option value=""></option>
        <option v-for="(data, index) in getFilterData" :key="index" :value="data">{{ data }}</option>
      </select>

      </div>
      <button @click="search()">Search</button>
    </div>

    <div class="filter">
      Page <span> | </span>
      <select>
        <option value="1">1</option>
      </select>
    </div>
  </div>


  <div class="tickets">
    <TicketBlock  v-for="(concert, index) in getConcerts" :key="index" :concert="concert"></TicketBlock>
  </div>

</template>

<script>
import NavBlock from "@/components/NavBlock.vue";
import TicketBlock from "@/components/TicketBlock.vue";


export default {
  name: "HomeView",
  components: {
    NavBlock,
    TicketBlock,
  },

  data() {
    return {
      text:"",
      filter:"",
      filter_value:""
    }
  },

  methods: {

    search() {
      let filter = "/" + this.filter + "/filter?" + this.filter + "=" + this.filter_value
      this.$store.dispatch('getConcerts', filter)
    }
  },

  computed: {
    getConcerts() {
      return this.$store.getters.getConcerts
    },

    getFilterData() {
      if (this.filter == "name") {
        let groups = this.$store.getters.getGroups;

        let group_names = []
        for (let index = 0; index < groups.length; index++) {
          group_names[index] = groups[index].name;
        }
        return group_names
      }
      else if (this.filter == "type") {
        return this.$store.getters.getTypes
      }
      else {
        return null
      }
    }
  },

  mounted() {
    this.$store.dispatch("getGroups")
    this.$store.dispatch("getConcerts")
  }
};
</script>


<style scoped>


.searchBar {
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 7px 0;
  margin: 0 10%;
  background-color: var(--green2);
  font-size: 12px;
}

.searchBar .main_filter {
  display: flex;
}


.searchBar .filter {
  margin: 0px 7px;
  background-color: var(--white);
  max-width: 450px;
  padding: 7px 15px;
  border-radius: 7px;
  text-align: left;
  color: var(--textBlack);
}

.main_filter input,
.main_filter button{
  padding: 5px ;
  background-color: var(--white);
  border: none;
  border-radius: 7px;
  margin-right: 5px;
  font-size: 0.9em;
}

.main_filter button:hover{
  background-color: var(--bgWhite);
}

.searchBar span {
  margin: 0 10px;
  color: var(--textGrey);
}

.searchBar select {
  background-color: transparent;
  border: none;
  font-size: 12px;
  color: var(--textBlack);
}


.tickets {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 2%;
}

</style>