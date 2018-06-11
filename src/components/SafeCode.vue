<template>
  <div class="safeCode container">
    <div class="row">
      <div class="col-sm-12 safeCode">
        <h2>Transaction Total: ${{store.pendingTransaction.total}}</h2>
        <h2>Safe Unlock Code: {{store.pendingTransaction.transactionId}}</h2>
        <button v-if="!store.transactionProcessing" class="btn btn-block btn-danger" @click="cancelTransaction">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { store } from '../store'
  import { router } from '../router'
  export default {
    name: 'SafeCode',
    mounted() {
    },
    data() {
      return {
        store,
      }
    },
    methods: {
      cancelTransaction() {
        store.cancelTransaction(store.pendingTransaction.transactionId)
        store.pendingTransaction = {}
        this.$router.push({ name: "MobileHome" })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .safeCode {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
  }
</style>