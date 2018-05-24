<template>
  <div class="deposit">
      <h1>What would you like to deposit?</h1>
      <form action="submit" @submit.prevent="makeDeposit">
        <label for="bills">Bills:</label>
        <input type="number" placeholder="Bills" id="bills" step="1" min="0" v-model.number="deposit.bills" @keyup="calculateTotal">
        <label for="coins">Coins:</label>
        <input type="number" placeholder="Coins" id="coins" step=".01" min="0" v-model.number="deposit.coins" @keyup="calculateTotal">
        <label for="checks">Checks:</label>
        <input type="number" placeholder="Check Total" id="checks" step=".01" min="0" v-model.number="deposit.checks" @keyup="calculateTotal">
        <button type="submit" class="btn btn-success">Make Deposit</button>
      </form>
      <router-link :to="{name: 'MobileHome'}">
        <button class="btn btn-danger">Cancel</button>
      </router-link>
      <h2>Total Amount Depositing: ${{this.deposit.total}}</h2>
  </div>
</template>

<script>
  import { store } from '../store'
  import router from '../router'
  import  moment  from 'moment'
  export default {
    name: 'Deposit',
    data() {
      return {
        store,
        router,
        deposit: {
          transactionId: 0,
          transType: "Deposit",
          createdBy: store.currentSafe.username,
          safeId: store.currentSafeId,
          bills: 0,
          coins: 0,
          checks: 0,
          total: 0,
          createdAt: moment().format('dddd, MMM Do YY, h:mm a')
        },
      }
    },
    methods: {
      makeDeposit() {
        this.deposit.transactionId = Math.floor(Math.random() * (999999 - 100000)) + 100000
        store.pendingTransaction = this.deposit
        //create unlockCode for the deposit
        let unlockCode = ((this.deposit.transactionId.toString()) + "-" + (store.currentSafeId.toString()))
        store.unlockCode(unlockCode)
        this.$router.push({ name: "SafeCode" })
      },
      calculateTotal() {
        let bills = this.deposit.bills
        let coins = this.deposit.coins
        let checks = this.deposit.checks
        this.deposit.total = Number((bills + coins + checks).toFixed(2))
      },
      cancelTransaction() {
        this.deposit.transactionId = 0
        store.cancelTransaction(this.deposit.transactionId)
      },
      logout() {
        this.store.currentSafe = { isConnected: false, totalAmount: 0, username: '' }
        this.$router.push({ name: "MobileHome" })
      }
    },
    computed: {
      currentSafe() {
        return this.$store.currentSafe
      }
    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>