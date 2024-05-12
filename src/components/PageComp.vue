<template>
  <div>
    <el-pagination
    background
      layout="total, prev, pager,sizes, next, jumper"
      v-model:current-page="page.pageNumber"
      v-model:page-size="page.pageSizes"
      :total="page.total"
      :page-sizes="[1 ,3,5,10,20]"
      @size-change="query"
      @current-change="query"/>

    </div>
  
</template>

<script setup>
const props = defineProps(['page']);

  const emit = defineEmits(['info-change']);
  const query = ()=>{
    emit('info-change',props.page);
  }
</script>

<style scoped></style>