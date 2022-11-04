<template>
  <div class="light">
        <div class="notification" v-if="checkNotif() == true">{{this.$store.getters.getNotif}}</div>
        <router-view/>
  </div>

</template>

<script>

export default {
  name: 'App',

  methods: {
    checkNotif() {
      if (this.$store.getters.getNotif == 'null') {
        return false
      }else {
        return true
      }
    }
  },

  mounted() {
    if( localStorage.getItem('bearer') != null )
    {
      this.$store.dispatch('getBearer')
    }
  },
}

</script>

<style>

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}



.light{
  background-color: var(--bgWhite);
  min-height: 100vh;

  --primary-color: #333;
  /* --green1: #b3cde0;
  --green2: #6497b1;
  --green3: #005b96;
  --green4: #03396c; */
  --green1: #b5ca8d;
  --green2: #8bb174;
  --green3: #426b69;
  --green4: #2a4849;
  --red1: #b14537;
  --red2: #8f352a;
  --grey1: #f4f4f4;
  --grey2: #e4e4e4;

  --white: #fff;
  --black: #000;
  --textBlack: #202020;
  --textGrey: #b4b4b4;
  --textPlaceholder: rgba(42, 72, 73, 0.5);

  --bgWhite: rgb(241, 241, 241);
  --shadowBlack: rgba(0, 0, 0, 0.05);
}

.dark{
  background-color: var(--bgWhite);
  min-height: 100vh;

  --primary-color: #ccc;
  --green1: #ca8d8d;
  --green2: #c97373;
  --green3: #ca8d8d;
  --green4: #492a2a;
  --red1: #b14537;
  --red2: #8f352a;
  --grey1: #f4f4f4;
  --grey2: #e4e4e4;

  --white: rgb(30, 30, 30);
  --black: rgb(255, 255, 255);
  --textBlack: #e0e0e0;
  --textGrey: #5b5b5b;
  --textPlaceholder: rgba(255, 255, 255, 0.5);

  --bgWhite: rgb(15, 15, 15);
  --shadowBlack: rgba(255, 255, 255, 0);
}

.notification {
  z-index: 100;
  position: sticky;
  float: right;
  top: 60px;
  margin: -25px 20px 0 -155px;
  width: 100px;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 0.8em;
  border: solid 0.5px rgb(230, 230, 230);
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  color: var(--black);
}

</style>
