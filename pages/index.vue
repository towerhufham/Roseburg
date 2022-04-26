<template>
  <div class="flex flex-col max-h-screen h-screen bg-gradient-to-b from-green-100 to-green-200">
    <NavBar/>
    <div class="flex flex-grow">
      <SideBar/>
      <div class="w-full flex flex-col">
        <Inventory/>
        <BuiltSpaces/>
        <Blueprints/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>
