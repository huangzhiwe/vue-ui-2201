<template>
  <div class="login-box">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>手机号注册</span>
        </div>
      </template>

      <div>
        <el-from>
          <el-form-item label="请输入手机号">
            <el-input v-model="userPhone.phone"></el-input>
          </el-form-item>
          <el-form-item label="请输入密码">
            <el-input show-password v-model="userPhone.password"></el-input>
          </el-form-item>
          <el-form-item label="请输入验证码">
            <el-input v-model="userPhone.code"></el-input>
          </el-form-item>
        </el-from>
      </div>

      <template #footer>
        <el-button type="primary" @click="register"> 注册 </el-button>
        <el-button  @click="sendPhoneCode"> 发送验证码 </el-button>
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
const userPhone = ref({
  phone: '',
  password: '',
  code: '',
});
const register = () => {
  Api.post('/user/phone', userPhone.value, (data) => {
    if (data.success) {
      ElMessage.success(data.message);
      router.push('/user/main')
    } else {
      ElMessage.error(data.message);
    }
  });
};

const sendPhoneCode = () => {
  Api.post('/tools/sendPhoneCode',{ phone: userPhone.value.phone }, (data) => {
    if (data.success) {
      ElMessage.success(data.message);
    } else {
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
