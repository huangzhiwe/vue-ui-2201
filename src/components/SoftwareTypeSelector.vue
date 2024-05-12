<template>
  <div>
    <!-- 表格 -->
    <el-table :data="list">
      <el-table-column prop="stid" label="编号"></el-table-column>
      <el-table-column prop="tname" label="名称"></el-table-column>
      <el-table-column prop="intro" label="描述"></el-table-column>
      
      <el-table-column label="操作">
        <template #default="s">
          <el-button type="primary" @click="infoSelected(s.row)"
            >选择</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- {{ list }} -->

    <PageComp :page="page" @info-change="query"></PageComp>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Api } from '../script/Api';
import { ElMessage } from 'element-plus';
import pageComp from './PageComp.vue';
const emits = defineEmits(['info-change']);

const infoSelected = (info) => {
  emits('info-change', info);
};

const page = ref({ pageNumber: 1, pageSize: 5 });
const list = ref([]);

const query = () => {
  Api.ajax(
    `/crud/softwaretype/${page.value.pageSize}/${page.value.pageNumber}`,
    {},
    (data) => {
      if (data.success) {
        list.value = data.data.data;
        page.value = data.data.pageBean;
      } else {
        ElMessage.error(data.message);
      }
    }
  );
};
query();
</script>

<style scoped></style>
