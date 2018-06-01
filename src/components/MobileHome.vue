<template>
  <div class="mobileHome">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 homeScreen" v-if="!store.currentSafe.isConnected">
          <h2>Enter name and safe code:</h2>
          <form class="form-group" action="submit" @submit.prevent="connectSafe">
            <div class="row">
              <label for="name">Name:</label>
              <input type="text" placeholder="Name" id="name" v-model="connect.username" required>
            </div>
            <div class="row">
              <label for="safeNumber">Safe Code:</label>
              <input type="number" placeholder="Safe Code" id="safeNumber" v-model="connect.safeNum" required>
            </div>
            <div class="row">
              <button class="btn btn-block btn-success" type="submit">Connect</button>
            </div>
          </form>
        </div>
        <div v-else class="homeScreen col-sm-12">
          <h3>Current Balance: ${{store.currentSafe.totalAmount}}</h3>
          <router-link :to="{name: 'Deposit'}">
            <button class="btn btn-block btn-primary">Make a Deposit</button>
          </router-link>
          <router-link :to="{name: 'Withdraw'}">
            <button class="btn btn-block btn-info">Make a Withdrawal</button>
          </router-link>
          <button class="btn btn-block btn-danger" @click="logout">Log Out</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { store } from '../store'
  import { QBtn } from 'quasar-framework/dist/quasar.mat.esm'
  export default {
    name: 'MobileHome',
    mounted() {
    },
    data() {
      return {
        store,
        connect: {
          username: '',
        },
        currentBalance: 0,
      }
    },
    methods: {
      connectSafe() {
        store.connectSafe(this.connect)
      },
      logout() {
        this.store.currentSafe = { isConnected: false, totalAmount: 0, username: '' }
      },
    },
    computed: {
      currentSafe() {
        return this.$store.currentSafe
      }
    },
    components: {
      QBtn,
    },
    beforeRouteEnter: (to, from, next) => {
      store.getTransactions()
      next()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input {
    border: 1px solid black;
    border-radius: 5px
  }

  .homeScreen {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
  }

  .form-group .row {
    display: flex;
    justify-content: space-between;
    align-content: space-around;
    padding: 5px 30px
  }
</style>