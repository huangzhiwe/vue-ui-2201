<template>
  <el-button type="primary">测试按钮</el-button>
  <div>
    应答数据:{{ result }}
    <div>{{ rdata.data }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

import Api from '../script/Api';

//响应式数据
const result = ref({});
//reactive不支持简单类型。比如字符串，数字布尔
//好处是不需要value属性来获取/设置响应式数据
const rdata = reactive({ data: {} });

Api.get('/test/echo', { echo: '黑暗骑士' }, (data) => {
  //赋值幺通过value属性
  result.value = data;
  rdata.data = data;
});
</script>
