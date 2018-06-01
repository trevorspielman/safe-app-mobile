<template>
  <div class="deposit container">
    <div class="row">
      <div class="col-sm-12 deposit">
        <div>
          <form class="form" action="submit" @submit.prevent="makeDeposit">
            <div class="form-group">
              <div class="row">
                <label for="bills">Bills:</label>
                <input type="number" id="bills" step="1" min="0" v-model.number="deposit.bills" @keyup="calculateTotal(deposit.bills)" required>
              </div>
              <div class="row">
                <label for="coins">Coins:</label>
                <input type="number" id="coins" step=".01" min="0" v-model.number="deposit.coins" @keyup="calculateTotal(deposit.coins)" required>
              </div>
              <div class="row">
                <label for="checks">Checks:</label>
                <input type="number" id="checks" step=".01" min="0" v-model.number="deposit.checks" @keyup="calculateTotal(deposit.checks)" required>
              </div>
            </div>
            <button type="submit" class="btn btn-block btn-success">Make Deposit</button>
          </form>
          <h2 class="mt-3">Total: ${{this.deposit.total}}</h2>
        </div>
        <router-link :to="{name: 'MobileHome'}">
          <button class="btn btn-danger">Cancel</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { store } from '../store'
  import router from '../router'
  import moment from 'moment'
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
          bills: false,
          coins: false,
          checks: false,
          total: 0,
          createdAt: moment().format('MMM Do YY, h:mm a')
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
      calculateTotal(num) {
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
  input {
    border: 1px solid black;
    border-radius: 5px
  }

  .deposit {
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