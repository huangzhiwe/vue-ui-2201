<template>
  <RouterView></RouterView>
</template>
<script setup>
import ipstore from './store/ipinfo';
const {queryIpInfo} = ipstore();

import userstore from './store/user';
const {update} = userstore();


console.log('应用程序启动');

queryIpInfo();
update((islogin)=>{
  console.log('用户登录状态',islogin);
});
</script>
<style>
body{
  margin: 03;
}
</style>
