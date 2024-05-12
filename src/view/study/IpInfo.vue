<template>
  <div>
    ip信息的演示
  </div>
  <div>是否存在ip信息:{{info}},
    <div>ip信息:{{ipinfo}}</div>
    <div>天气信息:{{weather}}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import ipinfoStore from '../../store/ipinfo';
const store = ipinfoStore();

const { ipinfo ,info,weather} = storeToRefs(store);
</script>

<style scoped></style>