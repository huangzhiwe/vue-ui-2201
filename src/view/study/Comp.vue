<template>
  <div> 组件演示 </div>
  <div>
    组件的属性演示
    <input type="text" v-model="comp_info" />
    {{ comp_info }}
  </div>
  <hr />
  <MyComp :myprop="comp_info"@myevent="myhandle">
    <div>乌克兰</div>

    <template #fixed>
      <div>探路者</div>
    </template>
  </MyComp>
  <hr />
  <my-comp>
    <div>乌克兰1</div>
  </my-comp>
</template>
<script setup>
import { ref } from 'vue';
import MyComp from '../../components/MyComp.vue';

const comp_info = ref('传给组件的变量');
//监听主键自定义的事件
const myhandle = (info) => {
  console.log('监听到组件事件:',info);
};
</script>
<style scoped></style>
<!-- 
  作业完成注册见面，附加作业完成邮箱和手机注册-->
