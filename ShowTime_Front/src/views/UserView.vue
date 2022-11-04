<template>
  <NavBlock></NavBlock>
  <h1>USER PROFILE</h1>

  <!-- <input type="text" v-model="text">
  <qr-code :text="text" :size="125" color="#111" bg-color="transparent"></qr-code> -->

  <div class="tickets">
    <BigTicketBlock></BigTicketBlock>
  </div>

</template>

<script>
import NavBlock from "@/components/NavBlock.vue";
import BigTicketBlock from "@/components/BigTicketBlock.vue";

export default {
  name: "UserView",
  components: {
    NavBlock,
    BigTicketBlock
  },

  mounted() {
    this.$store.dispatch("getTickets", "/user/"+this.$store.getters.getUser)
  }
};
</script>


<style scoped>

.tickets {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 2%;
}

</style>
