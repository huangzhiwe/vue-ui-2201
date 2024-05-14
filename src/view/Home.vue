<template>
  <UserInfoComp/>
  <div>
    <div v-for="d in menus">
      <div @click="toPage(d.path)">
        <img :src="d.icon" alt=""/>
        <div>{{ d.title }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import{ref}from'vue'
import { useRouter } from 'vue-router';
import UserInfoComp from '../components/UserInfoComp.vue';
const router = useRouter();
const menus=[{
  title:'新闻',
  icon:'/images/news.svg',
  path:'/news',
},
{
  title:'成语',
  icon:'/images/idiom.svg',
  path:'/study/idiomgame',
},];
const toPage=(path)=>{
  router.push(path);
};

</script>
