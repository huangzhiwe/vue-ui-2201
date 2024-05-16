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
              <ElDropdownItem divided command="userlogo">修改用户头像</ElDropdownItem>
              <ElDropdownItem command="userinfo">修改用户附加信息</ElDropdownItem>
              <ElDropdownItem divided command="logout">安全退出</ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </div>
      <div v-else>
        <el-button @click="router.push('/user/login')">登录</el-button>
        </div>
    </div>
  
  </div>
  <ElDialog v-model="mvisible" title="修改用户附加信息" @closed="update">
    <div>
      <ElForm>
        <ElFormItem label="姓名">
          <ElInput v-model="muserinfo.nickname" />
        </ElFormItem>
        <ElFormItem label="简介">
          <ElInput v-model="muserinfo.info" />
        </ElFormItem>
        <ElFormItem label="QQ">
          <ElInput v-model="muserinfo.qq" />
        </ElFormItem>
        <ElFormItem label="微信">
          <ElInput v-model="muserinfo.wechat" />
        </ElFormItem>
        <ElFormItem label="性别">
          <ElRadioGroup v-model="muserinfo.sex">
          <ElRadio value="m">男</ElRadio>
          <ElRadio value="f">女</ElRadio>
          <ElRadio value="n">保密</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
      </ElForm>      
    </div>
    <template #footer>
      <ElButton @click="mvisible=false">关闭</ElButton>
      <ElButton type="primary"@click="modifyUser">保存</ElButton>
    </template>

</ElDialog>
</template>

<script setup>

//#region 基础导入
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
  ElMessage,
  ElDialog,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadioGroup,
  ElRadio,
} from 'element-plus';
import { Tools } from '../script/Tools';
const { info, ipinfo, weather } = storeToRefs(ipstore());
const { isLogin, user } = storeToRefs(useStore());
const{update}=useStore();

const router = useRouter();
//#endregion

//#region 菜单处理
const handleMenu =(command)=>{
  console.log('菜单:',command);
  if(command == 'home'){
    router.push('/');
  } else if(command == 'main'){
    router.push('/user/main');
  } else if(command == 'logout'){
    logout();
  }else if(command == 'userinfo'){
    showModifyUser();
  }else if(command == 'userlogo'){
    modifyUserLogo();
  }
  
}
//#endregion修改用户头像

const modifyUserLogo=()=>{
  Tools.browseImage((file)=>{
    console.log('选中文件',file);
    Api.upload('/user/logo',file,{},(data)=>{
      if(data.success) {
        location.reload();
      }else{
        ElMessage.error(data.message);
      }
    })


  });
}

//#region 



//#endregion


//#region 修改用户附加信息
const mvisible = ref(false);
const muserinfo = ref({});

const showModifyUser=()=>{
  //只要相关字段
  muserinfo.value = {
    nickname:user.value.tbUserInfo.nickname,
    sex:user.value.tbUserInfo.sex,
    qq:user.value.tbUserInfo.qq,
    wechat:user.value.tbUserInfo.wechat,
    info:user.value.tbUserInfo.info,
  };

  mvisible.value = true;

};

const modifyUser=()=>{
  Api.put('/user',muserinfo.value,(data)=>{
    if(data.success){
      ElMessage.success(data.message);
    }else{
      ElMessage.error(data.message);
    }
  })
};



//#endregion



//#region 退出登录

const logout = () => {
  Api.delete('/auth',{},()=>{
    ElMessage.success('退出成功');
    update();
  });
};



//#endregion

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
