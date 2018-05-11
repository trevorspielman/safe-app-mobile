<template>
  <div class="mobileHome">
    <h2>Please enter your name and safe number:</h2>
    <form action="submit" @submit.prevent="connectSafe">
      <input type="text" placeholder="Name" v-model="connect.username">
      <input type="text" placeholder="Safe Number" v-model="connect.safeNum">
      <button class="btn btn-success" type="submit">Connect</button>
    </form>
  </div>
</template>

<script>
  import { store } from '../store'
  export default {
    name: 'MobileHome',
    data() {
      return {
        store,
        connect: {
          username: '',
          safeNum: 0
        }
      }
    },
    methods: {
      connectSafe() {
        store.connectSafe(this.connect)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>