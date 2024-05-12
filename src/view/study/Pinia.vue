<template>
  <div>pinia演示1</div>
  <div>count:{{count}}</div>
  <div>
    <el-button @click="increment">增加</el-button>
    <el-button @click="router.push('/study/pinia2')">演示2</el-button>
    
  </div>
  <hr>
  <PiniaComp/>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs} from 'pinia';
import demoStore from '../../store/demo';
import {useRouter} from 'vue-router';
const router = useRouter();

import PiniaComp from '../../components/PiniaComp.vue';


const {count} = storeToRefs(demoStore());
const{increment}=demoStore();


</script>

<style scoped></style>