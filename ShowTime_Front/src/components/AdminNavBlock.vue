<template>

  <nav>
    <router-link to="/" class="logo"></router-link>
    <!-- <input class="search" placeholder="Search"> -->
    <div class="flex">
      <router-link to="/admin/user" class="option">User</router-link>
      <router-link to="/admin/concert" class="option">Concert</router-link>
      <router-link to="/admin/group" class="option">Group</router-link>

      <router-link to="/login/signin" v-if="checkLogged() == false" class="option logout">Login</router-link>
      <div v-on:click="logout()" v-if="checkLogged() == true" class="option logout">Logout</div>

    </div>
  </nav>

</template>

<script>
export default {
  name: 'AddPostBlock',

  methods: {
    logout() {
      localStorage.removeItem('bearer')
      this.$store.dispatch("setAdmin", "false")
      this.$router.push('/login/signin')
    },
    checkLogged() {
      return localStorage.getItem('bearer') != null
    }
  },
}
</script>



<style scoped>

nav {
  z-index: 10;
  top: 0;
  position: sticky;
  font-weight: 300;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  background-color: var(--green3);
  border-radius: 0 0 5px 5px;
  color: var(--white);
}

.flex {
  display: flex;
}

.logo {
  width: 40px;
  background-color: var(--white);
  background-image: url("data:image/png;base64,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");
  background-position: center;
  background-size: cover;
  height: 30px;
  border-radius: 5px;
  filter:grayscale(10)
}

.logo:hover {
  filter:grayscale(0)
}

.search {
  background-color: var(--white);
  border-radius: 5px;
  border: none;
  width: 40vw;
  padding: 5px 20px ;
  margin: 0 20px;
}

.search:focus {
  outline: none;
}

.option {
  padding: 5px 20px ;
  margin: 0 20px;
  border-radius: 5px;
  color: var(--white);
  text-decoration: none;
}

.option:hover {
background-color: rgba(255, 255, 255, 0.2);
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

</style>
