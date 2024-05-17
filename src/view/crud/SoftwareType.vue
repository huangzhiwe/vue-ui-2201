<template>
  <div>
    <UserInfoComp></UserInfoComp>
    <SoftwareTypeSelector></SoftwareTypeSelector>
  </div>
  <!-- 
    软件分类的删除，添加，修改功能完成
    软件的修改，删除功能完成
    游戏发行商和游戏功能，电影和电影排片功能
  -->

</template>

<script setup>
import { ref } from 'vue';
import SoftwareTypeSelector from '../../components/SoftwareTypeSelector.vue';
import UserInfoComp from '../../components/UserInfoComp.vue';
</script>

<style scoped></style>
