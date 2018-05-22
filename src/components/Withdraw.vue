<template>
    <div class="withdraw">
      <h1>What would you like to withdraw?</h1>
    </div>
  </template>
  
  <script>
    import { store } from '../store'
    import { router } from '../router'
    export default {
      name: 'Withdraw',
      data() {
        return {
          store,
        }
      },
      methods: {
        logout(){
          this.store.currentSafe = {isConnected: false, totalAmount: 0, username: ''}
        }
      }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>