<template>
  <div>pinia演示</div>
  <div>count:{{count}}</div>
  <div>
    <el-button @click="increment">增加</el-button>
    <el-button @click="router.push('/study/pinia')">演示1</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs} from 'pinia';
import demoStore from '../../store/demo';
const router = useRouter();

const {count} = storeToRefs(demoStore());
const{increment}=demoStore();


</script>

<style scoped></style>