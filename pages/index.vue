<template>
  <div class="flex flex-col max-h-screen h-screen bg-gradient-to-b from-green-100 to-green-200">
    <NavBar/>
    <div class="flex">
      <SideBar/>
      <div class="flex flex-col w-full">
        <div class="w-full">
          <Inventory/>
        </div>
        <div class="w-full">
          <ActionSpaces/>
          <Blueprints/>
        </div>
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
