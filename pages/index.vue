<template>
  <div class="max-h-screen h-screen overflow-hidden bg-gradient-to-b from-green-100 to-green-200">
    <NavBar/>
    <SideBar/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>
