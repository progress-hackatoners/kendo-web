<script setup>
  import { ref } from 'vue'

  import '@progress/kendo-theme-default';
  import '../../../../src/dropdownlist';

  defineProps({
    msg: String
  })

  let count = ref(0);

  let sizes = [
    { text: 'Small', value: 'small'},
    { text: 'Medium', value: 'medium'},
    { text: 'Large', value: 'large'}
  ]

  let buttonSize = ref('small');
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <span>Button is {{buttonSize}}</span>
    <button is="kendo-button" :text="`Count is: ${count}`" icon="gear" :size="buttonSize" @click="count++"></button>
    <input is="kendo-dropdown-list" :dataSource.prop="sizes" v-model="buttonSize" @change="e => buttonSize = e.target.value" />
  </div>
</template>
