<template>
  <div class="mobileHome">
<h1>Mobile app</h1>
  </div>
</template>

<script>
  import {store} from '../store'
  export default {
    name: 'MobileHome',
    data() {
      return {
        store
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>