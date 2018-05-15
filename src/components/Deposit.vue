<template>
  <div class="deposit">
    <div v-if="this.deposit.transactionId == 0">
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
      <button class="btn btn-danger" @click="logout">Cancel</button>
      <h2>Total Amount Depositing: ${{this.deposit.total}}</h2>
    </div>
    <div v-else>
      <h2>Total Deposit: ${{this.deposit.total}}</h2>
      <h2>Safe Unlock Code: {{this.deposit.transactionId}}</h2>
    </div>
  </div>
</template>

<script>
  import { store } from '../store'
  export default {
    name: 'deposit',
    data() {
      return {
        store,
        deposit: {
          transactionId: 0,
          transType: "deposit",
          safeId: store.currentSafeId,
          bills: 0,
          coins: 0,
          checks: 0,
          total: 0,
          date: Date.now()
        },
      }
    },
    methods: {
      makeDeposit() {
        this.deposit.transactionId = Math.floor(Math.random() * 999999) + 100000
        store.makeDeposit(this.deposit)
        //create unlockCode 
        let unlockCode = ((this.deposit.transactionId.toString()) + "-" + (store.currentSafeId.toString()))
        store.unlockCode(unlockCode)
        console.log(this.deposit)
      },
      calculateTotal() {
        let bills = this.deposit.bills
        let coins = this.deposit.coins
        let checks = this.deposit.checks
        this.deposit.total = (bills + coins + checks).toFixed(2)
      },
      logout() {
        this.store.currentSafe = { isConnected: false, totalAmount: 0, username: '' }
      }
    },
    watch: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>