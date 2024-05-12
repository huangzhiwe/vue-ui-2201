<template>
  <div>
    <!-- 表格 -->
    <el-table :data="list" >
      <el-table-column prop="stid" label="编号"></el-table-column>
      <el-table-column prop="tname" label="名称"></el-table-column>
      <el-table-column prop="intro" label="描述"></el-table-column>
    </el-table>

    <!-- {{ list }} -->
    <el-pagination
    background
      layout="total, prev, pager,sizes, next, jumper"
      v-model:current-page="page.pageNumber"
      v-model:page-size="page.pageSizes"
      :total="page.total"
      :page-sizes="[3,5,10,20]"
      @size-change="query"
      @current-change="query"></el-pagination>

  <PageComp :page="page" @info-change="query"></PageComp>
    </div>
</template>

<script setup >
import { ref } from 'vue';
import { Api } from '../../script/Api';
import { Tools } from '../../script/Tools';
import { ElMessage } from 'element-plus';
import pageComp from '.PageComp.vue';


const page=ref({pageNumber:1,pageSize:10});
const list=ref([]);

const query=()=>{
  Api.ajax(`/crud/softwaretype/${page.value.pageSize}/${page.value.pageNumber}`
    ,{}
    ,(data)=>{
      if(data.success){
        list.value=data.data.data;
        page.value=data.data.pageBean;
      }else{
        ElMessage.error(data.message);
      }
    }
  );
};
query();

</script>

<style scoped></style>