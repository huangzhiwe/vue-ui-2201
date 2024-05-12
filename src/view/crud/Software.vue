<template>
  <div>  
    <ElButton type="success" @click="showQTYpe">{{ qtype }}</ElButton>
    <ElButton type="info" @click="query">查询</ElButton>
    <ElButton type="info" @click="requery">重置</ElButton>
    <el-button type="primary" @click="avisible=true">添加软件</el-button>
    </div>
  <div>
    <!-- {{ list }} -->
    <el-table :data="list">
      <el-table-column prop="sid" label="软件编号" />
      <el-table-column prop="sname" label="软件名称" />
      <el-table-column prop="vendor" label="软件厂商" />
      <el-table-column prop="intro" label="简介" />
      <el-table-column prop="type.tname" label="简介" width="100" />
    </el-table>
    <PageComp :page="page" @info-change="query" />
  </div>
  <!-- 添加对话框 -->

  <el-dialog title="添加软件" v-model="avisible" @close="query">
    <div>
      <el-form>
        <el-form-item label="软件分类">
          <el-button type="primary" @click="showAddSelector" >
            {{ addType }}</el-button
          >
        </el-form-item>

        <el-form-item label="软件名称">
          <el-input v-model="addInfo.sname" />
        </el-form-item>

        <el-form-item label="软件厂商">
          <el-input v-model="addInfo.vendor" />
        </el-form-item>

        <el-form-item label="软件简介">
          <el-input v-model="addInfo.intro" :rows="10" type="textarea" />
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <div>
        <el-button type="danger" @click="avisible = false">取消</el-button>
        <el-button type="info" @click="resetAdd">重填</el-button>
        <el-button type="success" @click="add">发布</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog title="选择软件分类" v-model="stvisible">
    <SoftwareTypeSelector mode="selector"  @info-change="typeSelected"></SoftwareTypeSelector>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { Api } from '../../script/Api';
import { ElMessage, ElDialog,ElButton} from 'element-plus';

import PageComp from '../../components/PageComp.vue';
import SoftwareTypeSelector from '../../components/SoftwareTypeSelector.vue';

const stvisible = ref(false);
const typemode = ref('');

const typeSelected=(info)=>{
  //判断模式进行数值操作
  if(typemode.value=='add'){
    addInfo.value.stid=info.stid;
    addType.value=info.tname;
    stvisible.value=false;
  }else if(typemode.value=='query'){
    queryInfo.value.stid=info.stid;
    qtype.value=info.tname;
    stvisible.value=false;
  }
};


//#region 查询部分
const page = ref({
  pageNumber: 1,
  pageSize: 10,
});

const queryInfo = ref({
  stid: -1,
  sname: '',
  vendor: '',
});

const showQTYpe=()=>{
  stvisible.value=true;
  typemode.value='query';
};

const qtype=ref('请选择分类');

const list = ref([]);

const requery=()=>{
  page.value={
    pageNumber:1,
    pageSize:10
  };
  queryInfo.value={
    stid:-1,
    sname:'',
    vendor:''
  };
  qtype.value='请选择分类';
  query();
}

const query = () => {
  Api.get(
    `/crud/software/${page.value.pageSize}/${page.value.pageNumber}`,
    queryInfo.value,
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
//#endregion

//#region 添加部分
const addInfo = ref({
  stid: -1,
  sname: '',
  intro: '',
  vendor: '',
});

const addType = ref('请选择分类');
const avisible = ref(false);

const resetAdd = () => {
  addInfo.value = {
    stid: -1,
    sname: '',
    intro: '',
    vendor: '',
  };
  addType.value = '请选择分类';
};
const add = () => {
Api.post('/crud/software',addInfo.value,(data)=>{
  if(data.success){
    ElMessage.success(data.message);
    resetAdd();
  }else{
    ElMessage.error(data.message);
  }
})
};

const showAddSelector = () => {
  stvisible.value = true;
  typemode.value = 'add';
};
//#endregion
</script>

<style scoped></style>
