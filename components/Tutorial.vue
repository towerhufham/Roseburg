<script lang="ts">
export default {
  data() {
    return {
      number: 1,
      message: 'Hello World!'
    }
  },
  methods: {
    increment() {
      this.number++;
    }
  }
}
</script>

<template>
  <div>
    <h1>{{ message }} {{ number }}</h1>
    <button @click="increment">up</button>
  </div>
</template>