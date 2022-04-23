<template>
  <div class="max-h-screen h-screen overflow-hidden bg-gradient-to-b from-green-100 to-green-200">
    <NavBar/>
    <div class="flex">
      <SideBar/>
      <div class="w-full">
        <Inventory/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Inventory from '~/components/Inventory.vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>
