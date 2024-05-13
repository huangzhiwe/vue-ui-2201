<template>
  <UserInfoComp></UserInfoComp>
  <div>
    {{ isLogin }}
    <hr/>
    {{ user }}
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import userStore from '../../store/user';
import UserInfoComp from '../../components/UserInfoComp.vue';

const {isLogin,user} =storeToRefs(userStore());

</script>
<style scoped>
</style>
