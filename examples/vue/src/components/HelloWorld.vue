<script setup>
  import { ref } from 'vue'

  import '@progress/kendo-theme-default';
  import '../../../../src/index';

  defineProps({
    msg: String
  })

  const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button is="kendo-button" :text="`Count is: ${count}`" icon="gear" @click="count++"></button>
  </div>
</template>
