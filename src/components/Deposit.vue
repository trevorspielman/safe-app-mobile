<template>
    <div class="deposit">
      <h1>What would you like to deposit?</h1>
      <form action="submit" @submit.prevent="makeDeposit">
        <input type="number" placeholder="Bills" step="1" min="0" v-model="deposit.bills">
        <input type="number" placeholder="Coins" step=".01" min="0" v-model="deposit.coins">
        <input type="number" placeholder="Check Total" step=".01" min="0" v-model="deposit.checks">
        <button type="submit" class="btn btn-success">Make Deposit</button>
      </form>
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
            bills: 0,
            coins: 0,
            checks: 0,
            totalDeposit: 0,
            date: Date.now()
          }
        }
      },
      methods: {
        makeDeposit(){
          this.deposit.transactionId = Math.floor(Math.random() * 999999) + 100000
          this.deposit.totalDeposit = (this.deposit.bills + this.deposit.coins + this.deposit.checks).toFixed(2)
          console.log(this.deposit)
        },
        logout(){
          this.store.currentSafe = {isConnected: false, totalAmount: 0, username: ''}
        }
      }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>