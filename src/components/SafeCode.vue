<template>
  <div class="safeCode">
    <h2>Transaction Total: ${{store.pendingTransaction.total}}</h2>
    <h2>Safe Unlock Code: {{store.pendingTransaction.transactionId}}</h2>
    <button class="btn btn-danger" @click="cancelTransaction">Cancel</button>
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
        this.$router.push({ name: "MobileHome" })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>