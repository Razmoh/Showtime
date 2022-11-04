<template>
  
  <div class="ticket">
    <div class="part">
      <h3>{{ ticket.title }}</h3>
      <img :src="ticket.group.image" onerror="this.onerror=null;this.src='https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png';" alt="">

      <div class="container">
        <div class="info">
          <div class="label">Group</div>
          <div class="content">{{ ticket.group.name }}</div>
        </div>
        <div class="info">
          <div class="label">Type</div>
          <div class="content" >{{ ticket.group.type }}</div>
        </div>
      </div>

      <div class="container">
       {{ ticket.group.description }}
      </div>
    </div>

    <hr>

    <div class="part">
      <div class="container">
        <div class="info">
          <div class="label">Per person</div>
          <div class="content price" >{{ ticket.price }}€</div>
        </div>
        <div class="info">
        </div>
      </div>

      <qr-code class="QR" :text="ticket._id" :size="150" color="#202020" bg-color="transparent"></qr-code>

      <div class="container">
        <div class="info">
          <div class="label">Date</div>
          <div class="content">{{ ticket.date }}</div>
        </div>
        <div class="info">
          <div class="label">Location</div>
          <div class="content">{{ ticket.city }}</div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'PostBlock',
  props: {
  ticket: Object
  },

  data() {
    return {
      text: "6267df039c48d16e1da5eb88"
    }
  },

  methods: {
    buy() {
    },
  },
}
</script>



<style scoped>


.ticket {
  overflow: hidden;
  font-weight: 300;

  display: flex;

  margin: 20px;
  height: 250px;
  padding: 10px;
  background-color: var(--white);
  border-radius: 10px;
}

.part:first-child {
  padding: 10px 20px;
  width: 280px;
}

.part:last-child {
  padding: 10px 20px;
  width: 145px;
}

img {
  width: 280px;
  height: 120px;
  border-radius: 5px;  
  margin-top: 10px;
}

hr {
  border: none;
  border-left: 5px dotted var(--bgWhite);
  color: #fff;
  background-color: #fff;
  height: 100%;
  width: 1px;
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

.QR {
  margin-bottom: 10px;
}

.buy:hover {
    background-color: #5d9aac;
}

</style>
