<template>
  <div>pinia主键演示</div>
  <div>count:{{count}}</div>
  <div>
    <el-button @click="increment">增加</el-button>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs} from 'pinia';
import demoStore from '../store/demo';


const {count} = storeToRefs(demoStore());
const{increment}=demoStore();


</script>

<style scoped></style>