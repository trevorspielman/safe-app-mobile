<template>
    <div class="transaction">
        <p>Transaction Type: {{transaction.transType}}</p>
        <p>Date: {{transaction.createdAt}}</p>
        <p>Total: ${{transaction.total}}</p>
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
  </style>