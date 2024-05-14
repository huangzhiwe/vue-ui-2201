<template>
  <div class="main">
    <div>
      <div v-if="info">
        <div>
          {{ ipinfo.province }}
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
        <ElDropdown @command="handleMenu">
          <div class="logo">
            <ElAvatar :src="Api.getUserLogo(user.tbUser.uid)" shape="circle" />
            <el-icon><CirclePlus /></el-icon>
          </div>
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem>
                {{ user.tbUserInfo.nickname }}

                ({{ user.tbUser.username }})
              </ElDropdownItem>
              <ElDropdownItem divided command="home"><el-icon><Management /></el-icon>网站首页</ElDropdownItem>
              <ElDropdownItem command="main"><el-icon><Management /></el-icon>用户首页</ElDropdownItem>
              <ElDropdownItem divided command="logout">安全退出</ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
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
import useStore from '../store/user';
import { Api } from '../script/Api';
import {
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDescriptionsItem,
} from 'element-plus';
const { info, ipinfo, weather } = storeToRefs(ipstore());
const { isLogin, user } = storeToRefs(useStore());

const router = useRouter();

const handleMenu =(command)=>{
  console.log('菜单:',command);
  if(command == 'home'){
    router.push('/');
  }
  
}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}

.logo {
display: flex;
align-items: center;
}
</style>
