<template>
  <div class="withdraw container">
    <div class="row">
      <div class="col-sm-12">
        <h1>Safe Transactions</h1>
        <div>
          <div class="transactions" v-for="transaction in store.safeTransactions" v-if="!transaction.withdrawn && transaction.transType == 'Deposit'">
            <p>
              <strong>Date:</strong> {{transaction.createdAt}}</p>
            <p>
              <strong>Deposit Total:</strong> ${{transaction.total}}</p>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="transactionWithdraw" :value="transaction.transactionId" @click="addWithdraw(transaction)">
              <label class="form-check-label" for="transactionWithdraw">
                Withdraw
              </label>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <button class="btn btn-block btn-primary" @click="makeWithdraw">Withdraw</button>
          <router-link :to="{name: 'MobileHome'}">
            <button class="btn btn-danger mt-4">Cancel</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { store } from '../store'
  import router from '../router'
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
          createdAt: moment().format('MMM Do YY, h:mm a')
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .withdraw {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
  }

  .transactions {
    padding: 10px 10px;
    border-bottom: 1px solid black;
    text-align: left;
  }
</style>