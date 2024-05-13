<template>
  <div class="login-box">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户登录</span>
        </div>
      </template>

      <div>
        <el-from>
          <el-form-item label="登录名称">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input show-password v-model="user.password"></el-input>
          </el-form-item>
        </el-from>
      </div>

      <template #footer>
        <el-button v-loading="loading" type="primary" @click="login"> 登录 </el-button>
      </template>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Api } from '../../script/Api';
//导入路由器对象
import { useRouter } from 'vue-router';
const router = useRouter();

import { storeToRefs } from 'pinia';
import userstore from '../../store/user';
const {update } = userstore();


const user = ref({
  username: '',
  password: '',
});

const loading = ref(false);

const login = () => {
  loading.value = true;
  Api.post('/auth', user.value, (data) => {
    if (data.success) {
      ElMessage.success(data.message);
      update(()=>{router.push('/user/main');
      });
    } else {
      loading.value = false;
      ElMessage.error(data.message);
    }
  });
};
</script>
<style scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
