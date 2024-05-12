<template>
  <div class="fixed-box">
    <!-- 其名插槽在组件调用的时候需要同时#name指定插入内容 -->
    <slot name="fixed"> </slot>
    <el-button @click="myclick">触发事件按钮</el-button>
    <!-- 具名插槽的使用<template #fixed>插入的内容</template> -->
  </div>
  <div class="box">
    <div>左
      <div>
        {{ myprop }}
      </div>
      <div> </div>
      <!-- 不写名称的slot是默认·插槽 插槽的作用是调用组件的地方编写要插入到组件对应位置对应的内容-->
      <slot> </slot>
    </div>
    <div>右</div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
//给组件定义属性
defineProps(['myprop']);

const emit=defineEmits(['myevent']);
const myclick = () => {
  console.log('点击组件');
  emit('myevent', '事件的参数');
};

</script>
<style scoped>
.box {
  display: flex;
  justify-content: space-between;
}
.fixed-box {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}
</style>
