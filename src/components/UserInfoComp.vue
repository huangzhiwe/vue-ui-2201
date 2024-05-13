<template>
  <div class="main">
    <div>
      
      <div v-if="info">
        <div>
          {{ ipinfo.province}}
          {{ ipinfo.city }}
          {{ ipinfo.district }}
        </div>
        <div>
        天气:
        {{ weather.weather }}
        {{ weather.temperature }}°
        </div>
      </div>
      <div v-else>
        <div>没有获取到信息</div>
      </div>
    </div>
    <div>
      <div v-if="isLogin">
        用户信息
      </div>
      <div v-else>需要登录</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import ipstore from '../store/ipinfo';
import  useStore  from '../store/user';
const {info,ipinfo,weather} =storeToRefs(ipstore());
const {isLogin,user} =storeToRefs(useStore());

</script>

<style scoped>
.main{
display:flex;
justify-content: space-between;
padding: 0.5rem 1rem;
}
</style>