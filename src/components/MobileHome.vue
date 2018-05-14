<template>
  <div class="mobileHome">
    <div v-if="store.currentSafe.isConnected == false">
      <h2>Please enter your name and safe number:</h2>
      <form action="submit" @submit.prevent="connectSafe">
        <input type="text" placeholder="Name" v-model="connect.username">
        <input type="number" placeholder="Safe Number" v-model="connect.safeNum">
        <button class="btn btn-success" type="submit">Connect</button>
      </form>
    </div>
    <div v-else>
      <h2>What would you like to do?</h2>
      <h3>Current Balance: ${{store.currentSafe.totalAmount}}</h3>
      <router-link :to="{name: 'Deposit'}">
        <button class="btn btn-primary">Make a Deposit</button>
      </router-link>
      <router-link :to="{name: 'Withdraw'}">
      <button class="btn btn-info">Make a Withdrawal</button>
    </router-link>
      <button class="btn btn-danger" @click="logout">Log Out</button>
    </div>
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
      },
      logout() {
        this.store.currentSafe = { isConnected: false, totalAmount: 0, username: '' }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>