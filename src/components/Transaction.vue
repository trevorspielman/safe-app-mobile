<template>
  <div class="transaction">
    <p><strong>Date:</strong> {{transaction.createdAt}}</p>
    <p><strong>Deposit Total:</strong> ${{transaction.total}}</p>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="transactionWithdraw" :value="transaction.transactionId" @click="addWithdraw(transaction)">
      <label class="form-check-label" for="transactionWithdraw">
        Withdraw
      </label>
    </div>
  </div>
</template>

<script>
  import { store } from '../store'
  import { router } from '../router'
  export default {
    name: 'Transaction',
    props: ['transaction'],
    mounted() {
    },
    data() {
      return {
        store,
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .transaction{
    padding: 10px 10px;
    border-bottom: 1px solid black;
    text-align: left;
  }
</style>