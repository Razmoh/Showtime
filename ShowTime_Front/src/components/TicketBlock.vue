<template>

  <div class="ticket">
    <div class="part">
      <h3>{{concert.title}}</h3>
      <img :src="concert.group.image" onerror="this.onerror=null;this.src='https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png';" alt="">

      <div class="container">
        <div class="info">
          <div class="label">Group</div>
          <div class="content">{{concert.group.name}}</div>
        </div>
        <div class="info">
          <div class="label">Type</div>
          <div class="content">{{concert.group.type}}</div>
        </div>
      </div>

      <div class="container"> {{concert.group.description}} </div>
    </div>


    <div class="part">
      <hr>
      <div class="container">
        <div class="info">
          <div class="label">Date</div>
          <div class="content"> {{concert.date}} </div>
        </div>
        <div class="info">
          <div class="label">Location</div>
          <div class="content"> {{concert.city}} </div>
        </div>
      </div>

      <div class="container last">
        <div class="info">
          <div class="label">Per person</div>
          <div class="content price"> {{concert.price}}$</div>
        </div>
        <div class="info">
          <button class="buy" v-on:click="buy(concert)">buy</button>
        </div>
      </div>
    </div>
  
  </div>

</template>

<script>
export default {
  name: 'PostBlock',
  props: {
    concert: Object,
  },

  methods: {
    buy(concert) {
      if (this.$store.getters.getUser != "") {
        console.log(concert);
        this.$store.dispatch("postTicket", concert)
      } else {
        this.$store.dispatch('notification', "Please login to buy a Ticket")
      }
    },
  },

}
</script>



<style scoped>

.ticket {
  overflow: hidden;
  font-weight: 300;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin: 20px;
  width: 230px;
  height: 350px;
  padding: 10px;
  background-color: var(--white);
  border-radius: 10px;
}

.part {
  display: flex;
  flex-direction: column;
}

img {
  width: 230px;
  height: 120px;
  border-radius: 5px;  
  margin: 15px 0;
}

hr {
  border: none;
  border-top: 5px dotted var(--bgWhite);
  color: #fff;
  background-color: #fff;
  height: 1px;
  width: 100%;
  margin-bottom: 10px;
}

.container {
  display: flex;
  justify-content: space-between ;
  text-align: left;
  font-size: 10px;
  margin-bottom: 10px;
  font-weight: 500;
}

.last {
  margin-bottom: 0;
}

.label {
  font-size: 8px;
  color: #606060;
}
.info {
  font-size: 12px;
  font-weight: 700;
}

.info:last-child {
  text-align: right;
}

.price {
  font-size: 16px;
}

.buy {
  margin-top: 7px;
  padding: 3px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--green1);
  color: white;
}

.buy:hover {
    background-color: var(--green2);
}

</style>
