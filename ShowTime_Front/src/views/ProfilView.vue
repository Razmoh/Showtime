<template>
  <nav-block />
  <div class="wrapper">
    <h3>About me</h3>
    <div class="tableau">
      <table class="see">
        <tbody>
          <tr class="test">
            <td v-if="this.edit == $store.state.user_id">
              <input type="text" id="name" :value="$store.state.user.name" />
            </td>
            <td v-if="this.edit != $store.state.user_id">
              {{ $store.state.user.name }}
            </td>
            <td v-if="this.edit == $store.state.user_id">
              <input type="text" id="email" :value="$store.state.user.email" />
            </td>
            <td v-if="this.edit != $store.state.user_id">
              {{ $store.state.user.email }}
            </td>
            <td v-if="this.edit == $store.state.user_id">
              <input type="text" id="city" :value="$store.state.user.city" />
            </td>
            <td v-if="this.edit != $store.state.user_id">
              {{ $store.state.user.city }}
            </td>
            <td v-if="this.edit != $store.state.user_id">
              <button class="edit" @click="this.edit = $store.state.user._id">
                Edit
              </button>
            </td>
            <td v-if="this.edit == $store.state.user._id">
              <button
                class="edit editing"
                v-on:click="editUser($store.state.user._id)"
              >
                ✓
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <h3>My tickets</h3>
  </div>
  <br />
  <div class="tickets">
    <big-ticket-block
      v-for="(ticket, index) in $store.getters.getTickets"
      :key="index"
      :ticket="ticket"
    />
  </div>
</template>

<script>
import NavBlock from "@/components/NavBlock.vue";
import BigTicketBlock from "@/components/BigTicketBlock.vue";
export default {
  name: "ProfilView",
  components: {
    NavBlock,
    BigTicketBlock,
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    editUser(id) {
      let tab = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        city: document.querySelector("#city").value,
      };
      this.$store.dispatch("putUser", { tab, id });
      this.$store.dispatch("getUser", "/user/" + this.$store.getters.getUser);
      this.edit = false;
    },
  },
  mounted() {
    this.$store.dispatch("getTickets", "/user/" + this.$store.getters.getUser);
    this.$store.dispatch("getUser", "/user/" + this.$store.getters.getUser);
  },
};
</script>

<style scoped>
.tickets {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 2%;
}

.tableau {
  border-radius: 10px;
  overflow: hidden;
}
.wrapper {
  width: 95%;
  padding: 6px 0;
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
  width: 100%;
  margin: -5px auto;
  text-align: left;
  font-weight: 300;
  font-size: 16px;
  border-spacing: 0px 3px;
  border-radius: 20px;
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

th,
td {
  padding: 10px 15px;
  overflow: auto;
  text-overflow: ellipsis;
}


td:nth-child(4) {
  text-align: right;
  }


button {
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  color: var(--white);
}

.see input {
  background-color: rgb(240, 240, 240);
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

tr input {
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
.radio {
  display: flex;
}
.editing {
  padding: 5px;
  width: 40px;
}
.radio input {
  width: 20px;
}

</style>
