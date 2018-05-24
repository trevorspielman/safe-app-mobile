<template>
  <div class="withdraw">
      <h1>What would you like to withdraw?</h1>
      <div v-for="transaction in store.safeTransactions">
        <transaction :transaction="transaction"></transaction>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="transactionWithdraw" :value="transaction.transactionId" @click="addWithdraw(transaction)">
          <label class="form-check-label" for="transactionWithdraw">
            Withdraw
          </label>
        </div>
      </div>
      <button class="btn btn-primary" @click="makeWithdraw">Withdraw</button>
      <router-link :to="{name: 'MobileHome'}">
        <button class="btn btn-danger">Cancel</button>
      </router-link>
  </div>
</template>

<script>
  import { store } from '../store'
  import router from '../router'
  import transaction from './Transaction'
  import moment from 'moment'
  export default {
    name: 'Withdraw',
    mounted() {
      this.getTransactions()
    },
    data() {
      return {
        store,
        router,
        withdraw: {
          removedDeposits: [],
          transactionId: 0,
          transType: "Withdrawal",
          createdBy: store.currentSafe.username,
          safeId: store.currentSafeId,
          total: 0,
          createdAt: moment().format('dddd, MMM Do YY, h:mm a')
        }
      }
    },
    methods: {
      getTransactions() {
        store.getTransactions()
      },
      addWithdraw(transaciton) {
        if (!this.withdraw.removedDeposits.includes(transaciton.transactionId)) {
          this.withdraw.removedDeposits.push(transaciton.transactionId)
          this.withdraw.total += transaciton.total
        }
        else {
          for (let i = 0; i < this.withdraw.removedDeposits.length; i++) {
            const id = this.withdraw.removedDeposits[i];
            if (id == transaciton.transactionId) {
              this.withdraw.removedDeposits.splice(i, 1)
              this.withdraw.total -= transaciton.total
            }
          }
        }
      },
      makeWithdraw() {
        //adjusting the object properties for the withdraw
        this.withdraw.transactionId = Math.floor(Math.random() * (999999 - 100000)) + 100000
        store.pendingTransaction = this.withdraw
        //create unlockCode for the withdraw
        let unlockCode = ((this.withdraw.transactionId.toString()) + "-" + (store.currentSafeId.toString()))
        store.unlockCode(unlockCode)
        this.$router.push({ name: "SafeCode" })
      },
      cancelTransaction() {
        store.cancelTransaction(store.pendingTransaction.transactionId)
      },
      logout() {
        this.store.currentSafe = { isConnected: false, totalAmount: 0, username: '' }
      }
    },
    components: {
      transaction
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>