<template>
  <!-- 上方的查询表单 -->
  <div> 
    {{ queryInfo }}
    <el-form :inline="true">
      
      <el-form-item>
        <el-select v-model="queryInfo.order">
          <el-option v-for="d in orderList":key="d.value" :value="d.value":label="d.label" width="100px">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="queryInfo.title" placeholder="请输入标题" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="queryInfo.content" placeholder="请输入内容" />
      </el-form-item>

      <el-form-item>
    <el-button-group>
      <el-button type="primary" @click="reset">重置</el-button>
    <el-button type="success"  @click="requery">查询</el-button>
    <el-button type="info"  @click="showAdd">添加</el-button>
    </el-button-group>
      </el-form-item>

</el-form>

  </div>

  <!-- 数据呈现的部分 -->
  <div v-loading="loading">
  <el-table :data="list">
    <el-table-column prop="bid" label="编号" width="100" />
    <el-table-column prop="title" label="标题"  />
    <el-table-column prop="username" label="发布人" />
    <el-table-column prop="topIndex" label="是否置顶" />



    <el-table-column  label="信息最后修改时间">
      <template #default="scope">
        {{ Tools.formatDate(scope.row.lastupdate) }}
      </template>
    </el-table-column>
    <el-table-column  label="操作">
      <template #default="scope">
        <el-button type="success" size="'small'">修改</el-button>
        <el-button  size="'small'">查看内容</el-button>
        <el-button type="danger" size="'small'">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
  <div>
    <el-pagination background layout="prev, pager, nex,total,sizes"
      :page-sizes="[1, 5, 10, 20]"
    :total="page.total" 
    v-model:page-size="page.pageSize"
    v-model:current-page="page.pageNumber"
    @current-change="query"
    @size-change="query"
    />
  </div>
</div>
  <!--  添加的对话框 -->
  <el-dialog title="发布公告" v-model="avisible" @closed="requery">
    <div>
      <el-form>
        <el-form-item label="公告标题">
          <el-input v-model="addInfo.title" />
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="addInfo.username" />
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input v-model="addInfo.content"
          :row="10"
        type="textarea" />


        </el-form-item>

        </el-form>
    </div>
    <template #footer>
      <div>
        <el-button type="danger" @click="avisible = false">取消</el-button>
        <el-button type="content" @click="resetAdd">重填</el-button>
        <el-button type="success" @click="add">发布</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { Api } from '../script/Api';
import { Tools } from '../script/Tools';
import { ElMessageBox } from 'element-plus';
//#region 查询的部分
const loading = ref(false);


const page = ref({
  pageNumber: 1,
  pageSize: 5,
});

const queryInfo = ref({
  title: '',
  content: '',
  startTime: '',
  endTime: '',
});



const list = ref([]);

const reset = () => {
  queryInfo.value = {
    order: 1,
    title: '',
    content: '',
  };
  requery();
};

const requery =()=>{
  page.value.pageNumber =1;
  query();
};

const query = () => {
  loading.value = true;
  Api.get(
    '/crud/billboard',
    Tools.concatJson(page.value, queryInfo.value),
    (data) => {
      loading.value = false;
      if (data.success) {
        list.value = data.data.data;
        page.value = data.data.pageBean;
      } else {
        ElMessageBox.alert(data.message, '公告');
      }
    }
  );
};
query();
//#endregion

//#region 添加的部分
const avisible = ref(false);
const addInfo=ref({
  title: '',
  content: '',
  });

const resetAdd =()=>{
  addInfo.value={
    title: '',
    content: '',
    
  };
}
const showAdd =()=>{
  resetAdd();
  avisible.value=true;
}
const add=()=>{
  Api.post('/crud/billboard',addInfo.value,(data)=>{
    if(data.success){
      ElMessageBox.alert('添加成功','公告');
      requery();
    }else{
      ElMessageBox.alert(data.message,'公告');
    }
  })
}


//#endregion

</script>

<style scoped></style>
