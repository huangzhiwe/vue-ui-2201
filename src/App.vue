<template>
  <RouterView></RouterView>
</template>
<script setup>
import ipstore from './store/ipinfo';
const {queryIpInfo} = ipstore();
console.log('应用程序启动');

queryIpInfo();
</script>
<style>
body{
  margin: 03;
}
</style>
